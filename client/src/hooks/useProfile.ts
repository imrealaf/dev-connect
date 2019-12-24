/**
 *  useProfile
 *
 *  @type Custom Hook
 *  @desc handles sign up form validation, errors and submission
 */
import { FormEvent } from "react";
import { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { RequestError } from "../types/Request";
import { CreateProfileState } from "../types/Profile";

const initialData: CreateProfileState = {};

export default (success: any, fail: any, profileData: any = null) => {
  /* 
    Create state
  */
  const [data, setData] = useState(profileData ? profileData : initialData);
  const [errors, setErrors] = useState([]) as any;
  const [valid, setValid] = useState(false) as any;
  const [pending, setPending] = useState(false) as any;
  const [submitted, setSubmitted] = useState(false) as any;

  /* 
    On data update
  */
  useEffect(() => {
    let valid = true;
    if (valid) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  /*
   *  Error handling functions
   */

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
        routes.API_USERS,
        JSON.stringify(data),
        config.http.postConfig
      );
      setPending(false);
      success(response.data);
    } catch (error) {
      const errors: RequestError[] = error.response.data.errors;
      console.error(errors);
      setPending(false);
      setErrors(errors);
      fail();
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
    hasError,
    getError
  };
};
