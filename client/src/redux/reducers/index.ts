import { combineReducers } from "redux";

import alerts from "./alerts.reducer";
import auth from "./auth.reducer";
import profile from "./profile.reducer";

export default combineReducers({
  alerts,
  auth,
  profile
});
