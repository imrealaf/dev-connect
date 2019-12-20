/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

import * as routes from "./routes";

export const publicNav = [
  {
    title: "Browse Developers",
    path: routes.DEVELOPERS
  }
];

export const privateNav = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD
  },
  {
    title: "Posts",
    path: routes.POSTS
  },
  {
    title: "My Profile",
    path: routes.PROFILE
  }
];
