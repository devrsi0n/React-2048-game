import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import WrapperButton from "../../components/WrapperButton";
import Speaker from "../../components/Speaker";
import styles from "./controlPanel.scss";
import resetSvg from "../../assets/svg/reset.svg";
import undoSvg from "../../assets/svg/undo.svg";
import arrowSvg from "../../assets/svg/arrow.svg";

const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyLeft = 37;
const keyW = 87;
const keyS = 83;
const keyA = 65;
const keyD = 68;
const keyN = 78;
// const keySpace = 32;

// Button and keyboard control panel
export default class ControlPanel extends Component {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    onMoveUp: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMoveLeft: PropTypes.func.isRequired,
    onMoveRight: PropTypes.func.isRequired,
    onPlaceRandom: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    isMoved: PropTypes.bool.isRequired,
    pastLen: PropTypes.number.isRequired,
    audioMove: PropTypes.instanceOf(Audio).isRequired,
    audioPopup: PropTypes.instanceOf(Audio).isRequired
  };

  constructor(...args) {
    super(...args);

    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSpeakerClick = this.handleSpeakerClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);

    this.state = {
      speakerOn: true
    };

    const { delay } = this.props;
    this.keyUpHandler = debounce(this.handleKeyUp, delay, {
      leading: true
    });
    this.keyDownHandler = e => {
      switch (e.keyCode) {
        case keyUp:
        case keyDown:
        case keyLeft:
        case keyRight:
          // case keySpace:
          e.preventDefault();
          break;
        default:
          break;
      }
    };
  }

  componentWillMount() {
    document.addEventListener("keyup", this.keyUpHandler, false);

    // Disable arrow keys scroll page
    document.addEventListener("keydown", this.keyDownHandler, false);
  }

  componentWillUnmount() {
    // Never forget remove event after component unmounted,
    // avoid memory leak
    document.removeEventListener("keyup", this.keyUpHandler, false);
    document.removeEventListener("keydown", this.keyDownHandler, false);
  }

  handleKeyUp(e) {
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
      speakerOn
    });
  }

  generalMove(func) {
    func();
    const { isMoved } = this.props;
    const { speakerOn } = this.state;
    if (speakerOn && isMoved) {
      this.props.audioMove.play();
    }
    // Popup new number after delay a short time
    setTimeout(() => {
      this.props.onPlaceRandom();
      if (speakerOn && isMoved) {
        this.props.audioPopup.play();
      }
    }, 300);
  }

  handleMoveUp() {
    this.generalMove(this.props.onMoveUp);
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

  handleUndo() {
    if (this.props.pastLen > 3) {
      this.props.onUndo(-2);
    }
  }

  render() {
    const { delay } = this.props;
    return (
      <div className={styles.panel}>
        <div className={styles.rowBtn}>
          <div className={styles.btn}>
            <Speaker onClick={debounce(this.handleSpeakerClick, delay)} />
          </div>
          <WrapperButton onClick={debounce(this.handleUndo, delay)}>
            <img src={undoSvg} alt="undo" />
          </WrapperButton>
          <WrapperButton onClick={debounce(this.props.onReset, delay)}>
            <img src={resetSvg} alt="reset" />
          </WrapperButton>
        </div>
        <WrapperButton
          type="primary"
          onClick={debounce(this.handleMoveUp, delay)}
        >
          <img src={arrowSvg} className={styles.up} alt="arrow up" />
        </WrapperButton>
        <div className={styles.arrows}>
          <WrapperButton
            type="primary"
            onClick={debounce(this.handleMoveLeft, delay)}
          >
            <img src={arrowSvg} className={styles.left} alt="arrow left" />
          </WrapperButton>
          <WrapperButton
            type="primary"
            onClick={debounce(this.handleMoveDown, delay)}
          >
            <img src={arrowSvg} className={styles.down} alt="arrow down" />
          </WrapperButton>
          <WrapperButton
            type="primary"
            onClick={debounce(this.handleMoveRight, delay)}
          >
            <img src={arrowSvg} className={styles.right} alt="arrow right" />
          </WrapperButton>
        </div>
      </div>
    );
  }
}
