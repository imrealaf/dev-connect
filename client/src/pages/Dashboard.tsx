/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the dashboard page
 */

import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

import { doGetCurrentProfile } from "../redux/actions/profile.actions";

interface IDashboardProps {
  auth: any;
  profile: any;
}

const Dashboard: React.FC<IDashboardProps> = ({ auth, profile }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doGetCurrentProfile());
  }, []);

  /*
   *  Render
   */
  return (
    <Page title="Dashboard" descrip="This is the home page">
      <div className="pt-5">
        {/* Hero */}
        <Hero bg="gray-800">
          <div className="text-center text-white">
            <h1 className="display-4">Dashboard</h1>
          </div>
        </Hero>

        {/* Page content */}
        <div id="content" className="py-4">
          <Container>Something here</Container>
        </div>
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

export default connect(mapStateToProps)(Dashboard);
