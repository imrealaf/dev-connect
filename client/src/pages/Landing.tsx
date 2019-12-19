/**
 *  Landing
 *
 *  @type Component
 *  @desc the landing page
 */

import React from "react";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Button, Modal } from "react-bootstrap";

import * as routes from "../constants/routes";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

import heroImage from "../assets/landing.jpg";

const Landing: React.FC = () => {
  /*
   *  Render
   */
  return (
    <Page descrip="This is the home page">
      {/* Hero */}
      <Hero image={heroImage} vh={100} overlay={true} overlayOpacity={0.8}>
        <div className="text-center text-white">
          <h1 className="display-4">
            Welcome to <strong className="text-primary">DevConnect</strong>
          </h1>
          <h5 className="font-light mt-3">
            Create a profile, share posts & connect with other developers
          </h5>
          <div className="mt-5">
            <Link
              to={routes.SIGN_UP}
              className="btn btn-primary btn-pill btn-lg"
            >
              <strong>Sign Up</strong>
            </Link>
            <Link
              to={routes.LOGIN}
              className="btn btn-secondary btn-pill btn-lg ml-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </Hero>

      {/* Page content */}
      {/* <div id="content">
        <Container>Something here</Container>
      </div> */}
    </Page>
  );
};

export default Landing;
