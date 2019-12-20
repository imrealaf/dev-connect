/**
 *  useLogout
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { useDispatch } from "react-redux";

import { doLogout } from "../redux/actions/auth.actions";

export default () => {
  // Get dispatch
  const dispatch = useDispatch();

  /* 
    Log out function
  */
  const logout = () => {
    dispatch(doLogout());
  };

  /* 
    Return data for component consumption
  */
  return logout;
};
