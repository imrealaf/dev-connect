import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { IAuthRequest } from "../typedefs/Auth";
import { User, Post } from "../models";
import { remove } from "fs-extra";

export const createPost = async (req: IAuthRequest, res: Response) => {
  // Get errors array
  const errors = validationResult(req);

  // If errors, send 400 ..
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Get user
    const user = await User.findById(req.user.id).select("-password");

    // Get user fields needed
    const { firstName, lastName, avatar } = user;

    // Create new post object
    const newPost = {
      text: req.body.text,
      name: `${firstName} ${lastName}`,
      avatar,
      user: req.user.id
    };

    // Create and save post
    const post = new Post(newPost);
    await post.save();

    // Send back post
    res.json(post);

    // Server error ..
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    if (!posts) {
      return res.status(400).json({ msg: "No posts found" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }

    res.status(500).send("Server error");
  }
};

export const deletePost = async (req: IAuthRequest, res: Response) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id);

    // If doesn't exist
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }

    // Check if user can actually delete
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "User not authorized to delete post"
      });
    }

    // Delete post
    await post.remove();

    // Send back message
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    console.log(req);
    // No post found error
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }

    res.status(500).send("Server error");
  }
};

export const likePost = async (req: IAuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }

    // Check if post is already liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post has already been liked" });
    }

    // Add like
    const user = { user: req.user.id } as any;
    post.likes.unshift(user);

    // Save
    await post.save();

    // return likes
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }

    res.status(500).send("Server error");
  }
};

export const unlikePost = async (req: IAuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }

    // Check if post hasn't been liked liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post hasn't been liked yet" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // Remove like
    post.likes.splice(removeIndex, 1);

    // Save
    await post.save();

    // return likes
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }

    res.status(500).send("Server error");
  }
};
