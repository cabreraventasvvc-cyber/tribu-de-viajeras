'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, MessageCircle, Heart } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppGeneralLink } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(db.getSettings());
  const pathname = usePathname();

  useEffect(() => {
    setSettings(db.getSettings());
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Viajes', href: '/viajes' },
    { name: 'Próximas salidas', href: '/#proximas-salidas' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Preguntas frecuentes', href: '/faq' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-sand-200'
          : 'bg-white/80 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-tribu-100 flex items-center justify-center text-tribu-600 group-hover:scale-105 transition-transform shadow-xs">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-tribu-600 transition-colors leading-tight">
                Rutas del Alma
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-tribu-700 font-medium">
                Viajes boutique
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-tribu-600 ${
                    isActive ? 'text-tribu-600 font-semibold' : 'text-stone-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all shadow-xs hover:shadow hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/viajes"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white text-sm font-medium transition-all shadow-xs hover:shadow hover:-translate-y-0.5"
            >
              <span>Ver Viajes</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-tribu-600 hover:bg-sand-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-sand-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-stone-800 hover:bg-tribu-50 hover:text-tribu-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-sand-200">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>
              <Link
                href="/viajes"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-full bg-tribu-600 text-white text-sm font-medium shadow-xs"
              >
                Explorar viajes 2027
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
