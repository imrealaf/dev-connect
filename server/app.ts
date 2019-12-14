import "./secrets";
import express, { Request, Response } from "express";
import compression from "compression";
import path from "path";

import connectDB from "./db";
import routes from "./routes";

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

// Register API routes
for (const route in routes) {
  app.use(`/api/${route}`, routes[route]);
}

// Handle React routing, return all requests to React app in production
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

export default app;
