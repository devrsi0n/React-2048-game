import React from 'react';
import renderer from 'react-test-renderer';
import Speaker from '..';

describe('<Speaker />', () => {
  it('component render', () => {
    const speaker = renderer.create(
      <Speaker onClick={() => {}} />,
    ).toJSON();
    expect(speaker).toMatchSnapshot();
  });
});
