import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./webApp.scss";
import Board from "../../components/Board";
import Tips from "../../components/Tips";
import Footer from "../../components/Footer";
import ControlPanel from "../ControlPanel";
import GameOver from "../GameOver";
import Scores from "../Scores";
import i18n from "../../utils/i18n";
import comments from "../../utils/gitComments";

document.title = i18n.title;

class WebApp extends Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    audioMove: PropTypes.instanceOf(Audio).isRequired,
    audioPopup: PropTypes.instanceOf(Audio).isRequired
  };

  constructor(...args) {
    super(...args);

    // debounce delay in ms
    this.delay = process.env.NODE_ENV === "production" ? 300 : 1;
  }

  componentDidMount() {
    comments.renderHeader(document.getElementById("gitmentHeader"));
    comments.renderComments(document.getElementById("gitmentComments"));
    comments.renderEditor(document.getElementById("gitmentEditor"));
  }

  render() {
    const { delay } = this;
    const { matrix, audioMove, audioPopup } = this.props;

    return (
      <div className={styles.app}>
        <div className={styles.box}>
          <div className={styles.board}>
            <h1 className={styles.title}>2048</h1>
            <Board matrix={matrix} />
          </div>
          <div className={styles.panel}>
            <div>
              <Scores />
            </div>
            <ControlPanel
              delay={delay}
              audioMove={audioMove}
              audioPopup={audioPopup}
            />
          </div>
        </div>
        <Tips title={i18n.tipTitle} content={i18n.tipContent} />
        <div className={styles.comments}>
          {/* eslint-disable react/no-danger */}
          <p
            className={styles.commentsTitle}
            dangerouslySetInnerHTML={{ __html: i18n.commentTitle }}
          />
          <div id="gitmentHeader" />
          <div id="gitmentComments" />
          <div id="gitmentEditor" />
        </div>
        <Footer
          name={"devrsi0n"}
          profileUrl={"https://github.com/devrsi0n"}
          repoUrl={"https://github.com/devrsi0n/React-2048-game"}
        />
        <GameOver />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix
});

export default connect(mapStateToProps)(WebApp);
