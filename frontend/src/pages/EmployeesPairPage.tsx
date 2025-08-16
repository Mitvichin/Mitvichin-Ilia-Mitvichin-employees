import { FileUpload } from '@components/shared/FileUpload';
import { useEmployeePairService } from '../services/useEmployeePairService';
import type { EmployeeDataPair } from '../types/api/EmployeeDataPair';
import { useState } from 'react';
import { EmployeesPairTable } from '@components/employees-pair/EmployeesPairTable';

export const EmployeesPairPage: React.FC = () => {
  const [pair, setPair] = useState<EmployeeDataPair | null>(null);
  const { getEmployeePairs } = useEmployeePairService();

  const onFileUpload = async (file: File) => {
    try {
      const employeePairs = await getEmployeePairs(file);
      setPair(employeePairs);
      console.log(employeePairs);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-3 w-full min-h-full overflow-auto">
      <div className="grow-0 flex justify-center items-center">
        <h1 className="text-4xl">Employee Pair Finder</h1>
      </div>
      <div className="grow-1">
        <FileUpload message="CSV up to 5MB" onFileUpload={onFileUpload} />
      </div>

      <div className="grow-5">
        <EmployeesPairTable data={pair} />
      </div>
    </div>
  );
};
