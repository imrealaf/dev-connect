/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

export default {
  appName: "DevConnect",
  namespace: "dc",
  meta: {
    titleSeperator: "-"
  },
  preload: {
    delayTime: 1500
  },
  auth: {
    minPasswordLength: 6,
    validationErrors() {
      return {
        usernameValidEmail: "Not a valid email",
        passwordMinLength: `Password must be at least ${this.minPasswordLength} chars`,
        passwordMatch: `Confirmed password must match the above`
      };
    }
  }
};
