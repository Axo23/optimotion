import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    workoutID: { type: String, required: true },
    userID: { type: String, required: true },
    name: { type: String, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }], // Reference to Exercise
    duration: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  });
  
  export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
  