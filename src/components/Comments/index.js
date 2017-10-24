import React, { Component } from "react";
import comments from "../../utils/gitComments";
import styles from "./comments.scss";
import i18n from "../../utils/i18n";
import Footer from "../Footer";

export default class Comments extends Component {
  componentDidMount() {
    comments.renderHeader(document.getElementById("gitmentHeader"));
    comments.renderComments(document.getElementById("gitmentComments"));
    comments.renderEditor(document.getElementById("gitmentEditor"));
  }

  render() {
    return (
      <div className={styles.main}>
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
          name="devrsi0n"
          profileUrl="https://github.com/devrsi0n"
          repoUrl="https://github.com/devrsi0n/React-2048-game"
        />
      </div>
    );
  }
}
