import { UserDataSubset } from "../types/userData";

export const extractJsonFromResponse = (response: string): UserDataSubset | null => {
    const jsonRegex = /{.*}/s; // Match JSON-like content
    const jsonMatch = response.match(jsonRegex);
  
    if (jsonMatch) {
      try {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log("Parsed Data:", parsedData);
        return {
          height: parsedData.height || null,
          weight: parsedData.weight || null,
          fitnessLevel: parsedData.fitnessLevel || null,
          goals: parsedData.goals || null,
          //userNotes: parsedData.userNotes || null,
        };
      } catch (error) {
        console.error('Error parsing JSON from GPT response:', error);
        return null; // Return null if JSON parsing fails
      }
    }
  
    return null; // Return null if no JSON is found
  };
  