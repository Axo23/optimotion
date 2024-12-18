import { Message } from "./message";

export interface TrainerInteraction {
    _id: string;
    userID: string;
    messages: Message[];
    timeStamp: string;
    title: string;
  }
  