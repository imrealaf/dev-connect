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
  const [errors, setErrors] = useState({});
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
  }, [data]);

  /*
   *  Validations
   */

  const passwordNotValid = () => {
    return (
      data.password && data.password.length < config.auth.minPasswordLength
    );
  };

  const passwordsDontMatch = () => {
    return data.passwordConfirm && data.password !== data.passwordConfirm;
  };

  /* 
    On change handler
  */
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLFormElement;
    setData({ ...data, [target.name]: target.value.trim() });
  };

  /* 
    On submit handler
  */
  const onSubmitHandler = (e: FormEvent) => {};

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
    passwordsDontMatch
  };
};
