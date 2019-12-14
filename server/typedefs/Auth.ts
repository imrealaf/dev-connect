import { Request } from "express";

type AuthUser = {
  id: string;
};

export interface IAuthRequest extends Request {
  user: AuthUser;
}
