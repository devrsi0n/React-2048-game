import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import styles from './board.scss';

export default class Board extends React.Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
  };

  // constructor(...props) {
  //   super(...props);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(nextState);
  }

  render() {
    const {
      props: { matrix },
    } = this;

    return (
      <table className={styles.board}>
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
}
