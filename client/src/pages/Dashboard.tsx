/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the landing page
 */

import React, { useEffect } from "react";
import { connect, MapStateToProps } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

import { doGetCurrentProfile } from "../redux/actions/profile.actions";

interface IDashboardProps {
  auth: any;
  profile: any;
  doGetCurrentProfile: any;
}

const Dashboard: React.FC<IDashboardProps> = ({
  doGetCurrentProfile,
  auth,
  profile
}) => {
  useEffect(() => {
    doGetCurrentProfile();
  }, []);

  /*
   *  Render
   */
  return (
    <Page title="Dashboard" descrip="This is the home page">
      {/* Hero */}
      <Hero>
        <div className="text-center text-white">
          <h1 className="display-4">Dashboard</h1>
        </div>
      </Hero>

      {/* Page content */}
      <div id="content">
        <Container>Something here</Container>
      </div>
    </Page>
  );
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { doGetCurrentProfile })(Dashboard);
