import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Row from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<Board />", () => {
  it("component render", () => {
    const MATRIX = [[2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 4, 0], [0, 0, 0, 0]];
    MATRIX.forEach(r => {
      const row = renderer.create(<Row row={r} />).toJSON();
      expect(row).toMatchSnapshot();
    });
  });

  it("shouldComponentUpdate", () => {
    const data = [2, 0, 0, 0];
    const cell = mount(<Row row={data} />);
    expect(cell.props().row).toEqual(data);
    let shouldUpdate = cell.instance().shouldComponentUpdate(
      {
        row: data
      },
      null
    );
    expect(shouldUpdate).toBe(false);
    shouldUpdate = cell.instance().shouldComponentUpdate(
      {
        value: [2, 4, 8, 16]
      },
      null
    );
    expect(shouldUpdate).toBe(true);
  });
});
