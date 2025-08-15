import express, { Application, Response, Request } from 'express';
import multer from 'multer';

const app: Application = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  res.send({ msg: req.file?.originalname });
});

export default app;
