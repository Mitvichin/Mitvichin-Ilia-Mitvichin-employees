export type EmployeeDataPair = {
  total: number;
  projects: {
    empId1: number;
    empId2: number;
    projectId: number;
    days: number;
  };
};
