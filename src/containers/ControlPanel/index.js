import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import WrapperButton from './WrapperButton';
import Speaker from '../Speaker';
import styles from './controlPanel.scss';
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset,
  revert,
} from '../../reducers/board';
import resetSvg from '../../assets/svg/reset.svg';
import undoSvg from '../../assets/svg/undo.svg';
import arrowSvg from '../../assets/svg/arrow.svg';
import moveAudio from '../../assets/audio/move.mp3';
import popupAudio from '../../assets/audio/popup.mp3';

class ControlPanel extends Component {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    onMoveUp: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,
    onPlaceRandom: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onRevert: PropTypes.func.isRequired,
    isMoved: PropTypes.bool.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.audioMove = new Audio(moveAudio);
    this.audioPopup = new Audio(popupAudio);

    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSpeakerClick = this.handleSpeakerClick.bind(this);

    this.state = {
      speakerOn: true,
    };
  }

  componentWillMount() {
    const { delay } = this.props;
    document.body.addEventListener('keyup',
      debounce(this.handleKeyDown, delay, {
        leading: true,
      }));
  }

  handleKeyDown(e) {
    const keyUp = 38;
    const keyRight = 39;
    const keyDown = 40;
    const keyLeft = 37;
    const keyW = 87;
    const keyS = 83;
    const keyA = 65;
    const keyD = 68;
    const keyN = 78;

    switch (e.keyCode) {
      case keyW:
      case keyUp:
        this.handleMoveUp();
        break;
      case keyS:
      case keyDown:
        this.handleMoveDown();
        break;
      case keyA:
      case keyLeft:
        this.handleMoveLeft();
        break;
      case keyD:
      case keyRight:
        this.handleMoveRight();
        break;
      case keyN:
        this.props.onReset();
        break;
      default:
        break;
    }
  }

  handleSpeakerClick(speakerOn) {
    this.setState({
      speakerOn,
    });
  }

  generalMove(func) {
    func();
    const { isMoved } = this.props;
    const { speakerOn } = this.state;
    if (speakerOn && isMoved) {
      this.audioMove.play();
    }
    setTimeout(() => {
      this.props.onPlaceRandom();
      if (speakerOn && isMoved) {
        this.audioPopup.play();
      }
    }, 300);
  }

  handleMoveUp() {
    return this.generalMove(this.props.onMoveUp);
  }

  handleMoveDown() {
    this.generalMove(this.props.onMoveDown);
  }

  handleMoveLeft() {
    this.generalMove(this.props.onMoveLeft);
  }

  handleMoveRight() {
    this.generalMove(this.props.onMoveRight);
  }

  render() {
    const { delay } = this.props;
    return (
      <div className={styles.panel}>
        <div className={styles.rowBtn}>
          <div className={styles.btn}>
            <Speaker onClick={this.handleSpeakerClick} />
          </div>
          <WrapperButton onClick={debounce(this.props.onRevert, delay)} >
            <img src={undoSvg} alt="undo" />
          </WrapperButton>
          <WrapperButton onClick={debounce(this.props.onReset, delay)} >
            <img src={resetSvg} alt="reset" />
          </WrapperButton>
        </div>
        <WrapperButton type="primary" onClick={debounce(this.handleMoveUp, delay)} >
          <img src={arrowSvg} className={styles.up} alt="arrow up" />
        </WrapperButton>
        <div className={styles.arrows} >
          <WrapperButton type="primary" onClick={debounce(this.handleMoveLeft, delay)} >
            <img src={arrowSvg} className={styles.left} alt="arrow left" />
          </WrapperButton>
          <WrapperButton type="primary" onClick={debounce(this.handleMoveDown, delay)} >
            <img src={arrowSvg} className={styles.down} alt="arrow down" />
          </WrapperButton>
          <WrapperButton type="primary" onClick={debounce(this.handleMoveRight, delay)} >
            <img src={arrowSvg} className={styles.right} alt="arrow right" />
          </WrapperButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isMoved: state.board.isMoved,
});
const mapDispatchToProps = dispatch => ({
  onPlaceRandom() {
    dispatch(placeRandom());
  },
  onMoveUp() {
    dispatch(moveUp());
  },
  onMoveDown() {
    dispatch(moveDown());
  },
  onMoveLeft() {
    dispatch(moveLeft());
  },
  onMoveRight() {
    dispatch(moveRight());
  },
  onReset() {
    dispatch(reset());
  },
  onRevert() {
    dispatch(revert());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
