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

import config from "../constants/config";
import * as routes from "../constants/routes";
import * as authCodes from "../constants/authCodes";

const initialData = {
  username: "",
  password: ""
};

export default () => {
  // Get history
  const history = useHistory();
  /* 
    Create state
  */
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(false);
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
  }, [data]);

  /* 
    Login function
  */
  const login = async () => {
    // try {
    //   await authModel.doSignInWithEmailAndPassword(username, password);
    //   if (submitted) setPending(false);
    //   history.push(routes.DASHBOARD);
    // } catch (error) {
    //   if (error) setPending(false);
    //   handleAuthError(error);
    // }
  };

  /* 
    On change handler
  */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
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
      setTimeout(login, 2000);
    }
  };

  /* 
    Validate username function
  */
  const validUsername = () => {
    return data.username && validator.isEmail(data.username);
  };

  /* 
    Validate password function
  */
  const validPassword = () => {
    return (
      data.password && data.password.length >= config.auth.minPasswordLength
    );
  };

  /* 
    Handle auth error function
  */
  const handleAuthError = (authError: any) => {
    // switch (authError.code) {
    //   // Focus on username
    //   case authCodes.ERROR_USERNAME:
    //   case authCodes.ERROR_NOT_FOUND:
    //     usernameRef.current.focus();
    //     setUsernameError(authError.message);
    //     break;
    //   // Focus on password
    //   case authCodes.ERROR_PASSWORD:
    //   case authCodes.ERROR_TOO_MANY_ATTEMPTS:
    //     passwordRef.current.focus();
    //     setPasswordError(authError.message);
    //     break;
    // }
  };

  /* 
    Return data for component consumption
  */
  return {
    data,
    error,
    valid,
    pending,
    submitted,
    onSubmitHandler,
    onChangeHandler,
    validUsername,
    validPassword
  };
};
