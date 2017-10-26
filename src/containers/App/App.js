import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebApp from '../WebApp';
import MobileApp from '../MobileApp';
import moveAudio from '../../assets/audio/move.mp3';
import popupAudio from '../../assets/audio/popup.mp3';
import i18n from '../../utils/i18n';

// Application entry
export default class App extends Component {
  static propTypes = {
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    onInit: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);

    this.state = {
      isMobile: window.innerWidth <= 768
    };
    // Control game audio
    this.audioMove = new Audio(moveAudio);
    this.audioPopup = new Audio(popupAudio);
  }

  componentWillMount() {
    window.addEventListener('resize', this.mobileDetect, false);
    this.boardInit();
  }

  componentDidMount() {
    document.title = i18n.title;
  }

  componentWillUnmount() {
    // Never forget remove event after component unmounted,
    // avoid memory leak
    window.removeEventListener('resize', this.mobileDetect, false);
  }

  mobileDetect = () => {
    this.setState({
      isMobile: window.innerWidth <= 768
    });
  };

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
    // Init empty matrix(add 2 random number to matrix)
    if (isEmpty) {
      this.props.onInit();
    }
  }

  render() {
    const { isMobile } = this.state;
    const { audioMove, audioPopup } = this;
    return (
      <div>
        {isMobile ? (
          <MobileApp audioMove={audioMove} audioPopup={audioPopup} />
        ) : (
          <WebApp audioMove={audioMove} audioPopup={audioPopup} />
        )}
      </div>
    );
  }
}
