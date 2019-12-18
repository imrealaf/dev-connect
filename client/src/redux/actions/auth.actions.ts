import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";

import config from "../../constants/config";
import { AuthPayload, AuthUserPayload } from "../../types/Auth";
import { RequestError } from "../../types/Request";
import * as types from "../actionTypes";
import * as auth from "../../utils/auth";

export const authSuccess = (payload: AuthUserPayload): AnyAction => {
  return {
    type: types.AUTH_SUCCESS,
    payload: payload
  };
};

export const authFail = (): AnyAction => {
  return {
    type: types.AUTH_FAIL
  };
};

export const doAuth = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // Check token
  auth.checkAuthUser();

  // Login success ..
  try {
    const response = await axios.get("/api/auth");
    dispatch(authSuccess(response.data));

    // Login fail ..
  } catch (error) {
    dispatch(authFail());
  }
};

export const signUpSuccess = (payload: AuthPayload): AnyAction => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: payload
  };
};

export const signUpFail = (): AnyAction => {
  return {
    type: types.SIGNUP_FAIL
  };
};

export const loginSuccess = (payload: AuthPayload): AnyAction => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: payload
  };
};

export const loginFail = (): AnyAction => {
  return {
    type: types.SIGNUP_FAIL
  };
};

export const logout = (): AnyAction => {
  return {
    type: types.LOGOUT
  };
};

export const doLogout = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(logout());
};
