
// Actions
const INIT = 'INIT';
const PLACE_RANDOM = 'PLACE_RANDOM';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const RESET = 'RESET';
const REVERT = 'REVERT';

// Game board state
const initState = {
  matrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  prevMatrix: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0,
  bestScore: 0,
  gameOver: false,
  isMoved: true,
};

class Matrix {
  constructor({ matrix, prevMatrix, score, bestScore, gameOver, isMoved }) {
    this.matrix = JSON.parse(JSON.stringify(matrix));
    this.prevMatrix = JSON.parse(JSON.stringify(prevMatrix));
    this.score = score;
    this.bestScore = bestScore;
    this.gameOver = gameOver;
    this.isMoved = isMoved;
  }

  getEmptyCoordinates() {
    const { matrix } = this;
    const coordinates = [];
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        const val = matrix[row][col];
        if (val === 0) {
          coordinates.push([row, col]);
        }
      }
    }
    return coordinates;
  }

  getRandom(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  }

  isBoardMoved(preMatrix, newMatrix) {
    return JSON.stringify(preMatrix) !== JSON.stringify(newMatrix);
  }

  checkGameOver(matrix) {
    const copy = JSON.parse(JSON.stringify(matrix));
    const check = (func) => {
      const isMoved = this.isBoardMoved(copy, func(copy).matrix);
      this.matrix = copy; // Reset to origin matrix
      return isMoved;
    };
    const moves = [
      check(this.moveUp.bind(this)),
      check(this.moveDown.bind(this)),
      check(this.moveLeft.bind(this)),
      check(this.moveRight.bind(this)),
    ];

    return !moves.includes(true);
  }

  addRandomNumToMatrix() {
    const { matrix } = this;
    const newMatrix = JSON.parse(JSON.stringify(matrix));
    if (this.gameOver) {
      return { matrix };
    }
    if (!this.isMoved) {
      if (this.checkGameOver(newMatrix)) {
        this.gameOver = true;
        return { gameOver: true };
      }
      return { matrix };
    }

    const emptyCoordinates = this.getEmptyCoordinates();
    if (emptyCoordinates.length === 0) {
      if (this.checkGameOver(newMatrix)) {
        this.gameOver = true;
        return { gameOver: true };
      }
      return { matrix: newMatrix };
    }
    const cor = this.getRandom(emptyCoordinates);
    newMatrix[cor[0]][cor[1]] = this.getRandom([2, 4]);
    if (this.checkGameOver(newMatrix)) {
      this.gameOver = true;
      return { gameOver: true, matrix: newMatrix };
    }
    this.matrix = newMatrix;

    return { matrix: newMatrix };
  }

  rotateRight() {
    const { matrix } = this;
    const newMat = [];
    const len = matrix.length;
    for (let col = 0; col < len; col++) {
      const newRow = [];
      for (let row = len - 1; row >= 0; row--) {
        newRow.push(matrix[row][col]);
      }
      newMat.push(newRow);
    }

    this.matrix = newMat;
    return newMat;
  }

  rotateLeft() {
    const { matrix } = this;
    const newMat = [];
    const len = matrix.length;

    for (let col = len - 1; col >= 0; col--) {
      const newRow = [];
      for (let row = len - 1; row >= 0; row--) {
        newRow.unshift(matrix[row][col]);
      }
      newMat.push(newRow);
    }

    this.matrix = newMat;
    return newMat;
  }

  shiftRight() {
    const { matrix } = this;
    const newMat = [];
    const len = matrix.length;

    // Shift all numbers to the right
    for (let row = 0; row < len; row++) {
      const boardRow = [];
      for (let col = 0; col < matrix[row].length; col++) {
        const current = matrix[row][col];
        if (current === 0) boardRow.unshift(current);
        else boardRow.push(current);
      }
      newMat.push(boardRow);
    }
    this.matrix = newMat;
    return newMat;
  }

  shiftLeft() {
    const { matrix } = this;
    const newMat = [];
    const len = matrix.length;
    for (let r = 0; r < len; r++) {
      const newRow = [];
      for (let c = matrix[r].length - 1; c >= 0; c--) {
        const curr = matrix[r][c];
        if (curr === 0) newRow.push(curr);
        else newRow.unshift(curr);
      }
      newMat.push(newRow);
    }
    this.matrix = newMat;
    return newMat;
  }

  combineNumToLeft() {
    const { matrix } = this;
    const len = matrix.length;

    for (let row = 0; row < len; row++) {
      for (let col = 0; col < len; col++) {
        if (matrix[row][col] > 0 && matrix[row][col] === matrix[row][col + 1]) {
          matrix[row][col] *= 2;
          matrix[row][col + 1] = 0;
          this.score += matrix[row][col];
        } else if (matrix[row][col] === 0 && matrix[row][col + 1] > 0) {
          matrix[row][col] = matrix[row][col + 1];
          matrix[row][col + 1] = 0;
        }
      }
    }
    this.matrix = matrix;
    return matrix;
  }

  combineNumToRight() {
    const { matrix } = this;
    const len = matrix.length;
    // Combine numbers and shift to right
    for (let row = 0; row < len; row++) {
      for (let col = matrix[row].length - 1; col >= 0; col--) {
        if (matrix[row][col] > 0 && matrix[row][col] === matrix[row][col - 1]) {
          matrix[row][col] *= 2;
          matrix[row][col - 1] = 0;
          this.score += matrix[row][col];
        } else if (matrix[row][col] === 0 && matrix[row][col - 1] > 0) {
          matrix[row][col] = matrix[row][col - 1];
          matrix[row][col - 1] = 0;
        }
      }
    }
    this.matrix = matrix;
    return matrix;
  }

  move(callback) {
    const prevMatrix = JSON.parse(JSON.stringify(this.matrix));
    callback();

    const { matrix, score, bestScore } = this;
    const isMoved = this.isBoardMoved(prevMatrix, matrix);
    const rsp = {
      matrix,
      score,
      bestScore: score > bestScore ? score : bestScore,
      isMoved,
    };
    if (isMoved) {
      rsp.prevMatrix = prevMatrix;
    }
    return rsp;
  }

  moveUp() {
    return this.move(() => {
      this.rotateRight();
      this.shiftRight();
      this.combineNumToRight();
      // Rotate board back upright
      this.rotateLeft();
    });
  }

  moveDown() {
    return this.move(() => {
      this.rotateRight();
      this.shiftLeft();
      this.combineNumToLeft();
      this.rotateLeft();
    });
  }

  moveLeft() {
    return this.move(() => {
      this.shiftLeft();
      this.combineNumToLeft();
    });
  }

  moveRight() {
    return this.move(() => {
      this.shiftRight();
      this.combineNumToRight();
    });
  }
}

