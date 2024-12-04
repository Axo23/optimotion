import { Message } from "./Message";

export class TrainerInteraction {
    interactionID: string;
    userID: string;
    messages: Message[];
  
    constructor(interactionID: string, userID: string, messages: Message[]) {
      this.interactionID = interactionID;
      this.userID = userID;
      this.messages = messages;
    }
  }
  