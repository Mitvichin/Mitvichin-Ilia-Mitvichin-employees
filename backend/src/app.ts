import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/errorHandler.js';
import { employeePairRouter } from './routes/EmployeePair.route.js';
import helmet from 'helmet';
import { BASE_API_URL } from './utils/constants.js';

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.use(`${BASE_API_URL}/find-pair`, employeePairRouter);

app.use(errorMiddleware);

export default app;
