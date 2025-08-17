export const createCsvFile = (csvContent: string): Express.Multer.File => ({
  buffer: Buffer.from(csvContent),
  fieldname: 'file',
  originalname: 'employees.csv',
  encoding: '7bit',
  mimetype: 'text/csv',
  size: Buffer.byteLength(csvContent),
  destination: '',
  filename: '',
  path: '',
  stream: null as any,
});
