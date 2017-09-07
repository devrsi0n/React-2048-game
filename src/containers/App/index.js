import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Board from '../../components/Board';
import {
  initMatrix,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset,
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
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    score: PropTypes.number.isRequired,
    gameOver: PropTypes.bool.isRequired,
  };

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

  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const n = 78;

    switch (e.keyCode) {
      case up:
        this.props.onMoveUp();
        this.props.onPlaceRandom();
        break;
      case down:
        this.props.onMoveDown();
        this.props.onPlaceRandom();
        break;
      case left:
        this.props.onMoveLeft();
        this.props.onPlaceRandom();
        break;
      case right:
        this.props.onMoveRight();
        this.props.onPlaceRandom();
        break;
      case n:
        this.props.onReset();
        break;
      default:
        break;
    }
  }

  render() {
    const { matrix, score, gameOver } = this.props;
    return (
      <div className="App">
        Welcome to React-2048-Game
        <p>Your score is: { score }</p>
        <p className="App-game-over">{ gameOver ? 'Game Over!' : '' }</p>
        <Board matrix={matrix} />
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
});

export default connect(mapStateToProps, matDispatchToProps)(App);
