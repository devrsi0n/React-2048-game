import Gitalk from 'gitalk';

export default new Gitalk({
  clientID: '9b0f4983f59838beb705',
  clientSecret: 'b7f0dc0adf6c423ae91f5087a380ea0b0d5cad6a',
  repo: 'React-2048-game',
  owner: 'devrsi0n',
  admin: ['devrsi0n'],
  // facebook-like distraction free mode
  distractionFreeMode: false,
  createIssueManually: true,
  labels: ['Gitalk'],
  proxy: 'https://gh-oauth.imsun.net/'
});
