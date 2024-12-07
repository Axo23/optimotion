import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
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
