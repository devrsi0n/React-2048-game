import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cell from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<Board />", () => {
  it("component render", () => {
    let cell = renderer.create(<Cell value={32} />).toJSON();
    expect(cell).toMatchSnapshot();

    cell = renderer.create(<Cell value={2048} />).toJSON();
    expect(cell).toMatchSnapshot();
  });

  it("shouldComponentUpdate", () => {
    const tr = document.createElement("tr");
    const cell = mount(<Cell value={32} />, {
      attachTo: tr
    });
    expect(cell.props().value).toEqual(32);
    let shouldUpdate = cell.instance().shouldComponentUpdate(
      {
        value: 32
      },
      null
    );
    expect(shouldUpdate).toBe(false);
    shouldUpdate = cell.instance().shouldComponentUpdate(
      {
        value: 233
      },
      null
    );
    expect(shouldUpdate).toBe(true);
  });
});
