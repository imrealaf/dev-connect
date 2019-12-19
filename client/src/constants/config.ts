/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

const NAMESPACE = "dc";

export default {
  appName: "DevConnect",
  namespace: NAMESPACE,
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
    },
    tokenStorageName: `${NAMESPACE}_token`
  },
  http: {
    requestDelay: 2000,
    responseDelay: 0,
    postConfig: {
      headers: {
        "Content-Type": "application/json"
      }
    }
  },
  sanitizeHtml: {
    allowedAttributes: {
      "*": ["href", "data-*", "alt", "class"]
    }
  }
};
