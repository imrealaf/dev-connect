/**
 *  App
 *
 *  @type Component
 *  @desc the main app container component
 *  @prop location - the location object from route props
 */

import React from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Routes/pages
import * as routes from "../constants/routes";
import { Home } from "../pages";

// Components
import { Preload } from "./ui";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  /*
   *  Add font awesome icons to library
   */
  library.add(fas, fab);

  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/* Preload */}
      <Preload>
        <FontAwesomeIcon
          className="text-primary"
          icon={["fas", "gem"]}
          size="4x"
        />
      </Preload>

      {/* Main content */}
      <main id="main" role="main">
        <Switch>
          <Route exact path={routes.HOME}>
            <Home />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default withRouter(App);
