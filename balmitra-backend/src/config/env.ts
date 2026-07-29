import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/balmitra",

  JWT_SECRET:
    process.env.JWT_SECRET || "super-secret",

  JWT_EXPIRE:
    process.env.JWT_EXPIRE || "7d",

  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "refresh-secret",

  REFRESH_TOKEN_EXPIRE:
    process.env.REFRESH_TOKEN_EXPIRE || "30d",
};