import { Star, ChevronLeft, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";
import { useCart } from "../../../context/CartContext";
import Loader from "../loader/index";
import { useToast } from "../../../hooks/useToast";
import Button from "../UI/Button";
import Image from "../UI/Image";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await api.get(ENDPOINTS.PRODUCT(id));
        setProduct(productData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(
      "Added to cart",
      `${product.title} has been added to your cart`
    );
  };

  if (loading) {
    return <Loader className="py-20" />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-gray-600">
          Error loading product
        </h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-gray-600">Product not found</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ChevronLeft size={20} />
        <span className="ml-1">Back to products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96 bg-gray-100 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={
                    i < Math.round(product.rating.rate)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">
            ${product.price.toFixed(2)}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Category: {product.category}</li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg"
                type="button"
              >
                -
              </Button>
              <span className="px-3 py-1">{quantity}</span>
              <Button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg"
                type="button"
              >
                +
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
