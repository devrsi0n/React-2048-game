import reducer, {
  initMatrix,
  placeRandom,
  moveUp,
  moveDown,
  moveLeft,
  moveRight
} from "../board";

describe("reducer board", () => {
  let state;

  it("actions", () => {
    const initMat = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const testMat = [[2, 4, 8, 16], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    state = reducer(
      {
        matrix: initMat,
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: true
      },
      initMatrix({
        matrix: testMat
      })
    );
    expect(state.matrix).toEqual(testMat);
    state = reducer(state, placeRandom());
    state = reducer(state, moveUp());
    state = reducer(state, moveDown());
    state = reducer(state, moveLeft());
    state = reducer(state, moveRight());
  });
});
