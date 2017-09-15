import React from 'react';
import PropTypes from 'prop-types';
import styles from './controlPanel.scss';
import Button from '../../components/Button';

export default function WrapperButton({ children, onClick, ...props }) {
  return (
    <div className={styles.btn} >
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
  onClick: PropTypes.func.isRequired,
};
