import { describe, it, expect } from 'vitest';
import { processEmployeeData } from '../../services/employeePairService.js';
import { errorMessages } from '../../utils/constants.js';
import { createCsvFile } from '../utils.js';

describe('processEmployeeData service', () => {
  it('returns correct pair results for valid CSV', async () => {
    const csv = `EmpID,ProjectID,DateFrom,DateTo
                    218,10,01/08/2025,15/08/2025
                    143,10,13/08/2025,15/08/2025
                    218,10,01/07/2025,15/07/2025
                    143,10,10/07/2025,15-07-2025`;

    const file = createCsvFile(csv);

    const result = await processEmployeeData(file);

    result.projects.forEach((p, idx) => {
      expect(p.empId1).toBe(143);
      expect(p.empId2).toBe(218);
      expect(p.projectId).toBe(10);
      expect(p.days).toBe(idx === 0 ? 3 : 6);
    });

    expect(result.total).toEqual(9);
  });

  it('throws BackendError on invalid CSV headers', async () => {
    const csv = `EmpID,ProjectID,WrongDateFrom,DateTo
    218,10,01/08/2025,NULL`;
    const file = createCsvFile(csv);

    await expect(processEmployeeData(file)).rejects.toMatchObject({
      status: 400,
      message: errorMessages.invalidCsv,
    });
  });

  it('throws BackendError on missing value', async () => {
    const csv = `EmpID,ProjectID,DateFrom,DateTo
    218,10,01/08/2025,`;
    const file = createCsvFile(csv);

    await expect(processEmployeeData(file)).rejects.toMatchObject({
      status: 400,
      message: errorMessages.invalidCsv,
    });
  });

  it('correctly parses csv even with white space', async () => {
    const csv = `EmpID, ProjectID ,DateFrom, DateTo
    218, 10, 01/08/2025, 16/08/2025
    18, 10, 01/08/2025, 15/08/2025`;
    const file = createCsvFile(csv);

    const result = await processEmployeeData(file);

    expect(result.total).toEqual(15);
  });

  it('returns empty result if no employees', async () => {
    const csv = `EmpID,ProjectID,DateFrom,DateTo`;
    const file = createCsvFile(csv);

    const result = await processEmployeeData(file);
    expect(result.total).toBe(0);
    expect(result.projects).toHaveLength(0);
  });
});
