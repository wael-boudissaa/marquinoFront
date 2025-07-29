'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartItem, Cart, Product } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalAmount: 0,
    totalItems: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert old cart format to new format if needed
        if (Array.isArray(parsedCart)) {
          const cartItems: CartItem[] = parsedCart.map((item: any) => ({
            product: item.product,
            quantity: item.quantity
          }));
          setCart(calculateCartTotals(cartItems));
        } else {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = useCallback((items: CartItem[]): Cart => {
    const totalAmount = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    
    return {
      items,
      totalAmount,
      totalItems,
    };
  }, []);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.idProduct === product.idProduct);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = prevCart.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...prevCart.items, { product, quantity }];
      }
      
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.idProduct !== productId);
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.product.idProduct === productId 
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals(newItems);
    });
  }, [calculateCartTotals, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalAmount: 0,
      totalItems: 0,
    });
  }, []);

  const isInCart = useCallback((productId: string) => {
    return cart.items.some(item => item.product.idProduct === productId);
  }, [cart.items]);

  const getCartItemQuantity = useCallback((productId: string) => {
    const item = cart.items.find(item => item.product.idProduct === productId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};