export default function (state = initState, action) {
  let mat = new Matrix(state);
  switch (action.type) {
    case INIT:
    {
      if (action.board) {
        return { ...state, ...(action.board) };
      }
      mat.addRandomNumToMatrix();
      const result = mat.addRandomNumToMatrix();
      return { ...state, ...result };
    }
    case PLACE_RANDOM:
    {
      const result = mat.addRandomNumToMatrix();
      return { ...state, ...result };
    }
    case MOVE_UP:
    {
      const result = mat.moveUp();
      return { ...state, ...result };
    }
    case MOVE_DOWN:
    {
      const result = mat.moveDown();
      return { ...state, ...result };
    }
    case MOVE_LEFT:
    {
      const result = mat.moveLeft();
      return { ...state, ...result };
    }
    case MOVE_RIGHT:
    {
      const result = mat.moveRight();
      return { ...state, ...result };
    }
    case RESET:
    {
      const copy = JSON.parse(JSON.stringify(initState));
      mat = new Matrix(copy);
      mat.addRandomNumToMatrix();
      const result = mat.addRandomNumToMatrix();
      return { ...copy, ...result, bestScore: state.bestScore };
    }
    case REVERT:
    {
      const { prevMatrix } = state;
      return { ...state, matrix: prevMatrix };
    }
    default:
    {
      return state;
    }
  }
}

// Action creators
export const initMatrix = board => ({
  type: INIT,
  board,
});

const actionCreator = type => () => ({
  type,
});

export const placeRandom = actionCreator(PLACE_RANDOM);
export const moveUp = actionCreator(MOVE_UP);
export const moveDown = actionCreator(MOVE_DOWN);
export const moveLeft = actionCreator(MOVE_LEFT);
export const moveRight = actionCreator(MOVE_RIGHT);
export const reset = actionCreator(RESET);
export const revert = actionCreator(REVERT);
