/**
 *  Action Types
 *
 *  @type Constants
 */

import config from "../constants/config";

// ALERTS
export const SET_ALERT = `${config.namespace}/SET_ALERT`;
export const REMOVE_ALERT = `${config.namespace}/REMOVE_ALERT`;

// AUTH
export const SIGNUP_SUCCESS = `${config.namespace}/SIGNUP_SUCCESS`;
export const SIGNUP_FAIL = `${config.namespace}/SIGNUP_FAIL`;
export const LOGIN_SUCCESS = `${config.namespace}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${config.namespace}/LOGIN_FAIL`;
export const AUTH_SUCCESS = `${config.namespace}/AUTH_SUCCESS`;
export const AUTH_FAIL = `${config.namespace}/AUTH_FAIL`;
export const LOGOUT = `${config.namespace}/LOGOUT`;

// PROFILE
export const GET_PROFILE = `${config.namespace}/GET_PROFILE`;
export const PROFILE_ERROR = `${config.namespace}/PROFILE_ERROR`;
export const CLEAR_PROFILE = `${config.namespace}/CLEAR_PROFILE`;
export const CREATE_PROFILE_SUCCESS = `${config.namespace}/CREATE_PROFILE_SUCCESS`;
export const CREATE_PROFILE_FAIL = `${config.namespace}/CREATE_PROFILE_FAIL`;
