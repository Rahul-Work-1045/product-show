import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useToast } from "../../../hooks/useToast";
import "./styles.css";

const Toast = ({ toast }) => {
  const { removeToast } = useToast();

  const iconMap = {
    success: <CheckCircle2 size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  return (
    <div
      className={`toast toast-${toast.type} bg-white shadow-lg rounded-md border p-4 mb-2 flex items-start max-w-md`}
    >
      <div className="mr-3 mt-0.5">{iconMap[toast.type]}</div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{toast.title}</h4>
        {toast.message && (
          <p className="text-sm text-gray-500 mt-1">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
