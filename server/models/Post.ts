import { createSchema, Type, typedModel } from "ts-mongoose";
import { UserSchema } from "./User";

export const PostSchema = createSchema({
  user: Type.ref(Type.objectId()).to("user", UserSchema),
  text: Type.string({ required: true }),
  name: Type.string(),
  avatar: Type.string(),
  likes: Type.array().of({
    user: Type.ref(Type.objectId()).to("Comment", UserSchema)
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

export const Post = typedModel("post", PostSchema);
