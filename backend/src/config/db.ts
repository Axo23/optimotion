// src/config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI!;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

// Connect to MongoDB database
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
