import React from "react";
import PropTypes from "prop-types";
import styles from "./tips.scss";

// Game tips, render once enough
export default class Tips extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { props: { title, content } } = this;

    return (
      <div className={styles.tips}>
        <p className={styles.title}>{title}</p>
        <p className={styles.content}>{content}</p>
      </div>
    );
  }
}
