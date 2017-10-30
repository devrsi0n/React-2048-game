function* githubGet(url, token) {
  return yield fetch(`https://api.github.com${url}`, {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json'
    },
    credentials: 'same-origin'
  });
}

const host = 'https://re2048.herokuapp.com';

function* serverGet(url) {
  return yield fetch(`${host}${url}`, {
    method: 'GET',
    credentials: 'same-origin'
  });
}

function* serverPut(url, data) {
  return yield fetch(`${host}${url}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  });
}

const url = '/ranking';

// Ranking list data saved in egg server.
export function* getRankingList() {
  let rsp = yield serverGet(url);
  rsp = yield rsp.json();
  return rsp.list;
}

export function* getUserInfo() {
  const info = localStorage.getItem('USER_INFO');
  if (info && info.name) {
    return info;
  }

  // Reuse gitalk access token
  let token;
  if (process.env.NODE_ENV === 'development') {
    token = '9ad77dd83ce067e05690f2f24d13b3a7ebf4999a';
  } else {
    token = localStorage.getItem('GT_ACCESS_TOKEN');
  }
  if (!token) {
    console.log('Must login to upload score');
    return null;
  }
  let rsp = yield githubGet('/user', token);
  rsp = yield rsp.json();
  console.log(rsp);
  if (rsp && rsp.name) {
    localStorage.setItem('USER_INFO', JSON.stringify(rsp));
  }
  return rsp;
}

export function* updateRankingList(list) {
  console.log('list', list);
  let rsp = yield serverPut(url, {
    body: JSON.stringify({
      list
    })
  });
  rsp = yield rsp.json();
  return JSON.parse(rsp).list;
}
