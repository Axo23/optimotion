import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';


dotenv.config();
// Verbindung zur Datenbank herstellen
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.send({ message: 'API is working!' });
});


// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
