import express, { Application } from 'express';
import { EmployeePairRouter } from './routes/EmployeePair.route.js';

const app: Application = express();

app.use(express.json());

app.use('/api/find-pair', EmployeePairRouter);

export default app;
