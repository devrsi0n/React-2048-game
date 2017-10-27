import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store';
import App from '..';

Enzyme.configure({ adapter: new Adapter() });

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('<MobileApp />', () => {
  it('component render', () => {
    const app = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(app).toMatchSnapshot();
  });

  it('unmount', () => {
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    window.dispatchEvent(new Event('resize'));
    window.innerWidth = 300;
    window.dispatchEvent(new Event('resize'));
    app.unmount();
  });
});
