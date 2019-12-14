import { Request, Response } from "express";
import { validationResult } from "express-validator";
import request from "request";

import { IAuthRequest } from "../typedefs/Auth";
import { User } from "../models/User";
import { Post } from "../models/Post";

/* ------------------ PROFILES ----------------- */

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
      user: user
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

// export const deleteProfile = async (req: IAuthRequest, res: Response) => {
//   try {
//     // Remove profile
//     await Profile.findOneAndRemove({
//       user: req.user.id
//     });

//     // Remove user
//     await User.findOneAndRemove({
//       _id: req.user.id
//     });

//     res.json({ msg: "User and all information deleted" });
//   } catch (error) {
//     console.error(error.message);

//     res.status(500).send("Server error");
//   }
// };
