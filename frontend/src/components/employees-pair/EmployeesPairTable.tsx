import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';
import type { EmployeesPairTableProps } from '@app-types/EmployeesPairTableProps';
import { EmployeeRow } from './EmployeeRow';

type Header = keyof EmployeeDataPair['projects'][0];

const headers: { key: Header; label: string }[] = [
  { key: 'empId1', label: 'Employee 1' },
  { key: 'empId2', label: 'Employee 2' },
  { key: 'projectId', label: 'Project' },
  { key: 'days', label: 'Overlap Days' },
] as const;

export const EmployeesPairTable: React.FC<EmployeesPairTableProps> = ({
  data,
}) => {
  const empty = !data || data.total === 0;

  const rows = data?.projects.map((row, idx) => (
    <EmployeeRow
      key={`${row.empId1}-${row.empId2}-${row.projectId}`}
      row={row}
      idx={idx}
      shouldOmitBottomBorder={idx === data.projects.length - 1}
    />
  ));

  const emptyRow = (
    <tr>
      <td
        colSpan={headers.length}
        className="px-4 py-10 text-center text-sm text-gray-500 border-t border-blue-300"
      >
        No data available
      </td>
    </tr>
  );

  const rowContent = empty ? emptyRow : rows;

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between flex-col sm:flex-row">
        <h2 className="text-xl font-semibold tracking-tight">Employee Pair</h2>
        {data && (
          <p className="text-xl font-semibold tracking-tight">
            Total days worked: {data.total}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-blue-300 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-50">
                {headers.map((h) => (
                  <th
                    key={h.key}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-blue-300"
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>{rowContent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
