import React from "react";
import PropTypes from "prop-types";
import styles from "./footer.scss";
import github from "../../assets/images/github.png";

export default function Footer({ name, repoUrl, profileUrl }) {
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

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired
};
