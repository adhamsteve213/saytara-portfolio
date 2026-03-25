import React, { useState } from 'react';
import { logo } from '../assets/img';
import {Link} from 'react-router-dom';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img src={logo} alt="Saytara Logo" className="h-10 w-15 object-contain animate-bounce" />
            <span className="ml-3 text-xl font-bold text-white hidden sm:inline-block animate-pulse">Saytara</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:bg-white hover:text-purple-600 hover:rounded-full px-4 py-2 text-sm font-medium transition duration-300 animate-fade-in-up">Home</Link>
            <Link to="/contact" className="text-white hover:bg-white hover:text-purple-600 hover:rounded-full px-4 py-2 text-sm font-medium transition duration-300 animate-fade-in-up delay-300">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 animate-pulse"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-fade-in-down`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block text-white hover:bg-white hover:text-purple-600 hover:rounded-full px-3 py-2 rounded-md text-base font-medium transition duration-300 animate-fade-in-up">Home</Link>
          <Link to="/contact" className="block text-white hover:bg-white hover:text-purple-600 hover:rounded-full px-3 py-2 rounded-md text-base font-medium transition duration-300 animate-fade-in-up delay-300">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
