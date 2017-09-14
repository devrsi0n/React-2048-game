import React from 'react';
import renderer from 'react-test-renderer';
import Firework from '..';

describe('<Firework />', () => {
  it('component render', () => {
    const firework = renderer.create(
      <Firework />,
    ).toJSON();
    expect(firework).toMatchSnapshot();
  });
});
