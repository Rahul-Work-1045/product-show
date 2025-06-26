import { useState } from "react";
import { Header } from "../../components/common/Header";
import { ProductGrid } from "../../components/common/ProductGrid";
import { SidebarFilters } from "../../components/common/SidebarFilters";
import { SortOptions } from "../../components/common/SortOptions";
import { useProducts } from "../../hooks/useProducts";
import Pagination from "../../components/common/Pagination";
import Select from "../../components/common/UI/Select";

const ITEMS_PER_PAGE_OPTIONS = [10, 15, 25, 50, 100];

export const HomePage = () => {
  const {
    products,
    categories,
    loading,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  } = useProducts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = products.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarFilters
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1">
            <SortOptions
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <div className="flex items-center justify-end mb-4 sticky top-0 bg-gray-50 z-10 py-2">
              <label className="mr-2 font-medium">Items per page:</label>
              <Select
                className="px-2 py-1"
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                options={ITEMS_PER_PAGE_OPTIONS.map(opt => ({ value: opt, label: opt }))}
              />
            </div>
            <ProductGrid products={paginatedProducts} loading={loading} />
            <Pagination
              totalItems={products.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
