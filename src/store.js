import { createStore } from 'redux';
import undoable from 'redux-undo';
import rootReducer from './reducers';

const initHistory = JSON.parse(localStorage.getItem('state') || 'null');
/* eslint-disable no-underscore-dangle */
const args = [
  undoable(rootReducer, {
    limit: 11, // set a limit for the history
    ignoreInitialState: true,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
];
if (initHistory) {
  args.splice(1, 0, initHistory);
}

const store = createStore(...args);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify(state));
});

export default store;
