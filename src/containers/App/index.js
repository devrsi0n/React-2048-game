import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  initMatrix,
} from '../../reducers/board';
import WebApp from '../WebApp';
import MobileApp from '../MobileApp';
import moveAudio from '../../assets/audio/move.mp3';
import popupAudio from '../../assets/audio/popup.mp3';

class App extends Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    onInit: PropTypes.func.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.state = {
      isMobile: window.innerWidth <= 768,
    };
    this.audioMove = new Audio(moveAudio);
    this.audioPopup = new Audio(popupAudio);
  }

  componentWillMount() {
    this.mobileDetect();
    this.boardInit();
  }

  boardInit() {
    let isEmpty = true;
    for (const row of this.props.matrix) {
      for (const cell of row) {
        if (cell > 0) {
          isEmpty = false;
          break;
        }
      }
    }
    if (isEmpty) {
      this.props.onInit();
    }
  }

  mobileDetect() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth <= 768,
      });
    });
  }

  render() {
    const { isMobile } = this.state;
    const { audioMove, audioPopup } = this;
    return (
      <div>
        {
          isMobile
            ? <MobileApp audioMove={audioMove} audioPopup={audioPopup} />
            : <WebApp audioMove={audioMove} audioPopup={audioPopup} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix,
});

const mapDispatchToProps = dispatch => ({
  onInit(board) {
    dispatch(initMatrix(board));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
