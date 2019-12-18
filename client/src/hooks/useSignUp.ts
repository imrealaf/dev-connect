/**
 *  useLogin
 *
 *  @type Custom Hook
 *  @desc handles sign up form validation, errors and submission
 */
import { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import axios from "axios";

import config from "../constants/config";
import { RequestError } from "../types/Request";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

export default () => {
  /* 
    Create state
  */
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState([]) as any;
  const [valid, setValid] = useState(false) as any;
  const [pending, setPending] = useState(false) as any;
  const [submitted, setSubmitted] = useState(false) as any;

  /* 
    On data update
  */
  useEffect(() => {
    let firstNameValid = data.firstName;
    let lastNameValid = data.lastName;
    let emailValid = data.email && validator.isEmail(data.email);
    let passwordValid =
      data.password &&
      data.password.length <= config.auth.minPasswordLength &&
      data.password === data.passwordConfirm;

    if (firstNameValid && lastNameValid && emailValid && passwordValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  /*
   *  Error handling functions
   */

  const passwordNotValid = () => {
    return (
      data.password && data.password.length < config.auth.minPasswordLength
    );
  };

  const passwordsDontMatch = () => {
    return data.passwordConfirm && data.password !== data.passwordConfirm;
  };

  const hasError = (name: string) => {
    if (errors.length > 0) {
      const error = errors.filter(
        (error: RequestError) => error.param === name
      );
      return error.length === 1 ? true : false;
    } else {
      return false;
    }
  };

  const getError = (name: string): RequestError => {
    return errors.filter((error: RequestError) => error.param === name)[0];
  };

  /* 
    On change handler
  */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
    if (hasError(target.name) && submitted) setErrors([]);
  };

  /* 
    On submit handler
  */
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSubmitted(true);

    if (valid) {
      setPending(true);
      setTimeout(submit, config.http.requestDelay);
    }
  };

  /* 
    Submit
  */
  const submit = async () => {
    try {
      const response = await axios.post(
        "/api/users",
        JSON.stringify(data),
        config.http.postConfig
      );
      setPending(false);
      console.log(response.data);
    } catch (error) {
      const errors: RequestError[] = error.response.data.errors;
      console.error(errors);
      setPending(false);
      setErrors(errors);
    }
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
    onChangeHandler,
    onSubmitHandler,
    passwordNotValid,
    passwordsDontMatch,
    hasError,
    getError
  };
};
