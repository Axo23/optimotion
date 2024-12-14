import mongoose, { Schema, Document } from "mongoose";

const WorkoutLogSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    exercise: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutExercise" }],
    duration: { type: Number, required: true },
  });
  
  export const WorkoutLogModel = mongoose.model("WorkoutLog", WorkoutLogSchema);
  