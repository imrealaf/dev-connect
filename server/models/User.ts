import { Schema, Model, model } from "mongoose";
import { IUser } from "../typedefs/User";

// User schema
export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.fullName = function(): string {
  return this.firstName.trim() + " " + this.lastName.trim();
};

// User model
export const User: Model<IUser> = model<IUser>("user", UserSchema);
