import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token as string, JWT_PASSWORD);
    //@ts-ignore
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Invalid Token",
    });
  }
};
