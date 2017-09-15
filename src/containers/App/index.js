import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import styles from './app.scss';
import resetSvg from '../../assets/svg/reset.svg';
import Board from '../../components/Board';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Firework from '../../components/Firework';
import ControlPanel from '../ControlPanel';
import {
  initMatrix,
  reset,
} from '../../reducers/board';

class App extends Component {
  static propTypes = {
    onInit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,

    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    score: PropTypes.number.isRequired,
    gameOver: PropTypes.bool.isRequired,
  };

  constructor(...args) {
    super(...args);

    // debounce delay in ms
    this.delay = process.env.NODE_ENV === 'production' ? 500 : 1;
    console.log('delay', this.delay);
  }

  componentWillMount() {
    const board = JSON.parse(localStorage.getItem('board')) || null;
    if (board && !board.gameOver) {
      this.props.onInit(board);
    } else {
      this.props.onInit();
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
          <ControlPanel delay={delay} />
        </div>
        {/* <Modal display > */}
        <Modal display={gameOver} >
          {
            score > 999 ? <Firework /> : null
          }
          <div className={styles.gameover}>
            <div className={styles.text}>Game over!</div>
            <div className={styles.score}>{`Your score is ${score}`}</div>
            <div className={styles.button}>
              <ResetButton />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.board.matrix,
  score: state.board.score,
  gameOver: state.board.gameOver,
});
const mapDispatchToProps = dispatch => ({
  onInit(board) {
    dispatch(initMatrix(board));
  },
  onReset() {
    dispatch(reset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
