import mongoose, { Model } from "mongoose";
import { UserData } from "../types/userData";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, min: 10, max: 99, required: true },
  age: { type: Number },
  weight: { type: Number, min: 20, max: 600 },
  height: { type: Number, min: 50, max: 275 },
  fitnessLevel: { type: String },
  goals: [{ type: String }],
  userNotes: [{ type: String }],
});

export const UserModel: Model<UserData> = mongoose.model<UserData>("User", UserSchema);
