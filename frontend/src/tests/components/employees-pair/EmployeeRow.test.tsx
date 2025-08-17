import type { EmployeePair } from '@app-types/api/EmployeeDataPair';
import { EmployeeRow } from '@components/employees-pair/EmployeeRow';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const mockRow: EmployeePair = {
  empId1: 1,
  empId2: 2,
  projectId: 10,
  days: 5,
};

describe('<EmployeeRow />', () => {
  it('renders all cell data', () => {
    render(
      <table>
        <tbody>
          <EmployeeRow row={mockRow} idx={0} shouldOmitBottomBorder={false} />
        </tbody>
      </table>,
    );

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
  });

  it('applies alternating row colors', () => {
    const { container: containerEven } = render(
      <table>
        <tbody>
          <EmployeeRow row={mockRow} idx={0} shouldOmitBottomBorder={false} />
        </tbody>
      </table>,
    );
    expect(containerEven.querySelector('tr')?.className).toContain('bg-white');

    const { container: containerOdd } = render(
      <table>
        <tbody>
          <EmployeeRow row={mockRow} idx={1} shouldOmitBottomBorder={false} />
        </tbody>
      </table>,
    );
    expect(containerOdd.querySelector('tr')?.className).toContain('bg-blue-50');
  });

  it('applies or omits bottom border based on prop', () => {
    const { container: withBorder } = render(
      <table>
        <tbody>
          <EmployeeRow row={mockRow} idx={0} shouldOmitBottomBorder={false} />
        </tbody>
      </table>,
    );
    const tdWithBorder = withBorder.querySelector('td');
    let classes = tdWithBorder?.className.split(' ');
    expect(classes).toContain('border-b');

    const { container: withoutBorder } = render(
      <table>
        <tbody>
          <EmployeeRow row={mockRow} idx={0} shouldOmitBottomBorder={true} />
        </tbody>
      </table>,
    );
    const tdWithoutBorder = withoutBorder.querySelector('td');
    classes = tdWithoutBorder?.className.split(' ');
    expect(classes).not.toContain('border-b');
  });
});
