import { connect } from 'react-redux';
import { reset } from '../../reducers/board';
import WebApp from './WebApp';

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix,
  score: state.present.board.present.score,
  bestScore: state.present.board.present.bestScore,
  gameOver: state.present.board.present.gameOver
});

const mapDispatchToProps = {
  onReset: reset
};

export default connect(mapStateToProps, mapDispatchToProps)(WebApp);
