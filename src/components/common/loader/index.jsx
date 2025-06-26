import { Loader2 } from "lucide-react";
import "../../../index.css";

const Loader = ({ size = 48, color = "text-indigo-600", className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <Loader size={64} />
  </div>
);

export default Loader;
