import { combineReducers } from "redux";

import alerts from "./alerts.reducer";
import auth from "./auth.reducer";

export default combineReducers({
  alerts,
  auth
});
