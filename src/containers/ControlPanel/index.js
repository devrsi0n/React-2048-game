import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset
} from '../../reducers/board';
import ControlPanel from './ControlPanel';

const mapStateToProps = state => ({
  isMoved: state.present.board.present.isMoved,
  pastLen: state.past.length
});
const mapDispatchToProps = {
  onPlaceRandom: placeRandom,
  onMoveUp: moveUp,
  onMoveDown: moveDown,
  onMoveLeft: moveLeft,
  onMoveRight: moveRight,
  onReset: reset,
  onUndo: ActionCreators.jump // Undo move and generated cell
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
