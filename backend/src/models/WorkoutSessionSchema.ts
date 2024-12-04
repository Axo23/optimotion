import mongoose from "mongoose";

const WorkoutSessionSchema = new mongoose.Schema({
    sessionID: { type: String, required: true },
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" }, // Reference to Workout
  });
  
  export const WorkoutSessionModel = mongoose.model(
    "WorkoutSession",
    WorkoutSessionSchema
  );
  