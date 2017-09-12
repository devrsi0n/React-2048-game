import React from 'react';
import renderer from 'react-test-renderer';
import Cell from '..';

describe('<Board />', () => {
  it('component render', () => {
    let cell = renderer.create(
      <Cell value={32} />,
    ).toJSON();
    expect(cell).toMatchSnapshot();

    cell = renderer.create(
      <Cell value={2048} />,
    ).toJSON();
    expect(cell).toMatchSnapshot();
  });
});
