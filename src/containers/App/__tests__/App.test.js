import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import App from '..';
import store from '../../../store';

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store} >
        <App />
      </Provider>, div);
  });

  it('component render', () => {
    const app = renderer.create(
      <Provider store={store} >
        <App />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

