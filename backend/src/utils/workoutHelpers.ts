import openai from "../config/openaiClient";
import { UserDataSubset } from "../types/types";
import { ExerciseModel } from "../models/ExerciseSchema";


export const suggestFilters = async (userData: UserDataSubset): Promise<any> => {
  console.log(userData);
  const prompt = `
    You are a professional fitness coach and data assistant. Based on the following user data, suggest filters to select exercises from the database.

    User Data:
    - Fitness Level: ${userData.fitnessLevel || "Not provided"}
    - Goals: ${userData.goals?.join(", ") || "Not provided"}
    - User Notes: ${userData.userNotes?.join(", ") || "Not provided"}

    Filters should include:
    - Level: Choose from ["beginner", "intermediate", "expert"]
    - Category: Choose from ["strength", "plyometrics", "cardio", "stretching"]
    - PrimaryMuscles: Choose from ["quadriceps", "shoulders", "abdominals", "chest", "hamstrings", "triceps", "biceps", "lats", "middle_back", "forearms", "glutes", "traps", "adductors", "abductors", "neck"]

    Response format:
      {
        "category": "<string>",
        "primaryMuscles": ["<string>"],
        "level": "<string>",
        "equipment": ["body only"] (only include if user prefers bodyweight training)
      }
    
  Ensure the response does not include any additional text or formatting like "\`\`\`json".
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 700,
  });

  const response = completion.choices[0]?.message?.content;
  console.log("These are the filters:", response);
  if (!response) {
    throw new Error("No response from WorkoutAgent.");
  }

  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Error parsing filters JSON:", error);
    throw new Error("Invalid JSON format from WorkoutAgent.");
  }
};


export const fetchExercisesWithFilters = async (filters: any): Promise<any[]> => {
  const query: any = {
    level: { $in: filters.level },
    category: { $in: filters.category },
    primaryMuscles: { $in: filters.primaryMuscles },
  };

  // Add equipment to the query only if it exists in the filters
  if (filters.equipment && filters.equipment.length > 0) {
    query.equipment = { $in: filters.equipment };
  }

  return await ExerciseModel.find(query).lean();
};


export const generateWorkoutPlan = async (exercises: any[], userData: UserDataSubset): Promise<string> => {

  const availableExercisesList = exercises
    .map((e) => `- ${e.name} (${e.category})`)
    .join("\n");
    const prompt = `
    You are a professional fitness coach with experience creating personalized workout plans for a wide range of clients. Based on the user's fitness level, goals, and the available exercises, create a realistic, effective, and structured workout plan.
  
    User Information:
    - Fitness Level: ${userData.fitnessLevel}
    - Goals: ${userData.goals?.join(", ") || "General Fitness"}
    - User Notes: ${userData.userNotes?.join(", ") || "Not provided"}
  
    Available Exercises:
    ${availableExercisesList}
  
    Guidelines:
    - Create a workout plan suitable for a regular individual who is not competing professionally.
    - The workout plan should consist of **3-5 days of training per week** for general users.
    - Each day should include **5-8 exercises**, ensuring a mix of compound and isolation exercises.
    - Specify the number of sets and repetitions for each exercise.
    - Provide notes for each exercise (e.g., rest duration, proper form tips, etc.).
    - Only include exercises from the provided "Available Exercises" list.
      - The "exercise" field in the response **must exactly match** the "name" field of the exercises exactly, including capitalization, punctuation, spacing and so on. **Mismatches are not allowed.**
    - Exclude any details or descriptions for rest days or recovery days.
    - Dont even include the rest days in the JSON
    - Avoid overly complex or excessive plans. Focus on sustainability and user adherence.
  
    Respond in JSON format with the following structure:
    {
      "name": string, // Title of the workout plan based on the user's goals
      "workouts": [
        {
          "name": string, // Title of the workout (e.g., "Day 1 - Full Body Strength")
          "exercises": [
            {
              "exercise": string, // Must exactly match one of the provided exercise names
              "sets": number,
              "reps": number,
              "notes": string
            }
          ]
        }
      ]
    }
  
    Ensure the response does not include any additional text or formatting like "\`\`\`json".
  `;


  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 2000,
  });

  const response = completion.choices[0]?.message?.content;
  console.log("This is the response:", response);
  if (!response) {
    throw new Error("No response from WorkoutAgent.");
  }

  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Error parsing workout plan JSON:", error);
    throw new Error("Invalid JSON format from WorkoutAgent.");
  }
};
