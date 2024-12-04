import mongoose from "mongoose";

const WorkoutLogSchema = new mongoose.Schema({
    logID: { type: String, required: true },
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    exercise: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
    duration: { type: Number, required: true },
  });
  
  export const WorkoutLogModel = mongoose.model("WorkoutLog", WorkoutLogSchema);
  