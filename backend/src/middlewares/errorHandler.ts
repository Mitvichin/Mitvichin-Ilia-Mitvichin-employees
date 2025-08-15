import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.message) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
