import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.scss';

const capital = str => str.charAt(0).toUpperCase() + str.slice(1);

export default function Button({ children, onClick, type, size }) {
  const { btnFlat } = styles;
  const sizeCls = styles[`btn${capital(size)}`];
  const typeCls = styles[`btn${capital(type)}`];
  return (
    <button className={`${btnFlat} ${sizeCls} ${typeCls}`} onClick={onClick}>
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'lg',
    'md',
    'sm',
    'xs',
  ]),
  type: PropTypes.oneOf([
    'default',
    'primary',
    'warn',
    'danger',
    'success',
    'royal',
  ]),
};

Button.defaultProps = {
  children: '',
  onClick() {},
  size: 'md',
  type: 'default',
};
