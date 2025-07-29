'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { createOrder } from '../../services/orders';
import { CreateOrderRequest } from '../../types';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isLoggedIn, loading: userLoading, authVersion } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monitor authentication state changes (reduced logging)
  useEffect(() => {
    if (!userLoading) {
      console.log('Cart Page - Auth state settled:', { isLoggedIn, hasUser: !!user, authVersion });
    }
  }, [isLoggedIn, userLoading, user, authVersion]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    // Check if user is still loading
    if (userLoading) {
      return;
    }

    if (!isLoggedIn) {
      router.push('/login?redirect=/cart');
      return;
    }

    if (!user) {
      setError('User information not available. Please log in again.');
      return;
    }

    if (cart.items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    console.log('Cart Page - Processing checkout for user:', user.idProfile);
    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderData: CreateOrderRequest = {
        products: cart.items.map(item => ({
          idProduct: item.product.idProduct,
          quantity: item.quantity
        }))
      };

      const customerId = user.idProfile;
      await createOrder(customerId, orderData);
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/order-success');
    } catch (err: any) {
      console.error('Cart Page - Checkout error:', err);
      setError(err.message || 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while user authentication is being determined
  if (userLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product.idProduct} className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/product1.png"
                      alt={item.product.nameProduct}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.product.nameProduct}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-semibold text-blue-600 mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.product.idProduct, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product.idProduct, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.idProduct)}
                      className="text-red-600 hover:text-red-800 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                  <span className="font-medium">{formatPrice(cart.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(cart.totalAmount * 0.1)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cart.totalAmount * 1.1)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {!userLoading && !isLoggedIn && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    Please log in to complete your purchase.
                    <Link href="/login" className="ml-2 text-yellow-900 underline font-medium">
                      Log in now
                    </Link>
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading || userLoading || !isLoggedIn}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : userLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : isLoggedIn ? (
                  'Proceed to Checkout'
                ) : (
                  'Log in to Checkout'
                )}
              </button>

              <div className="mt-4 text-center">
                <Link
                  href="/shop"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}