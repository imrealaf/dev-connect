/**
 *  useAuth
 *
 *  @type Custom Hook
 *  @desc to do ..
 */

import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

import { doAuth } from "../redux/actions/auth.actions";

export default () => {
  const dispatch = useDispatch();
  const store = useStore();

  /*
   *  On mount ..
   */
  useEffect(() => {
    dispatch(doAuth());
  }, []);

  /* 
    Return data for component consumption
  */
  return store.getState().auth.isAuthenticated;
};
