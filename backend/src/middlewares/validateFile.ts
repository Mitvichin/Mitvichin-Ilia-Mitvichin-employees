import { RequestHandler } from 'express';
import { ZodType } from 'zod';

export const validateFile = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.file);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
    }

    next();
  };
};
