'use client';

import Link from "next/link";
import Image from "next/image";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  imageUrl?: string;
}

const CategoryCard = ({ category, productCount = 0, imageUrl }: CategoryCardProps) => {
  // Default category images mapping
  const defaultImages: { [key: string]: string } = {
    'living room': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/83b5ab5309-357e4dd4f553536d21ab.png',
    'bedroom': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b9ae8cb4f8-26b375fab1bedeb36c17.png',
    'dining': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/36553a24fd-f4ad08155de15aaf0ce7.png',
    'kitchen': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/94a6053037-b3e520f2a69b748e685f.png',
    'lighting': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8969f23618-c5cdd897921ebc8c48c1.png',
    'decor': 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ef6d4fcb57-08b8ef179ea6cd1bffd2.png',
  };

  const categoryName = category.nameCategorie;
  const categoryKey = categoryName.toLowerCase();
  const displayImage = imageUrl || defaultImages[categoryKey] || defaultImages['decor'];

  return (
    <Link href={`/shop?category=${category.idCategorie}`}>
      <div className="group relative rounded-lg overflow-hidden shadow-md cursor-pointer">
        <div className="h-64 relative">
          <Image 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            src={displayImage}
            alt={`${categoryName} furniture and decor category`}
            fill
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <h3 className="text-white font-bold text-lg mb-1">{categoryName}</h3>
          <span className="inline-block bg-white bg-opacity-80 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {productCount} Products
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;