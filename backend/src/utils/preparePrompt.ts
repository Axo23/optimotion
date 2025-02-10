import { UserDataSubset } from "../types/types";

export const preparePrompt = (userData: UserDataSubset): string => {
  const availableData: string[] = [];
  const missingData: string[] = [];

  if (userData.height) availableData.push(`Height: ${userData.height} cm`);
  else missingData.push('Height (in cm)');

  if (userData.weight) availableData.push(`Weight: ${userData.weight} kg`);
  else missingData.push('Weight (in kg)');

  if (userData.fitnessLevel) availableData.push(`Fitness Level: ${userData.fitnessLevel}`);
  else missingData.push('Fitness Level (Beginner, Intermediate, Expert)');

  if (userData.goals && userData.goals.length > 0) {
    availableData.push(`Fitness Goals: ${userData.goals.join(', ')}`);
  } else {
    missingData.push('Fitness Goals (e.g., lose weight, build muscle, improve endurance)');
  }

  if (userData.userNotes && userData.userNotes.length > 0) {
    availableData.push(`User Notes: ${userData.userNotes.join(', ')}`);
  } else {
    missingData.push('User Notes (e.g., types of exercises or restrictions like injuries)');
  }

  const formattedAvailableData = availableData.length
    ? availableData.join('\n')
    : 'No information provided yet.';

  const formattedMissingData = missingData
    .map((field, index) => `${index + 1}. ${field}`)
    .join('\n');

  return `
    You are a professional fitness coach, who can correctly answer any fitness related questions. The user has provided the following information:
    ${formattedAvailableData}

    The following details are still missing:
    ${formattedMissingData}

    If the user explicitly requests a workout plan or all necessary details are complete, respond with the term "TRIGGER_WORKOUT_PLAN" as part of your response. Do not include this term unless you determine that the user wants a workout plan generated.

    Example scenario:
    - If details are missing, ask for the missing details in a friendly and conversational tone.
    - If all details are complete but the user doesn't request a workout plan, summarize their data and wait for further instructions.

    Strictly adhere to this format:
    <ul>
    <li>Height: <value in cm></li>
    <li>Weight: <value in kg></li>
    <li>Fitness Level: <string></li>
    <li>Goals: <list of fitness goals as strings></li>
    <li>User Notes: <list of notes such as exercise preferences, restrictions, injuries, other relevant information or "no info"></li>
    </ul>
    {
      "height": <value in cm>,
      "weight": <value in kg>,
      "fitnessLevel": <string>,
      "goals": [<list of fitness goals as strings>],
      "userNotes": [<list of notes such as exercise preferences, restrictions, injuries, other relevant information or "no info">]
    }
    Example response for workout generation:
    ---
    TRIGGER_WORKOUT_PLAN
    ---
  `;
};
