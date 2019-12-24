/**
 *  PrivateRoute
 *
 *  @type Higher Order Component
 *  @desc special Route component that can redirect based on condition
 *  @prop ...rest - any valid route prop
 */

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import * as routes from "../../constants/routes";

// PrivateRoute props
interface IPrivateRouteProps extends RouteProps {
  auth: any;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  auth: { isAuthenticated, loading },
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        !isAuthenticated && !loading ? (
          <Redirect to={routes.LANDING} />
        ) : (
          children
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
