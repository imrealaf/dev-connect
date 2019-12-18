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
import { Landing, Login, SignUp, Dashboard } from "../pages";

// Components
import { RedirectRoute } from "./hoc";
import { Preload } from "./ui";
import { Navigation } from "./";

// Auth
import { useAuth } from "../hooks";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  /*
   *  Add font awesome icons to library
   */
  library.add(fas, fab);

  /*
   *  Get auth state
   */
  const isAuthenticated = useAuth();

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
        <Navigation
          isAuthenticated={isAuthenticated}
          bg="primary"
          variant="dark"
          fixed="top"
        />
      )}

      {/* Main content */}
      <main id="main" role="main">
        <Switch>
          <RedirectRoute
            exact
            path={routes.LANDING}
            condition={!isAuthenticated}
            to={routes.DASHBOARD}
          >
            <Landing />
          </RedirectRoute>
          <RedirectRoute
            exact
            path={routes.LOGIN}
            condition={!isAuthenticated}
            to={routes.DASHBOARD}
          >
            <Login />
          </RedirectRoute>
          <RedirectRoute
            exact
            path={routes.SIGN_UP}
            condition={!isAuthenticated}
            to={routes.DASHBOARD}
          >
            <SignUp />
          </RedirectRoute>
          <RedirectRoute
            exact
            path={routes.DASHBOARD}
            condition={isAuthenticated}
            to={routes.LANDING}
          >
            <Dashboard />
          </RedirectRoute>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default withRouter(App);
