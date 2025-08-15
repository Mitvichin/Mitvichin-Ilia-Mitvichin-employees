import { FileUpload } from '@components/shared/FileUpload';
import { appFetch } from '../utils/appFetch';

export const EmployeesPairPage: React.FC = () => {
  const onFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await appFetch(
        '/api/upload',
        {
          method: 'POST',
          body: formData,
        },
        true,
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full min-h-full overflow-auto">
      <div className="grow-0 flex justify-center items-center">
        <h1 className="text-4xl">Employee Pair Finder</h1>
      </div>
      <div className="grow-1">
        <FileUpload message="CSV up to 5MB" onFileUpload={onFileUpload} />
      </div>

      <div className="bg-blue-500 grow-5"></div>
    </div>
  );
};
