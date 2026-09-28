'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppTripLink, getWhatsAppGeneralLink } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [settings, setSettings] = useState(db.getSettings());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setSettings(db.getSettings());
    // Auto show tooltip after 3 seconds on first visit
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Do not show floating button on admin pages to keep CRM clean
  if (pathname.startsWith('/admin')) {
    return null;
  }

  // Determine dynamic message based on page
  let targetUrl = getWhatsAppGeneralLink(settings.whatsappNumber);
  let badgeText = '¡Hablemos por WhatsApp!';

  if (pathname.includes('/viajes/patagonia-2027')) {
    targetUrl = getWhatsAppTripLink(settings.whatsappNumber, 'Patagonia Esencial 2027');
    badgeText = '¿Dudas sobre Patagonia 2027? ¡Escribinos!';
  } else if (pathname.includes('/viajes/marruecos-2027')) {
    targetUrl = getWhatsAppTripLink(settings.whatsappNumber, 'Marruecos Sensorial 2027');
    badgeText = '¿Consultas sobre Marruecos 2027? ¡Escribinos!';
  } else if (pathname.includes('/viajes/grecia-2027')) {
    targetUrl = getWhatsAppTripLink(settings.whatsappNumber, 'Grecia Azul 2027');
    badgeText = '¿Preguntas sobre Grecia 2027? ¡Escribinos!';
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative mr-3 hidden sm:flex items-center bg-white text-stone-800 text-xs font-medium py-2 px-3.5 rounded-2xl shadow-lg border border-sand-200 animate-in fade-in slide-in-from-right duration-300">
          <span>{badgeText}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-2 text-stone-400 hover:text-stone-600 focus:outline-hidden"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-sand-200 rotate-45 transform"></div>
        </div>
      )}

      {/* Button */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-hidden focus:ring-4 focus:ring-emerald-200"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="sr-only">Contactar por WhatsApp</span>
      </a>
    </div>
  );
}
