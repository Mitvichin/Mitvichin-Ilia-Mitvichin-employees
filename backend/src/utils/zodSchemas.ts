import z from 'zod';
import { errorMessages } from '../constants/errorMessages.js';
import { MAX_FILE_SIZE_MB } from './constants.js';

export const csvFileSchema = z.object({
  originalname: z
    .string()
    .refine((name) => name.endsWith('.csv'), errorMessages.invalidFileExtension),
  mimetype: z.enum(['text/csv', 'application/vnd.ms-excel'], errorMessages.invalidFileExtension),
  size: z.number().max(MAX_FILE_SIZE_MB * 1024 * 1024, errorMessages.invalidFilseSize),
});
