import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';
import { appFetch } from '@utils/appFetch';
import { MAX_FILE_SIZE_MB } from '@utils/constants';

export const useEmployeePairService = () => {
  const getEmployeePairs = async (file: File): Promise<EmployeeDataPair> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await appFetch(
      '/api/find-pair',
      {
        method: 'POST',
        body: formData,
      },
      true,
    );

    const { data }: { data: EmployeeDataPair } = await response.json();

    return data;
  };

  const validateFile = (file: File) => {
    const blobSizeInMB = +(file.size / (1024 * 1024)).toFixed(2);
    const fileExt = file.name.split('.').pop();

    return fileExt === 'csv' && blobSizeInMB <= MAX_FILE_SIZE_MB;
  };

  return { getEmployeePairs, validateFile };
};
