import { toast, ToastOptions } from "react-toastify";

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  rtl: true,
};

export const notify = {
  success: (message: string, options?: ToastOptions) => toast.success(message, { ...defaultToastOptions, ...options }),
  error: (message: string, options?: ToastOptions) => toast.error(message, { ...defaultToastOptions, ...options }),
  info: (message: string, options?: ToastOptions) => toast.info(message, { ...defaultToastOptions, ...options }),
  warning: (message: string, options?: ToastOptions) => toast.warning(message, { ...defaultToastOptions, ...options }),
  default: (message: string, options?: ToastOptions) => toast(message, { ...defaultToastOptions, ...options }),
};

export { toast };
