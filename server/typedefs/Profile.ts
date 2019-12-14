import { Document, Schema } from "mongoose";

export type ProfileExperience = {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
};

export type ProfileEducation = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current: boolean;
  description?: string;
};

export type ProfileSocial = {
  youtube: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
};

export interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio: string;
  githubUsername: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  social: ProfileSocial;
  date: Date;
}
