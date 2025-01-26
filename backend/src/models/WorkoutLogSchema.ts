import mongoose, { Schema } from "mongoose";

const WorkoutLogSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    workout: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    duration: { type: Number, required: true },
  });
  
  export const WorkoutLogModel = mongoose.model("WorkoutLog", WorkoutLogSchema);
  