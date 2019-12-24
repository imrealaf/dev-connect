/**
 *  App
 *
 *  @type Component
 *  @desc the main app container component
 *  @prop location - the location object from route props
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Routes/pages
import * as routes from "../constants/routes";

// Components
import { Preload } from "./ui";
import { Routes, Navigation } from "./";

// Auth
import { getCurrentUser } from "../redux/actions/auth.actions";

// App props
interface IAppProps extends RouteComponentProps {}

const App: React.FC<IAppProps> = ({ location }) => {
  /*
   *  Add font awesome icons to library
   */
  library.add(fas, fab);

  /*
   *  Get dispatch
   */
  const dispatch = useDispatch();

  /*
   *  On mount, get current user ..
   */
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

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

      {/* Navigation */}
      {location.pathname === routes.LOGIN ||
      location.pathname === routes.SIGN_UP ? null : (
        <Navigation
          location={location}
          shadow={location.pathname === routes.LANDING ? false : true}
          bg="primary"
          variant="dark"
          fixed="top"
        />
      )}

      {/* Main content */}
      <main id="main" role="main">
        <Routes />
      </main>
    </React.Fragment>
  );
};

export default withRouter(App);
