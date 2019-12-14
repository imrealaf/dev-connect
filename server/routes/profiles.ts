import { Router } from "express";

import authMiddleware from "../middleware/auth";
import * as controller from "../controllers/profiles.controller";
import * as validator from "../validators/profile.validator";

const router: Router = Router();

/* ------------------ PROFILES ----------------- */

// @route   GET api/profiles/me
// @desc    get current users profile
// @access  private
router.get("/me", authMiddleware, controller.getCurrentProfile);

// @route   GET api/profiles
// @desc    get all profiles
// @access  public
router.get("/", controller.getAllProfiles);

// @route   GET api/profiles/:id
// @desc    get profile by id
// @access  public
router.get("/:id", controller.getProfileById);

// @route   POST api/profiles
// @desc    create profile
// @access  private
router.post(
  "/",
  authMiddleware,
  validator.validateCreateProfile,
  controller.createProfile
);

// @route   DELETE api/profiles
// @desc    delete profile, user & posts
// @access  private
router.delete("/", authMiddleware, controller.deleteProfile);

// @route   GET api/profiles/github/:username
// @desc    get repos from github
// @access  public
router.get("/github/:username", controller.getGithubRepos);

/* ------------------ EXPERIENCE ----------------- */

// @route   PUT api/profiles/experience
// @desc    add profile experience
// @access  private
router.put(
  "/experience",
  authMiddleware,
  validator.validateAddExperience,
  controller.addExperience
);

// @route   DELETE api/profiles/experience
// @desc    delete experience from profile
// @access  private
router.delete("/experience/:id", authMiddleware, controller.deleteExperience);

/* ------------------ EDUCATION ----------------- */

// @route   PUT api/profiles/education
// @desc    add profile education
// @access  private
router.put(
  "/education",
  authMiddleware,
  validator.validateAddEducation,
  controller.addEducation
);

// @route   DELETE api/profiles/education
// @desc    delete education from profile
// @access  private
router.delete("/education/:id", authMiddleware, controller.deleteEducation);

export default router;
