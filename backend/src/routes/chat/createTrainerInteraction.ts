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

    // Create a new trainer interaction with the current timestamp
    const newInteraction = new TrainerInteractionModel({
      userID: userId,
      messages: [],
      timeStamp: new Date(),
    });

    const savedInteraction = await newInteraction.save();

    res.status(201).json(savedInteraction);
  } catch (error) {
    console.error("Error creating new interaction:", error);
    res.status(500).json({ message: "Server error while creating interaction" });
  }
};
