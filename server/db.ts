import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
