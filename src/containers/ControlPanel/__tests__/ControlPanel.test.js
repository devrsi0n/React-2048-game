import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import ControlPanel from "../ControlPanel";

Enzyme.configure({ adapter: new Adapter() });
const audio = new Audio();

describe("<ControlPanel />", () => {
  it("component render", () => {
    const fn = () => {};
    const panel = renderer.create(
      <ControlPanel
        delay={1}
        onMoveUp={fn}
        onMoveDown={fn}
        onMoveLeft={fn}
        onMoveRight={fn}
        onPlaceRandom={fn}
        onReset={fn}
        onUndo={fn}
        isMoved={false}
        pastLen={1}
        audioMove={audio}
        audioPopup={audio}
      />
    );
    expect(panel.toJSON()).toMatchSnapshot();
  });

  it("click and keyboard events", () => {
    const moveUp = jest.fn();
    const moveDown = jest.fn();
    const moveLeft = jest.fn();
    const moveRight = jest.fn();
    const placeRandom = jest.fn();
    const reset = jest.fn();
    const undo = jest.fn();
    const div = document.createElement("div");
    const panel = mount(
      <ControlPanel
        delay={0}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onPlaceRandom={placeRandom}
        onReset={reset}
        onUndo={undo}
        isMoved
        pastLen={4}
        audioMove={audio}
        audioPopup={audio}
      />,
      { attachTo: div }
    );
    div.dispatchEvent(new Event("focus"));
    // div.dispatchEvent(new KeyboardEvent("keypress", { key: "ArrowUp" }));
    panel.find('[alt="arrow up"]').simulate("click");
    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(moveUp.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(1);

    panel.find('[alt="arrow down"]').simulate("click");
    jest.runAllTimers();
    expect(moveDown.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(2);

    panel.find('[alt="arrow left"]').simulate("click");
    jest.runAllTimers();
    expect(moveLeft.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(3);

    panel.find('[alt="arrow right"]').simulate("click");
    jest.runAllTimers();
    expect(moveRight.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(4);

    const ins = panel.instance();

    panel.find('[alt="undo"]').simulate("click");
    jest.runAllTimers();
    expect(undo.mock.calls.length).toBe(1);
    // Expect first call first argument to be -2
    expect(undo.mock.calls[0][0]).toBe(-2);
    panel.setProps({ pastLen: 1 });
    panel.find('[alt="undo"]').simulate("click");
    expect(undo.mock.calls.length).toBe(1);

    ins.handleSpeakerClick(false);
    expect(ins.state.speakerOn).toBe(false);

    ins.handleKeyUp({ keyCode: 1 });
    const preventDefault = jest.fn();
    ins.keyDownHandler({ keyCode: 1 });
    ins.keyDownHandler({ keyCode: 38, preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);

    panel.find('[alt="reset"]').simulate("click");
    jest.runAllTimers();
    expect(reset.mock.calls.length).toBe(1);

    ins.handleKeyUp({ keyCode: 78 });
    jest.runAllTimers();
    expect(reset.mock.calls.length).toBe(2);

    ins.handleKeyUp({ keyCode: 38 });
    ins.handleKeyUp({ keyCode: 87 });
    jest.runAllTimers();
    expect(moveUp.mock.calls.length).toBe(3);
    expect(placeRandom.mock.calls.length).toBe(6);

    ins.handleKeyUp({ keyCode: 39 });
    ins.handleKeyUp({ keyCode: 68 });
    jest.runAllTimers();
    expect(moveRight.mock.calls.length).toBe(3);
    expect(placeRandom.mock.calls.length).toBe(8);

    ins.handleKeyUp({ keyCode: 40 });
    ins.handleKeyUp({ keyCode: 83 });
    jest.runAllTimers();
    expect(moveDown.mock.calls.length).toBe(3);
    expect(placeRandom.mock.calls.length).toBe(10);

    ins.handleKeyUp({ keyCode: 37 });
    ins.handleKeyUp({ keyCode: 65 });
    jest.runAllTimers();
    expect(moveLeft.mock.calls.length).toBe(3);
    expect(placeRandom.mock.calls.length).toBe(12);
  });
});
