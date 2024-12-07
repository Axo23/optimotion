import mongoose, { Schema, Document } from "mongoose";

const ProgressTrackerSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workoutLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutLog" }],
    weightLog: { type: Map, of: Number },
  });
  
  export const ProgressTrackerModel = mongoose.model(
    "ProgressTracker",
    ProgressTrackerSchema
  );
  