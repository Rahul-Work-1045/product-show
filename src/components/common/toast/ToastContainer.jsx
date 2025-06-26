import Toast from "./index";
import { useToast } from "../../../context/ToastContext";

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {(toasts || []).map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;