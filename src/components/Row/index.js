import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';

export default function Row({ row }) {
  return (
    <tr>
      { /* eslint-disable react/no-array-index-key */ }
      {
        row.map((num, idx) => (
          <Cell value={num} key={idx} />
        ))
      }
    </tr>
  );
}

Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
};
