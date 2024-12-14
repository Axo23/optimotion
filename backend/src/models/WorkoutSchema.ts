import mongoose, { Schema, Document } from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutExercise" }], // Reference to Exercise
    duration: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  });
  
  export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
  