import { FileUpload } from '@components/shared/FileUpload';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('<FileUpload />', () => {
  let onFileUpload: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onFileUpload = vi.fn().mockResolvedValue(undefined);
  });

  it('renders default text and button', () => {
    render(<FileUpload message="Upload a file" onFileUpload={onFileUpload} />);

    expect(screen.getByText(/Drag and drop a file here/)).toBeInTheDocument();
    expect(screen.getByText(/Upload/)).toBeInTheDocument();
    expect(screen.getByText(/Upload a file/)).toBeInTheDocument();
  });

  it('calls onFileUpload when file is selected from input', async () => {
    render(<FileUpload message="Upload" onFileUpload={onFileUpload} />);

    const file = new File(['data'], 'test.csv', { type: 'text/csv' });

    const realInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(realInput, { target: { files: [file] } });

    await waitFor(() => expect(onFileUpload).toHaveBeenCalledWith(file));
    expect(screen.getByText(/test.csv/)).toBeInTheDocument();
  });

  it('calls onFileUpload when file is dropped', async () => {
    render(<FileUpload message="Upload" onFileUpload={onFileUpload} />);

    const file = new File(['data'], 'dropped.csv', { type: 'text/csv' });
    const dropZone = screen
      .getByText(/Drag and drop/i)
      .closest('div') as HTMLElement;

    fireEvent.drop(dropZone, {
      dataTransfer: { files: [file] },
      preventDefault: vi.fn(),
    });

    await waitFor(() => expect(onFileUpload).toHaveBeenCalledWith(file));
    expect(screen.getByText(/dropped.csv/i)).toBeInTheDocument();
  });

  it('shows loading state while uploading', async () => {
    onFileUpload = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 50)),
    );
    render(<FileUpload message="Upload" onFileUpload={onFileUpload} />);

    const file = new File(['data'], 'loading.csv', { type: 'text/csv' });
    const realInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(realInput, { target: { files: [file] } });

    expect(await screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <FileUpload
        message="Upload"
        onFileUpload={onFileUpload}
        error="Something went wrong"
      />,
    );
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});
