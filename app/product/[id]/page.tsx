'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductById, fetchProducts } from '../../../services/product';
import { Product } from '../../../types';
import { useCart } from '../../../contexts/CartContext';
import ProductRating from '../../../components/ProductRating';
import ProductCard from '../../../components/ProductCard';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id || typeof params.id !== 'string') return;
      
      try {
        setLoading(true);
        setError(null);
        const [productData, allProducts] = await Promise.all([
          fetchProductById(params.id),
          fetchProducts()
        ]);
        setProduct(productData);
        // Get related products (same category, excluding current product)
        const related = allProducts
          .filter(p => p.idCategorie === productData.idCategorie && p.idProduct !== productData.idProduct)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    try {
      addToCart(product, quantity);
      // Show success message (you can implement a toast notification here)
      alert(`${quantity} ${product.nameProduct}(s) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const currentCartQuantity = product ? getCartItemQuantity(product.idProduct) : 0;
  const maxQuantity = product ? Math.min(10, product.stock - currentCartQuantity) : 0;

  // Mock product images - in real app, these would come from the backend
  const productImages = [
    '/images/product1.png',
    '/images/product1.png',
    '/images/product1.png',
    '/images/product1.png'
  ];

  const colors = ['Black', 'White', 'Brown', 'Gray'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-64">
          <div className="text-red-600 text-center">
            <p className="text-lg font-medium">Product not found</p>
            <p className="text-sm">{error}</p>
            <Link href="/shop" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white font-sans">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="cursor-pointer hover:text-accent">Home</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <Link href="/shop" className="cursor-pointer hover:text-accent">Shop</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs"></i>
            <span className="text-accent">{product.nameProduct}</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src={productImages[selectedImageIndex]}
                    alt={product.nameProduct}
                    fill
                  />
                  {product.boosted && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                      SALE
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative h-24 bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedImageIndex === index ? 'border-gray-700' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      className="absolute inset-0 w-full h-full object-cover"
                      src={image}
                      alt={`${product.nameProduct} ${index + 1}`}
                      fill
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-primary mb-4">{product.nameProduct}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
              </div>
              <div className="text-2xl font-bold text-primary mb-6">{formatPrice(product.price)}</div>
              
              <p className="text-secondary mb-6 leading-relaxed">{product.description}</p>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Color</h3>
                <div className="flex space-x-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                        selectedColor === color
                          ? 'border-gray-700 bg-gray-700 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Size</h3>
                <div className="flex space-x-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                        selectedSize === size
                          ? 'border-gray-700 bg-gray-700 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              
              {/* Quantity and Add to Cart */}
              {product.stock > 0 && (
                <div className="mb-8">
                  {currentCartQuantity > 0 && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 text-sm">
                        {currentCartQuantity} {currentCartQuantity === 1 ? 'item' : 'items'} already in cart
                      </p>
                    </div>
                  )}
                  
                  {maxQuantity > 0 ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="px-4 py-2 border-x">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-md font-medium hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAdding ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Adding...
                          </div>
                        ) : (
                          'Add to Cart'
                        )}
                      </button>
                      <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                        <i className="fa-regular fa-heart text-gray-600"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600">Maximum quantity already in cart</p>
                      <Link href="/cart" className="text-blue-600 hover:underline">
                        View Cart
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Product Details */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-primary font-medium">{product.idProduct}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-primary font-medium">{product.idCategorie}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className="text-primary font-medium">{product.stock} in stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          {/* Tab Navigation */}
          <div className="flex border-b mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? 'border-b-2 border-gray-700 text-gray-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white p-8 rounded-lg">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Product Description</h3>
                <p className="text-secondary leading-relaxed mb-4">{product.description}</p>
                <p className="text-secondary leading-relaxed">
                  This premium piece combines exceptional craftsmanship with contemporary design. 
                  Made from high-quality materials, it's built to last and designed to impress. 
                  Perfect for modern living spaces, this item adds both functionality and style to your home.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Dimensions</h4>
                    <ul className="space-y-1 text-secondary">
                      <li>Width: 24 inches</li>
                      <li>Height: 18 inches</li>
                      <li>Depth: 12 inches</li>
                      <li>Weight: 15 lbs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Materials</h4>
                    <ul className="space-y-1 text-secondary">
                      <li>Premium hardwood construction</li>
                      <li>Eco-friendly finish</li>
                      <li>Stainless steel hardware</li>
                      <li>Made in USA</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Customer Reviews</h3>
                <ProductRating productId={product.idProduct} />
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Shipping Information</h3>
                <div className="space-y-4 text-secondary">
                  <p><strong>Free Shipping:</strong> Orders over $100 qualify for free standard shipping.</p>
                  <p><strong>Standard Shipping:</strong> 5-7 business days ($9.99)</p>
                  <p><strong>Express Shipping:</strong> 2-3 business days ($19.99)</p>
                  <p><strong>Overnight Shipping:</strong> Next business day ($39.99)</p>
                  <p><strong>Returns:</strong> 30-day return policy. Items must be in original condition.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.idProduct}
                  product={relatedProduct}
                  showBadge={index % 3 === 0}
                  badgeText={index % 2 === 0 ? "Sale" : "New"}
                  badgeType={index % 2 === 0 ? "sale" : "new"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 relative">
                  <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/product1.png"
                    alt={`Recently viewed product ${index + 1}`}
                    fill
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1">Product {index + 1}</h3>
                  <span className="text-gray-700 text-sm font-semibold">$99.99</span>
                </div>
              </div>
            ))}
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
}