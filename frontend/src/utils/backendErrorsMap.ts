import { MAX_FILE_SIZE_MB } from './constants';

export const backendErrorMap = {
  INVALID_CSV:
    'Invalid CSV! Please make sure all EmpID, ProjectID, DateFrom, DateTo headers are present and all row values are populated!',
  PARSE_ERROR: 'Failed to parse file! Please, try again later.',
  INVALID_FILE_EXTENSION:
    'Invalid file extension! Only CSV files are supported!',
  INVALID_FILE_SIZE: `The file you upload must at most ${MAX_FILE_SIZE_MB}MB`,
} as const;
