import { UserModel } from "../models/UserSchema";
import { UserData } from "../types/userData";

export const saveUserData = async (userId: string, updates: Partial<UserData>): Promise<UserData | null> => {
    try {
      const sanitizedUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null)
      );
      console.log("Sanitized Updates:", sanitizedUpdates);
      const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizedUpdates, { new: true });
      return updatedUser;
    } catch (error) {
      console.error("Error saving user data:", error);
      throw new Error("Failed to save user data.");
    }
  };
