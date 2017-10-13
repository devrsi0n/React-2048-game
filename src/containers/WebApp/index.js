import { connect } from "react-redux";
import WebApp from "./WebApp";

const mapStateToProps = state => ({
  matrix: state.present.board.present.matrix
});

export default connect(mapStateToProps)(WebApp);
