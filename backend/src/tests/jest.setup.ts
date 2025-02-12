import { connectDB } from "../config/connectDB";
import { clearTestDatabase } from "../utils/clearTestDatabase";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

// Mock the JWT middleware
jest.mock("../config/jwtMiddleware", () => ({
  authenticateJWT: (req: any, res: any, next: any) => {
    req.user = { userId: "mockUserId" }; // Mocked user object
    next();
  },
}));
// Run before all tests
beforeAll(async () => {
  await connectDB();
});

// Run after all tests
afterAll(async () => {
  await clearTestDatabase();
  await mongoose.connection.close();
});
