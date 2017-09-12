import React from 'react';
import renderer from 'react-test-renderer';
import Board from '..';

const MATRIX = [
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 4, 0],
  [0, 0, 0, 0],
];

describe('<Board />', () => {
  it('component render', () => {
    const board = renderer.create(
      <Board matrix={MATRIX} />,
    ).toJSON();
    expect(board).toMatchSnapshot();
  });
});
