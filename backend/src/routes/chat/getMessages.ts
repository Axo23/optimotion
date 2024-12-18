import { Request, Response } from "express";
import { MessageModel } from "../../models/MessageSchema";
import { IGetUserAuthInfoRequest } from "../../types/requests";

export const getMessages = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  const { trainerInteractionID } = req.params;

  if (!trainerInteractionID) {
    res.status(400).json({ message: "TrainerInteraction ID is required." });
    return;
  }

  try {
    // Fetch all messages related to the specified trainerInteractionID
    const messages = await MessageModel.find({ trainerInteractionID }).sort({ timeStamp: 1 });

    if (!messages || messages.length === 0) {
      res.status(404).json({ message: "No messages found for this interaction." });
      return;
    }

    // Return messages to the client
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
