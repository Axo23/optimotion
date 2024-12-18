import { Request, Response } from "express";
import { TrainerInteractionModel } from "../../models/TrainerInteractionSchema";
import { IGetUserAuthInfoRequest } from "../../types/requests";

export const createTrainerInteraction = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req.user as { id: string })?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID found" });
      return;
    }

    const currentTime = new Date();
    const formattedDate = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    const title = `Coach Session from ${formattedDate}`;

    // Create a new trainer interaction with a title and timestamp
    const newInteraction = new TrainerInteractionModel({
      userID: userId,
      messages: [],
      timeStamp: currentTime,
      title,
    });

    const savedInteraction = await newInteraction.save();

    res.status(201).json(savedInteraction);
  } catch (error) {
    console.error("Error creating new interaction:", error);
    res.status(500).json({ message: "Server error while creating interaction" });
  }
};
