import csv from 'csv-parser';
import { Readable } from 'stream';
const expectedHeaders = ['EmpID', 'ProjectID', 'DateFrom', 'DateTo'];

const parseCSV = (file: Express.Multer.File) => {
  return new Promise((res, rej) => {
    const results: any = [];
    const errors: string[] = [];
    let isHeaderChecked = false;
    let rowIndex = 1;
    const stream = Readable.from(file.buffer);

    stream
      .pipe(csv())
      .on('headers', (headers) => {
        isHeaderChecked = true;
        const missing = expectedHeaders.filter((h) => !headers.includes(h));
        if (missing.length) {
          errors.push(`Missing headers: ${missing.join(', ')}`);
        }
      })
      .on('data', (row: any) => {
        let errorMsg = 'Missing value for ';
        let hasError = false;
        expectedHeaders.forEach((field) => {
          if (!row[field]) {
            hasError = true;
            errorMsg += field + ', ';
          }
        });

        if (hasError) {
          errorMsg = errorMsg.slice(0, -2);
          errorMsg += ` in row ${rowIndex}!`;
          errors.push(errorMsg);
        }

        rowIndex++;
        results.push(row);
      })
      .on('end', () => {
        if (!isHeaderChecked) errors.push('CSV has no headers');
        if (errors.length) rej({ status: 400, message: errors.join(' ') });
        res(results);
      })
      .on('error', (err) => {
        rej({ status: 500, message: err.message });
      });
  });
};

const handleFileUpload = async (file: Express.Multer.File) => {
  return await parseCSV(file);
};

export { handleFileUpload };
