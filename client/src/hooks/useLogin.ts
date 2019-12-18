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
import { RequestError } from "../types/Request";

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
  }, [data]);

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
      setTimeout(submit, 2000);
    }
  };

  /* 
    Submit function
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
    validPassword
  };
};
