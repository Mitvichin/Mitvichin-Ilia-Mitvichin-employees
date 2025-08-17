import { ToastContainer } from 'react-toastify';
import './App.css';
import { EmployeesPairPage } from '@pages/EmployeesPairPage';
import { TOAST_PROPS } from '@utils/constants';

function App() {
  return (
    <>
      <div className="flex px-5 py-2 max-w-[1200px] m-auto w-full min-h-screen">
        <EmployeesPairPage />;
      </div>
      <ToastContainer {...TOAST_PROPS} />
    </>
  );
}

export default App;
