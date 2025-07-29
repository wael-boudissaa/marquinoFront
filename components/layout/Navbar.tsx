"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoggedIn, logout, loading, authVersion } = useUser();
  const { cart } = useCart();

  // Debug authentication state changes only
  useEffect(() => {
    console.log('Navbar - Auth state changed:', { isLoggedIn, hasUser: !!user, loading, authVersion });
  }, [isLoggedIn, user, loading, authVersion]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/aboutus", label: "About Us" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="text-black">
              <i className="fa-solid fa-cube text-2xl"></i>
            </div>
            <span className="text-xl font-bold text-primary">Marquino</span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition cursor-pointer ${
                  pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-primary hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-100 rounded-md py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary" 
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fa-solid fa-search"></i>
              </div>
            </div>
            
            {/* Wishlist */}
            <span className="text-primary hover:text-accent transition cursor-pointer">
              <i className="fa-regular fa-heart"></i>
            </span>
            
            {/* Shopping Cart */}
            <Link href="/cart" className="text-primary hover:text-accent transition cursor-pointer relative">
              <i className="fa-solid fa-shopping-cart"></i>
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems > 99 ? '99+' : cart.totalItems}
                </span>
              )}
            </Link>
            
            {/* User Authentication - Desktop */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-primary">Loading...</span>
                </div>
              ) : isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-primary">Hi, {user?.firstName}</span>
                  <span className="text-gray-400">|</span>
                  <Link href="/profile" className="text-primary hover:underline cursor-pointer">
                    Profile
                  </Link>
                  <span className="text-gray-400">|</span>
                  <button 
                    onClick={handleLogout}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-primary hover:underline cursor-pointer">Login</Link>
                  <span className="text-gray-400">|</span>
                  <Link href="/register" className="text-primary hover:underline cursor-pointer">Register</Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={handleMenuToggle}
            className="md:hidden text-primary"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={handleMenuToggle}>
          <div className="bg-white w-64 h-full p-6" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-black">
                  <i className="fa-solid fa-cube text-xl"></i>
                </div>
                <span className="text-lg font-bold text-primary">Marquino</span>
              </Link>
              <button onClick={handleMenuToggle} className="text-primary">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-100 rounded-md py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-primary" 
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fa-solid fa-search"></i>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-4 mb-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={handleMenuToggle}
                  className={`block py-2 transition ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-primary hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="border-t pt-4 space-y-4">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-primary">Loading...</span>
                </div>
              ) : isLoggedIn ? (
                <>
                  <div className="text-primary font-medium">Hi, {user?.firstName}</div>
                  <Link 
                    href="/profile" 
                    onClick={handleMenuToggle}
                    className="block text-primary hover:text-accent transition"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block text-primary hover:text-accent transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={handleMenuToggle}
                    className="block text-primary hover:text-accent transition"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={handleMenuToggle}
                    className="block text-primary hover:text-accent transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}