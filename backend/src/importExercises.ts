import { connectDB } from "./config/db";
import { ExerciseModel } from "./models/ExerciseSchema";
import axios from "axios";

const API_URL = "https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/filter";
const API_KEY = "7f21033237mshb15e2ebd315ae0cp1f30e9jsn1905ec817804";

async function fetchExercises() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}

async function importAllExercises() {
  try {
    await connectDB();

    const exercises = await fetchExercises();
    const seenExercises = new Set<string>();

    for (const exercise of exercises) {
      // Generate a unique key for deduplication
      const uniqueKey = `${exercise.name}-${exercise.category}-${exercise.force}-${exercise.mechanic}`;
      if (!seenExercises.has(uniqueKey)) {
        seenExercises.add(uniqueKey);

        // Save the exercise to MongoDB
        try {
          await ExerciseModel.create({
            name: exercise.name,
            category: exercise.category,
            primaryMuscles: exercise.primaryMuscles || [],
            secondaryMuscles: exercise.secondaryMuscles || [],
            level: exercise.level,
            equipment: exercise.equipment || "None",
            instructions: exercise.instructions || [],
            force: exercise.force || "Unknown",
            mechanic: exercise.mechanic || "Unknown",
          });
          console.log(`Saved: ${exercise.name}`);
        } catch (saveError) {
          console.error(`Error saving exercise "${exercise.name}":`, saveError);
        }
      }
    }

    console.log("All exercises imported successfully!");
  } catch (error) {
    console.error("Error importing all exercises:", error);
  }
}

importAllExercises();
