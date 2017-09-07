import React from 'react';
import PropTypes from 'prop-types';
import './cell.css';

export default function Cell({ value }) {
  const color = `color-${value}`;
  return (
    <td>
      <div className={`cell ${color}`}>
        <div className="number">
          { value || null }
        </div>
      </div>
    </td>
  );
}

Cell.propTypes = {
  value: PropTypes.number.isRequired,
};
