import { createSchema, Type, typedModel } from "ts-mongoose";
import { UserSchema } from "./User";

export const ProfileSchema = createSchema({
  user: Type.ref(Type.objectId()).to("user", UserSchema),
  company: Type.string(),
  website: Type.string(),
  location: Type.string(),
  status: Type.string({ required: true }),
  skills: Type.array({ required: true }).of(Type.string({ required: true })),
  bio: Type.string(),
  githubUsername: Type.string(),
  experience: Type.array().of({
    title: Type.string({ required: true }),
    company: Type.string({ required: true }),
    location: Type.string(),
    from: Type.date({ required: true }),
    to: Type.date(),
    current: Type.string(),
    description: Type.string()
  }),
  education: Type.array().of({
    school: Type.string({ required: true }),
    degree: Type.string({ required: true }),
    fieldOfStudy: Type.string({ required: true }),
    from: Type.date({ required: true }),
    to: Type.date(),
    current: Type.boolean({ default: false }),
    description: Type.string()
  }),
  social: {
    youtube: Type.string(),
    twitter: Type.string(),
    facebook: Type.string(),
    linkedin: Type.string(),
    instagram: Type.string()
  },
  date: Type.date({ default: Date.now as any })
});

export const Profile = typedModel("profile", ProfileSchema);
