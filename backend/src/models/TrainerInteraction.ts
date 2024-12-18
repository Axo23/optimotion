import { Message } from "./Message";

export class TrainerInteraction {
    _id: string;
    userID: string;
    messages: Message[];
    timeStamp: Date;
    title: string;
  
    constructor(_id: string, userID: string, messages: Message[], timeStamp: Date, title: string,) {
      this._id = _id;
      this.userID = userID;
      this.messages = messages;
      this.timeStamp = timeStamp;
      this.title = title;
    }
  }
  