import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import { IAuthRequest } from "../typedefs/Auth";

export default (req: IAuthRequest, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({
      msg: "No access token. Authorization denied"
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    req.user = decoded.user;
    next();

    // Token not valid ..
  } catch (error) {
    return res.status(401).json({
      msg: "Token is not valid"
    });
  }
};
