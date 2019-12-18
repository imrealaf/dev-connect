/**
 *  useLogin
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import axios from "axios";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { RequestError } from "../types/Request";
import { LoginFormState } from "../types/Auth";

const initialData: LoginFormState = {
  email: "",
  password: ""
};

export default (success: any, fail: any) => {
  // Get history
  const history = useHistory();
  /* 
    Create state
  */
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState([]) as any;
  const [valid, setValid] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* 
    Run when username or password is updated
  */
  useEffect(() => {
    if (validUsername() && validPassword()) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  /* 
    On change handler
  */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
    if (hasError() && submitted) setErrors([]);
  };

  /* 
    Submit handler
  */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSubmitted(true);

    if (valid) {
      setPending(true);
      setTimeout(submit, 2000);
    }
  };

  /* 
    Submit function
  */
  const submit = async () => {
    // Login success ..
    try {
      const response = await axios.post(
        "/api/auth",
        JSON.stringify(data),
        config.http.postConfig
      );

      // Set not pending
      setPending(false);

      // Dispatch success action
      success(response.data);

      // Redirect to dashboard
      history.push(routes.DASHBOARD);

      // Login fail ..
    } catch (error) {
      // Get and log errors
      const errors: RequestError[] = error.response.data.errors;
      console.error(errors);

      // Set and dispatch errors
      setPending(false);
      setErrors(errors);
      fail();
    }
  };

  /* 
    Validate username function
  */
  const validUsername = () => {
    return data.email && validator.isEmail(data.email);
  };

  /* 
    Validate password function
  */
  const validPassword = () => {
    return (
      data.password && data.password.length >= config.auth.minPasswordLength
    );
  };

  const hasError = () => {
    return errors.length > 0;
  };

  const getError = (): RequestError => {
    return errors[0];
  };

  /* 
    Return data for component consumption
  */
  return {
    data,
    errors,
    valid,
    pending,
    submitted,
    onSubmitHandler,
    onChangeHandler,
    validUsername,
    validPassword,
    hasError,
    getError
  };
};
