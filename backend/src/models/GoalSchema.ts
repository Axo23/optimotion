import mongoose, { Schema, Document } from "mongoose";

const GoalSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
  });
  
  export const GoalModel = mongoose.model("Goal", GoalSchema);
  