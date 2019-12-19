import axios from "axios";

import config from "../constants/config";

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const hasAuthToken = (): boolean => {
  return getAuthToken() ? true : false;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(config.auth.tokenStorageName);
};

export const checkAuthToken = () => {
  if (hasAuthToken()) {
    setAuthToken(getAuthToken());
  }
};
