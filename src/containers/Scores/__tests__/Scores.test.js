import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../store";
import Scores from "..";

describe("<Scores />", () => {
  it("component render", () => {
    const scores = renderer
      .create(
        <Provider store={store}>
          <Scores />
        </Provider>
      )
      .toJSON();
    expect(scores).toMatchSnapshot();
  });
});
