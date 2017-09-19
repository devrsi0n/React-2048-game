import React from 'react';
import renderer from 'react-test-renderer';
import Tips from '..';

describe('<Tips />', () => {
  it('component render', () => {
    let tips = renderer.create(
      <Tips>
        test
      </Tips>,
    ).toJSON();
    tips = renderer.create(
      <Tips>
        <p>hello <span>world</span></p>
      </Tips>,
    ).toJSON();
    expect(tips).toMatchSnapshot();
  });
});
