import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import * as controller from "../controllers/posts.controller";
import * as validator from "../validators/post.validator";

const router: Router = Router();

// @route   POST api/posts
// @desc    create post
// @access  private
router.post(
  "/",
  authMiddleware,
  validator.validateCreatePost,
  controller.createPost
);

export default router;
