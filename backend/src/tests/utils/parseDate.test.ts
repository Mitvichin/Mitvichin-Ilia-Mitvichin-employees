import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { BackendError } from '../../types/BackendError.js';
import { errorMessages } from '../../utils/constants.js';
import { parseDate } from '../../utils/parseDate.js';

describe('parseDate', () => {
  it('parses YYYY-MM-DD format', () => {
    const input = '2025-08-16';
    const result = parseDate(input);
    expect(result.format('YYYY-MM-DD')).toBe('2025-08-16');
  });

  it('parses DD/MM/YYYY format', () => {
    const input = '16/08/2025';
    const result = parseDate(input);
    expect(result.format('YYYY-MM-DD')).toBe('2025-08-16');
  });

  it('parses MM/DD/YYYY format', () => {
    const input = '08/16/2025';
    const result = parseDate(input);
    expect(result.format('YYYY-MM-DD')).toBe('2025-08-16');
  });

  it('parses DD-MM-YYYY format', () => {
    const input = '16-08-2025';
    const result = parseDate(input);
    expect(result.format('YYYY-MM-DD')).toBe('2025-08-16');
  });

  it('returns current date for "NULL"', () => {
    const before = dayjs();
    const result = parseDate('NULL');
    const after = dayjs();
    expect(result.isAfter(before.subtract(1, 'second'))).toBe(true);
    expect(result.isBefore(after.add(1, 'second'))).toBe(true);
  });

  it('throws BackendError for invalid date', () => {
    const input = 'invalid-date';
    expect(() => parseDate(input)).toThrowError(BackendError);
    expect(() => parseDate(input)).toThrowError(errorMessages.invalidDateFormat);
  });

  it('is case-insensitive for NULL', () => {
    const result = parseDate('null');
    expect(result.isValid()).toBe(true);
  });
});
