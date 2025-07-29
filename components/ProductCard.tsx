'use client';

import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  badgeText?: string;
  badgeType?: 'sale' | 'new';
}

const ProductCard = ({ product, showBadge = false, badgeText, badgeType = 'sale' }: ProductCardProps) => {
  // Convert backend product to display format
  const displayPrice = product.price;
  const productName = product.nameProduct;
  const categoryName = product.category?.nameCategorie || 'Product';
  
  // For now, use placeholder image if no image available
  const productImage = `https://storage.googleapis.com/uxpilot-auth.appspot.com/eac92acbd7-987a5dd2851c651246c6.png`;
  
  // Mock rating for now - this could come from a ratings service
  const rating = 4;
  const reviewCount = Math.floor(Math.random() * 50) + 5;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link href={`/product/${product.idProduct}`}>
        <div className="relative h-64">
          <Image 
            className="absolute inset-0 w-full h-full object-cover" 
            src={productImage}
            alt={`${productName} - ${categoryName}`}
            fill
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
              className={index < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
            ></i>
          ))}
          <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
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