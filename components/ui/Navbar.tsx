"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Modal from "./Modal";
import Search from "./Search";
import { routes } from "../../config/router/paths";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";
import menuHamburger from "./assets/icons/menuHamburger.svg";
import menuArrowRight from "./assets/icons/menuArrowRight.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useUser();
  const { cart } = useCart();

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/shop", text: "Shop" },
    { to: "/aboutus", text: "About Us" },
    { to: "/contact", text: "Contact" },
    { to: "/feedback", text: "Feedback" },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="px-4 flex py-6 justify-between place-items-center border-b-[1px] md:px-24">
        <div className="flex justify-start lg:hidden">
          <button onClick={handleClick}>
            <img src={menuHamburger} alt="open menu" />
          </button>
        </div>

        <Logo />

        <div className="hidden lg:flex justify-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-lg font-semibold hover:text-blue-600 transition-colors ${
                pathname === link.to ? "text-blue-600 underline" : "text-gray-700"
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="hidden justify-center lg:flex">
          <Search />
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className={`relative p-2 rounded-lg transition-colors ${
              pathname === "/cart"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 17h-11v-14h-2"></path>
              <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.totalItems > 99 ? '99+' : cart.totalItems}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Hi, {user?.firstName}
                </span>
                <div className="flex space-x-2">
                  <Link
                    href="/profile"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/register"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <Modal open={isMenuOpen} onClose={handleClick}>
        <div className="flex flex-col gap-4">
          <Search />
          
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="grid grid-cols-[80%_20%] text-xl font-bold hover:text-blue-600"
              onClick={handleClick}
            >
              <h1>{link.text}</h1>
              <div className="flex justify-end">
                <img src={menuArrowRight} alt={link.to} />
              </div>
            </Link>
          ))}
          
          <hr className="my-2" />
          
          {/* Mobile Auth Links */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium text-gray-700">
                Hi, {user?.firstName}
              </div>
              <Link
                href="/profile"
                className="grid grid-cols-[80%_20%] text-xl font-bold hover:text-blue-600"
                onClick={handleClick}
              >
                <h1>Profile</h1>
                <div className="flex justify-end">
                  <img src={menuArrowRight} alt="profile" />
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-xl font-bold text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="grid grid-cols-[80%_20%] text-xl font-bold hover:text-blue-600"
                onClick={handleClick}
              >
                <h1>Login</h1>
                <div className="flex justify-end">
                  <img src={menuArrowRight} alt="login" />
                </div>
              </Link>
              <Link
                href="/register"
                className="grid grid-cols-[80%_20%] text-xl font-bold hover:text-blue-600"
                onClick={handleClick}
              >
                <h1>Register</h1>
                <div className="flex justify-end">
                  <img src={menuArrowRight} alt="register" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
