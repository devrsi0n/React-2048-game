import { connect } from "react-redux";
import { reset } from "../../reducers/board";
import GameOver from "./GameOver";

const mapStateToProps = state => ({
  score: state.present.board.present.score,
  gameOver: state.present.board.present.gameOver
});
const mapDispatchToProps = {
  onReset: reset
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
