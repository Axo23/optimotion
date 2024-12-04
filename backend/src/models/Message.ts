export class Message {
    messageID: string;
    userID: string;
    timeStamp: Date;
    content: string;
    sender: string;
  
    constructor(
      messageID: string,
      userID: string,
      timeStamp: Date,
      content: string,
      sender: string
    ) {
      this.messageID = messageID;
      this.userID = userID;
      this.timeStamp = timeStamp;
      this.content = content;
      this.sender = sender;
    }
  }
  