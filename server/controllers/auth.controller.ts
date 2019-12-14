import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IAuthRequest } from "../typedefs/Auth";
import { User } from "../models/User";

export const getAuthUser = async (req: IAuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const postAuthUser = async (req: Request, res: Response) => {
  // Get errors array
  const errors = validationResult(req);

  // If errors, send 400 ..
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure data
  const { email, password } = req.body;

  // Check if user exists
  try {
    let user = await User.findOne({ email });

    // If user exists ..
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid credentials" }]
      });
    }

    // Check is password matches
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match ..
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "Invalid credentials" }]
      });
    }

    // Return JWT
    jwt.sign(
      // Payload
      {
        user: {
          id: user.id
        }
      },
      // Secret
      process.env.JWT_SECRET,
      // Expiry
      { expiresIn: 360000 },
      // Callback
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );

    // Server error ..
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
