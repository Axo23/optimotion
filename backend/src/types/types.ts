import { UserData } from "./interfaces";

export type ChatGptMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
    name?: string;
  };

export type MessageRequestBody = {
    content: string;
    sender: string;
    trainerInteractionID: string;
};

// Subset for operations where only specific fields are needed
export type UserDataSubset = Pick<UserData, "height" | "weight" | "fitnessLevel" | "goals" | "userNotes">;