'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, MessageCircle, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';
import HeroSection from '@/components/public/HeroSection';
import TripCard from '@/components/public/TripCard';
import TribuValues from '@/components/public/TribuValues';
import { db } from '@/lib/db';
import { getWhatsAppGeneralLink } from '@/lib/utils';
import { Trip, SiteSettings } from '@/types';

export default function HomePage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setTrips(db.getPublishedTrips());
    setSettings(db.getSettings());
  }, []);

  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  const faqs = [
    {
      q: '¿Puedo sumarme si viajo sola?',
      a: '¡Por supuesto! El 85% de las mujeres de nuestra Tribu se suman solas. Nuestro propósito es que viajes con total seguridad, te sientas bienvenida desde el primer minuto y compartas con compañeras afines.',
    },
    {
      q: '¿Cómo se distribuyen las habitaciones?',
      a: 'Podes optar por habitación compartida (dos camas individuales con otra viajera del grupo) o solicitar habitación privada/individual abonando el suplemento correspondiente.',
    },
    {
      q: '¿Cómo son las formas de pago de las salidas 2027?',
      a: 'Reservás tu lugar con una seña inicial y luego coordinamos un plan de cuotas fijas mensuales previas a la fecha del viaje, tanto en dólares como en pesos al tipo de cambio acordado.',
    },
    {
      q: '¿Cuántas viajeras integran cada grupo?',
      a: 'Para preservar una experiencia cálida, segura y personalizada, nuestros grupos son reducidos, con un promedio de 12 a 16 viajeras como máximo.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection settings={settings} />

      {/* Featured Trips Section */}
      <section id="proximas-salidas" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-tribu-600" />
              <span>Experiencias Exclusivas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Próximos Viajes y Salidas 2027
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              Explorá nuestros destinos cuidadosamente diseñados. Cada itinerario cuenta con
              acompañamiento, hotelería seleccionada y cupos reducidos.
            </p>
          </div>

          <Link
            href="/viajes"
            className="inline-flex items-center gap-2 text-tribu-600 hover:text-tribu-700 font-semibold text-sm group shrink-0"
          >
            <span>Ver todos los paquetes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              agencyPhone={settings.whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* Values & Philosophy Section */}
      <TribuValues />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-stone-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-tribu-600" />
            <span>Respuestas Rápidas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Preguntas Frecuentes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Todo lo que necesitás saber antes de embarcarte con nosotras.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {faq.q}
                  </span>
                  <div
                    className={`p-1 rounded-full bg-sand-100 text-stone-600 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-sand-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-xs sm:text-sm font-semibold text-tribu-600 hover:text-tribu-800 underline"
          >
            Ver todas las preguntas frecuentes &rarr;
          </Link>
        </div>
      </section>

      {/* Warm Final CTA Section */}
      <section className="bg-gradient-to-r from-tribu-600 to-tribu-700 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            ¡El mundo te espera!
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            ¿Tenés ganas de viajar pero no querés ir sola?
          </h2>
          <p className="text-tribu-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Sumate a Tribu de Viajeras. Escribinos para que te contemos en detalle cómo funciona cada
            viaje, resolver tus preguntas y ayudarte a planificar tu próxima aventura.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-stone-900 hover:bg-sand-100 font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Hablar por WhatsApp</span>
            </a>
            <Link
              href="/viajes"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-tribu-800/80 hover:bg-tribu-800 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Explorar Salidas 2027
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
