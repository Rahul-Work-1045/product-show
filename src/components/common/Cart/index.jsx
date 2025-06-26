import { ShoppingCart, X, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../hooks/useToast";
import Button from "../UI/Button";
import Image from "../UI/Image";

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const handleClearCart = () => {
    clearCart();
    showSuccess("Cart cleared", "All items have been removed from your cart");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="text-gray-400" size={24} />
        </div>
        <h3 className="text-xl font-medium text-gray-600">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mb-6">
          Start shopping to add items to your cart
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue text-white px-6 py-2 rounded-md hover:bg-primary-700"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold">Your Cart</h1>
        <Button
          onClick={handleClearCart}
          className="text-sm md:text-base"
        >
          Clear Cart
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="block md:hidden space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start space-x-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>
                    <div className="text-lg font-semibold mt-1">${item.price.toFixed(2)}</div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2 sm:gap-0">
                      <div className="flex items-center border rounded-md w-max">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1"
                          type="button"
                        >
                          -
                        </Button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1"
                          type="button"
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs sm:text-sm flex items-center w-max"
                        type="button"
                      >
                        <X size={14} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
            <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium min-w-[600px]">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 p-4 border-b items-center min-w-[600px]"
              >
                <div className="col-span-5 flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  ${item.price.toFixed(2)}
                </div>

                <div className="col-span-3 flex flex-col md:flex-row md:justify-center md:items-center gap-2 md:gap-4">
                  <div className="flex items-center border rounded-md w-max mx-auto md:mx-0">
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1"
                      type="button"
                    >
                      -
                    </Button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1"
                      type="button"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs md:text-sm flex items-center w-max mx-auto md:mx-0"
                    type="button"
                  >
                    <X size={14} className="mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="col-span-2 text-center font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mt-6 text-sm md:text-base"
          >
            <ChevronLeft size={18} className="mr-1" />
            Continue Shopping
          </Link>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-4 md:p-6 sticky top-4">
            <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between">
                <span className="text-sm md:text-base">Subtotal</span>
                <span className="text-sm md:text-base">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm md:text-base">Shipping</span>
                <span className="text-sm md:text-base">Free</span>
              </div>
              <div className="flex justify-between font-bold text-base md:text-lg pt-3 md:pt-4 border-t">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};