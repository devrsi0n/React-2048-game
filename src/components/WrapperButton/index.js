import React from 'react';
import PropTypes from 'prop-types';
import styles from './wrapperButton.scss';
import Button from '../../components/Button';

// Add a wrapper css class for `Button`
export default function WrapperButton({ children, cls, onClick, ...props }) {
  return (
    <div className={`${styles.btn} ${cls}`}>
      {/* Pass down external props */}
      <Button onClick={onClick} {...props}>
        {children}
      </Button>
    </div>
  );
}

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  cls: PropTypes.string
};

WrapperButton.defaultProps = {
  onClick() {},
  cls: ''
};
