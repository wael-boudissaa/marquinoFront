"use client";
import React, { useCallback, useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { fetchCategories } from "@/services/categorie";
import { Category } from "@/types";

interface SideBarProps {
  onCategorySelect?: (categoryId: string) => void;
  onPriceRangeChange?: (min: number, max: number) => void;
  selectedCategory?: string;
}

const SideBar: React.FC<SideBarProps> = ({ 
  onCategorySelect, 
  onPriceRangeChange, 
  selectedCategory 
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const fetchCategoriesData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchCategories();
      setCategories(result);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onPriceRangeChange?.(value[0], value[1]);
  };

  return (
    <div className="flex flex-col w-1/5">
      <div className="flex flex-col px-12 marginfrombody">
        {/* Categories Section */}
        <hr />
        <div className="flex flex-col my-6">
          <h1 className="text-lg font-semibold">Product Categories</h1>
          <hr />
          <div className="pl-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-sm py-2">
                <p>Error loading categories</p>
                <button 
                  onClick={fetchCategoriesData}
                  className="text-blue-600 hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div 
                  className={`my-3 cursor-pointer hover:text-blue-600 transition-colors ${
                    !selectedCategory ? 'text-blue-600 font-medium' : ''
                  }`}
                  onClick={() => handleCategoryClick('')}
                >
                  All Categories
                </div>
                {categories.map((category) => (
                  <div 
                    key={category.idCategorie} 
                    className={`my-3 cursor-pointer hover:text-blue-600 transition-colors ${
                      selectedCategory === category.idCategorie ? 'text-blue-600 font-medium' : ''
                    }`}
                    onClick={() => handleCategoryClick(category.idCategorie)}
                  >
                    {category.nameCategorie}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="flex flex-col my-6">
          <h1 className="text-lg font-semibold">Price Range</h1>
          <hr />
          <div className="px-4 py-4">
            <SliderDemo 
              value={priceRange} 
              onValueChange={handlePriceChange}
              className="w-full"
              min={0}
              max={2000}
              step={50}
            />
            <p className="text-sm text-gray-600 mt-2">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      className={cn("w-[100%]", className)}
      {...props}
    />
  );
}
export default SideBar;
