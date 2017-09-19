import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '..';

describe('<Footer />', () => {
  it('component render', () => {
    const footer = renderer.create(
      <Footer name="test" repoUrl="http://test.com" profileUrl="http://profile.test" />,
    ).toJSON();
    expect(footer).toMatchSnapshot();
  });
});
