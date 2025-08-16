export type EmployeeDataPair = {
  total: number;
  projects: EmployeePair[];
};

export type EmployeePair = {
  empId1: number;
  empId2: number;
  projectId: number;
  days: number;
};
