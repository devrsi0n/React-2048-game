import Gitment from 'gitment';

const gitment = new Gitment({
  // id: 'Your page ID', // optional, default location.href
  owner: 'devrsi0n',
  repo: '2048-comments',
  oauth: {
    client_id: '3bff581d9182d38a4598',
    client_secret: 'f49cd76c182957bbcd2593b6d7bce5c6ae69b384',
  },
});

// gitment.render('comments');
// or
// gitment.render(document.getElementById('comments'));
// or
// document.body.appendChild(gitment.render())

export default gitment;
