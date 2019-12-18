/**
 *  SignUpForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

import config from "../constants/config";
import { Preloader } from "../components/ui";
import { useSignUp } from "../hooks";

const SignUpForm: React.FC = () => {
  /*
   *  Element refs
   */
  const refs = {
    firstName: useRef() as any,
    lastName: useRef() as any,
    email: useRef() as any,
    password: useRef() as any,
    passwordConfirm: useRef() as any
  };

  /*
   *  Sign up api
   */
  const signUp = useSignUp();

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Form
        noValidate
        onSubmit={signUp.onSubmitHandler}
        className="signup-form"
        style={signUp.pending ? { display: "none" } : { paddingTop: "15px" }}
      >
        {/* First name field */}
        <Form.Group controlId="firstName">
          <Form.Label className="sr-only">First name</Form.Label>
          <Form.Control
            className="text-center"
            type="text"
            name="firstName"
            placeholder="Your first name"
            ref={refs.firstName}
            onChange={signUp.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Last name field */}
        <Form.Group controlId="lastName">
          <Form.Label className="sr-only">Last name</Form.Label>
          <Form.Control
            className="text-center"
            type="text"
            name="lastName"
            placeholder="Your last name"
            ref={refs.lastName}
            onChange={signUp.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Email field */}
        <Form.Group controlId="email">
          <Form.Label className="sr-only">Email</Form.Label>
          <Form.Control
            className="text-center"
            type="email"
            name="email"
            placeholder="Your email (username)"
            ref={refs.email}
            onChange={signUp.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Password field */}
        <Form.Group controlId="password">
          <Form.Label className="sr-only">Password</Form.Label>
          <Form.Control
            className="text-center"
            type="password"
            name="password"
            placeholder="Choose your password"
            ref={refs.password}
            onChange={signUp.onChangeHandler}
            size="lg"
          />
          {signUp.passwordNotValid() ? (
            <Form.Text className="text-secondary">
              {config.auth.validationErrors().passwordMinLength}
            </Form.Text>
          ) : null}
        </Form.Group>

        {/* Confirm password field */}
        {signUp.data.password && !signUp.passwordNotValid() ? (
          <Form.Group controlId="passwordConfirm">
            <Form.Label className="sr-only">Confirm password</Form.Label>
            <Form.Control
              className="text-center"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              ref={refs.passwordConfirm}
              onChange={signUp.onChangeHandler}
              size="lg"
            />
            {signUp.passwordsDontMatch() ? (
              <Form.Text className="text-secondary">
                {config.auth.validationErrors().passwordMatch}
              </Form.Text>
            ) : null}
          </Form.Group>
        ) : null}

        {/* Submit button */}
        <Button
          className="btn-pill my-2"
          variant={signUp.valid ? "primary" : "secondary"}
          disabled={!signUp.valid}
          type="submit"
          size="lg"
        >
          <strong>Sign Up</strong>
        </Button>
      </Form>
      <Preloader show={false} color="primary" text="Signing you up.." />
    </React.Fragment>
  );
};

export default SignUpForm;
