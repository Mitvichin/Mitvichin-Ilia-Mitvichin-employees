import { LoadingSpinner } from '@components/shared/LoadingSpinner';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('<LoadingSpinner />', () => {
  it('renders spinner element', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('has default classes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toMatch(/animate-spin/);
    expect(spinner.className).toMatch(/inline-block/);
    expect(spinner.className).toMatch(/rounded-full/);
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="extra-class" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toMatch(/extra-class/);
  });
});
