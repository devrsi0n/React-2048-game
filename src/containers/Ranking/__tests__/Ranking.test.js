import React from 'react';
import renderer from 'react-test-renderer';
import { Rank } from '../index';

describe('<Ranking />', () => {
  it('component render', () => {
    const ranking = renderer
      .create(<Rank onGetRankingList={() => {}} />)
      .toJSON();
    expect(ranking).toMatchSnapshot();
  });
});
