import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ExerciseSchema = new mongoose.Schema({
  exerciseID: { type: String, required: true, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  minRepetitions: { type: Number, required: true },
  maxRepetitions: { type: Number, required: true },
  sets: { type: Number, required: true },
  duration: { type: Number, required: true },
  superset: { type: Boolean, default: false },
  pauseTimer: { type: Number, required: true },
});

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
