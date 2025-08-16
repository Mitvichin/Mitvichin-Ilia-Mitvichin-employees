import csv from 'csv-parser';
import dayjs from 'dayjs';
import { Readable } from 'stream';
import { Employee } from '../types/Employee.js';
import { EmployeeRow } from '../types/EmployeeRow.js';
import { Heap } from 'heap-js';

const expectedHeaders: (keyof EmployeeRow)[] = ['EmpID', 'ProjectID', 'DateFrom', 'DateTo'];
const dateFormat = 'YYYY-MM-DD';
type EmployeWithoutId = Omit<Employee, 'projectId'>;
type EmployeePairResult = Record<
  string,
  {
    total: number;
    projects: { empId1: number; empId2: number; projectId: number; days: number }[];
  }
>;

const parseEmplyeeCSV = (
  file: Express.Multer.File,
): Promise<Record<string, EmployeWithoutId[]>> => {
  return new Promise((res, rej) => {
    const errors: string[] = [];
    let isHeaderChecked = false;
    let rowIndex = 1;
    const stream = Readable.from(file.buffer);
    const byProject: Record<string, EmployeWithoutId[]> = {};

    stream
      .pipe(csv())
      .on('headers', (headers) => {
        isHeaderChecked = true;
        const missing = expectedHeaders.filter((h) => !headers.includes(h));
        if (missing.length) {
          errors.push(`Missing headers: ${missing.join(', ')}`);
        }
      })
      .on('data', (row: EmployeeRow) => {
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

        if (row.DateTo === 'NULL') {
          row.DateTo = new Date().toString();
        }

        row.DateTo = dayjs(row.DateTo).format(dateFormat);
        row.DateFrom = dayjs(row.DateFrom).format(dateFormat);

        if (!byProject[row.ProjectID]) {
          byProject[row.ProjectID] = [];
        }

        byProject[row.ProjectID]?.push({
          id: Number(row.EmpID),
          startDate: dayjs(row.DateFrom),
          endDate: dayjs(row.DateTo),
        });
      })
      .on('end', () => {
        if (!isHeaderChecked) errors.push('CSV has no headers');
        if (errors.length) rej({ status: 400, message: errors.join(' ') });
        res(byProject);
      })
      .on('error', (err) => {
        rej({ status: 500, message: err.message });
      });
  });
};

const getPairResults = (groups: Record<string, EmployeWithoutId[]>): EmployeePairResult[string] => {
  let max = 0;
  const store: EmployeePairResult = {};
  let maxPair: string | null = null;

  for (const [projectId, employees] of Object.entries(groups)) {
    employees.sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

    const active = new Heap<EmployeWithoutId>((a, b) => a.endDate.valueOf() - b.endDate.valueOf());

    for (const emp of employees) {
      while (active.peek() && active.peek()!.endDate.isBefore(emp.startDate)) {
        active.pop();
      }

      for (const other of active.toArray()) {
        const overlapStart = emp.startDate.isAfter(other.startDate)
          ? emp.startDate
          : other.startDate;
        const overlapEnd = emp.startDate.isBefore(other.endDate) ? emp.endDate : other.endDate;

        if (overlapStart.isBefore(overlapEnd)) {
          const overlapDays = overlapEnd.diff(overlapStart, 'day');
          const key = [emp.id, other.id].sort((a, b) => a - b).join('-');

          if (!store[key]) {
            store[key] = { total: 0, projects: [] };
          }

          store[key].total += overlapDays;
          store[key].projects.push({
            empId1: emp.id,
            empId2: other.id,
            projectId: Number(projectId),
            days: overlapDays,
          });

          if (store[key].total > max) {
            max = store[key].total;
            maxPair = key;
          }
        }
      }

      active.push(emp);
    }
  }

  return maxPair === null ? { total: 0, projects: [] } : store[maxPair]!;
};

const processEmployeeData = async (file: Express.Multer.File) => {
  const groupedByProject = await parseEmplyeeCSV(file);

  return getPairResults(groupedByProject);
};

export { processEmployeeData };
