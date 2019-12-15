import { check } from "express-validator";

export const validateCreatePost = [
  check("text", "Post text is required")
    .not()
    .isEmpty()
];

export const validateAddComment = [
  check("text", "Post text is required")
    .not()
    .isEmpty()
];
