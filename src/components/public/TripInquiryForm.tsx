'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { StageOption } from '@/types';
import { getWhatsAppTripLink } from '@/lib/utils';

interface TripInquiryFormProps {
  tripId?: string;
  tripName: string;
  agencyPhone: string;
}

export default function TripInquiryForm({ tripId, tripName, agencyPhone }: TripInquiryFormProps) {
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [passengersCount, setPassengersCount] = useState(1);
  const [age, setAge] = useState('');
  const [attractionReason, setAttractionReason] = useState('');
  const [concernReason, setConcernReason] = useState('');
  const [stage, setStage] = useState<StageOption>('Estoy evaluando seriamente viajar');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdPhone, setCreatedPhone] = useState('');

  // Auto capture UTM parameters
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const source = searchParams.get('utm_source') || '';
      const medium = searchParams.get('utm_medium') || '';
      const campaign = searchParams.get('utm_campaign') || '';
      const content = searchParams.get('utm_content') || '';
      const term = searchParams.get('utm_term') || '';
      setUtmParams({
        utm_source: source,
        utm_medium: medium,
        utm_campaign: campaign,
        utm_content: content,
        utm_term: term,
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Por favor completá tu nombre, email y teléfono / WhatsApp.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId,
          tripName,
          fullName,
          email,
          phone,
          city,
          passengersCount: Number(passengersCount),
          age: age || undefined,
          attractionReason,
          concernReason,
          stage,
          message,
          origin: tripName,
          utmSource: utmParams.utm_source || 'Sitio Web Directo',
          utmMedium: utmParams.utm_medium,
          utmCampaign: utmParams.utm_campaign,
          utmContent: utmParams.utm_content,
          utmTerm: utmParams.utm_term,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar la consulta');
      }

      setCreatedPhone(phone);
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving lead:', err);
      alert('Hubo un error al enviar tu consulta. Por favor intentalo nuevamente o escribinos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const waLink = getWhatsAppTripLink(agencyPhone, tripName);

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            ¡Muchas gracias, {fullName.split(' ')[0]}!
          </h3>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Hemos recibido tu consulta sobre el viaje a <strong>{tripName}</strong>. Te contactaremos muy
            pronto para contarte todos los detalles y resolver tus inquietudes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 max-w-md mx-auto text-xs text-stone-600">
          ¿Querés acelerar la respuesta o reservar tu cupo ahora mismo?
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hablar ahora por WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-sand-100 hover:bg-sand-200 text-stone-700 font-medium text-sm transition-all"
          >
            Enviar otra consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="consulta" className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-sand-200 shadow-lg">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-tribu-600" />
          <span>Atención personalizada</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Consultá por este viaje
        </h3>
        <p className="text-stone-600 text-sm">
          Completá el formulario para recibir el programa completo y coordinar una charla con nosotras.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Trip Name (Auto Selected Readonly/Locked) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Viaje de tu interés
          </label>
          <input
            type="text"
            value={tripName}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl bg-sand-100 text-stone-800 text-sm font-medium border border-sand-300 focus:outline-hidden cursor-not-allowed"
          />
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Nombre y Apellido <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej: Sofía Martínez"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Correo Electrónico <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sofia@ejemplo.com"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* WhatsApp Phone and City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              WhatsApp / Teléfono <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +54 9 11 1234-5678"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Ciudad de residencia
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Buenos Aires, Córdoba, etc."
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Passengers count and Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Cantidad de pasajeras
            </label>
            <select
              value={passengersCount}
              onChange={(e) => setPassengersCount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            >
              <option value={1}>1 pasajera (viajo sola)</option>
              <option value={2}>2 pasajeras (con amiga / familiar)</option>
              <option value={3}>3 pasajeras</option>
              <option value={4}>4 o más pasajeras</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Edad (opcional)
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ej: 45"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Key Survey Questions from ClicaLead */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            ¿Qué es lo que más te atrae de este viaje?
          </label>
          <input
            type="text"
            value={attractionReason}
            onChange={(e) => setAttractionReason(e.target.value)}
            placeholder="Ej: Los paisajes, regalarme un viaje para mí, conocer la cultura..."
            className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            ¿Qué es lo que más te preocupa de un viaje así?
          </label>
          <input
            type="text"
            value={concernReason}
            onChange={(e) => setConcernReason(e.target.value)}
            placeholder="Ej: La seguridad, viajar sola por primera vez, las comidas, el ritmo..."
            className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Stage */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            ¿En qué etapa estás? <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Solo estoy averiguando',
              'Estoy comparando opciones',
              'Estoy evaluando seriamente viajar',
              'Quiero reservar',
            ].map((option) => (
              <label
                key={option}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-medium transition-colors ${
                  stage === option
                    ? 'border-tribu-600 bg-tribu-50 text-tribu-900 ring-1 ring-tribu-600'
                    : 'border-sand-300 bg-white text-stone-700 hover:bg-sand-50'
                }`}
              >
                <input
                  type="radio"
                  name="stage"
                  value={option}
                  checked={stage === option}
                  onChange={(e) => setStage(e.target.value as StageOption)}
                  className="text-tribu-600 focus:ring-tribu-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Mensaje o consultas adicionales
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribinos tus preguntas específicas sobre vuelos, fechas, formas de pago, etc."
            className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 focus:border-transparent bg-white resize-none"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span>Guardando tu consulta...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Quiero recibir información y asesoramiento</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-stone-500">
          Tus datos son privados y seguros. No enviamos spam.
        </p>
      </form>
    </div>
  );
}
