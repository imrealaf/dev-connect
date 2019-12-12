import mongoose from "mongoose";

import config from "./config";

export default async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected..");
  } catch (error) {
    console.log(error.message);
    // Exit process with failure
    process.exit(1);
  }
};
