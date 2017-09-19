import React from 'react';
import PropTypes from 'prop-types';
import styles from './tips.scss';

export default function Tips({ children }) {
  return (
    <div className={styles.tips}>
      {/* eslint-disable react/no-danger */}
      <p className={styles.content} dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}

Tips.propTypes = {
  children: PropTypes.node.isRequired,
};
