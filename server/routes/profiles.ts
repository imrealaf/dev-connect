import { Router } from "express";

import authMiddleware from "../middleware/auth";
import * as controller from "../controllers/profiles.controller";
import * as validator from "../validators/profile.validator";

const router: Router = Router();

// @route   GET api/profiles/me
// @desc    get current users profile
// @access  private
router.get("/me", authMiddleware, controller.getCurrentProfile);

// @route   POST api/profiles
// @desc    create profile
// @access  private
router.post(
  "/",
  authMiddleware,
  validator.validateCreateProfile,
  controller.createProfile
);

export default router;
