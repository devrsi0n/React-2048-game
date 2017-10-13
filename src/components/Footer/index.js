import React from "react";
import PropTypes from "prop-types";
import styles from "./footer.scss";
import github from "../../assets/images/github.png";

export default class Footer extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    repoUrl: PropTypes.string.isRequired,
    profileUrl: PropTypes.string.isRequired
  };

  // Render once, no update
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { props: { name, repoUrl, profileUrl } } = this;

    return (
      <div className={styles.footer}>
        <a href={repoUrl} className={styles.icon}>
          <img src={github} className={styles.github} alt="github repo" />
        </a>
        Build with
        <span className={styles.heart}>♥</span>
        by
        <a href={profileUrl} className={styles.link}>
          {name}
        </a>
      </div>
    );
  }
}
