import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createMockStore } from "redux-test-utils";
import store from "../../../store";
import Container from "..";

Enzyme.configure({ adapter: new Adapter() });
const audio = new Audio();

const mountWithStore = (Component, reduxStore) => {
  const context = {
    store: reduxStore
  };
  return mount(Component, { context });
};

describe("<MobileApp />", () => {
  it("component render", () => {
    const app = renderer
      .create(
        <Provider store={store}>
          <Container audioMove={audio} audioPopup={audio} />
        </Provider>
      )
      .toJSON();
    expect(app).toMatchSnapshot();
  });

  it("component instance", () => {
    const reduxStore = createMockStore({
      past: [
        {
          board: {
            past: [],
            present: {
              matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
              score: 0,
              bestScore: 0,
              gameOver: false,
              isMoved: true
            },
            future: [],
            group: null,
            _latestUnfiltered: {
              matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
              score: 0,
              bestScore: 0,
              gameOver: false,
              isMoved: true
            },
            index: 0,
            limit: 1
          }
        }
      ],
      present: {
        board: {
          past: [
            {
              matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
              score: 0,
              bestScore: 0,
              gameOver: false,
              isMoved: true
            }
          ],
          present: {
            matrix: [[0, 4, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            score: 0,
            bestScore: 0,
            gameOver: false,
            isMoved: true
          },
          future: [],
          group: null,
          _latestUnfiltered: {
            matrix: [[0, 4, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            score: 0,
            bestScore: 0,
            gameOver: false,
            isMoved: true
          },
          index: 1,
          limit: 2
        }
      },
      future: [],
      group: null,
      _latestUnfiltered: {
        board: {
          past: [
            {
              matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
              score: 0,
              bestScore: 0,
              gameOver: false,
              isMoved: true
            }
          ],
          present: {
            matrix: [[0, 4, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            score: 0,
            bestScore: 0,
            gameOver: false,
            isMoved: true
          },
          future: [],
          group: null,
          _latestUnfiltered: {
            matrix: [[0, 4, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            score: 0,
            bestScore: 0,
            gameOver: false,
            isMoved: true
          },
          index: 1,
          limit: 2
        }
      },
      index: 1,
      limit: 2
    });
    const mobileApp = mountWithStore(
      <Container audioMove={audio} audioPopup={audio} />,
      reduxStore
    );
    // console.log(mobileApp.debug());
    const div = mobileApp.find("#gameBoard");
    jest.runAllTimers();
    div.simulate("touchstart", {
      changedTouches: [{ pageX: 100, pageY: 100 }],
      preventDefault() {}
    });
    div.simulate("touchmove", {
      preventDefault() {}
    });
    div.simulate("touchend", {
      changedTouches: [{ pageX: 0, pageY: 100 }],
      preventDefault() {}
    });
  });
});
