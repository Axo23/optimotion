import mongoose, { Schema } from "mongoose";

const TrainerInteractionSchema = new mongoose.Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  timeStamp: { type: Date, required: true },
  title: { type: String, required: true },
});

export const TrainerInteractionModel = mongoose.model(
  "TrainerInteraction",
  TrainerInteractionSchema
);
