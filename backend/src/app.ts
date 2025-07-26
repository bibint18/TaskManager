import express from 'express';
import cors from 'cors';
// import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes'
import { errorHandler } from './middleware/error';
import { ConnectDb } from './config/db'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
// app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
ConnectDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});