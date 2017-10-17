import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  placeRandom,
  reset
} from "../../reducers/board";
import MobileApp from "./MobileApp";

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix,
  isMoved: state.present.board.present.isMoved,
  pastLen: state.past.length,
  score: state.present.board.present.score,
  bestScore: state.present.board.present.bestScore,
  gameOver: state.present.board.present.gameOver
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
