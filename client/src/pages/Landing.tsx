/**
 *  Landing
 *
 *  @type Component
 *  @desc the landing page
 */

import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import data from "../data/landing";
import * as routes from "../constants/routes";
import { sanitize } from "../utils";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

import heroImage from "../assets/landing.jpg";

interface ILandingProps {
  isAuthenticated: boolean;
}

const Landing: React.FC<ILandingProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to={routes.DASHBOARD} />;
  }

  /*
   *  Render
   */
  return (
    <Page descrip="This is the home page">
      {/* Hero */}
      <Hero image={heroImage} vh={100} overlay={true} overlayOpacity={0.8}>
        <div className="text-center text-white">
          <h1
            className="display-4"
            dangerouslySetInnerHTML={sanitize(data.heading)}
          />
          <h5
            className="font-light mt-3"
            dangerouslySetInnerHTML={sanitize(data.subheading)}
          />
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
    </Page>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
