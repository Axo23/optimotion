import { UserDataSubset } from "../types/types";

export const extractJsonFromResponse = (response: string): UserDataSubset | null => {
    const jsonRegex = /{.*}/s; // Match JSON-like content
  const jsonMatch = response.match(jsonRegex);

  if (jsonMatch) {
    try {
      // Parse the matched JSON
      const parsedData = JSON.parse(jsonMatch[0]);

      // Validate and return the parsed data
      return {
        height: parsedData.height || null,
        weight: parsedData.weight || null,
        fitnessLevel: parsedData.fitnessLevel || null,
        goals: Array.isArray(parsedData.goals) ? parsedData.goals : null,
        userNotes: Array.isArray(parsedData.userNotes) ? parsedData.userNotes : null,
      };
    } catch (error) {
      console.error("Error parsing JSON from GPT response:", error);
      return null;
    }
  }

  console.error("No valid JSON found in the GPT response.");
  return null; // Return null if no JSON block is found
};

  