import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store';
import Container from '..';
import MobileApp from '../MobileApp';

Enzyme.configure({ adapter: new Adapter() });
const audio = new Audio();

describe('<MobileApp />', () => {
  it('component render', () => {
    const app = renderer
      .create(
        <Provider store={store}>
          <Container audioMove={audio} audioPopup={audio} />
        </Provider>
      )
      .toJSON();
    expect(app).toMatchSnapshot();
  });

  it('component instance', () => {
    const matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const moveUp = jest.fn();
    const moveDown = jest.fn();
    const moveLeft = jest.fn();
    const moveRight = jest.fn();
    const placeRandom = jest.fn();
    const reset = jest.fn();
    const undo = jest.fn();
    const mobileApp = mount(
      <MobileApp
        matrix={matrix}
        audioMove={audio}
        audioPopup={audio}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onPlaceRandom={placeRandom}
        onReset={reset}
        onUndo={undo}
        isMoved
        pastLen={4}
      />
    );
    const ins = mobileApp.instance();
    ins.directionCallback();
    ins.directionCallback('up');
    jest.runAllTimers();
    expect(moveUp.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(1);

    ins.directionCallback('down');
    jest.runAllTimers();
    expect(moveDown.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(2);

    ins.directionCallback('left');
    jest.runAllTimers();
    expect(moveLeft.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(3);

    ins.directionCallback('right');
    jest.runAllTimers();
    expect(moveRight.mock.calls.length).toBe(1);
    expect(placeRandom.mock.calls.length).toBe(4);

    ins.handleUndo();
    jest.runAllTimers();
    expect(undo.mock.calls.length).toBe(1);

    ins.handleSpeakerClick(false);
    expect(mobileApp.state('speakerOn')).toBe(false);

    ins.directionCallback('right');
    jest.runAllTimers();
    expect(moveRight.mock.calls.length).toBe(2);
    expect(placeRandom.mock.calls.length).toBe(5);

    mobileApp.setProps({
      pastLen: 2
    });
    ins.handleUndo();
    jest.runAllTimers();
    expect(undo.mock.calls.length).toBe(1);
  });
});
