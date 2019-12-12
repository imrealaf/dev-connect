import { Router } from "express";

import * as controller from "../controllers/users.controller";
import * as validator from "../validators/users.validator";

const router: Router = Router();

// @route   POST api/users
// @desc    create user
// @access  public
router.post("/", validator.validateCreateUser, controller.createUser);

export default router;
