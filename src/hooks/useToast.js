import { useToast as useToastContext } from "../context/ToastContext";

export const useToast = () => {
  const { addToast, removeToast } = useToastContext();

  const showToast = (type, title, message) => {
    addToast({ type, title, message });
  };

  const showSuccess = (title, message) => {
    showToast("success", title, message);
  };

  const showError = (title, message) => {
    showToast("error", title, message);
  };

  const showInfo = (title, message) => {
    showToast("info", title, message);
  };

  return { showSuccess, showError, showInfo, removeToast };
};
