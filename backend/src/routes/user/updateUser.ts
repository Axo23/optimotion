import { IGetUserAuthInfoRequest } from "../../types/requests";
import { Response } from "express";
import { UserModel } from "../../models/UserSchema";
import { hashPassword } from "../../utils/hashPassword";
import { JwtPayload } from "jsonwebtoken";
import { UserData } from "../../types/userData";

export const updateUser = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  const userId = (req.user as JwtPayload)?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Destructure user fields from the request body
  const { name, email, password, age, weight, height, fitnessLevel, goals, /*userNotes*/ }: Partial<UserData> = req.body;

  try {
    // Create an object to store update data
    const updateData: Partial<UserData> = {
      name,
      email,
      age,
      weight,
      height,
      fitnessLevel,
      goals,
      //userNotes,
    };

    // Hash the password if it’s being updated
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Filter out undefined or null values
    const sanitizedUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== null)
    );

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizedUpdateData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
