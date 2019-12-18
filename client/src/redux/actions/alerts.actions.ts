import uuid from "uuid";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";

import * as types from "../actionTypes";
import { IAlert } from "../../types/Alert";

const setAlert = (payload: IAlert): AnyAction => {
  return {
    type: types.SET_ALERT,
    payload: payload
  };
};

export const doSetAlert = (message: string, type: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const id = uuid.v4();
  dispatch(
    setAlert({
      id,
      message,
      type
    })
  );
};

const removeAlert = (payload: string): AnyAction => {
  return {
    type: types.REMOVE_ALERT,
    payload: payload
  };
};

export const doRemoveAlert = (id: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(removeAlert(id));
};
