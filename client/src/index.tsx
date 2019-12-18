/**
 *  Index
 *
 *  @type Root
 *  @desc the root of the application where the app is mounted
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.scss";
import { App } from "./components";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
