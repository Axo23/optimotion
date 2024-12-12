import { IGetUserAuthInfoRequest } from "../../types/requests";
import { Response } from "express";
import { UserModel } from "../../models/UserSchema";
import { hashPassword } from "../../utils/hashPassword";
import { JwtPayload } from "jsonwebtoken";

export const updateUser = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  const userId = (req.user as JwtPayload)?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { name, email, password, age, weight, height, fitnessLevel, goals } = req.body;

  try {
    const updateData: Record<string, any> = {
      name,
      email,
      age,
      weight,
      height,
      fitnessLevel,
      goals,
    };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    await UserModel.findByIdAndUpdate(userId, updateData);
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
