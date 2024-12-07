import mongoose, { Schema, Document } from "mongoose";

const MessageSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeStamp: { type: Date, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
  });
  
  export const MessageModel = mongoose.model("Message", MessageSchema);
  