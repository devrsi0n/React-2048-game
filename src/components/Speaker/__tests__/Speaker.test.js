import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Speaker from "..";

Enzyme.configure({ adapter: new Adapter() });

describe("<Speaker />", () => {
  it("component render", () => {
    const speaker = renderer.create(<Speaker onClick={() => {}} />).toJSON();
    expect(speaker).toMatchSnapshot();
  });

  it("click event", () => {
    const spy = jest.fn();
    const speaker = mount(<Speaker onClick={spy} />);
    speaker.find('[alt="speaker"]').simulate("click");
    expect(spy.mock.calls.length).toBe(1);
    speaker.find('[alt="speaker"]').simulate("click");
    expect(spy.mock.calls.length).toBe(2);
  });
});
