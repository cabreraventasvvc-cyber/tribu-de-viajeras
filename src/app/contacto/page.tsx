'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/db';
import { SiteSettings } from '@/types';
import { getWhatsAppGeneralLink } from '@/lib/utils';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tripInterest, setTripInterest] = useState('Consulta General');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSettings(db.getSettings());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripName: tripInterest,
          fullName,
          email,
          phone,
          city: '',
          passengersCount: 1,
          stage: 'Solo estoy averiguando',
          message,
          origin: 'Página de Contacto',
          utmSource: 'directo',
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar la consulta');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error saving contact lead:', err);
      alert('Hubo un error al enviar tu consulta. Por favor intentalo nuevamente o escribinos por WhatsApp.');
    }
  };

  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold uppercase tracking-wider">
          Estamos para ayudarte
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          Hablemos de tu próximo viaje
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Escribinos por WhatsApp, email o dejanos tu mensaje en el formulario. Te responderemos a la
          brevedad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Agency Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-xs space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Canales de Atención
            </h2>

            <div className="space-y-5">
              {/* WhatsApp Card */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/70 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    WhatsApp Oficial
                  </p>
                  <p className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {settings.whatsappDisplay || settings.whatsappNumber}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Respuesta inmediata</p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200 hover:bg-sand-100 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-tribu-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    Correo Electrónico
                  </p>
                  <p className="text-sm font-bold text-stone-900 group-hover:text-tribu-600 transition-colors truncate">
                    {settings.contactEmail}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Atención comercial y reservas</p>
                </div>
              </a>

              {/* Social Media */}
              <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    Redes Sociales
                  </p>
                  <span className="text-[11px] font-bold text-rose-600">@tribu.deviajeras</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram @tribu.deviajeras</span>
                  </a>
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Facebook className="w-4 h-4 fill-white" />
                    <span>Facebook /tribudeviajeras</span>
                  </a>
                </div>

                {/* QR Code preview */}
                <div className="pt-2 border-t border-sand-200 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-sand-300 shrink-0 bg-white p-1">
                    <img
                      src="/images/branding/instagram-qr.png"
                      alt="Instagram QR @tribu.deviajeras"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">
                      ¿Nos seguís en Instagram?
                    </p>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Escaneá el código o hacé clic para enterarte de salidas grupales y novedades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                <div className="w-11 h-11 rounded-xl bg-stone-700 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    Ubicación
                  </p>
                  <p className="text-sm font-bold text-stone-900">{settings.address}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Atención virtual a todo el país y el mundo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-sand-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  Gracias por escribirnos. La administradora de la Tribu revisará tu mensaje y se pondrá
                  en contacto con vos pronto.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-stone-700 text-xs font-semibold"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Dejanos tu consulta
                </h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Nombre completo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Luciana Gómez"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="luciana@ejemplo.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      WhatsApp / Teléfono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+54 9 11 ..."
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Viaje sobre el que querés consultar
                  </label>
                  <select
                    value={tripInterest}
                    onChange={(e) => setTripInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
                  >
                    <option value="Consulta General">Consulta General sobre la Tribu</option>
                    <option value="Japón Marzo/Abril 2027">Japón Marzo/Abril 2027</option>
                    <option value="Italia Mayo 2027">Italia Mayo 2027</option>
                    <option value="China Imperial Junio 2027">China Imperial Junio 2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Tu Mensaje o Preguntas
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contanos tus inquietudes, disponibilidad de fechas, si viajás sola o con alguien..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar consulta</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
