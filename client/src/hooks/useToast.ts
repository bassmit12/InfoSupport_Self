// useToast.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastFunctions {
  showSuccessToast: (message: string, options?: ToastOptions) => void;
  showErrorToast: (message: string, options?: ToastOptions) => void;
}

const useCustomToast = (): ToastFunctions => {
  const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  };

  const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      ...options,
    });
  };

  return { showSuccessToast, showErrorToast };
};

export default useCustomToast;
