import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '..';

describe('<Modal />', () => {
  it('component render', () => {
    const modal = renderer
      .create(
        <Modal display>
          <div>test</div>
        </Modal>
      )
      .toJSON();
    expect(modal).toMatchSnapshot();
  });
});
