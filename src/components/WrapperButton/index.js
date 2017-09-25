import React from 'react';
import PropTypes from 'prop-types';
import styles from './wrapperButton.scss';
import Button from '../../components/Button';

export default function WrapperButton({ children, cls, onClick, ...props }) {
  return (
    <div className={`${styles.btn} ${cls}`} >
      <Button onClick={onClick} {...props}>
        {
          children
        }
      </Button>
    </div>
  );
}

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  cls: PropTypes.string,
};

WrapperButton.defaultProps = {
  onClick() {},
  cls: '',
};

