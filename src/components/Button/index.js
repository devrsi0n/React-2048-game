import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.scss';

export default function Button({ children, arrow, onClick }) {
  /* eslint-disable jsx-a11y/href-no-hash */
  return (
    <a className={styles.button} onClick={onClick} href="#">
      {
        arrow
          ? <em className={styles[`arrow-${arrow}`]} />
          : ''
      }
      { children }
    </a>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
  ]),
  arrow: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
    '',
  ]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: '',
  arrow: '',
  onClick() {},
};
