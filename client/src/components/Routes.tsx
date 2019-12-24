/**
 *  Routes
 *
 *  @type Component
 *  @desc handles all routing for the app
 */

import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes/pages
import pages from "../data";
import * as routes from "../constants/routes";
import {
  Generic,
  NotFound,
  Landing,
  Login,
  SignUp,
  Dashboard,
  CreateProfile
} from "../pages";

// Components
import { PrivateRoute } from "./hoc";

const Routes: React.FC = () => {
  return (
    <Switch>
      {/* Public pages (redirected to Dashboard if logged in) */}
      <Route exact path={routes.LANDING}>
        <Landing />
      </Route>
      <Route exact path={routes.LOGIN}>
        <Login />
      </Route>
      <Route exact path={routes.SIGN_UP}>
        <SignUp />
      </Route>

      {/* Private pages (redirected to Landing if not logged in) */}
      <PrivateRoute exact path={routes.DASHBOARD}>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute exact path={routes.CREATE_PROFILE}>
        <CreateProfile />
      </PrivateRoute>

      {/* Public generic pages */}
      {pages.map((page: any, i) => {
        return (
          <Route key={i} exact path={page.path}>
            <Generic {...page} />
          </Route>
        );
      })}

      {/* 404 Page */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
