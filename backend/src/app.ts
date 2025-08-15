import express, { Application } from 'express';
import { employeePairRouter } from './routes/employeePair.route.js';
import { errorMiddleware } from './middlewares/errorHandler.js';

const app: Application = express();

app.use(express.json());

app.use('/api/find-pair', employeePairRouter);

app.use(errorMiddleware);

export default app;
