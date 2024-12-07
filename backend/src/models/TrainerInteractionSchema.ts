import mongoose, { Schema, Document } from "mongoose";

const TrainerInteractionSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  });
  
  export const TrainerInteractionModel = mongoose.model(
    "TrainerInteraction",
    TrainerInteractionSchema
  );
  