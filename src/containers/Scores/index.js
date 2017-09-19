import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './scores.scss';
import i18n from '../../utils/i18n';

function Title({ score, bestScore }) {
  const { index, text, best } = styles;
  return (
    <div className={index}>
      <h2 className={styles.score}>
        <p className={text}>{i18n.score}</p>
        <p>
          {score}
        </p>
      </h2>
      <h2 className={`${styles.score} ${best}`}>
        <p className={text}>{i18n.best}</p>
        <p>
          { bestScore }
        </p>
      </h2>
    </div>
  );
}

Title.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  score: state.board.score,
  bestScore: state.board.bestScore,
});

export default connect(mapStateToProps)(Title);
