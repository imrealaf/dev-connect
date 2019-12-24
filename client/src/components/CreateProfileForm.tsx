/**
 *  CreateProfileForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useRef } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import config from "../constants/config";
import { Preloader } from "../components/ui";
import { useProfile } from "../hooks";
import {
  createProfileSuccess,
  createProfileFail
} from "../redux/actions/profile.actions";
import { ICreateProfileFormProps } from "../types/Profile";

const CreateProfileForm: React.FC<ICreateProfileFormProps> = ({
  createProfileSuccess,
  createProfileFail
}) => {
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
   *  Profile api
   */
  const profile = useProfile(createProfileSuccess, createProfileFail);

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Form
        noValidate
        onSubmit={profile.onSubmitHandler}
        className="profile-form"
        style={profile.pending ? { display: "none" } : { paddingTop: "15px" }}
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
            onChange={profile.onChangeHandler}
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
            onChange={profile.onChangeHandler}
            size="lg"
          />
        </Form.Group>

        {/* Submit button */}
        <Button
          className="btn-pill my-2"
          variant={profile.valid ? "primary" : "secondary"}
          disabled={!profile.valid}
          type="submit"
          size="lg"
        >
          <strong>Sign Up</strong>
        </Button>
      </Form>
      <Preloader
        show={profile.pending}
        color="primary"
        text="Signing you up.."
      />
    </React.Fragment>
  );
};

const mapDispatchToProps = { createProfileSuccess, createProfileFail };

export default connect(null, mapDispatchToProps)(CreateProfileForm);
