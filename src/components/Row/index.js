import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';

export default class Row extends React.Component {
  static propTypes = {
    row: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(nextState);
  }

  render() {
    const {
      props: { row },
    } = this;

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
}
