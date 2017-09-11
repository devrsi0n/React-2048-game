import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './cell.scss';

export default function Cell({ value }) {
  const color = `color-${value}`;
  return (
    <td>
      <div className={classnames([styles.cell, { [styles[color]]: !!value }])}>
        <div className={styles.number}>
          { value || null }
        </div>
      </div>
    </td>
  );
}

Cell.propTypes = {
  value: PropTypes.number.isRequired,
};
