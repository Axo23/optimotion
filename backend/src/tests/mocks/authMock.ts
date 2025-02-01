import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../types/requests";

export const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  req.user = { userId: "mockUserId" };
  next();
};
