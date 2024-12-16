import { Message } from "./Message";

export class TrainerInteraction {
    _id: string;
    userID: string;
    messages: Message[];
    timeStamp: Date;
  
    constructor(_id: string, userID: string, messages: Message[], timeStamp: Date,) {
      this._id = _id;
      this.userID = userID;
      this.messages = messages;
      this.timeStamp = timeStamp;
    }
  }
  