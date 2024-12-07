import { Message } from "./Message";

export class TrainerInteraction {
    _id: string;
    userID: string;
    messages: Message[];
  
    constructor(_id: string, userID: string, messages: Message[]) {
      this._id = _id;
      this.userID = userID;
      this.messages = messages;
    }
  }
  