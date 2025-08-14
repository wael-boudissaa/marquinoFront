'use client';

import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { useEffect, useState } from "react";
import { fetchAverageRating, fetchProductRatings } from "../services/feedback";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  badgeText?: string;
  badgeType?: 'sale' | 'new';
}

const ProductCard = ({ product, showBadge = false, badgeText, badgeType = 'sale' }: ProductCardProps) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Convert backend product to display format
  const displayPrice = product.price;
  const productName = product.nameProduct;
  const categoryName = product.category?.nameCategorie || 'Product';
  
  // Use product image or fallback to placeholder
  const fallbackImage = `https://images.unsplash.com/photo-1560472354-c5b3b79b1ba8?w=500&h=400&fit=crop&crop=center`;
  const productImage = (product.imageUrl && !imageError) ? product.imageUrl : fallbackImage;
  
  useEffect(() => {
    const loadRatingData = async () => {
      try {
        // Fetch average rating and ratings count
        const [avgRating, ratings] = await Promise.all([
          fetchAverageRating(product.idProduct),
          fetchProductRatings(product.idProduct)
        ]);
        
        setAverageRating(avgRating);
        setReviewCount(ratings?.length || 0);
      } catch (error) {
        console.error('Error loading rating data:', error);
        // Keep default values (0) if there's an error
      }
    };

    loadRatingData();
  }, [product.idProduct]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link href={`/product/${product.idProduct}`}>
        <div className="relative h-64">
          <Image 
            className="absolute inset-0 w-full h-full object-cover" 
            src={productImage}
            alt={`${productName} - ${categoryName}`}
            fill
            onError={() => setImageError(true)}
          />
          {showBadge && badgeText && (
            <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded">
              {badgeText}
            </span>
          )}
          <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <i className="fa-regular fa-heart text-gray-600"></i>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <i className="fa-solid fa-eye text-gray-600"></i>
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.idProduct}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-accent transition cursor-pointer">{productName}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{categoryName}</p>
        <div className="flex text-yellow-400 mb-2">
          {[...Array(5)].map((_, index) => (
            <i 
              key={index}
              className={index < Math.round(averageRating) ? "fa-solid fa-star" : "fa-regular fa-star"}
            ></i>
          ))}
          <span className="text-gray-500 text-xs ml-1">
            {reviewCount > 0 ? `(${reviewCount})` : '(No reviews)'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-gray-700">${displayPrice}</span>
          </div>
          <button className="text-primary hover:text-accent transition">
            <i className="fa-solid fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;