import { Button } from '@components/shared/Button';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('<Button />', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} isDisabled>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders spinner when loading', () => {
    render(<Button isLoading>Loading state</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('hides children text when loading', () => {
    render(<Button isLoading>Hidden text</Button>);
    const span = screen.getByText(/Hidden text/i);
    expect(span).toHaveClass('opacity-0');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/custom-class/);
  });
});
