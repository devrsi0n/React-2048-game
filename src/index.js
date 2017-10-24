import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/normalize.scss";
import "./assets/styles/index.scss";
import Layouts from "./layouts";
import store from "./store";
import registerServiceWorker from "./utils/registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layouts />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
