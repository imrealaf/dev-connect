import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import * as controller from "../controllers/auth.controller";
import * as validator from "../validators/auth.validator";

const router: Router = Router();

// @route   GET api/auth
// @desc    authenicate user by get request
// @access  public
router.get("/", authMiddleware, controller.getAuthUser);

// @route   POST api/auth
// @desc    authenicate user by post request
// @access  public
router.post("/", validator.validateLogin, controller.postAuthUser);

export default router;
