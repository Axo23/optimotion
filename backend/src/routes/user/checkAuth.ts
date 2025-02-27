import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/interfaces";

export const checkAuth = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  res.status(200).json({ message: "Authenticated", user: req.user });
};
