/**
 *  useLogout
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as routes from "../constants/routes";
import { doLogout } from "../redux/actions/auth.actions";

export default () => {
  // Get history
  const history = useHistory();

  // Get dispatch
  const dispatch = useDispatch();

  /* 
    Log out function
  */
  const logout = () => {
    dispatch(doLogout());
    history.push(routes.LANDING);
  };

  /* 
    Return data for component consumption
  */
  return logout;
};
