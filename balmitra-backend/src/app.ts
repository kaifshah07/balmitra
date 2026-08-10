import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes";
import path from "path";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
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