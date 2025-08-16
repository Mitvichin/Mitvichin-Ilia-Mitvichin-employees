import { RequestHandler } from 'express';
import { processEmployeeData } from '../services/employeePairService.js';
import { errorMessages } from '../utils/constants.js';

const processFile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: errorMessages.missingFile });
      return;
    }

    const data = await processEmployeeData(req.file);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

export { processFile };
