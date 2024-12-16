import express from "express";
import { authenticateJWT } from "../../config/jwtMiddleware";
import { createTrainerInteraction } from "./createTrainerInteraction";
import { getTrainerInteractions } from "./getTrainerInteractions";
import { sendMessage } from "./sendMessage";

const router = express.Router();

router.post("/createTrainerInteraction", authenticateJWT, createTrainerInteraction);
router.get("/getTrainerInteractions", authenticateJWT, getTrainerInteractions);
router.post("/sendMessage", authenticateJWT, sendMessage);

export default router;
