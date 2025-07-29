"use client";
import React, { useCallback, useEffect, useState } from "react";
import BorderInnerIcon from "@mui/icons-material/BorderInner";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OneItem from "./OneItem";
import { fetchProducts } from "@/services/product";
import { Product, ProductFilters } from "@/types";

interface ItemsShopProps {
  filters?: ProductFilters;
}

const ItemsShop: React.FC<ItemsShopProps> = ({ filters = {} }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Apply client-side price filtering if backend doesn't support it
      const fetchedProducts = await fetchProducts(filters);
      
      let filteredProducts = fetchedProducts;
      
      // Apply price range filter on client side
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        filteredProducts = fetchedProducts.filter(product => {
          const price = product.price;
          const minPrice = filters.minPrice || 0;
          const maxPrice = filters.maxPrice || Infinity;
          return price >= minPrice && price <= maxPrice;
        });
      }
      
      setProducts(filteredProducts);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full marginfrombody px-7 text-gray-500">
      <div className="flex flex-row justify-between w-full my-6">
        <div className="w-full flex flex-row">
          <div className="flex flex-row px-2 border text-gray-700">
            <p>Default Sorting </p>
            <ArrowDropDownIcon />
          </div>
          <div className="mx-2">
            <BorderInnerIcon />
          </div>
        </div>
        <div className="flex flex-row">
          <p>Showing </p>
          <div className="flex flex-row px-2 border text-gray-700">
            <p>12</p>
            <ArrowDropDownIcon />
          </div>
        </div>
      </div>

      {/* Show loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600 text-center">
            <p className="text-lg font-medium">Error loading products</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchData}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="text-black flex-row flex flex-wrap">
          {products.length > 0 ? (
            products.map((product) => (
              <OneItem
                key={product.idProduct}
                product={product}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-64 w-full">
              <p className="text-gray-500 text-lg">No products available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsShop;
