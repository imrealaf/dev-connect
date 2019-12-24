/**
 *  Auth Actions
 *
 *  @type Actions & Action Creators
 *  @desc actions for auth
 */

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";

import * as routes from "../../constants/routes";
import { AuthPayload, AuthUserPayload } from "../../types/Auth";
import * as types from "../actionTypes";
import * as auth from "../../utils/auth";
import { clearProfile } from "./profile.actions";

/*
    --------- CURRENT USER -----------
*/
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

export const getCurrentUser = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  // Check token
  auth.checkAuthToken();

  // Login success ..
  try {
    const response = await axios.get(routes.API_AUTH);
    dispatch(authSuccess(response.data));

    // Login fail ..
  } catch (error) {
    dispatch(authFail());
  }
};

/*
    --------- SIGN UP -----------
*/
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

/*
    --------- LOG IN -----------
*/

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

export const doLogin = (token: any): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(loginSuccess(token));
  dispatch(getCurrentUser());
};

/*
    --------- LOG OUT -----------
*/

export const logout = (): AnyAction => {
  return {
    type: types.LOGOUT
  };
};

export const doLogout = (): any => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(logout());
  dispatch(clearProfile());
};
