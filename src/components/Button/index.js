import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button({ children, onClick, type, size }) {
  const sizeCls = `btn-${size}`;
  const typeCls = `btn-${type}`;
  return (
    <button className={`btn-flat ${sizeCls} ${typeCls}`} onClick={onClick}>
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
