function* get(url) {
  return yield fetch(`https://api.github.com${url}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json"
    },
    credentials: "same-origin"
  });
}

// function post(url, data) {
//   return fetch(`https://api.github.com${url}`, {
//     method: "GET",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/vnd.github.v3+json"
//     },
//     credentials: "include"
//   });
// }

export default function* getIssueInfo() {
  const rsp = yield get("/users/octocat");
  return yield rsp.json();
}
