import mongoose from "mongoose";

import mongoConfig from "./constants/mongo";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, mongoConfig);
    console.log("MongoDB connected..");
  } catch (error) {
    console.log(error.message);
    // Exit process with failure
    process.exit(1);
  }
};
