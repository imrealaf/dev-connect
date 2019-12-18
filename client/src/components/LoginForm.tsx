/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

import config from "../constants/config";
import { Preloader } from "../components/ui";
import { useLogin } from "../hooks";

const LoginForm: React.FC = () => {
  /*
   *  Element refs
   */
  const usernameRef = useRef() as any;
  const passwordRef = useRef() as any;

  /*
   *  Login api
   */
  const login = useLogin();

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Form
        noValidate
        onSubmit={login.onSubmitHandler}
        className="login-form"
        style={login.pending ? { display: "none" } : {}}
      >
        {/* Username field */}
        <Form.Group controlId="username">
          <Form.Control
            isInvalid={!login.validUsername() && login.submitted}
            className="text-center"
            type="email"
            name="username"
            placeholder="Enter username"
            ref={usernameRef}
            onChange={login.onChangeHandler}
            size="lg"
          />
          {/* Error text */}
          {!login.validUsername() && login.submitted ? (
            <Form.Text className="text-left text-danger">
              {config.auth.validationErrors().usernameValidEmail}
            </Form.Text>
          ) : null}
        </Form.Group>

        {/* Password field */}
        {login.data.username && login.validUsername() ? (
          <Form.Group controlId="password">
            <Form.Control
              isInvalid={!login.validPassword() && login.submitted}
              className="text-center"
              type="password"
              name="password"
              placeholder="Enter password"
              ref={passwordRef}
              onChange={login.onChangeHandler}
              size="lg"
            />
            {/* Error text */}
            {!login.validPassword() && login.submitted ? (
              <Form.Text className="text-left text-danger">
                {config.auth.validationErrors().passwordMinLength}
              </Form.Text>
            ) : null}
          </Form.Group>
        ) : null}

        {/* Submit button */}
        <Button
          className="btn-pill my-2"
          variant={login.valid ? "primary" : "secondary"}
          disabled={!login.valid}
          size="lg"
          type="submit"
        >
          <strong>Log In</strong>
        </Button>
      </Form>
      <Preloader show={login.pending} color="primary" text="Signing you in.." />
    </React.Fragment>
  );
};

export default LoginForm;
