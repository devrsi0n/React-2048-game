import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import styles from './app.scss';
import resetSvg from '../../assets/svg/reset.svg';
import prevStepSvg from '../../assets/svg/prev-step.svg';
import Board from '../../components/Board';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Firework from '../../components/Firework';
import Speaker from '../Speaker';
import {
  initMatrix,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset,
  revert,
} from '../../reducers/board';
import moveAudio from '../../assets/audio/move.mp3';
import popupAudio from '../../assets/audio/popup.mp3';

class App extends Component {
  static propTypes = {
    onInit: PropTypes.func.isRequired,
    onMoveUp: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,
    onPlaceRandom: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onRevert: PropTypes.func.isRequired,

    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    score: PropTypes.number.isRequired,
    gameOver: PropTypes.bool.isRequired,
    isMoved: PropTypes.bool.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.audioMove = new Audio(moveAudio);
    this.audioPopup = new Audio(popupAudio);

    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSpeakerClick = this.handleSpeakerClick.bind(this);

    // debounce delay in ms
    this.delay = process.env.NODE_ENV === 'production' ? 500 : 1;
    console.log('delay', this.delay);

    this.state = {
      speakerOn: true,
    };
  }

  componentWillMount() {
    const board = JSON.parse(localStorage.getItem('board')) || null;
    if (board && !board.gameOver) {
      this.props.onInit(board);
    } else {
      this.props.onInit();
    }
    const { body } = document;
    const { delay } = this;
    body.addEventListener('keyup',
      debounce(this.handleKeyDown, delay, {
        leading: true,
      }));
  }

  generalMove(func) {
    func();
    const { isMoved } = this.props;
    const { speakerOn } = this.state;
    if (speakerOn && isMoved) {
      this.audioMove.play();
    }
    setTimeout(() => {
      this.props.onPlaceRandom();
      if (speakerOn && isMoved) {
        this.audioPopup.play();
      }
    }, 300);
  }

  handleSpeakerClick(speakerOn) {
    this.setState({
      speakerOn,
    });
  }

  handleMoveUp() {
    return this.generalMove(this.props.onMoveUp);
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

  handleKeyDown(e) {
    const keyUp = 38;
    const keyRight = 39;
    const keyDown = 40;
    const keyLeft = 37;
    const keyW = 87;
    const keyS = 83;
    const keyA = 65;
    const keyD = 68;
    const keyN = 78;

    switch (e.keyCode) {
      case keyW:
      case keyUp:
        this.handleMoveUp();
        break;
      case keyS:
      case keyDown:
        this.handleMoveDown();
        break;
      case keyA:
      case keyLeft:
        this.handleMoveLeft();
        break;
      case keyD:
      case keyRight:
        this.handleMoveRight();
        break;
      case keyN:
        this.props.onReset();
        break;
      default:
        break;
    }
  }

  render() {
    const { delay } = this;
    const { matrix, score, gameOver } = this.props;
    const ResetButton = () => (
      <Button onClick={debounce(this.props.onReset, delay)} >
        <img src={resetSvg} alt="reset" />
      </Button>
    );

    return (
      <div className={styles.app}>
        Welcome to React-2048-Game
        <p>Score: { score }</p>
        <div className={styles.box}>
          <div className={styles.board}>
            <Board matrix={matrix} />
          </div>
          <div className={styles['btn-group']}>
            <div className={styles['new-game']}>
              <Speaker onClick={this.handleSpeakerClick} />
              <Button onClick={debounce(this.props.onRevert, delay)} >
                <img src={prevStepSvg} alt="go back previous step" />
              </Button>
              <ResetButton />
            </div>
            <Button arrow="up" onClick={debounce(this.handleMoveUp, delay)} />
            <div className={styles.buttons}>
              <Button arrow="left" onClick={debounce(this.handleMoveLeft, delay)} />
              <Button arrow="down" onClick={debounce(this.handleMoveDown, delay)} />
              <Button arrow="right" onClick={debounce(this.handleMoveRight, delay)} />
            </div>
          </div>
        </div>
        {/* <Modal display > */}
        <Modal display={gameOver} >
          <div className={styles.gameover}>
            <div className={styles.text}>Game over!</div>
            <div className={styles.score}>{`Your score is ${score}`}</div>
            <div className={styles.button}>
              <ResetButton />
            </div>
          </div>
          {
            score > 999 ? <Firework /> : null
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.board.matrix,
  score: state.board.score,
  gameOver: state.board.gameOver,
  isMoved: state.board.isMoved,
});
const matDispatchToProps = dispatch => ({
  onInit(board) {
    dispatch(initMatrix(board));
  },
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
  onRevert() {
    dispatch(revert());
  },
});

export default connect(mapStateToProps, matDispatchToProps)(App);
