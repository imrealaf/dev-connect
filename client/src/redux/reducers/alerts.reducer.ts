import { AnyAction } from "redux";

import * as types from "../actionTypes";
import { IAlert } from "../../types/Alert";

const initialState = [] as any;

export default (state: any = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ALERT:
      return [...state, payload];
    case types.REMOVE_ALERT:
      return state.filter((alert: IAlert) => alert.id !== payload);
    default:
      return state;
  }
};
