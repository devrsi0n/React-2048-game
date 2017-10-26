import { put, takeEvery } from 'redux-saga/effects';
import apis from '../apis';

export function* getRankingList() {
  const rsp = yield apis();
  console.log(rsp);
  yield put({ type: 'SET_RANKING_LIST', data: rsp });
}

export function* watchGetRankingList() {
  yield takeEvery('GET_RANKLING_LIST', getRankingList);
}
