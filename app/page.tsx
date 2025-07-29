"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { fetchProducts } from "../services/product";
import { fetchCategories } from "../services/categorie";
import { Product, Category } from "../types";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        // Get first 4 products for featured section
        setFeaturedProducts(productsData.slice(0, 4));
        setCategories(categoriesData.slice(0, 6)); // First 6 categories
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-white font-sans">
      <Navbar />

      {/* Hero Section with Special Offers */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            className="w-full h-full object-cover" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fc49518df7-c82630a468cfba39c502.png" 
            alt="elegant modern living room with stylish furniture, large windows, natural light, minimalist design"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-xl">
              <span className="inline-block bg-white text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">Limited Time Offers</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Special Summer Sale</h1>
              <p className="text-white text-lg mb-6">Enjoy up to 40% off on selected furniture and home decor items. Transform your space with our premium collection.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="bg-gray-700 text-white text-center py-3 px-6 rounded-md hover:bg-accent transition duration-300 font-medium cursor-pointer">Shop Now</Link>
                <Link href="/shop" className="bg-transparent border-2 border-white text-white text-center py-3 px-6 rounded-md hover:bg-white hover:text-gray-800 transition duration-300 font-medium cursor-pointer">View All Offers</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Shop By Categories</h2>
            <p className="text-secondary max-w-2xl mx-auto">Explore our wide range of furniture and home decor items categorized for your convenience.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group relative rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                </div>
              ))
            ) : (
              categories.map((category) => (
                <CategoryCard 
                  key={category.idCategorie} 
                  category={category}
                  productCount={Math.floor(Math.random() * 50) + 15} // Mock count for now
                />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-block bg-gray-700 text-white py-3 px-8 rounded-md hover:bg-accent transition duration-300 font-medium cursor-pointer">View All Categories</Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Featured Products</h2>
            <p className="text-secondary max-w-2xl mx-auto">Discover our most popular and trending items that customers love.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <ProductCard 
                  key={product.idProduct} 
                  product={product}
                  showBadge={index === 0 || index === 2}
                  badgeText={index === 0 ? "Sale" : "New"}
                  badgeType={index === 0 ? "sale" : "new"}
                />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-block bg-gray-700 text-white py-3 px-8 rounded-md hover:bg-accent transition duration-300 font-medium cursor-pointer">View All Products</Link>
          </div>
        </div>
      </section>
      
      {/* Special Offer Banner */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex items-center">
                <div>
                  <span className="inline-block bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">Limited Time</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Summer Sale<br/>Up to 40% Off</h2>
                  <p className="text-gray-300 mb-6">Don't miss out on our biggest sale of the season. Upgrade your home with premium furniture and decor.</p>
                  <Link href="/shop" className="inline-block bg-white text-gray-800 py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300 font-medium cursor-pointer">Shop Now</Link>
                </div>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/797e35aaef-8534dda64ba9fca5943e.png" 
                  alt="stylish living room with modern furniture and 40% off sale tag, professional interior photography"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
