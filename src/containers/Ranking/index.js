import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Rank extends Component {
  static propTypes = {
    onGetRankingList: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.onGetRankingList();
  }

  render() {
    return <h1>Working on it.</h1>;
  }
}

const mapDispatchToProps = dispatch => ({
  onGetRankingList: () => dispatch({ type: "GET_RANKLING_LIST" })
});

export default connect(null, mapDispatchToProps)(Rank);
