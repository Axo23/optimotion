import express from "express";
import { loginUser } from "./login";
import { registerUser } from "./register";
import { logoutUser } from "./logout";
import { updateUser } from "./updateUser";
import { authenticateJWT } from "../../config/jwtMiddleware";
import { profileUser } from "./profile";
import { checkAuth } from "./checkAuth";
import { getWorkoutPlan } from "./getWorkoutPlan";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.put("/updateUser", authenticateJWT, updateUser);
router.get("/profile", authenticateJWT, profileUser);
router.get("/checkAuth", authenticateJWT, checkAuth);
router.get("/getWorkoutPlan", authenticateJWT, getWorkoutPlan);

export default router;
