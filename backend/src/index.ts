import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { handleChat } from './routes/api/chat';
import { registerUser } from './routes/user/register';
import { loginUser } from './routes/user/login';
import { logoutUser } from './routes/user/logout';
import checkAuthRouter from './routes/user/checkAuth'; // Import updated router

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/routes/api/chat', handleChat);
app.post('/routes/user/login', loginUser);
app.post('/routes/user/register', registerUser);
app.post('/routes/user/logout', logoutUser);
app.use('/routes/user', checkAuthRouter); // Register checkAuth router

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
