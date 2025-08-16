import type { EmployeeRowProps } from '@app-types/EmployeeRowProps';

export const EmployeeRow: React.FC<EmployeeRowProps> = ({
  row,
  idx,
  shouldOmitBottomBorder,
}) => {
  const className = `px-4 py-3 text-sm text-gray-900 border-blue-300 ${shouldOmitBottomBorder ? '' : 'border-b'}`;

  return (
    <tr className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
      <td className={className}>{row.empId1}</td>
      <td className={className}>{row.empId2}</td>
      <td className={className}>{row.projectId}</td>
      <td className={className}>{row.days}</td>
    </tr>
  );
};
