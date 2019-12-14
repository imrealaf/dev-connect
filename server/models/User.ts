import { createSchema, Type, typedModel } from "ts-mongoose";

export const UserSchema = createSchema({
  firstName: Type.string({ required: true }),
  lastName: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  avatar: Type.string({ required: true }),
  date: Type.date({ default: Date.now as any })
});

UserSchema.methods.fullName = function(): string {
  return this.firstName.trim() + " " + this.lastName.trim();
};

export const User = typedModel("user", UserSchema);
