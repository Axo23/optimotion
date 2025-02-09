import { Document } from "mongoose";

export interface UserData extends Document {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  fitnessLevel?: string | null;
  goals?: string[] | null;
  weight?: number | null;
  height?: number | null;
  userNotes?: string[] | null;
}

// Subset for operations where only specific fields are needed
export type UserDataSubset = Pick<UserData, "height" | "weight" | "fitnessLevel" | "goals" | "userNotes">;
