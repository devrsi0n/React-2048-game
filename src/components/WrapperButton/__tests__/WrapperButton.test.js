import React from 'react';
import renderer from 'react-test-renderer';
import WrapperButton from '..';

describe('<WrapperButton />', () => {
  it('component render', () => {
    const btn = renderer.create(
      <WrapperButton>
        <p>test</p>
      </WrapperButton>,
    ).toJSON();
    expect(btn).toMatchSnapshot();
  });
});
