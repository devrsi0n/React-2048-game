import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../store";
import MobileApp from "..";

const audio = new Audio();

describe("<MobileApp />", () => {
  it("component render", () => {
    const app = renderer
      .create(
        <Provider store={store}>
          <MobileApp audioMove={audio} audioPopup={audio} />
        </Provider>
      )
      .toJSON();
    expect(app).toMatchSnapshot();
  });
});
