import React from "react";
import renderer from "react-test-renderer";
import Scores from "..";

describe("<Scores />", () => {
  it("component render", () => {
    const scores = renderer
      .create(<Scores score={123} bestScore={456} />)
      .toJSON();
    expect(scores).toMatchSnapshot();
  });
});
