/**
 *  Routes
 *
 *  @type Constants
 *  @desc define all route paths for the app
 */

import config from "./config";

// Public
export const LANDING = "/";
export const LOGIN = "/login";
export const SIGN_UP = "/sign-up";

// Private
export const DASHBOARD = "/dashboard";
export const DEVELOPERS = "/developers";
export const PROFILE = "/profile";
export const POSTS = "/posts";

// API
export const API_AUTH = `${config.apiBase}/auth`;
export const API_USERS = `${config.apiBase}/users`;
export const API_PROFILES = `${config.apiBase}/profiles`;
export const API_CURRENT_PROFILE = `${config.apiBase}/profiles/me`;
export const API_EXPERIENCE = `${config.apiBase}/profiles/experience`;
export const API_EDUCATION = `${config.apiBase}/profiles/education`;
