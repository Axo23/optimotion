import express from "express";
import { authenticateJWT } from "../../config/jwtMiddleware";
import { createTrainerInteraction } from "./createTrainerInteraction";
import { getTrainerInteractions } from "./getTrainerInteractions";
import { sendMessage } from "./sendMessage";
import { getMessages } from "./getMessages";
import { deleteTrainerInteraction } from "./deleteTrainerInteraction";
import { getWorkoutPlan } from "./getWorkoutPlan";
import { deleteWorkoutPlan } from "./deleteWorkoutPlan";

const router = express.Router();

router.post("/createTrainerInteraction", authenticateJWT, createTrainerInteraction);
router.get("/getTrainerInteractions", authenticateJWT, getTrainerInteractions);
router.post("/sendMessage", authenticateJWT, sendMessage);
router.get("/getMessages/:trainerInteractionID", authenticateJWT, getMessages);
router.delete("/deleteTrainerInteraction/:id", authenticateJWT, deleteTrainerInteraction);
router.get("/getWorkoutPlan", authenticateJWT, getWorkoutPlan);
router.delete("/deleteWorkoutPlan/:workoutPlanId", authenticateJWT, deleteWorkoutPlan);

export default router;
