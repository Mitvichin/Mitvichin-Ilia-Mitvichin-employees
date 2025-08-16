import { appFetch } from '@utils/appFetch';
import { useState } from 'react';
import type { EmployeeDataPair } from '../types/api/EmployeeDataPair';

export const useEmployeePairService = () => {
  const getEmployeePairs = async (file: File): Promise<EmployeeDataPair[]> => {
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

      const data: EmployeeDataPair[] = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      throw new Error('failed');
    }
  };

  return { getEmployeePairs };
};
