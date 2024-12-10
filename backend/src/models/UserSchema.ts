import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  fitnessLevel: { type: String },
  goals: [{ type: String }],
  weight: { type: Number },
  height: { type: Number },
});

export const UserModel = mongoose.model("User", UserSchema);
