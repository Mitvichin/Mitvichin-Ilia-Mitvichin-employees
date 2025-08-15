import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/errorHandler.js';
import { employeePairRouter } from './routes/EmployeePair.route.js';

const app: Application = express();

app.use(express.json());

app.use('/api/find-pair', employeePairRouter);

app.use(errorMiddleware);

export default app;
