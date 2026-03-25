import React from 'react';
import haircuts from '../assets/images';

export default function Hero() {
  const heroImg = haircuts.img105303 || haircuts.img105231;
  return (
    <header id="home" className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 animate-fade-in-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Moussa Elshourook</h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">Premium men's hair salon — sharp cuts, great vibes & top styling.</p>
          <div className="flex gap-4">
            <a href="#about" className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">About</a>
            <a href="#contact" className="border border-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors">Contact</a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={heroImg} alt="Haircut preview" className="rounded-2xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105" />
        </div>
      </div>
    </header>
  );
}
