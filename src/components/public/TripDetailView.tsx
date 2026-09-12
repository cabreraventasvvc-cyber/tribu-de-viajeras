'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Download,
  Check,
  X,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';
import { db } from '@/lib/db';
import { Trip, SiteSettings } from '@/types';
import { formatPrice, formatDateShort, getWhatsAppTripLink } from '@/lib/utils';
import TripItineraryTimeline from '@/components/public/TripItineraryTimeline';
import TripInquiryForm from '@/components/public/TripInquiryForm';
import TripGalleryModal from '@/components/public/TripGalleryModal';

interface TripDetailViewProps {
  initialTrip: Trip;
}

export default function TripDetailView({ initialTrip }: TripDetailViewProps) {
  const [trip, setTrip] = useState<Trip>(initialTrip);
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());

  useEffect(() => {
    // Sync with local db updates if admin modified it in current session
    const updated = db.getTripBySlug(initialTrip.slug);
    if (updated) setTrip(updated);
    setSettings(db.getSettings());
  }, [initialTrip.slug]);

  const waLink = getWhatsAppTripLink(settings.whatsappNumber, trip.title);

  const datePeriod =
    trip.startDate && trip.endDate
      ? `${formatDateShort(trip.startDate)} al ${formatDateShort(trip.endDate)}`
      : 'Salida programada 2027';

  return (
    <div className="pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-sand-100/60 border-b border-sand-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-stone-800">
              Inicio
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <Link href="/viajes" className="hover:text-stone-800">
              Viajes
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-tribu-700 font-medium truncate">{trip.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Cover Banner */}
      <div className="relative h-[340px] sm:h-[420px] md:h-[500px] w-full bg-stone-900 overflow-hidden">
        <img
          src={trip.heroImageUrl}
          alt={trip.title}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-black/30" />

        <div className="absolute bottom-0 inset-x-0 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-tribu-600 text-white text-xs font-semibold flex items-center gap-1 shadow-xs">
                <MapPin className="w-3 h-3" />
                {trip.destinationCountry}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                {trip.durationDays} días de viaje
              </span>
              {trip.isLimitedSpots && !trip.isSoldOut && (
                <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-semibold">
                  Cupos limitados 💕
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight">
              {trip.title}
            </h1>

            <p className="text-sand-200 text-xs sm:text-base flex items-center gap-2 max-w-3xl">
              <MapPin className="w-4 h-4 text-tribu-400 shrink-0" />
              <span>{trip.destinationCities}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary Highlights Bar */}
      <div className="bg-white border-b border-sand-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-sand-200">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Fechas de viaje
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-1.5 pt-1">
                <Calendar className="w-4 h-4 text-tribu-600 shrink-0" />
                {datePeriod}
              </p>
            </div>

            <div className="space-y-0.5 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Ruta & Ciudades
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-800 truncate pt-1">
                {trip.startCity} &rarr; {trip.endCity}
              </p>
            </div>

            <div className="space-y-0.5 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Intensidad / Edad
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-800 pt-1">
                {trip.intensity.split(' ')[0]} • Todas las edades
              </p>
            </div>

            <div className="space-y-0.5 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Precio por persona
              </span>
              <p className="text-base sm:text-lg font-serif font-bold text-tribu-700">
                {trip.price ? `Desde ${formatPrice(trip.price, trip.currency)}` : 'A consultar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (8 cols): Description, PDF, Itinerary, Inclusions */}
          <div className="lg:col-span-7 space-y-12">
            {/* Overview / Narrative */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Sobre este viaje
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {trip.fullDescription || trip.shortDescription}
              </p>
            </section>

            {/* Photo Gallery Modal Component */}
            {trip.galleryImages && trip.galleryImages.length > 0 && (
              <section className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Galería de fotos
                </h3>
                <TripGalleryModal images={trip.galleryImages} tripTitle={trip.title} />
              </section>
            )}

            {/* PDF DOWNLOAD BANNER (REQUISITO 4) */}
            {trip.pdfItineraryUrl && (
              <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-tribu-100 to-sand-100 border border-tribu-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-tribu-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      Programa Oficial en PDF
                    </h4>
                    <p className="text-stone-600 text-xs sm:text-sm">
                      Descargá el itinerario completo con el detalle de vuelos, paseos y recomendaciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <a
                    href={trip.pdfItineraryUrl}
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar itinerario completo</span>
                  </a>
                  <a
                    href={trip.pdfItineraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center justify-center px-4 py-3 rounded-full bg-white text-stone-800 border border-sand-300 hover:bg-sand-50 font-medium text-xs sm:text-sm transition-colors"
                  >
                    Ver programa
                  </a>
                </div>
              </div>
            )}

            {/* ITINERARY TIMELINE (REQUISITO 3) */}
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Itinerario del Viaje
                </h2>
                <p className="text-stone-600 text-sm">
                  Día por día, todo lo que vamos a vivir y descubrir juntas.
                </p>
              </div>

              <TripItineraryTimeline days={trip.itineraryDays || []} />
            </section>

            {/* INCLUDED / NOT INCLUDED SERVICES */}
            <section className="space-y-6 pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Servicios del Programa
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Included */}
                <div className="bg-emerald-50/60 p-5 sm:p-6 rounded-3xl border border-emerald-200">
                  <h3 className="font-serif text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    ¿Qué incluye?
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                    {trip.includedServices.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="bg-stone-50 p-5 sm:p-6 rounded-3xl border border-sand-200">
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-rose-500" />
                    ¿Qué no está incluido?
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                    {trip.notIncludedServices.map((notInc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                        <span>{notInc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* REQUIREMENTS & PAYMENT METHODS */}
            <section className="space-y-6 pt-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Requisitos y Formas de Pago
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-tribu-700 font-semibold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Requisitos & Documentación</span>
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {trip.requirements}
                  </p>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-tribu-700 font-semibold text-sm">
                    <CreditCard className="w-4 h-4" />
                    <span>Formas de Pago</span>
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {trip.paymentMethods}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (5 cols): Sticky Consultation Box & Form wrapped in Suspense */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Quick Action WhatsApp Callout */}
            <div className="bg-emerald-600 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-emerald-200">
                  ¿Querés una respuesta rápida?
                </p>
                <p className="text-sm sm:text-base font-serif font-bold">
                  Hablános directamente a WhatsApp
                </p>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-emerald-800 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Escribinos</span>
              </a>
            </div>

            {/* Main Inquiry Form with Suspense Boundary for useSearchParams */}
            <Suspense
              fallback={
                <div className="p-8 text-center bg-white rounded-3xl border border-sand-200 text-xs text-stone-500 animate-pulse">
                  Cargando formulario de consulta...
                </div>
              }
            >
              <TripInquiryForm
                tripId={trip.id}
                tripName={trip.title}
                agencyPhone={settings.whatsappNumber}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
