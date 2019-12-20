/**
 *  Store
 *
 *  @type Redux store
 */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Create initial state
const initialState = {};

// Create middleware
const middleware = [thunk];

// Create store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
