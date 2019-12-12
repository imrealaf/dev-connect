import { check } from "express-validator";
import auth from "../constants/auth";

export const validateCreateUser = [
  check("firstName", "First name is required")
    .not()
    .isEmpty(),
  check("lastName", "Last name is required")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    `Please enter a password with ${auth.minPasswordLength} or more characters`
  ).isLength({ min: auth.minPasswordLength })
];
