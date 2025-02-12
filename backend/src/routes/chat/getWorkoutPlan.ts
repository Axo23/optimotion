import { Request, Response } from "express";
import { WorkoutPlanModel } from "../../models/WorkoutPlanSchema";
import { IGetUserAuthInfoRequest } from "../../types/interfaces";

export const getWorkoutPlan = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  try {
    // Validate user
    const userId = (req.user as { id: string })?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized. User ID is missing." });
      return;
    }

    // Fetch the user's workout plan
    const workoutPlan = await WorkoutPlanModel.find({ userID: userId })
      .populate({
        path: "workouts",
        populate: {
          path: "exercises",
          populate: {
            path: "exerciseID", // Populate Exercise details
            select: "name instructions", // Return only necessary fields
          },
        },
      });

    // Handle cases where no workout plan is found
    if (!workoutPlan) {
      res.status(404).json({ message: "No workout plan found for this user." });
      return;
    }
    console.log(workoutPlan);
    // Return the workout plan to the client
    res.status(200).json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
