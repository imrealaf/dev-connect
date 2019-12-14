import { Request, Response } from "express";
import { validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  // Get errors array
  const errors = validationResult(req);

  // If errors, send 400 ..
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure data
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  try {
    let user = await User.findOne({ email });

    // If user exists ..
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }]
      });
    }

    // Get users gravatar ..
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    // Create user object
    user = new User({
      firstName,
      lastName,
      email,
      avatar,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

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
    console.error();
    res.status(500).send("Server error:" + error.message);
  }
};
