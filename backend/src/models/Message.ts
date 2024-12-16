

export class Message {
    _id: string;
    trainerInteractionID: string;
    timeStamp: Date;
    content: string;
    sender: string;
  
    constructor(
      _id: string,
      trainerInteractionID: string,
      timeStamp: Date,
      content: string,
      sender: string
    ) {
      this._id = _id;
      this.trainerInteractionID = trainerInteractionID;
      this.timeStamp = timeStamp;
      this.content = content;
      this.sender = sender;
    }
  }
  