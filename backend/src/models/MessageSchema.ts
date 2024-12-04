import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    messageID: { type: String, required: true },
    userID: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
  });
  
  export const MessageModel = mongoose.model("Message", MessageSchema);
  