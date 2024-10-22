"use client";
import React, { useCallback, useEffect, useState } from "react";
import BorderInnerIcon from "@mui/icons-material/BorderInner";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OneItem from "./OneItem";
import { fetchProducts } from "@/services/product";

interface Product {
  nameProduct: string;
  price: string;
}

const ItemsShop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
        <p>Loading products...</p> // Or you can use a spinner here
      ) : (
        <div className="text-black flex-row flex flex-wrap">
          {products.length > 0 ? (
            products.map((product, index) => (
              <OneItem
                key={index}
                nameProduct={product.nameProduct}
                price={product.price}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemsShop;
