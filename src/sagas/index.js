import { put, takeEvery, select, all } from 'redux-saga/effects';
import {
  getRankingList,
  getUserInfo,
  updateRankingList as update
} from '../apis';
import { GAMEOVER } from '../reducers/ranking';

export function* getThenSetRankingList() {
  const rsp = yield getRankingList();
  yield put({ type: 'SET_RANKING_LIST', data: rsp });
}

export function* watchGetRankingList() {
  yield takeEvery('GET_RANKLING_LIST', getThenSetRankingList);
}

const getScore = state => state.present.board.present.score;
const getBestScore = state => state.present.board.present.bestScore;

export function* updateRankingList() {
  const score = yield select(getScore);
  const bestScore = yield select(getBestScore);
  if (score < bestScore) {
    return;
  }
  const info = yield getUserInfo();
  if (!info) {
    return;
  }
  const { email, html_url, name, avatar_url } = info;

  // Get latest list
  const list = yield getRankingList();
  const newUser = {
    email,
    profile_url: html_url,
    name,
    avatar_url,
    score
  };
  const sameOne = list.find(item => item.name === name && item.email === email);
  if (sameOne) {
    // Update new record
    if (score > sameOne.score) sameOne.score = score;
    else return;
  } else if (list.length < 10) {
    // Push to array
    list.push(newUser);
  } else {
    // Insert into array
    const idx = list.findIndex(item => score > item.score);
    if (idx === -1) return; // Not break record

    list.splice(idx, 0, newUser);
  }

  const rsp = yield update(list.slice(0, 10).sort((a, b) => b.score - a.score));
  yield put({ type: 'SET_RANKING_LIST', data: rsp });
}

export function* watchGameOver() {
  yield takeEvery(GAMEOVER, updateRankingList);
}

export default function* rootSaga() {
  yield all([watchGetRankingList(), watchGameOver()]);
}
