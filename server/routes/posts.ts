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

// @route   GET api/posts
// @desc    get all posts
// @access  private
router.get("/", authMiddleware, controller.getAllPosts);

// @route   GET api/posts/:id
// @desc    get post by id
// @access  private
router.get("/:id", authMiddleware, controller.getPostById);

// @route   DELETE api/posts/:id
// @desc    delete a post
// @access  private
router.delete("/:id", authMiddleware, controller.deletePost);

// @route   PUT api/posts/like/:id
// @desc    like a post
// @access  private
router.put("/like/:id", authMiddleware, controller.likePost);

// @route   PUT api/posts/unlike/:id
// @desc    unlike a post
// @access  private
router.put("/unlike/:id", authMiddleware, controller.unlikePost);

// @route   POST api/posts/comment/:id
// @desc    comment on a post
// @access  private
router.post(
  "/comment/:id",
  authMiddleware,
  validator.validateAddComment,
  controller.addComment
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    delete a comment
// @access  private
router.delete(
  "/comment/:id/:comment_id",
  authMiddleware,
  controller.deleteComment
);

export default router;
