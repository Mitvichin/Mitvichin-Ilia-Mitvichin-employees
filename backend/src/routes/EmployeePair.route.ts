import express from 'express';
import multer from 'multer';
import * as employeePairController from '../controllers/employeePairController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('file'), employeePairController.processFile);

export { router as employeePairRouter };
