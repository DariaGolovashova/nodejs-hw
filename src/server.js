import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import helmet from 'helmet';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouters from './routes/notesRoutes.js';
import authRouters from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger);
app.use(notesRouters);
app.use(authRouters);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Docs at http://localhost:${process.env.PORT}/api-docs`);
});
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
