import { suggestFilters, fetchExercisesWithFilters, generateWorkoutPlan } from "../utils/workoutHelpers";
import { UserDataSubset } from "../types/types";


export const callWorkoutAgent = async (userData: UserDataSubset): Promise<any> => {
  try {
    // Step 1: Suggest filters based on user data
    const filters = await suggestFilters(userData);

    if (!filters || Object.keys(filters).length === 0) {
      throw new Error("WorkoutAgent failed to provide valid filters.");
    }

    // Step 2: Fetch exercises from the database based on filters
    const exercises = await fetchExercisesWithFilters(filters);
    if (!exercises || exercises.length === 0) {
      throw new Error("No exercises found for the provided filters.");
    }

    // Step 3: Generate a workout plan using the filtered exercises
    const workoutPlan = await generateWorkoutPlan(exercises, userData);

    return workoutPlan; // Return the workout plan to be sent to the user or stored
  } catch (error) {
    console.error("Error in callWorkoutAgent:", error);
    throw new Error("Failed to generate workout plan.");
  }
};
