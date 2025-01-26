import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
    trainerInteractionID: { type: Schema.Types.ObjectId, ref: "TrainerInteraction", required: true },
    timeStamp: { type: Date, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
  });
  
  export const MessageModel = mongoose.model("Message", MessageSchema);
  