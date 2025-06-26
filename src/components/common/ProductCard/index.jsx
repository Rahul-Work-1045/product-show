import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../hooks/useToast";
import Button from "../UI/Button";
import Image from "../UI/Image";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    showSuccess("Added to cart", `${product.title} added to your cart`);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="h-48 shadow flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.round(product.rating.rate)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">
              ({product.rating.count})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};
