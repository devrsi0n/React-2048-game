import React from 'react';
import renderer from 'react-test-renderer';
import Comments from '..';

// Ignore gitment error message
console.error = () => {};

describe('<Comments />', () => {
  it('component render', () => {
    const comments = renderer.create(<Comments />).toJSON();
    expect(comments).toMatchSnapshot();
  });
});
