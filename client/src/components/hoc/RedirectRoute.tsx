/**
 *  RedirectRoute
 *
 *  @type Higher Order Component
 *  @desc special Route component that can redirect based on condition
 *  @prop ...rest - any valid route prop
 */

import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

// RedirectRoute props
interface Props extends RouteProps {
  condition: boolean;
  to: string;
}

const RedirectRoute: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: rest.to,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default RedirectRoute;
