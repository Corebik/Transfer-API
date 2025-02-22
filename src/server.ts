import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Database & Cors
import { connectDB } from './config/bbdd';
import { corsConfig } from './config/cors';

//Routes
import { authRoutes, transferRoutes } from './routes';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS
app.use(cors(corsConfig));

// To Read Request Body
app.use(express.json());

// Routes
app.use('/api/transfer', transferRoutes);
app.use('/api/auth', authRoutes);

export default app;
