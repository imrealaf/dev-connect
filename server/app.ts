/* Init dotenv secrets for non-prodution env */
import "./secrets";

import express, { Request, Response } from "express";
import compression from "compression";
import path from "path";

import clientConfig from "./constants/client";
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
app.use(express.static(path.resolve(__dirname, clientConfig.staticPath)));

// Register API routes
for (const route in routes) {
  app.use(`/api/${route}`, routes[route]);
}

// Handle React routing, return all requests to React app in production
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, clientConfig.indexPath()));
});

export default app;
