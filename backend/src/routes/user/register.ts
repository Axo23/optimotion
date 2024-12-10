import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/UserSchema";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, age } = req.body;

  try {
    if (!age || age < 10 || age > 99) {
      res.status(400).json({ message: "Age must be between 10 and 99" });
      return;
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already registered" });
      return;
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      age,
    });


    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
