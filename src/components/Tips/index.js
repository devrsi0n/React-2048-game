import React from 'react';
import PropTypes from 'prop-types';
import styles from './tips.scss';

export default function Tips({ title, content }) {
  return (
    <div className={styles.tips}>
      <p className={styles.title}>{ title }</p>
      <p className={styles.content}>{ content }</p>
    </div>
  );
}

Tips.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
