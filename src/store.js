import { createStore } from 'redux';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

let preBoard = null;
store.subscribe(() => {
  const { board } = store.getState();
  if (JSON.stringify(preBoard) !== JSON.stringify(board)) {
    localStorage.setItem('board', JSON.stringify(board));
    preBoard = board;
  }
});

export default store;
