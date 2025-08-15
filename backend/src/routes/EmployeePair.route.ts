import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => res.send({ msg: req.file?.originalname }));

export { router as EmployeePairRouter };
