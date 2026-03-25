import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-coffee-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">☕</span>
            <span className="text-2xl font-bold">Coffee Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-coffee-200 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-coffee-200 transition">
              Products
            </Link>
            <Link to="/about" className="hover:text-coffee-200 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-coffee-200 transition">
              Contact
            </Link>
            
            {user && (
              <Link to="/orders" className="hover:text-coffee-200 transition">
                My Orders
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:text-coffee-200 transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-coffee-200">Hi, {user.name || user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-coffee-500 hover:bg-coffee-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-coffee-500 hover:bg-coffee-600 px-4 py-2 rounded transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-coffee-300 hover:bg-coffee-400 text-coffee-900 px-4 py-2 rounded transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="hover:bg-coffee-600 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="hover:bg-coffee-600 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="hover:bg-coffee-600 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:bg-coffee-600 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="hover:bg-coffee-600 px-4 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              <Link
                to="/cart"
                className="hover:bg-coffee-600 px-4 py-2 rounded flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <div className="px-4 py-2 text-coffee-200">
                    Hi, {user.name || user.username}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-coffee-500 hover:bg-coffee-600 px-4 py-2 rounded text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-coffee-500 hover:bg-coffee-600 px-4 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-coffee-300 hover:bg-coffee-400 text-coffee-900 px-4 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
