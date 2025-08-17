import { MAX_FILE_SIZE_MB, SUPPORETED_DATE_FORMATS } from './constants';

export const backendErrorMap = {
  INVALID_CSV:
    'Invalid CSV! Please make sure all EmpID, ProjectID, DateFrom, DateTo headers are present and all row values are populated!',
  PARSE_ERROR: 'Failed to parse file! Please, try again later.',
  INVALID_FILE_EXTENSION:
    'Invalid file extension! Only CSV files are supported!',
  INVALID_FILE_SIZE: `The file you upload must at most ${MAX_FILE_SIZE_MB}MB`,
  MISSING_FILE: 'Please, provide a file!',
  INVALID_DATE_FORMAT: `You have used unsupported date format! Supported date formats: ${SUPPORETED_DATE_FORMATS.join(', ')}!`,
} as const;
