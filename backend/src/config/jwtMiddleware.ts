import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/requests";

export const authenticateJWT = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.jwt;
  console.log("JWT Token:", token); // Debug
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log("Decoded JWT:", decoded); // Debug
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};
