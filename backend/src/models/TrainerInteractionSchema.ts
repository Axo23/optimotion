import mongoose from "mongoose";

const TrainerInteractionSchema = new mongoose.Schema({
    interactionID: { type: String, required: true },
    userID: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  });
  
  export const TrainerInteractionModel = mongoose.model(
    "TrainerInteraction",
    TrainerInteractionSchema
  );
  