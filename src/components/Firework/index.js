import React from "react";
// import PropTypes from 'prop-types';
import "./firework.scss";

// Display firework animation when game over
export default class Firework extends React.Component {
  // Render once, as no props and state
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="firework">
        <div className="before" />
        <div className="after" />
      </div>
    );
  }
}
