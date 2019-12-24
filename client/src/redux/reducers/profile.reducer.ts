/**
 *  Profile Reducer
 *
 *  @type Reducer
 */

import { AnyAction } from "redux";

import * as types from "../actionTypes";
import { ProfileState } from "../../types/Profile";

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default (state: ProfileState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PROFILE:
      return { ...state, profile: payload, loading: false };

    case types.PROFILE_ERROR:
      return { ...state, error: payload, loading: false };

    case types.CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    default:
      return state;
  }
};
