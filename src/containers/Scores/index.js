import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './scores.scss';
import i18n from '../../utils/i18n';

function Scores({ score, bestScore }) {
  const { index, text, best } = styles;
  return (
    <div className={index}>
      <p className={styles.score}>
        {i18n.score}
        <p className={text}>
          {score}
        </p>
      </p>
      <p className={`${styles.score} ${best}`}>
        {i18n.best}
        <p className={text}>
          { bestScore }
        </p>
      </p>
    </div>
  );
}

Scores.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  score: state.board.score,
  bestScore: state.board.bestScore,
});

export default connect(mapStateToProps)(Scores);
