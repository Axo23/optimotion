import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserSchema";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set the token as an HttpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // Cookie valid for 1 hour
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
