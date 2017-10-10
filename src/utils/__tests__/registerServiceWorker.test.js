import register, { unregister } from "../registerServiceWorker";

describe("registerServiceWorker.js", () => {
  it("not throw", () => {
    expect(register).not.toThrow();
    expect(unregister).not.toThrow();
  });
});
