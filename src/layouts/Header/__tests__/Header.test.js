import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import Header from "..";

describe("<Header />", () => {
  it("component render", () => {
    const header = renderer
      .create(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      )
      .toJSON();
    expect(header).toMatchSnapshot();
  });
});
