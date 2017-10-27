function* get(url, token = '6a8890663960322d781366a319cdc52676bb7651') {
  return yield fetch(`https://api.github.com${url}`, {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json'
    },
    credentials: 'same-origin'
  });
}

function* patch(url, data, token = '6a8890663960322d781366a319cdc52676bb7651') {
  return yield fetch(`https://api.github.com${url}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json'
    },
    credentials: 'same-origin'
  });
}

const ISSUE_URL = '/repos/qianmofeiyu/game-ranking-list/issues/1';

// Ranking list data saved in this issue.
export function* getIssue() {
  const rsp = yield get(ISSUE_URL);
  return yield rsp.json();
}

export function* getRankingList() {
  const rsp = yield getIssue();
  return JSON.parse(rsp.body).list;
}

export function* getUserInfo() {
  const info = localStorage.getItem('USER_INFO');
  if (info && info.name) {
    return info;
  }

  // Reuse gitalk access token
  let token = localStorage.getItem('GT_ACCESS_TOKEN');
  if (process.env.NODE_ENV === 'development') {
    token = '9ad77dd83ce067e05690f2f24d13b3a7ebf4999a';
  }
  if (!token) {
    console.log('Must login to upload score');
    return null;
  }
  let rsp = yield get('/user', token);
  rsp = yield rsp.json();
  console.log(rsp);
  if (rsp && rsp.name) {
    localStorage.setItem('USER_INFO', JSON.stringify(rsp));
  }
  return rsp;
}

export function* updateRankingList(list) {
  console.log('list', list);
  let rsp = yield patch(ISSUE_URL, {
    body: JSON.stringify({
      list
    })
  });
  rsp = yield rsp.json();
  return JSON.parse(rsp.body).list;
}
