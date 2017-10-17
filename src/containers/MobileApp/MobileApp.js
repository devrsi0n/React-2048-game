import React, { Component } from "react";
import PropTypes from "prop-types";
import Board from "../../components/Board";
import swipeDetect from "../../utils/mobileEvents";
import styles from "./mobileApp.scss";
import Scores from "../../components/Scores";
import GameOver from "../../components/GameOver";
import Speaker from "../../components/Speaker";
import WrapperButton from "../../components/WrapperButton";
import Footer from "../../components/Footer";
import resetSvg from "../../assets/svg/reset.svg";
import undoSvg from "../../assets/svg/undo.svg";

// Mobile application entry
export default class MobileApp extends Component {
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
    pastLen: PropTypes.number.isRequired,
    score: PropTypes.number,
    bestScore: PropTypes.number,
    gameOver: PropTypes.bool
  };

  static defaultProps = {
    score: 0,
    bestScore: 0,
    gameOver: false
  };

  constructor(...args) {
    super(...args);

    this.state = {
      speakerOn: true
    };
  }

  componentDidMount() {
    if (this.gameBoard) {
      swipeDetect(this.gameBoard, this.directionCallback);
    }
  }

  directionCallback = direction => {
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

  generalMove = func => {
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
  };

  handleMoveUp = () => {
    this.generalMove(this.props.onMoveUp);
  };

  handleMoveDown = () => {
    this.generalMove(this.props.onMoveDown);
  };

  handleMoveLeft = () => {
    this.generalMove(this.props.onMoveLeft);
  };

  handleMoveRight = () => {
    this.generalMove(this.props.onMoveRight);
  };

  handleUndo = () => {
    if (this.props.pastLen > 3) {
      this.props.onUndo(-2);
    }
  };

  handleSpeakerClick = speakerOn => {
    this.setState({
      speakerOn
    });
  };

  render() {
    const { matrix, bestScore, score, gameOver, onReset } = this.props;
    return (
      <div className={styles.mobileApp}>
        <div className={styles.head}>
          <h1 className={styles.title}>2048</h1>
          <div>
            <Scores bestScore={bestScore} score={score} />
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
        <div
          id="gameBoard"
          ref={div => {
            this.gameBoard = div;
          }}
          className={styles.board}
        >
          <Board matrix={matrix} />
        </div>
        <Footer
          name="devrsi0n"
          profileUrl="https://github.com/devrsi0n"
          repoUrl="https://github.com/devrsi0n/React-2048-game"
        />
        <GameOver gameOver={gameOver} score={score} onReset={onReset} />
      </div>
    );
  }
}
