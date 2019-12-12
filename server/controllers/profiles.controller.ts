import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";
import { IAuthRequest } from "../typedefs/Auth";
import { User } from "../models/User";
import { Profile } from "../models/Profile";

export const getCurrentProfile = async (req: IAuthRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["firstName", "lastName", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const createProfile = async (req: IAuthRequest, res: Response) => {
  // Get errors array
  const errors = validationResult(req);

  // If errors, send 400 ..
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure data
  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Start building profile object ..
  const profileFields = {} as any;
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.company = company;
  if (bio) profileFields.company = company;
  if (status) profileFields.status = status;
  if (githubUsername) profileFields.company = company;
  if (skills) {
    profileFields.skills = skills
      .split(",")
      .map((skill: string) => skill.trim());
  }

  // Build social object ..
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  // Check if user exists
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // If profiles exists, update ..
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      // Return profile
      return res.json(profile);
    }

    // Profile doesn't exist, so create profile ..
    profile = new Profile(profileFields);

    // Save profile
    await profile.save();

    // Return profile
    res.json(profile);

    // Server error ..
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
