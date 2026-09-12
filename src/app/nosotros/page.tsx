'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Compass, ShieldCheck, Users, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppGeneralLink } from '@/lib/utils';

export default function AboutPage() {
  const settings = db.getSettings();
  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Nuestra Historia & Propósito</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
            Sobre Nosotros / Nuestra Tribu
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Una comunidad nacida del deseo de viajar sin ataduras, compartir momentos auténticos y
            descubrir el mundo con la confianza de estar respaldadas en cada paso.
          </p>
        </div>

        {/* Narrative Image Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-16/9 md:aspect-21/9">
          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=80"
            alt="Grupo de mujeres viajando juntas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <p className="font-serif text-xl sm:text-2xl text-white font-bold">
              “No hay nada más poderoso que un grupo de mujeres compartiendo el asombro de un nuevo destino.”
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              ¿Cómo nació Tribu de Viajeras?
            </h2>
            <p>
              Muchas veces nos encontramos postergando viajes porque amigas o familiares no
              coinciden en fechas, presupuestos o intereses. La idea de ir sola a destinos remotos
              como Japón o China puede generar incertidumbre o temor.
            </p>
            <p>
              Así nació <strong>Tribu de Viajeras</strong>: como un puente seguro y cálido para que
              ninguna mujer tenga que renunciar a sus sueños de conocer el mundo. Aquí no sos un
              número de paquete; sos parte de una tribu que se cuida, se divierte y celebra la vida.
            </p>
          </div>

          <div className="bg-sand-100/70 p-6 sm:p-8 rounded-3xl border border-sand-200 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-tribu-600" />
              Nuestros Pilares
            </h3>
            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-tribu-600 mt-2 shrink-0" />
                <span><strong>Seguridad emocional y logística:</strong> cuidamos traslados, hotelería y tiempos para que viajes con total serenidad.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-tribu-600 mt-2 shrink-0" />
                <span><strong>Libertad personal:</strong> actividades grupales programadas combinadas con tiempo libre para tu propio ritmo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-tribu-600 mt-2 shrink-0" />
                <span><strong>Amistad genuina:</strong> la mayoría se suma sola y termina tejiendo vínculos entrañables que perduran toda la vida.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl border border-sand-200 shadow-sm space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            ¿Querés ser parte de nuestra próxima salida?
          </h3>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Estamos planificando salidas inolvidables para 2027 a Japón, Italia y China. Conocé los
            itinerarios o escribinos para asesorarte personalmente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/viajes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-medium text-sm transition-all shadow-xs"
            >
              <span>Ver viajes disponibles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
