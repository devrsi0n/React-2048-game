import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './app.scss';
import resetSvg from '../../assets/svg/reset.svg';
import prevStepSvg from '../../assets/svg/prev-step.svg';
import Board from '../../components/Board';
import Button from '../../components/Button';
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
  };

  // constructor(...args) {
  //   super(...args);
  // }

  componentWillMount() {
    const board = JSON.parse(localStorage.getItem('board')) || null;
    if (board && !board.gameOver) {
      this.props.onInit(board);
    } else {
      this.props.onInit();
    }
    const { body } = document;
    body.addEventListener('keyup',
      this.handleKeyDown.bind(this));
  }

  handleMoveUp() {
    this.props.onMoveUp();
    this.props.onPlaceRandom();
  }

  handleMoveDown() {
    this.props.onMoveDown();
    this.props.onPlaceRandom();
  }

  handleMoveLeft() {
    this.props.onMoveLeft();
    this.props.onPlaceRandom();
  }

  handleMoveRight() {
    this.props.onMoveRight();
    this.props.onPlaceRandom();
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
    const { matrix, score, gameOver } = this.props;
    return (
      <div className={styles.app}>
        Welcome to React-2048-Game
        <p>Your score is: { score }</p>
        <p className={styles['game-over']}>{ gameOver ? 'Game Over!' : '' }</p>
        <div className={styles.box}>
          <div className={styles.board}>
            <Board matrix={matrix} />
          </div>
          <div className={styles['btn-group']}>
            <div className={styles['new-game']}>
              <Button onClick={() => this.props.onRevert()} >
                <img src={prevStepSvg} alt="go back previous step" />
              </Button>
              <Button onClick={() => this.props.onReset()} >
                <img src={resetSvg} alt="reset" />
              </Button>
            </div>
            <Button arrow="up" onClick={() => this.handleMoveUp()} />
            <div className={styles.buttons}>
              <Button arrow="left" onClick={() => this.handleMoveLeft()} />
              <Button arrow="down" onClick={() => this.handleMoveDown()} />
              <Button arrow="right" onClick={() => this.handleMoveRight()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.board.matrix,
  score: state.board.score,
  gameOver: state.board.gameOver,
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
