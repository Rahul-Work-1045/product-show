import { ProductCard } from "../ProductCard/index";
import Loader from "../loader/index";

export const ProductGrid = ({ products, loading }) => {
  const safeProducts = Array.isArray(products) ? products : [];

  if (loading) {
    return <Loader className="py-20" />;
  }

  if (!safeProducts.length) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-gray-600">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {safeProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
