import { Response } from "express";
import { UserModel } from "../../models/UserSchema";
import { IGetUserAuthInfoRequest } from "../../types/interfaces";

export const profileUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const userId = (req.user as { id: string })?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
