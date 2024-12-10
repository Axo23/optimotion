import express, { Response } from "express";
import { authenticateJWT } from "../../config/jwtMiddleware";
import { IGetUserAuthInfoRequest } from "../../types/requests";

const router = express.Router();

router.get("/checkAuth", authenticateJWT, (req: IGetUserAuthInfoRequest, res: Response) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

export default router;
