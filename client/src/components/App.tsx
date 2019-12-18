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
import { Landing, Login, SignUp } from "../pages";

// Components
import { Preload } from "./ui";
import { Navigation } from "./";

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
      <Preload animateOut={true} color="primary">
        <FontAwesomeIcon
          className="text-white"
          icon={["fas", "code"]}
          size="4x"
        />
      </Preload>

      {location.pathname === routes.LOGIN ||
      location.pathname === routes.SIGN_UP ? null : (
        <Navigation bg="primary" variant="dark" fixed="top" />
      )}

      {/* Main content */}
      <main id="main" role="main">
        <Switch>
          <Route exact path={routes.LANDING}>
            <Landing />
          </Route>
          <Route exact path={routes.LOGIN}>
            <Login />
          </Route>
          <Route exact path={routes.SIGN_UP}>
            <SignUp />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default withRouter(App);
