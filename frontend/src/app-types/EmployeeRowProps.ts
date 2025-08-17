import type { EmployeePair } from './api/EmployeeDataPair';

export type EmployeeRowProps = {
  row: EmployeePair;
  idx: number;
  shouldOmitBottomBorder: boolean;
};
