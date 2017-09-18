import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import styles from './app.scss';
import resetSvg from '../../assets/svg/reset.svg';
import Board from '../../components/Board';
import Modal from '../../components/Modal';
import Firework from '../../components/Firework';
import ControlPanel from '../ControlPanel';
import Scores from '../Scores';
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

    return (
      <div className={styles.app}>
        <div className={styles.box}>
          <div className={styles.board}>
            <h1>2048</h1>
            <Board matrix={matrix} />
          </div>
          <div className={styles.panel}>
            <div>
              <Scores />
            </div>
            <ControlPanel delay={delay} />
          </div>
        </div>
        <Modal display={gameOver} >
          {/* <Modal display > */}
          {
            score > 999 ? <Firework /> : null
          }
          <div>
            <div className={styles.gameover}>
              <div className={styles.text}> Score </div>
              <div className={styles.banner}>
                <p>{score}</p>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.button}
                onClick={debounce(this.props.onReset, delay)}
              >
                <img src={resetSvg} alt="reset" />
              </button>
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
