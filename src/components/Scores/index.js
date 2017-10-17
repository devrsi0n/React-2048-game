import React from "react";
import PropTypes from "prop-types";
import styles from "./scores.scss";
import i18n from "../../utils/i18n";

export default function Scores({ score, bestScore }) {
  const { index, text, best } = styles;
  return (
    <div className={index}>
      <p className={styles.score}>
        {i18n.score}
        <em className={text}>{score}</em>
      </p>
      <p className={`${styles.score} ${best}`}>
        {i18n.best}
        <em className={text}>{bestScore}</em>
      </p>
    </div>
  );
}

Scores.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired
};
