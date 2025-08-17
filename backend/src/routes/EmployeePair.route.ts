import express from 'express';
import multer from 'multer';
import * as employeePairController from '../controllers/employeePairController.js';
import { validateFile } from '../middlewares/validateFile.js';
import { csvFileSchema } from '../utils/zodSchemas.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  validateFile(csvFileSchema),
  employeePairController.processFile,
);

export { router as employeePairRouter };
