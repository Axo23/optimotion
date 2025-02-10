import { Request, Response } from "express";
import { TrainerInteractionModel } from "../../models/TrainerInteractionSchema";
import { IGetUserAuthInfoRequest } from "../../types/interfaces";

export const deleteTrainerInteraction = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = (req.user as { id: string })?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID found" });
      return;
    }

    const interaction = await TrainerInteractionModel.findOne({
      _id: id,
      userID: userId,
    });

    if (!interaction) {
      res.status(404).json({ message: "Trainer interaction not found" });
      return;
    }

    await interaction.deleteOne();

    res.status(200).json({ message: "Trainer interaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer interaction:", error);
    res.status(500).json({ message: "Server error while deleting interaction" });
  }
};
