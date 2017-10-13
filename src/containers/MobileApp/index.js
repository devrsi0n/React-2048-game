import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";
import Board from "../../components/Board";
import swipeDetect from "../../utils/mobileEvents";
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset
} from "../../reducers/board";
import styles from "./mobileApp.scss";
import Scores from "../Scores";
import GameOver from "../GameOver";
import Speaker from "../../components/Speaker";
import WrapperButton from "../../components/WrapperButton";
import Footer from "../../components/Footer";
import resetSvg from "../../assets/svg/reset.svg";
import undoSvg from "../../assets/svg/undo.svg";

// Mobile application entry
class MobileApp extends Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onMoveUp: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,
    onPlaceRandom: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    isMoved: PropTypes.bool.isRequired,
    audioMove: PropTypes.instanceOf(Audio).isRequired,
    audioPopup: PropTypes.instanceOf(Audio).isRequired,
    pastLen: PropTypes.number.isRequired
  };

  constructor(...args) {
    super(...args);

    this.state = {
      speakerOn: true
    };
    this.handleUndo = this.handleUndo.bind(this);
    this.handleSpeakerClick = this.handleSpeakerClick.bind(this);
  }

  componentDidMount() {
    const el = document.getElementById("gameBoard");
    const directionCallback = direction => {
      switch (direction) {
        case "up":
          this.handleMoveUp();
          break;
        case "down":
          this.handleMoveDown();
          break;
        case "left":
          this.handleMoveLeft();
          break;
        case "right":
          this.handleMoveRight();
          break;
        default:
          break;
      }
    };
    if (el) {
      swipeDetect(el, directionCallback);
    }
  }

  generalMove(func) {
    func();
    const { isMoved } = this.props;
    const { speakerOn } = this.state;
    if (speakerOn && isMoved) {
      this.props.audioMove.play();
    }
    setTimeout(() => {
      this.props.onPlaceRandom();
      if (speakerOn && isMoved) {
        this.props.audioPopup.play();
      }
    }, 100);
  }

  handleMoveUp() {
    this.generalMove(this.props.onMoveUp);
  }

  handleMoveDown() {
    this.generalMove(this.props.onMoveDown);
  }

  handleMoveLeft() {
    this.generalMove(this.props.onMoveLeft);
  }

  handleMoveRight() {
    this.generalMove(this.props.onMoveRight);
  }

  handleUndo() {
    if (this.props.pastLen > 3) {
      this.props.onUndo();
    }
  }

  handleSpeakerClick(speakerOn) {
    this.setState({
      speakerOn
    });
  }

  render() {
    const { matrix } = this.props;
    return (
      <div className={styles.mobileApp}>
        <div className={styles.head}>
          <h1 className={styles.title}>2048</h1>
          <div>
            <Scores />
            <div className={styles.rowBtn}>
              <div className={styles.btn}>
                <Speaker onClick={this.handleSpeakerClick} />
              </div>
              <WrapperButton onClick={this.handleUndo}>
                <img src={undoSvg} alt="undo" />
              </WrapperButton>
              <WrapperButton onClick={this.props.onReset} cls={styles.last}>
                <img src={resetSvg} alt="reset" />
              </WrapperButton>
            </div>
          </div>
        </div>
        <div id="gameBoard" className={styles.board}>
          <Board matrix={matrix} />
        </div>
        <Footer
          name="devrsi0n"
          profileUrl="https://github.com/devrsi0n"
          repoUrl="https://github.com/devrsi0n/React-2048-game"
        />
        <GameOver />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix,
  isMoved: state.present.board.present.isMoved,
  pastLen: state.past.length
});

const mapDispatchToProps = dispatch => ({
  onPlaceRandom() {
    dispatch(placeRandom());
  },
  onMoveUp() {
    dispatch(moveUp());
  },
  onMoveDown() {
    dispatch(moveDown());
  },
  onMoveLeft() {
    dispatch(moveLeft());
  },
  onMoveRight() {
    dispatch(moveRight());
  },
  onReset() {
    dispatch(reset());
  },
  onUndo() {
    // Undo move and generated cell
    dispatch(ActionCreators.undo());
    dispatch(ActionCreators.undo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
