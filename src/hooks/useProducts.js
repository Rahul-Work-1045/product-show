import { useState, useEffect } from "react";
import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";
import { useToast } from "./useToast";
import { PRICE_RANGE, SORT_OPTIONS } from "../utils/constants";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [PRICE_RANGE.MIN, PRICE_RANGE.MAX],
  });
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const { showError } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.get(ENDPOINTS.PRODUCTS),
          api.get(ENDPOINTS.CATEGORIES),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(["all", ...categoriesData]);
      } catch (err) {
        setError(err);
        showError("Error", "Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, filters, sortOption]);

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    filters,
    setFilters,
    sortOption,
    setSortOption,
  };
};
