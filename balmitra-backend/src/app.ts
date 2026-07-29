import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Route
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Balmitra Backend is Running 🚀",
  });
});

export default app;