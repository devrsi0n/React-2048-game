import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import undoable from "redux-undo";
import rootReducer from "./reducers";
import { watchGetRankingList } from "./sagas";

const initHistory = JSON.parse(localStorage.getItem("state") || "null");

const sagaMiddleware = createSagaMiddleware();
/* eslint-disable no-underscore-dangle */
const args = [
  undoable(rootReducer, {
    limit: 11, // set a limit for the history
    ignoreInitialState: true
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    // Redux devtools necessary code
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
];
// Insert localStorage data if available
if (initHistory) {
  args.splice(1, 0, initHistory);
}

const store = createStore(...args);
sagaMiddleware.run(watchGetRankingList);

// Call this function while redux state changed,
// this callback save redux state to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("state", JSON.stringify(state));
});

export default store;
