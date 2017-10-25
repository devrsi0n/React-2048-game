import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Ranking extends Component {
  static propTypes = {
    onGetRankingList: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.onGetRankingList();
  }

  render() {
    return <div>Working on it.</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  onGetRankingList: () => dispatch({ type: "GET_RANKLING_LIST" })
});

export default connect(null, mapDispatchToProps)(Ranking);
