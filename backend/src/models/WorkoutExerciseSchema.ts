import mongoose from "mongoose";
import { ExerciseModel } from "./ExerciseSchema";

const WorkoutExerciseSchema = new mongoose.Schema({
  ...ExerciseModel.schema.obj,
  description: { type: String, required: false },
  minRepetitions: { type: Number, required: false },
  maxRepetitions: { type: Number, required: false },
  sets: { type: Number, required: true, default:1 },
  duration: { type: Number, required: false },
  superset: { type: Boolean, default: false },
  pauseTimer: { type: Number, required: false },
});

export const WorkoutExerciseModel = mongoose.model(
  "WorkoutExercise",
  WorkoutExerciseSchema
);
