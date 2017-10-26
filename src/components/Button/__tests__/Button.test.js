import React from "react";
import renderer from "react-test-renderer";
import Button from "..";

describe("<Board />", () => {
  it("component render", () => {
    let board = renderer.create(<Button />).toJSON();
    expect(board).toMatchSnapshot();

    board = renderer.create(<Button arrow="up" />).toJSON();
    expect(board).toMatchSnapshot();

    board = renderer
      .create(
        <Button>
          <span>test</span>
        </Button>
      )
      .toJSON();
    expect(board).toMatchSnapshot();
  });
});
