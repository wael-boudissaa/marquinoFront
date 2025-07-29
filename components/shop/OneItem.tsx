import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/types";

interface OneItemProps {
  product: Product;
}

const OneItem: React.FC<OneItemProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Link href={`/product/${product.idProduct}`} className="flex flex-col border w-1/5 px-5 py-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <Image
          width={300}
          height={300}
          alt={product.nameProduct}
          src={"/images/product1.png"} // Default image for now
          className="w-full h-48 object-cover"
        />
        {product.boosted && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
            BOOSTED
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            LOW STOCK
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-xs font-bold rounded">
            OUT OF STOCK
          </span>
        )}
      </div>
      <div className="mt-3">
        <h1 className="text-lg font-medium text-gray-900 truncate">{product.nameProduct}</h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold text-lg text-blue-600">{formatPrice(product.price)}</p>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
};

export default OneItem;
