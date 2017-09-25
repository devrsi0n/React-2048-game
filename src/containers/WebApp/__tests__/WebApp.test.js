import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import WebApp from '..';
import store from '../../../store';
// import move from '../../../assets/audio/move.mp3';

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

const audio = new Audio();
describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store} >
        <WebApp audioMove={audio} audioPopup={audio} />
      </Provider>, div);
  });

  it('component render', () => {
    const webApp = renderer.create(
      <Provider store={store} >
        <WebApp audioMove={audio} audioPopup={audio} />
      </Provider>,
    ).toJSON();
    expect(webApp).toMatchSnapshot();
  });
});

