import { UserModel } from "./models/UserSchema"; // Adjust the path as needed
import { connectDB } from "./config/db";
import mongoose from "mongoose";

const createUser = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Create a user document
    const newUser = new UserModel({
      userID: "12345", // You can use a UUID here if needed
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword", // Ensure hashing is implemented for production
      fitnessLevel: "Intermediate",
      goals: ["Weight Loss", "Muscle Gain"],
      age: 30,
      weight: 75,
      height: 175,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log("User saved successfully:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

createUser();
