import { check } from "express-validator";

export const validateCreateProfile = [
  check("status", "Status is required")
    .not()
    .isEmpty(),
  check("skills", "Skills are required")
    .not()
    .isEmpty()
];

export const validateAddExperience = [
  check("title", "Title is required")
    .not()
    .isEmpty(),
  check("company", "Company required")
    .not()
    .isEmpty(),
  check("from", "From date is required")
    .not()
    .isEmpty()
];

export const validateAddEducation = [
  check("school", "School is required")
    .not()
    .isEmpty(),
  check("degree", "Degree is required")
    .not()
    .isEmpty(),
  check("fieldOfStudy", "Field of study is required")
    .not()
    .isEmpty(),
  check("from", "From date is required")
    .not()
    .isEmpty()
];
