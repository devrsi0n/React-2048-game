import reducer, {
  initMatrix,
  placeRandom,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  reset
} from '../board';

describe('reducer board', () => {
  let state;

  it('actions', () => {
    const initMat = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const testMat = [[2, 0, 0, 2], [4, 0, 4, 2], [0, 0, 0, 0], [8, 0, 0, 16]];
    state = reducer(
      {
        matrix: initMat,
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: true
      },
      {
        type: ''
      }
    );
    expect(state.matrix).toEqual(initMat);
    state = reducer(
      state,
      initMatrix({
        matrix: testMat
      })
    );
    expect(state.matrix).toEqual(testMat);
    state = reducer(state, moveLeft());
    state = reducer(state, moveUp());
    state = reducer(state, moveDown());
    state = reducer(state, moveRight());
    state = reducer(state, placeRandom());

    state = reducer(
      {
        matrix: testMat,
        score: 0,
        bestScore: 0,
        gameOver: true,
        isMoved: true
      },
      initMatrix({
        matrix: testMat
      })
    );
    state = reducer(state, moveUp());
    state = reducer(state, reset());

    const gameOverMat = [
      [2, 4, 8, 16],
      [16, 8, 4, 2],
      [32, 64, 128, 256],
      [256, 128, 64, 32]
    ];
    state = reducer(
      {
        matrix: gameOverMat,
        score: 0,
        bestScore: 0,
        gameOver: true,
        isMoved: true
      },
      placeRandom()
    );

    state = reducer(
      {
        matrix: gameOverMat,
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: false
      },
      placeRandom()
    );

    state = reducer(
      {
        matrix: [
          [2, 4, 8, 16],
          [16, 8, 4, 2],
          [32, 64, 128, 256],
          [256, 128, 64, 0]
        ],
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: false
      },
      placeRandom()
    );

    state = reducer(
      {
        matrix: [
          [2, 4, 8, 16],
          [16, 8, 4, 2],
          [32, 64, 128, 256],
          [256, 128, 64, 32]
        ],
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: true
      },
      placeRandom()
    );

    state = reducer(
      {
        matrix: [
          [2, 4, 8, 16],
          [16, 8, 4, 2],
          [32, 64, 128, 32],
          [256, 128, 64, 32]
        ],
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: true
      },
      placeRandom()
    );

    state = reducer(
      {
        matrix: [
          [2, 4, 8, 16],
          [16, 8, 4, 2],
          [32, 64, 128, 32],
          [256, 128, 64, 0]
        ],
        score: 0,
        bestScore: 0,
        gameOver: false,
        isMoved: true
      },
      placeRandom()
    );
  });
});
