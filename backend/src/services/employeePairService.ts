import csv from 'csv-parser';
import { Readable } from 'stream';

const parseCSV = (file: Express.Multer.File) => {
  return new Promise((res, rej) => {
    const results: any = [];

    const stream = Readable.from(file.buffer);

    stream
      .pipe(csv())
      .on('data', (row: any) => {
        results.push(row);
      })
      .on('end', () => {
        res(results);
      })
      .on('error', (err) => {
        rej(err);
      });
  });
};

const handleFileUpload = async (file: Express.Multer.File) => {
  return await parseCSV(file);
};

export { handleFileUpload };
