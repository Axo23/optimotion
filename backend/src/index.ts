import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { handleChat } from './api/chat';

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Chat API route
app.post('/api/chat', handleChat);

app.get('/api/test', (req, res) => {
  res.send({ message: 'API is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
