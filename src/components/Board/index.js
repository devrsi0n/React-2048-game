import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import './Board.css';

export default function Board({ matrix }) {
  return (
    <table className="Board">
      <tbody>
        { /* eslint-disable react/no-array-index-key */ }
        {
          matrix.map((row, idx) => (
            <Row row={row} key={idx} />
          ))
        }
      </tbody>
    </table>
  );
}

Board.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
};
