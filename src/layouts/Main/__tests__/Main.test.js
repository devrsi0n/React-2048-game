import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import Main from '..';
import store from '../../../store';

// Make random always return 0.5, so snapshot always same.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

// Ignore gitment error message
console.error = () => {};

describe('<Main />', () => {
  it('component render', () => {
    const main = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(main).toMatchSnapshot();
  });
});
