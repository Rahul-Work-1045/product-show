import { X } from "lucide-react";
import { PRICE_RANGE } from "../../../utils/constants";
import Input from "../UI/Input";
import Button from "../UI/Button";

export const SidebarFilters = ({
  categories,
  filters,
  setFilters,
  isOpen,
  onClose,
}) => {
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = Number(e.target.value);
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  return (
    <div
      className={`fixed inset-0 z-20 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 lg:w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button onClick={onClose} className="p-1" aria-label="Close Filters">
            <X size={24} />
          </Button>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Input
                  type="radio"
                  id={`cat-${category}`}
                  name="category"
                  checked={filters.category === category}
                  onChange={() => setFilters({ ...filters, category })}
                  className="mr-2"
                />
                <label htmlFor={`cat-${category}`} className="capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-sm font-medium">${filters.priceRange[0]}</span>
              <span className="text-sm font-medium">${filters.priceRange[1]}</span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-medium mb-1 text-gray-600">Min Price</label>
                <Input
                  type="range"
                  min={PRICE_RANGE.MIN}
                  max={PRICE_RANGE.MAX}
                  step={PRICE_RANGE.STEP}
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="custom-range w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-medium mb-1 text-gray-600">Max Price</label>
                <Input
                  type="range"
                  min={PRICE_RANGE.MIN}
                  max={PRICE_RANGE.MAX}
                  step={PRICE_RANGE.STEP}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="custom-range w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
