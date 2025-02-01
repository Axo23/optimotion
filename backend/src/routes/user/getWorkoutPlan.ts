import { Request, Response } from "express";
import { WorkoutPlanModel } from "../../models/WorkoutPlanSchema";
import { IGetUserAuthInfoRequest } from "../../types/requests";

export const getWorkoutPlan = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  try {
    // Step 1: Validate user
    const userId = (req.user as { id: string })?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized. User ID is missing." });
      return;
    }

    // Step 2: Fetch the user's workout plan
    const workoutPlan = await WorkoutPlanModel.findOne({ userID: userId })
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

    // Step 3: Handle cases where no workout plan is found
    if (!workoutPlan) {
      res.status(404).json({ message: "No workout plan found for this user." });
      return;
    }

    // Step 4: Return the workout plan to the client
    res.status(200).json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
