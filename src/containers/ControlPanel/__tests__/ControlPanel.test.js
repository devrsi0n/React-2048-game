import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../store";
import ControlPanel from "..";

Enzyme.configure({ adapter: new Adapter() });

const audio = new Audio();

describe("<ControlPanel />", () => {
  it("component render", () => {
    const panel = renderer.create(
      <Provider store={store}>
        <ControlPanel delay={1} audioMove={audio} audioPopup={audio} />
      </Provider>
    );
    expect(panel.toJSON()).toMatchSnapshot();
  });

  it("click events", () => {
    const panel = mount(
      <Provider store={store}>
        <ControlPanel delay={1} audioMove={audio} audioPopup={audio} />
      </Provider>,
      { attachTo: document.body }
    );
    panel.find('[alt="arrow up"]').simulate("click");
    document.body.dispatchEvent(new Event("focus"));
    document.body.dispatchEvent(new KeyboardEvent("keypress", { key: "w" }));
  });
});
