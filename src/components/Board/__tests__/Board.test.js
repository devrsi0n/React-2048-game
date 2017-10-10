import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from "..";

Enzyme.configure({ adapter: new Adapter() });

const MATRIX = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 4, 0], [0, 0, 0, 0]];

describe("<Board />", () => {
  it("component render", () => {
    const board = renderer.create(<Board matrix={MATRIX} />).toJSON();
    expect(board).toMatchSnapshot();
  });

  it("shouldComponentUpdate", () => {
    const speaker = mount(<Board matrix={MATRIX} />);
    expect(speaker.props().matrix).toEqual(MATRIX);
    let shouldUpdate = speaker.instance().shouldComponentUpdate(
      {
        matrix: MATRIX
      },
      null
    );
    expect(shouldUpdate).toBe(false);
    shouldUpdate = speaker.instance().shouldComponentUpdate(
      {
        matrix: [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 4, 0], [0, 0, 0, 0]]
      },
      null
    );
    expect(shouldUpdate).toBe(true);
  });
});
