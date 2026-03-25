import React, { useState } from 'react';
import logo from '../assets/Screenshot 2025-11-27 105740.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-black/60 backdrop-blur-sm text-white h-16">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Moussa Alshourok" className="h-10 w-10 rounded-full" />
          <div>
            <h1 className="text-xl font-bold leading-tight">Moussa Alshourok</h1>
            <p className="text-xs opacity-70">Men's Hair Salon</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <a href="#home" className="hover:text-yellow-300 transition-colors">Home</a>
          <a href="#about" className="hover:text-yellow-300 transition-colors">About</a>
          <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md focus:outline-none border border-white/10"
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path fill="currentColor" d={open ? "M18 6L6 18" : "M3 12h18M3 6h18M3 18h18"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/80 text-center py-4 space-y-3">
          <a href="#home" className="block" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" className="block" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" className="block" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
