'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { fetchProducts } from "../../services/product";
import { fetchCategories } from "../../services/categorie";
import { Product, Category } from "../../types";

const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [priceRange, setPriceRange] = useState(500);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories()
                ]);

                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error loading shop data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "All Products"
        ? products
        : products.filter(product => product.category?.nameCategorie === selectedCategory);

    return (
        <div className="bg-white font-sans">
            <Navbar />

            {/* Shop Banner */}
            <section className="relative h-[300px]">
                <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/20caecb05f-62cc6f255d9a85d4a8a0.png"
                    alt="modern furniture store showroom with stylish home decor items, professional photography"
                    fill
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-bold text-white mb-4">Our Collection</h1>
                            <p className="text-white text-lg mb-2">Discover quality furniture and home decor</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop Filters */}
            <section className="py-6 border-b">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        {/* Left Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-primary font-medium">Filter:</span>
                                <select className="border rounded-md px-3 py-2 focus:outline-none text-sm">
                                    <option>All Categories</option>
                                    <option>Furniture</option>
                                    <option>Lighting</option>
                                    <option>Decor</option>
                                    <option>Kitchen</option>
                                    <option>Bedroom</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-primary font-medium">Price:</span>
                                <select className="border rounded-md px-3 py-2 focus:outline-none text-sm">
                                    <option>All Prices</option>
                                    <option>Under $100</option>
                                    <option>$100 - $300</option>
                                    <option>$300 - $600</option>
                                    <option>$600+</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-primary font-medium">Sort by:</span>
                                <select className="border rounded-md px-3 py-2 focus:outline-none text-sm">
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                    <option>Best Selling</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-primary">
                                    <i className="fa-solid fa-grip"></i>
                                </button>
                                <button className="p-2 text-primary">
                                    <i className="fa-solid fa-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop Products */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <div className="w-full md:w-64 md:mr-8 mb-8 md:mb-0">
                            {/* Categories */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center justify-between">
                                        <span
                                            className={`cursor-pointer ${selectedCategory === "All Products" ? "text-primary font-semibold" : "text-primary hover:text-accent"}`}
                                            onClick={() => setSelectedCategory("All Products")}
                                        >
                                            All Products
                                        </span>
                                        <span className="text-gray-500 text-sm">{products.length}</span>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.idCategorie} className="flex items-center justify-between">
                                            <span
                                                className={`cursor-pointer ${selectedCategory === category.nameCategorie ? "text-primary font-semibold" : "text-primary hover:text-accent"}`}
                                                onClick={() => setSelectedCategory(category.nameCategorie)}
                                            >
                                                {category.nameCategorie}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                {products.filter(p => p.category?.nameCategorie === category.nameCategorie).length}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-primary">Price Range</h3>
                                <div className="mb-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">$0</span>
                                    <span className="text-gray-600">$1000</span>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <input type="number" placeholder="Min" className="w-1/2 border rounded-md px-2 py-1 text-sm" />
                                    <input type="number" placeholder="Max" className="w-1/2 border rounded-md px-2 py-1 text-sm" />
                                </div>
                                <button className="mt-3 bg-gray-700 text-white py-2 px-4 rounded-md text-sm w-full hover:bg-accent transition">Apply Filter</button>
                            </div>

                            {/* Special Offers */}
                            <div className="p-4 bg-gray-100 rounded-md">
                                <h3 className="text-lg font-semibold mb-2 text-primary">Special Offers</h3>
                                <p className="text-gray-600 text-sm mb-3">Use code <span className="font-bold">SUMMER20</span> for 20% off all summer items!</p>
                                <button className="bg-gray-700 text-white py-2 px-4 rounded-md text-sm w-full hover:bg-gray-800 transition">View Offers</button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading ? (
                                    // Loading skeleton
                                    Array.from({ length: 6 }).map((_, index) => (
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
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.idProduct}
                                            product={product}
                                            showBadge={index % 3 === 0}
                                            badgeText={index % 2 === 0 ? "Sale" : "New"}
                                            badgeType={index % 2 === 0 ? "sale" : "new"}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-gray-500">No products found in this category.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <div className="flex space-x-1">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
                                        <i className="fa-solid fa-chevron-left text-gray-600"></i>
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 text-white">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">2</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">3</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">4</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100">
                                        <i className="fa-solid fa-chevron-right text-gray-600"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl font-bold text-primary mb-8">Recently Viewed</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Item 1 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 relative">
                                <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/eac92acbd7-987a5dd2851c651246c6.png"
                                    alt="modern gray sofa in living room setting, professional product photography"
                                    fill
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-sm mb-1">Modern Sofa</h3>
                                <span className="text-gray-700 text-sm font-semibold">$599.99</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 relative">
                                <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9502b94ae6-326fa0b11390f0606487.png"
                                    alt="wooden dining table with chairs, natural wood finish, professional product photography"
                                    fill
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-sm mb-1">Wooden Table</h3>
                                <span className="text-gray-700 text-sm font-semibold">$299.99</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 relative">
                                <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a9c4722f4d-526b7502bdf483cbc83d.png"
                                    alt="modern bedside lamp with warm light, sleek design, professional product photography"
                                    fill
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-sm mb-1">Bedside Lamp</h3>
                                <span className="text-gray-700 text-sm font-semibold">$89.99</span>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 relative">
                                <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0b67a63a86-d7cc80075bf2141ec2e8.png"
                                    alt="ceramic decorative vase in neutral color, minimalist design, professional product photography"
                                    fill
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-sm mb-1">Decorative Vase</h3>
                                <span className="text-gray-700 text-sm font-semibold">$49.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-primary mb-4">Stay Updated</h2>
                        <p className="text-secondary mb-8">Subscribe to our newsletter to receive the latest updates, offers, and inspiration.</p>
                        <form className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input type="email" placeholder="Your email address" className="flex-grow py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-md hover:bg-accent transition duration-300">Subscribe</button>
                        </form>
                        <p className="text-sm text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from Marquino.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ShopPage;
