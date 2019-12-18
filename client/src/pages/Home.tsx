/**
 *  Home
 *
 *  @type Component
 *  @desc the home page
 */

import React, { useEffect, useState, useCallback } from "react";
import { Container, Jumbotron, Button, Modal } from "react-bootstrap";
import axios from "axios";

import { Page } from "../components/hoc";
import { useModal } from "../hooks";

const Home: React.FC = () => {
  /*
   *  Render
   */
  return (
    <Page title="Home" descrip="This is the home page">
      {/* Hero */}
      <Jumbotron fluid>
        <Container>
          <h1>Home</h1>
        </Container>
      </Jumbotron>

      {/* Page content */}
      <div id="content"></div>
    </Page>
  );
};

export default Home;
