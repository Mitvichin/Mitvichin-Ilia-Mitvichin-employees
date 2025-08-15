import express, { Application, Response, Request } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/api/test', (_req: Request, res: Response) => {
  res.send({ msg: 'hello' });
});

export default app;
