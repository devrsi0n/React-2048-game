import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameOver from "..";
import store from "../../../store";

Enzyme.configure({ adapter: new Adapter() });

describe("<GameOver />", () => {
  it("component render", () => {
    let gameover = renderer
      .create(
        <Provider store={store}>
          <GameOver />
        </Provider>
      )
      .toJSON();
    expect(gameover).toMatchSnapshot();
    store.getState().present.board.present.score = 9999;
    gameover = renderer
      .create(
        <Provider store={store}>
          <GameOver />
        </Provider>
      )
      .toJSON();
    expect(gameover).toMatchSnapshot();
  });

  it("mount", () => {
    const gameover = mount(
      <Provider store={store}>
        <GameOver />
      </Provider>
    );
    gameover.find("[alt='reset']").simulate("click");
  });
});
