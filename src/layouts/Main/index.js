import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../../containers/App";
import Comments from "../../components/Comments";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/comments" component={Comments} />
    </Switch>
  </main>
);

export default Main;
