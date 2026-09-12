'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Instagram, Facebook, Mail, Phone, Heart, Lock } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppGeneralLink } from '@/lib/utils';

export default function Footer() {
  const [settings, setSettings] = useState(db.getSettings());

  useEffect(() => {
    setSettings(db.getSettings());
  }, []);

  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-tribu-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Tribu de Viajeras
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Comunidad de viajes grupales exclusivos para mujeres. Diseñamos experiencias
              auténticas con seguridad, calidez y la libertad de descubrir el mundo juntas.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-tribu-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-tribu-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Próximas Salidas 2027 */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Próximas Salidas 2027
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/viajes/japon-2027"
                  className="hover:text-tribu-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tribu-500"></span>
                  Japón Marzo/Abril 2027
                </Link>
              </li>
              <li>
                <Link
                  href="/viajes/italia-2027"
                  className="hover:text-tribu-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tribu-500"></span>
                  Italia Mayo 2027
                </Link>
              </li>
              <li>
                <Link
                  href="/viajes/china-2027"
                  className="hover:text-tribu-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-tribu-500"></span>
                  China Imperial Junio 2027
                </Link>
              </li>
              <li>
                <Link
                  href="/viajes"
                  className="text-tribu-400 hover:underline pt-1 inline-block"
                >
                  Ver todos los destinos &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Secciones */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              La Tribu
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-tribu-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-tribu-400 transition-colors">
                  Nuestra Filosofía y Comunidad
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-tribu-400 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-tribu-400 transition-colors">
                  Contacto y Asesoramiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Contacto Directo
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-tribu-400 shrink-0 mt-0.5" />
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings.whatsappDisplay || '+54 9 11 7131-3215'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-tribu-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {settings.contactEmail}
                </a>
              </li>
              <li className="text-xs text-stone-500 pt-1">
                Atención personalizada de Lunes a Sábados
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Tribu de Viajeras. Todos los derechos reservados.
            Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> para mujeres que aman viajar.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Administradora</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
