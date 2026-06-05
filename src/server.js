import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(logger);
app.use(notesRouter);
app.use(authRouter);
app.use(userRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  }
};

startServer();
