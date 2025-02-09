import { UserModel } from "../models/UserSchema";
import { UserData } from "../types/userData";

export const saveUserData = async (userId: string, updates: Partial<UserData>): Promise<UserData | null> => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
      return updatedUser;
    } catch (error) {
      console.error("Error saving user data:", error);
      throw new Error("Failed to save user data.");
    }
  };
