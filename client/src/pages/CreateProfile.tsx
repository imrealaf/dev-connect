/**
 *  Create Profile
 *
 *  @type Component
 *  @desc the profile page
 */

import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

interface ICreateProfileProps {
  auth: any;
  profile: any;
}

const CreateProfile: React.FC<ICreateProfileProps> = ({ auth, profile }) => {
  const dispatch = useDispatch();

  /*
   *  Render
   */
  return (
    <Page title="Create Profile" descrip="This is the profile page">
      <div className="pt-5">
        {/* Hero */}
        <Hero bg="gray-800">
          <div className="text-center text-white">
            <h1 className="display-4">Profile</h1>
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

export default connect(mapStateToProps)(CreateProfile);
