import { Button } from '@components/shared/Button';
import type { FileUploadProps } from '@components/types/FileUploadsProps';
import { useState, type DragEvent, type ChangeEvent, useRef } from 'react';

export const FileUpload: React.FC<FileUploadProps> = ({
  message,
  onFileUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      setIsLoading(true);
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onFileUpload(file).finally(() => setIsLoading(false));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      const file = e.target.files[0];
      setFileName(file.name);
      onFileUpload(file).finally(() => setIsLoading(false));
    }
  };

  const openFilePicker = () => {
    inputRef?.current?.click();
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-200
      ${isDragging ? 'border-blue-500 bg-blue-300' : 'border-blue-300 bg-blue-100 hover:bg-blue-200'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-blue-700 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v10"
        />
      </svg>

      <p className="mb-3 text-blue-900">
        {fileName ? (
          <span className="font-medium">{fileName}</span>
        ) : (
          'Drag and drop a file here or use the button below'
        )}
      </p>
      <Button
        onClick={openFilePicker}
        isLoading={isLoading}
        className="bg-blue-300 hover:bg-blue-400 text-blue-900"
      >
        Select File
      </Button>

      <p className="mt-2 text-sm text-blue-900 opacity-80">{message}</p>
    </div>
  );
};
