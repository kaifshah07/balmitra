import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes";
import path from "path";
import { env } from "./config/env";

const app = express();

// Security
app.use(helmet());

const allowedOrigins = new Set([
  "http://localhost:3000",
  "https://balmitra.vercel.app",
  ...env.CORS_ORIGINS,
]);

// CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || /^https:\/\/[^/]+\.vercel\.app$/.test(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Balmitra Backend API is Running 🚀",
  });
});

// API Routes
app.use("/api", routes);
app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));
export default app;
