import { render, screen } from '@testing-library/react';
import type { EmployeeDataPair } from '@app-types/api/EmployeeDataPair';
import { EmployeesPairTable } from '@components/employees-pair/EmployeesPairTable';
import { describe, it, expect } from 'vitest';

const mockData: EmployeeDataPair = {
  total: 10,
  projects: [
    { empId1: 1, empId2: 2, projectId: 101, days: 5 },
    { empId1: 3, empId2: 4, projectId: 102, days: 5 },
  ],
};

describe('EmployeesPairTable', () => {
  it('renders the table header correctly', () => {
    render(<EmployeesPairTable data={mockData} />);

    expect(screen.getByText('Employee 1')).toBeInTheDocument();
    expect(screen.getByText('Employee 2')).toBeInTheDocument();
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText('Overlap Days')).toBeInTheDocument();
  });

  it('renders the total days worked when data is provided', () => {
    render(<EmployeesPairTable data={mockData} />);
    expect(screen.getByText(/Total days worked: 10/)).toBeInTheDocument();
  });

  it('renders EmployeeRow components for each project', () => {
    render(<EmployeesPairTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockData.projects.length + 1);
  });

  it('renders "No data available" when data is empty', () => {
    render(<EmployeesPairTable data={{ total: 0, projects: [] }} />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it('renders empty row when data is undefined', () => {
    render(<EmployeesPairTable data={null} />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
