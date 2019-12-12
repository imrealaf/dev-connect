import express, { Request, Response } from "express";
import compression from "compression"; // compresses requests
import path from "path";

import connectDB from "./db"; // uncomment if connecting to db
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profiles";

// Create Express server
const app = express();

// Connect DB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(compression());
app.use(express.json());

// Serve any static files
app.use(express.static(path.resolve(__dirname, "public")));

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

// Handle React routing, return all requests to React app in production
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

export default app;
