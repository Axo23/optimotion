// src/config/db.ts
import mongoose from "mongoose";
import { config } from "./env"; // Import the centralized config

const uri = config.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName: "optimotion",
    });
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
