import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameOver from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<GameOver />", () => {
  it("component render", () => {
    const fn = () => {};
    let gameover = renderer
      .create(<GameOver score={123} gameOver={false} onReset={fn} />)
      .toJSON();
    expect(gameover).toMatchSnapshot();
    gameover = renderer
      .create(<GameOver score={9999} gameOver onReset={fn} />)
      .toJSON();
    expect(gameover).toMatchSnapshot();
  });

  it("mount", () => {
    const fn = jest.fn();
    const gameover = mount(
      <GameOver score={123} gameOver={false} onReset={fn} />
    );
    gameover.find("[alt='reset']").simulate("click");
    expect(fn.mock.calls.length).toBe(1);
  });
});
