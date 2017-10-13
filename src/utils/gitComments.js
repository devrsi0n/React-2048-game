import Gitment from "gitment";
import "../assets/styles/comments.scss";

// Github comments lib init
const gitment = new Gitment({
  // id: 'Your page ID', // optional, default location.href
  owner: "devrsi0n",
  repo: "React-2048-game",
  oauth: {
    client_id: "3bff581d9182d38a4598",
    client_secret: "f49cd76c182957bbcd2593b6d7bce5c6ae69b384"
  }
});

export default gitment;
