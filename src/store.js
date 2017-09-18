import { createStore } from 'redux';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

let preBoard = null;
store.subscribe(() => {
  const { board } = store.getState();
  const prev = JSON.stringify(preBoard);
  const curr = JSON.stringify(board);
  if (prev !== curr) {
    localStorage.setItem('board', curr);
    preBoard = board;
  }
});

export default store;
