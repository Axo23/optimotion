import { UserModel } from "../models/UserSchema";
import { WorkoutPlanModel } from "../models/WorkoutPlanSchema";
import { WorkoutSchemaModel } from "../models/WorkoutSchema";
import { WorkoutExerciseModel } from "../models/WorkoutExerciseSchema";
import { ExerciseModel } from "../models/ExerciseSchema";
import { callWorkoutAgent } from "./callWorkoutAgent";
import { UserDataSubset } from "../types/types";

export const createWorkoutPlan = async (userId: string): Promise<any> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  // Fetch user data
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Prepare UserDataSubset
  const userData: UserDataSubset = {
    height: user.height ?? null,
    weight: user.weight ?? null,
    fitnessLevel: user.fitnessLevel ?? null,
    goals: user.goals ?? null,
    userNotes: user.userNotes?? null,
  };

  // Generate the workout plan
  const workoutPlanData = await callWorkoutAgent(userData);

  // Process and save the workout plan
  const { name: planName, workouts } = workoutPlanData;
  const savedWorkouts = [];

  for (const workout of workouts) {
    const { name: workoutName, exercises } = workout;
    const savedExercises = [];

    for (const exercise of exercises) {
      const { exercise: exerciseName, sets, reps, notes } = exercise;

      // Find the Exercise document by exact name
      let exerciseDoc = await ExerciseModel.findOne({ name: exerciseName });

      if (!exerciseDoc) {
        console.warn(`Exact exercise not found: ${exerciseName}. Searching for similar exercises.`);

        // Find similar exercise names (case-insensitive, whole word match)
        const similarExercises = await ExerciseModel.find({
          name: { $regex: `^${exerciseName}$|\\b${exerciseName}\\b`, $options: "i" },
        });

        if (similarExercises.length > 0) {
          // Take the first matching exercise
          exerciseDoc = similarExercises[0];
          console.log(`Replacing "${exerciseName}" with "${exerciseDoc.name}"`);
        } else {
          console.error(`No similar exercise found for: ${exerciseName}. Skipping.`);
          continue; // Skip this exercise if no suitable match is found
        }
      }

      // Create and save WorkoutExercise
      const workoutExercise = new WorkoutExerciseModel({
        exerciseID: exerciseDoc._id,
        sets,
        reps,
        notes,
      });

      const savedWorkoutExercise = await workoutExercise.save();
      savedExercises.push(savedWorkoutExercise._id);
    }

    // Create and save Workout
    const workoutDoc = new WorkoutSchemaModel({
      name: workoutName,
      exercises: savedExercises,
    });

    const savedWorkout = await workoutDoc.save();
    savedWorkouts.push(savedWorkout._id);
  }

  // Step 3.5: Create and save WorkoutPlan
  const workoutPlan = new WorkoutPlanModel({
    userID: userId,
    name: planName,
    workouts: savedWorkouts,
    timeStamp: new Date(),
  });

  const savedWorkoutPlan = await workoutPlan.save();

  return savedWorkoutPlan;
};
