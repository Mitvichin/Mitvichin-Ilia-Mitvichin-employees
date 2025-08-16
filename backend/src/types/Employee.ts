import { Dayjs } from 'dayjs';

export type Employee = {
  id: number;
  projectId: number;
  startDate: Dayjs;
  endDate: Dayjs;
};
