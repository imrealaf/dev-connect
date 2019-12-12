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
   *  Test data
   */
  const [data, setData] = useState(null) as any;

  /*
   *  Example modal API
   */
  const modal = useModal();

  /*
   *  Get data async function
   */
  const getData = useCallback(async () => {
    try {
      const response = await axios.get("/api/test");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setData]);

  /*
   *  On mount get test data
   */
  useEffect(() => {
    getData();
  }, [getData]);

  /*
   *  Render
   */
  return (
    <Page title="Home" descrip="This is the home page">
      {/* Hero */}
      <Jumbotron fluid>
        <Container>
          <h1>Home</h1>
          <Button onClick={modal.handleShow}>Toggle modal</Button>
        </Container>
      </Jumbotron>

      {/* Page content */}
      <div id="content">
        <Container>{data ? <p>{data.text}</p> : null}</Container>
      </div>

      {/* Example modal */}
      <Modal show={modal.show} onHide={modal.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modal.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={modal.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Page>
  );
};

export default Home;
