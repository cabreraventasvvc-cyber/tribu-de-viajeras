'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ShieldCheck, Users, Sparkles, Heart } from 'lucide-react';
import { getWhatsAppGeneralLink } from '@/lib/utils';
import { SiteSettings } from '@/types';

interface HeroProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroProps) {
  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tribu-50/70 via-[#faf8f5] to-[#faf8f5] pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-tribu-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-champagne-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tribu-100 border border-tribu-200 text-tribu-800 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-tribu-600 shrink-0" />
              <span>Proximas salidas 2027 • Grupos reducidos</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              “Viajar es abrir caminos, compartir experiencias y{' '}
              <span className="text-tribu-600 underline decoration-tribu-300 decoration-wavy decoration-2">
                crear recuerdos
              </span>{' '}
              para toda la vida.”
            </h1>

            <p className="text-stone-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Viajes boutique en grupos reducidos, con asesoramiento cercano, itinerarios cuidados
              y la tranquilidad de tener acompanamiento antes, durante y despues de viajar.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/viajes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-medium text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>Ver próximos viajes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-sand-200/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-tribu-700 font-semibold text-xs sm:text-sm">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Grupos reducidos</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                  Atencion cercana
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-tribu-700 font-semibold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Asesoramiento</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                  Equipo dedicado
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-tribu-700 font-semibold text-xs sm:text-sm">
                  <Heart className="w-4 h-4 shrink-0 text-rose-500 fill-rose-500" />
                  <span>Cupos cuidados</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                  Experiencias boutique
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80"
                  alt="Personas viajando por el mundo - Rutas del Alma Viajes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs uppercase tracking-wider font-semibold">
                    Experiencia boutique
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold mt-1.5">
                    Descubri Patagonia, Marruecos y Grecia con nosotros
                  </p>
                </div>
              </div>

              {/* Floating Floating card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-sand-200 max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-stone-500 font-medium">Asesoramiento directo</p>
                    <p className="text-xs font-bold text-stone-800">¡Sacate todas las dudas!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
