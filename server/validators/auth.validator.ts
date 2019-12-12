import { check } from "express-validator";
import auth from "../constants/auth";

export const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", `Password is required`).exists()
];
