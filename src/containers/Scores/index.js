import { connect } from "react-redux";
import Scores from "./Scores";

const mapStateToProps = state => ({
  score: state.present.board.present.score,
  bestScore: state.present.board.present.bestScore
});

export default connect(mapStateToProps)(Scores);
