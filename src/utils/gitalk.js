import Gitalk from 'gitalk';

// Local develop github auth callback url to localhost:300
const config =
  process.env.NODE_ENV === 'production'
    ? {
        clientID: '9b0f4983f59838beb705',
        clientSecret: 'b7f0dc0adf6c423ae91f5087a380ea0b0d5cad6a'
      }
    : {
        clientID: '06745677c93217a4268e',
        clientSecret: '2cf6d8647b8fc33f9ba29f1edb76720cfea4ee68'
      };

export default new Gitalk({
  ...config,
  repo: 'React-2048-game',
  owner: 'devrsi0n',
  admin: ['devrsi0n'],
  // facebook-like distraction free mode
  distractionFreeMode: false,
  createIssueManually: true,
  labels: ['Gitalk'],
  proxy: 'https://gh-oauth.imsun.net/'
});
