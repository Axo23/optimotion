

export class Message {
    _id: string;
    userID: string;
    timeStamp: Date;
    content: string;
    sender: string;
  
    constructor(
      _id: string,
      userID: string,
      timeStamp: Date,
      content: string,
      sender: string
    ) {
      this._id = _id;
      this.userID = userID;
      this.timeStamp = timeStamp;
      this.content = content;
      this.sender = sender;
    }
  }
  