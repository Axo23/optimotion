import { UserDataSubset } from "../types/userData";

export const preparePrompt = (userData: UserDataSubset): string => {
  const availableData: string[] = [];
  const missingData: string[] = [];

  if (userData.height) availableData.push(`Height: ${userData.height} cm`);
  else missingData.push('Height (in cm)');
  
  if (userData.weight) availableData.push(`Weight: ${userData.weight} kg`);
  else missingData.push('Weight (in kg)');
  
  if (userData.fitnessLevel) availableData.push(`Fitness Level: ${userData.fitnessLevel}`);
  else missingData.push('Fitness Level (Sedentary, Beginner, Intermediate, Advanced, Elite)');
  
  if (userData.goals && userData.goals.length > 0) {
    availableData.push(`Fitness Goals: ${userData.goals.join(', ')}`);
  } else {
    missingData.push('Fitness Goals (e.g., lose weight, build muscle, improve endurance)');
  }

  /*if (userData.userNotes && userData.userNotes.length > 0) {
    availableData.push(`User Notes: ${userData.userNotes.join(', ')}`);
  } else {
    missingData.push('User Notes (e.g., types of exercises or restrictions like injuries)');
  }*/
  

  const formattedAvailableData = availableData.length
    ? availableData.join('\n')
    : 'No information provided yet.';

  const formattedMissingData = missingData
    .map((field, index) => `${index + 1}. ${field}`)
    .join('\n');

  return `
    You are a professional fitness coach. The user has provided the following information:
    ${formattedAvailableData}

    The following details are still missing:
    ${formattedMissingData}

    If any details are still missing, respond in a friendly and conversational tone to ask for them.

    If all the necessary details have been provided, generate a JSON object with the user's data in the following format:
    {
      "height": <value in cm>,
      "weight": <value in kg>,
      "fitnessLevel": <string>,
      "goals": [<list of fitness goals as strings>],
    }
  `;
};


/* "userNotes": [<list of notes such as exercise preferences, restrictions, injuries, or other relevant information>],
Examples for userNotes:
    - Preferences: "I like morning workouts."
    - Restrictions: "I have a knee injury."
    - Other notes: "I prefer yoga or low-impact exercises."
*/