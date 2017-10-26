import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  it('component render', () => {
    const footer = renderer
      .create(
        <Footer
          name="test"
          repoUrl="http://test.com"
          profileUrl="http://profile.test"
        />
      )
      .toJSON();
    expect(footer).toMatchSnapshot();
  });

  it('shouldComponentUpdate', () => {
    const footer = shallow(
      <Footer
        name="test"
        repoUrl="http://test.com"
        profileUrl="http://profile.test"
      />
    ).instance();
    expect(footer.shouldComponentUpdate()).toBe(false);
  });
});
