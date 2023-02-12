import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const parseString = (str: string): string => {
  return str.replace('_', ' ');
}