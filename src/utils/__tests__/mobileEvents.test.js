import swipeDetect from "../mobileEvents";

describe("mobileEvents.js", () => {
  it("not throw", () => {
    const el = document.createElement("div");
    expect(swipeDetect.bind(Object.create(null), [el, () => {}])).not.toThrow(
      "error"
    );
  });
});
