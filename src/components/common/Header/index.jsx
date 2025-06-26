import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-99">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <i className="fas fa-cart-shopping"></i>
          <span>Shop</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <i className="fas fa-shopping-cart text-gray-700 text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-all lg:hidden"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};
