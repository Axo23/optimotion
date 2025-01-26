
import mongoose, { Schema } from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "WorkoutExercise" }],
  });
  
  export const WorkoutSchemaModel = mongoose.model("Workout", WorkoutSchema);