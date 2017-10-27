const initState = {
  list: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_RANKING_LIST':
      return { ...state, list: action.data };
    default:
      return state;
  }
}

export const GAMEOVER = 'GAMEOVER';

export const gameOver = () => ({ type: GAMEOVER });
