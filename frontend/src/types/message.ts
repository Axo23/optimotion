export interface Message {
    _id?: string;
    trainerInteractionID?: string;
    sender: "user" | "coach";
    content: string;
    timeStamp: string;
  }
  