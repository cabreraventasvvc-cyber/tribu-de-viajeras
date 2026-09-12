'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryModalProps {
  images: string[];
  tripTitle: string;
}

export default function TripGalleryModal({ images, tripTitle }: GalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openImage = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <div>
      {/* Grid preview of images */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openImage(idx)}
            className="relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer group border border-sand-200 bg-sand-100"
          >
            <img
              src={img}
              alt={`${tripTitle} - Foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ImageIcon className="w-6 h-6 drop-shadow-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={close}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={images[selectedIndex]}
              alt={`${tripTitle} - Imagen ${selectedIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-white/80 text-xs mt-3">
              Foto {selectedIndex + 1} de {images.length} • {tripTitle}
            </p>
          </div>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Siguiente foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
