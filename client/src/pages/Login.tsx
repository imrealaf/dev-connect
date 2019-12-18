/**
 *  Login
 *
 *  @type Component
 *  @desc the login page
 *  @scope public
 */

import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { Page } from "../components/hoc";
import { LoginForm } from "../components";

const Login: React.FC = () => {
  return (
    <Page title="Log In">
      <Container className="text-center py-4">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4 text-primary">
              <FontAwesomeIcon
                className="mr-1"
                icon={["fas", "code"]}
                size="1x"
              />{" "}
              <span className="font-light">{config.appName}</span>
            </h4>
            <Card>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
            <div className="mt-3">
              <Link to={routes.LANDING}>
                <small>Back to site</small>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Login;
