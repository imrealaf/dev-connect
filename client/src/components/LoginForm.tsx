/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useRef } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import config from "../constants/config";
import { Preloader } from "../components/ui";
import { useLogin } from "../hooks";
import { loginSuccess, loginFail } from "../redux/actions/auth.actions";
import { ILoginFormProps } from "../types/Auth";

const LoginForm: React.FC<ILoginFormProps> = ({ loginSuccess, loginFail }) => {
  /*
   *  Login api
   */
  const login = useLogin(loginSuccess, loginFail);

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
        {/* Error text */}
        {login.hasError() ? (
          <Form.Text className="text-center text-danger mb-3">
            <strong>Error:</strong> {login.getError().msg}
          </Form.Text>
        ) : null}

        {/* Username field */}
        <Form.Group controlId="email">
          <Form.Control
            className="text-center"
            type="email"
            name="email"
            placeholder="Enter username"
            onChange={login.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Password field */}
        {login.data.email && login.validUsername() ? (
          <Form.Group controlId="password">
            <Form.Control
              className="text-center"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={login.onChangeHandler}
              size="lg"
            />
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

const mapDispatchToProps = { loginSuccess, loginFail };

export default connect(null, mapDispatchToProps)(LoginForm);
