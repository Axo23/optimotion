import { UserModel } from "../models/UserSchema";
import { WorkoutPlanModel } from "../models/WorkoutPlanSchema";
import { WorkoutSchemaModel } from "../models/WorkoutSchema";
import { WorkoutExerciseModel } from "../models/WorkoutExerciseSchema";
import { ExerciseModel } from "../models/ExerciseSchema";
import { callWorkoutAgent } from "./callWorkoutAgent";
import { UserDataSubset } from "../types/userData";

export const createWorkoutPlan = async (userId: string): Promise<any> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  // Step 1: Fetch user data from the database
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
  };

  // Step 2: Generate the workout plan
  const workoutPlanData = await callWorkoutAgent(userData);

  // Step 3: Process and save the workout plan
  const { name: planName, workouts } = workoutPlanData;
  const savedWorkouts = [];

  for (const workout of workouts) {
    const { name: workoutName, exercises } = workout;

    const savedExercises = [];
    for (const exercise of exercises) {
      const { exercise: exerciseName, sets, reps, notes } = exercise;

      // Step 3.1: Find the Exercise document by name
      const exerciseDoc = await ExerciseModel.findOne({ name: exerciseName });
      if (!exerciseDoc) {
        throw new Error(`Exercise not found: ${exerciseName}`);
      }

      // Step 3.2: Create and save WorkoutExercise
      const workoutExercise = new WorkoutExerciseModel({
        exerciseID: exerciseDoc._id, // Reference to the Exercise document
        sets,
        reps,
        notes,
      });
      const savedWorkoutExercise = await workoutExercise.save();
      savedExercises.push(savedWorkoutExercise._id);
    }

    // Step 3.3: Create and save Workout
    const workoutDoc = new WorkoutSchemaModel({
      name: workoutName,
      exercises: savedExercises,
    });
    const savedWorkout = await workoutDoc.save();
    savedWorkouts.push(savedWorkout._id);
  }

  // Step 3.4: Create and save WorkoutPlan
  const workoutPlan = new WorkoutPlanModel({
    userID: userId,
    name: planName,
    workouts: savedWorkouts,
    timeStamp: new Date(),
  });

  const savedWorkoutPlan = await workoutPlan.save();

  // Return the saved workout plan
  return savedWorkoutPlan;
};
