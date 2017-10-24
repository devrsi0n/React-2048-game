import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./webApp.scss";
import Board from "../../components/Board";
import Tips from "../../components/Tips";
import Footer from "../../components/Footer";
import ControlPanel from "../ControlPanel";
import GameOver from "../../components/GameOver";
import Scores from "../../components/Scores";
import i18n from "../../utils/i18n";

// Desktop application entry
export default class WebApp extends Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    audioMove: PropTypes.instanceOf(Audio).isRequired,
    audioPopup: PropTypes.instanceOf(Audio).isRequired,
    score: PropTypes.number,
    bestScore: PropTypes.number,
    gameOver: PropTypes.bool,
    onReset: PropTypes.func
  };

  static defaultProps = {
    score: 0,
    bestScore: 0,
    gameOver: false,
    onReset() {}
  };

  constructor(...args) {
    super(...args);

    // debounce delay in ms
    this.delay = process.env.NODE_ENV === "production" ? 300 : 1;
  }

  render() {
    const { delay } = this;
    const {
      matrix,
      audioMove,
      audioPopup,
      bestScore,
      score,
      gameOver,
      onReset
    } = this.props;

    return (
      <div className={styles.app}>
        <div className={styles.box}>
          <div className={styles.board}>
            <h1 className={styles.title}>2048</h1>
            <Board matrix={matrix} />
          </div>
          <div className={styles.panel}>
            <div>
              <Scores bestScore={bestScore} score={score} />
            </div>
            <ControlPanel
              delay={delay}
              audioMove={audioMove}
              audioPopup={audioPopup}
            />
          </div>
        </div>
        <Tips title={i18n.tipTitle} content={i18n.tipContent} />
        <div className={styles.footer}>
          <Footer
            name="devrsi0n"
            profileUrl="https://github.com/devrsi0n"
            repoUrl="https://github.com/devrsi0n/React-2048-game"
          />
        </div>
        <GameOver gameOver={gameOver} score={score} onReset={onReset} />
      </div>
    );
  }
}
