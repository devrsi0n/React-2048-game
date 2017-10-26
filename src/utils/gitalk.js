import Gitalk from 'gitalk';

export default new Gitalk({
  clientID: '3bff581d9182d38a4598',
  clientSecret: 'f49cd76c182957bbcd2593b6d7bce5c6ae69b384',
  repo: 'React-2048-game',
  owner: 'devrsi0n',
  admin: ['devrsi0n'],
  // facebook-like distraction free mode
  distractionFreeMode: false,
  labels: ['gitment', 'https://devrsi0n.github.io/React-2048-game/'],
  proxy: 'https://gh-oauth.imsun.net/'
});
