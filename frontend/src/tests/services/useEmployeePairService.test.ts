import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { MAX_FILE_SIZE_MB } from '@utils/constants';
import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';

vi.mock('@utils/appFetch', () => ({
  appFetch: vi.fn(),
}));

import { useEmployeePairService } from '../../services/useEmployeePairService';
import { appFetch } from '@utils/appFetch';

describe('useEmployeePairService', () => {
  let service: ReturnType<typeof useEmployeePairService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = useEmployeePairService();
  });

  describe('validateFile', () => {
    it('returns true for valid CSV file under size limit', () => {
      const file = new File(['data'], 'test.csv', { type: 'text/csv' });
      Object.defineProperty(file, 'size', {
        value: 1024 * 1024 * (MAX_FILE_SIZE_MB - 1),
      });

      expect(service.validateFile(file)).toBe(true);
    });

    it('returns false for non-CSV file', () => {
      const file = new File(['data'], 'test.txt', { type: 'text/plain' });
      expect(service.validateFile(file)).toBe(false);
    });

    it('returns false for CSV file exceeding size limit', () => {
      const file = new File(['data'], 'test.csv', { type: 'text/csv' });
      Object.defineProperty(file, 'size', {
        value: 1024 * 1024 * (MAX_FILE_SIZE_MB + 1),
      });

      expect(service.validateFile(file)).toBe(false);
    });
  });

  describe('getEmployeePairs', () => {
    it('calls appFetch with correct params and returns data', async () => {
      const mockData: EmployeeDataPair = {
        total: 0,
        projects: [
          {
            empId1: 2,
            empId2: 1,
            projectId: 10,
            days: 4,
          },
        ],
      };
      (appFetch as Mock).mockResolvedValue({
        json: () => ({
          data: mockData,
        }),
      });

      const file = new File(['test'], 'employees.csv', { type: 'text/csv' });
      const result = await service.getEmployeePairs(file);

      expect(appFetch).toHaveBeenCalledWith(
        '/api/find-pair',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        }),
        true,
      );

      expect(result).toEqual(mockData);
    });
  });
});
