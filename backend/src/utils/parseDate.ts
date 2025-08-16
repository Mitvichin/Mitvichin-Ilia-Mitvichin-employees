import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BackendError } from '../types/BackendError.js';
import { errorMessages } from './constants.js';

dayjs.extend(customParseFormat);

const dateFormats = ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD-MM-YYYY'];

export const parseDate = (dateStr: string) => {
  if (dateStr.toUpperCase() === 'NULL') {
    return dayjs(new Date());
  }

  for (const format of dateFormats) {
    const parsed = dayjs(dateStr, format, true);
    if (parsed.isValid()) {
      return parsed;
    }
  }

  throw new BackendError(400, errorMessages.invalidDateFormat);
};
