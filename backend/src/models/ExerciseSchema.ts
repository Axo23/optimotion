import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  primaryMuscles: [{ type: String, required: true }],
  secondaryMuscles: [{ type: String, required: false }],
  level: { type: String, required: true },
  equipment: { type: String, required: true },
  instructions: [{ type: String, required: true }],
  force: {type: String, required: true},
  mechanic: {type: String, required: true},
});

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
