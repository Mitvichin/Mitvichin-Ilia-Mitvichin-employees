export type FileUploadProps = {
  message: string;
  onFileUpload: (file: File) => Promise<void>;
  error?: string;
};
