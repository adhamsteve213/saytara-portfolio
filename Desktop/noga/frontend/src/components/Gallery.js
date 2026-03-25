import React, { useState, useEffect, useCallback } from 'react';
import haircuts from '../assets/images';

const images = Object.values(haircuts).filter(Boolean);

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openModal = (idx) => setSelectedIdx(idx);
  const closeModal = () => setSelectedIdx(null);
  const prev = useCallback(() => setSelectedIdx((s) => (s === null ? null : (s - 1 + images.length) % images.length)), []);
  const next = useCallback(() => setSelectedIdx((s) => (s === null ? null : (s + 1) % images.length)), []);

  useEffect(() => {
    if (selectedIdx === null) return;
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, next, prev]);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h4 className="text-2xl font-bold mb-6 text-center">Our Work</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => openModal(idx)}
              className="overflow-hidden rounded-lg shadow hover:scale-105 transform transition focus:outline-none"
              aria-label={`Open image ${idx + 1}`}
            >
              <img src={img} alt={`style-${idx + 1}`} className="w-full h-48 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" role="dialog" aria-modal="true">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/75"
              aria-label="Close image viewer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <img
              src={images[selectedIdx]}
              alt={`style-${selectedIdx + 1}`}
              className="w-full h-[70vh] object-contain rounded-lg shadow-lg animate-fade-in-up bg-black"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="text-white bg-black/40 p-3 rounded-r-lg hover:bg-black/60"
                aria-label="Previous image"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="text-white bg-black/40 p-3 rounded-l-lg hover:bg-black/60"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
          <button onClick={closeModal} className="absolute inset-0" aria-hidden="true"></button>
        </div>
      )}
    </section>
  );
}
