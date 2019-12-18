/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the landing page
 */

import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Page } from "../components/hoc";
import { Hero } from "../components/ui";

const Dashboard: React.FC = () => {
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

export default Dashboard;
