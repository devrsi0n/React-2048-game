localStorage.setItem(
  "state",
  '{"past":[{"board":{"past":[],"present":{"matrix":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"future":[],"group":null,"_latestUnfiltered":{"matrix":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"index":0,"limit":1}}],"present":{"board":{"past":[{"matrix":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true}],"present":{"matrix":[[0,4,0,0],[0,2,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"future":[],"group":null,"_latestUnfiltered":{"matrix":[[0,4,0,0],[0,2,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"index":1,"limit":2}},"future":[],"group":null,"_latestUnfiltered":{"board":{"past":[{"matrix":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true}],"present":{"matrix":[[0,4,0,0],[0,2,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"future":[],"group":null,"_latestUnfiltered":{"matrix":[[0,4,0,0],[0,2,0,0],[0,0,0,0],[0,0,0,0]],"score":0,"bestScore":0,"gameOver":false,"isMoved":true},"index":1,"limit":2}},"index":1,"limit":2}'
);

/* eslint-disable import/first */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import WebApp from "..";
import store from "../../../store";
// import move from '../../../assets/audio/move.mp3';

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

// Ignore gitment error message
console.error = () => {};

const audio = new Audio();
describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <WebApp audioMove={audio} audioPopup={audio} />
      </Provider>,
      div
    );
  });

  it("component render", () => {
    const webApp = renderer
      .create(
        <Provider store={store}>
          <WebApp audioMove={audio} audioPopup={audio} />
        </Provider>
      )
      .toJSON();
    expect(webApp).toMatchSnapshot();
  });
});
