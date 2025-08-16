import { FileUpload } from '@components/shared/FileUpload';
import { useEmployeePairService } from '../services/useEmployeePairService';
import { useState } from 'react';
import { EmployeesPairTable } from '@components/employees-pair/EmployeesPairTable';
import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';
import { toast } from 'react-toastify';
import { AppError } from '@app-types/AppError';
import { MAX_FILE_SIZE_MB, UNKNOWN_ERROR } from '@utils/constants';

export const EmployeesPairPage: React.FC = () => {
  const [pair, setPair] = useState<EmployeeDataPair | null>(null);
  const [error, setError] = useState('');
  const { getEmployeePairs, validateFile } = useEmployeePairService();

  const onFileUpload = async (file: File) => {
    const isValid = validateFile(file);

    if (!isValid) {
      setError(
        `Invalid file! You must upload a CSV file with size less or equal to ${MAX_FILE_SIZE_MB}MB!`,
      );
      return;
    }

    try {
      setError('');
      const employeePairs = await getEmployeePairs(file);
      setPair(employeePairs);
      toast.success('File upload successfull!');
    } catch (err) {
      if (err instanceof AppError) {
        toast.error(err.message);
        setError(err.message);
        setPair(null);
        return;
      }

      toast.error(UNKNOWN_ERROR);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full min-h-full overflow-auto">
      <div className="grow-0 flex justify-center items-center">
        <h1 className="text-4xl">Employee Pair Finder</h1>
      </div>
      <div className="grow-1">
        <FileUpload
          message={`CSV up to ${MAX_FILE_SIZE_MB}MB`}
          error={error}
          onFileUpload={onFileUpload}
        />
      </div>

      <div className="grow-5">
        <EmployeesPairTable data={pair} />
      </div>
    </div>
  );
};
