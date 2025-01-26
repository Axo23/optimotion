import mongoose, { Schema } from "mongoose";

const WorkoutExerciseSchema = new mongoose.Schema({
  exerciseID: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
  reps: { type: Number, required: false },
  sets: { type: Number, required: true, default:1 },
  notes: { type: String, required: false },
});

export const WorkoutExerciseModel = mongoose.model(
  "WorkoutExercise",
  WorkoutExerciseSchema
);