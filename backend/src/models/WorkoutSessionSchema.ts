import mongoose, { Schema } from "mongoose";

const WorkoutSessionSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    workout: { type: Schema.Types.ObjectId, ref: "Workout" },
  });
  
  export const WorkoutSessionModel = mongoose.model(
    "WorkoutSession",
    WorkoutSessionSchema
  );
  