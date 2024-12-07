import mongoose, { Schema, Document } from "mongoose";

const WorkoutSessionSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" }, // Reference to Workout
  });
  
  export const WorkoutSessionModel = mongoose.model(
    "WorkoutSession",
    WorkoutSessionSchema
  );
  