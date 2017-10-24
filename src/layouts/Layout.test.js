import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../store";
import Layout from "./index";

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

// Ignore gitment error message
console.error = () => {};

describe("<Layout />", () => {
  it("component render", () => {
    const layout = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Layout />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(layout).toMatchSnapshot();
  });
});
