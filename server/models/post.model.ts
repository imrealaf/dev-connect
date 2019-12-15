import { createSchema, Type, typedModel } from "ts-mongoose";
import { UserSchema } from "./user.model";

/*
    Create post schema
*/
export const PostSchema = createSchema({
  user: Type.ref(Type.objectId()).to("user", UserSchema),
  text: Type.string({ required: true }),
  name: Type.string(),
  avatar: Type.string(),
  likes: Type.array().of({
    user: Type.ref(Type.objectId()).to("user", UserSchema)
  }),
  comments: Type.array().of({
    user: Type.ref(Type.objectId()).to("user", UserSchema),
    text: Type.string({ required: true }),
    name: Type.string(),
    avatar: Type.string(),
    date: Type.date({ default: Date.now as any })
  }),
  date: Type.date({ default: Date.now as any })
});

/*
    Export post schema
*/
export const Post = typedModel("post", PostSchema);
