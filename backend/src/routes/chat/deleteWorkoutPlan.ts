import { Request, Response } from "express";
import { WorkoutPlanModel } from "../../models/WorkoutPlanSchema";

export const deleteWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
  const { workoutPlanId } = req.params;

  try {
    const deletedPlan = await WorkoutPlanModel.findByIdAndDelete(workoutPlanId);

    if (!deletedPlan) {
      res.status(404).json({ message: "Workout plan not found." });
      return;
    }

    res.status(200).json({ message: "Workout plan deleted successfully." });
  } catch (error) {
    console.error("Error deleting workout plan:", error);
    res.status(500).json({ message: "Error deleting workout plan." });
  }
};
