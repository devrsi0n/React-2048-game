import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components//Modal';
import Firework from '../../components//Firework';
import styles from './gameOver.scss';
import i18n from '../../utils/i18n';
import resetSvg from '../../assets/svg/reset.svg';
import { gameOver as gameover } from '../../reducers/ranking';

// Game over card
export class GameOver extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameOver) {
      this.props.onGameOver();
    }
  }

  render() {
    const { props: { gameOver, score, onReset } } = this;

    return (
      <div>
        <Modal display={gameOver}>
          {score > 999 ? <Firework /> : null}
          <div>
            <div className={styles.gameover}>
              <div className={styles.text}> {i18n.score} </div>
              <div className={styles.banner}>
                <p>{score}</p>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.button} onClick={onReset}>
                <img src={resetSvg} alt="reset" />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

GameOver.propTypes = {
  score: PropTypes.number,
  gameOver: PropTypes.bool,
  onReset: PropTypes.func,
  onGameOver: PropTypes.func
};

GameOver.defaultProps = {
  score: 0,
  gameOver: true,
  onReset() {},
  onGameOver() {}
};

const mapDispatchToProps = {
  onGameOver: gameover
};

export default (process.env.NODE_ENV !== 'test'
  ? connect(null, mapDispatchToProps)(GameOver)
  : GameOver);
