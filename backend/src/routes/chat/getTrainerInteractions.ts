import { Request, Response } from "express";
import { TrainerInteractionModel } from "../../models/TrainerInteractionSchema";
import { IGetUserAuthInfoRequest } from "../../types/requests";

export const getTrainerInteractions = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("Route Accessed: /getTrainerInteractions");
    const userId = (req.user as { id: string })?.id;
    console.log("Extracted User ID:", userId);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const trainerInteractions = await TrainerInteractionModel.find({ userID: userId })
      .sort({ timeStamp: -1 })
      .select("_id title timeStamp");

    console.log("Fetched Trainer Interactions:", trainerInteractions);
    res.status(200).json(trainerInteractions);
  } catch (error) {
    console.error("Error fetching trainer interactions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
