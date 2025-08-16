import { RequestHandler } from 'express';
import { processEmployeeData } from '../services/employeePairService.js';

const processFile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) throw new Error('file missing');

    const data = await processEmployeeData(req.file);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

export { processFile };
