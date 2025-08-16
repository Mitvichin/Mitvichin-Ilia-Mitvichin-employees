import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';
import { appFetch } from '@utils/appFetch';

export const useEmployeePairService = () => {
  const getEmployeePairs = async (file: File): Promise<EmployeeDataPair> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
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
    } catch (error) {
      console.log(error);
      throw new Error('failed');
    }
  };

  return { getEmployeePairs };
};
