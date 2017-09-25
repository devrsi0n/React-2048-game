import React from 'react';
import renderer from 'react-test-renderer';
import Tips from '..';

describe('<Tips />', () => {
  it('component render', () => {
    let tips = renderer.create(
      <Tips title={'test'} content={'hello'} />,
    ).toJSON();
    tips = renderer.create(
      <Tips title={'hello'} content={'world'} />,
    ).toJSON();
    expect(tips).toMatchSnapshot();
  });
});
