import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tips from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<Tips />", () => {
  it("component render", () => {
    let tips = renderer.create(<Tips title="test" content="hello" />).toJSON();
    tips = renderer.create(<Tips title="hello" content="world" />).toJSON();
    expect(tips).toMatchSnapshot();
  });

  it("shouldComponentUpdate", () => {
    const tips = shallow(<Tips title="Tips" content="content..." />).instance();
    expect(tips.shouldComponentUpdate()).toBe(false);
  });
});
