import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './cell.scss';

export default class Cell extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(nextState);
  }

  render() {
    const {
      props: { value },
    } = this;

    const color = `color-${value}`;
    return (
      <td>
        <div className={classnames([styles.cell, { [styles[color]]: !!value }])}>
          <div className={styles.number}>
            { value || null }
          </div>
        </div>
      </td>
    );
  }
}
