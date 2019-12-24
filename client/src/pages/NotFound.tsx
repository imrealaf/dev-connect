/**
 *  NotFound (404)
 *
 *  @type Component
 *  @desc generic page component
 */

import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";

const NotFound: React.FC<RouteComponentProps> = ({ location }) => {
  /*
   *  Render
   */
  return (
    <Page title="Error 404">
      <div id="content" className="mt-5">
        <Container className="py-4 text-center">
          <h1 className="display-4 text-center">404</h1>
          <p>We couldn't find the page {location.pathname}</p>
        </Container>
      </div>
    </Page>
  );
};

export default withRouter(NotFound);
