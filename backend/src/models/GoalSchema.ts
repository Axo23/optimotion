import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const GoalSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: uuidv4 },
    userID: { type: String, required: true },
    description: { type: String, required: true },
  });
  
  export const GoalModel = mongoose.model("Goal", GoalSchema);
  