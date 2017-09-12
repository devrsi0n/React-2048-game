import React from 'react';
import renderer from 'react-test-renderer';
import Row from '..';

describe('<Board />', () => {
  it('component render', () => {
    const MATRIX = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ];
    MATRIX.forEach((r) => {
      const row = renderer.create(
        <Row row={r} />,
      ).toJSON();
      expect(row).toMatchSnapshot();
    });
  });
});
