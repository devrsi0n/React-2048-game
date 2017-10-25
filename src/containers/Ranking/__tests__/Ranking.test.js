import React from "react";
import renderer from "react-test-renderer";
import { Ranking } from "../index";

describe("<Ranking />", () => {
  it("component render", () => {
    const ranking = renderer
      .create(<Ranking onGetRankingList={() => {}} />)
      .toJSON();
    expect(ranking).toMatchSnapshot();
  });
});
