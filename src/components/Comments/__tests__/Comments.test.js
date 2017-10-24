import React from "react";
import renderer from "react-test-renderer";
import Comments from "..";

describe("<Comments />", () => {
  it("component render", () => {
    const comments = renderer.create(<Comments />).toJSON();
    expect(comments).toMatchSnapshot();
  });
});
