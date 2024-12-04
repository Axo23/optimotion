import mongoose from "mongoose";

const ProgressTrackerSchema = new mongoose.Schema({
    trackerID: { type: String, required: true },
    userID: { type: String, required: true },
    workoutLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutLog" }],
    weightLog: { type: Map, of: Number },
  });
  
  export const ProgressTrackerModel = mongoose.model(
    "ProgressTracker",
    ProgressTrackerSchema
  );
  