import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { AuthPayload } from "../../types/Auth";
import * as types from "../actionTypes";

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
