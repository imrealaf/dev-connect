import { Document, Schema } from "mongoose";

export type PostLike = {
  user: Schema.Types.ObjectId;
};

export type PostComment = {
  user: Schema.Types.ObjectId;
  text: string;
  name?: string;
  avatar?: string;
  date: string;
};

export interface IPost extends Document {
  user: Schema.Types.ObjectId;
  text: string;
  name?: string;
  avatar?: string;
  likes?: PostLike[];
  comments?: PostComment[];
  date: string;
}
