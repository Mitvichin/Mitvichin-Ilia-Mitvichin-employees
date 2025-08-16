import { Bounce, type ToastContainerProps } from 'react-toastify';

export const UNKNOWN_ERROR = 'Something went wrong! Try again later!';
export const SUPPORETED_DATE_FORMATS = [
  'YYYY-MM-DD',
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'DD-MM-YYYY',
];
export const MAX_FILE_SIZE_MB = 5;

export const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-right',
  'aria-label': 'notification',
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
  transition: Bounce,
};
