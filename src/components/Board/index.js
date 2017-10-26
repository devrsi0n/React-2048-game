import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import styles from './board.scss';
import { isObjEqual } from '../../utils/helpers';

// Game board
export default class Board extends React.Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isObjEqual(nextProps, this.props) || !isObjEqual(nextState, this.state)
    );
  }

  render() {
    const { props: { matrix } } = this;

    return (
      <table className={styles.board}>
        <tbody>
          {/* eslint-disable react/no-array-index-key */}
          {matrix.map((row, idx) => <Row row={row} key={idx} />)}
        </tbody>
      </table>
    );
  }
}
