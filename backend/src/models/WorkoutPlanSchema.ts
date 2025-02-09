import mongoose, { Schema } from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout", required: true}],
    timeStamp: { type: Date, required: true },
  });
  
  export const WorkoutPlanModel = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
  