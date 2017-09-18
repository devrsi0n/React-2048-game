import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../../store';
import Scores from '..';

describe('<Scores />', () => {
  it('component render', () => {
    const scores = renderer.create(
      <Provider store={store}>
        <Scores score={1234} bestScore={4321} />
      </Provider>,
    ).toJSON();
    expect(scores).toMatchSnapshot();
  });
});
