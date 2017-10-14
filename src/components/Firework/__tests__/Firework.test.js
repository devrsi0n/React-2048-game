import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Firework from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<Firework />", () => {
  it("component render", () => {
    const firework = renderer.create(<Firework />).toJSON();
    expect(firework).toMatchSnapshot();
  });

  it("shouldComponentUpdate", () => {
    const firework = shallow(<Firework />).instance();
    expect(firework.shouldComponentUpdate()).toBe(false);
  });
});
