import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });

    }

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

    if (decoded.role !== "CUSTOMER") {

      return res.status(403).json({
        success: false,
        message: "Customer access required",
      });

    }

    (req as any).customer = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};