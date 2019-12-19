import { AnyAction } from "redux";

import config from "../../constants/config";
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

    default:
      return state;
  }
};