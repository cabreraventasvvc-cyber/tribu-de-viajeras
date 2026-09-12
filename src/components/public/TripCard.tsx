'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, MessageCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Trip } from '@/types';
import { formatPrice, formatDateShort, getWhatsAppTripLink } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
  agencyPhone: string;
}

export default function TripCard({ trip, agencyPhone }: TripCardProps) {
  const waUrl = getWhatsAppTripLink(agencyPhone, trip.title);

  const datePeriod =
    trip.startDate && trip.endDate
      ? `${formatDateShort(trip.startDate)} al ${formatDateShort(trip.endDate)}`
      : 'Salida 2027';

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-sand-200 transition-all duration-300 flex flex-col group">
      {/* Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-sand-100">
        <img
          src={trip.heroImageUrl}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-tribu-600" />
            {trip.destinationCountry}
          </span>

          {trip.isLimitedSpots && !trip.isSoldOut && (
            <span className="px-2.5 py-1 rounded-full bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-medium shadow-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>Cupos limitados</span>
            </span>
          )}

          {trip.isSoldOut && (
            <span className="px-2.5 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-white text-[11px] font-semibold">
              Agotado
            </span>
          )}
        </div>

        {/* Bottom Destination Info */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <p className="text-xs font-medium text-sand-100 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-tribu-400 shrink-0" />
            <span className="truncate">{trip.destinationCities}</span>
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col grow justify-between">
        <div>
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-2.5">
            <span className="inline-flex items-center gap-1 bg-sand-100 px-2.5 py-1 rounded-full font-medium text-stone-700">
              <Calendar className="w-3.5 h-3.5 text-tribu-600" />
              {datePeriod}
            </span>
            <span className="inline-flex items-center gap-1 bg-sand-100 px-2.5 py-1 rounded-full font-medium text-stone-700">
              <Clock className="w-3.5 h-3.5 text-tribu-600" />
              {trip.durationDays} días
            </span>
            {trip.spotsAvailable > 0 && !trip.isSoldOut && (
              <span className="text-rose-600 text-xs font-semibold ml-auto">
                Quedan {trip.spotsAvailable} lugares
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-tribu-600 transition-colors line-clamp-2 leading-snug">
            <Link href={`/viajes/${trip.slug}`}>{trip.title}</Link>
          </h3>

          {/* Short description */}
          <p className="text-stone-600 text-sm mt-2.5 line-clamp-3 leading-relaxed">
            {trip.shortDescription}
          </p>
        </div>

        {/* Price & CTAs */}
        <div className="mt-6 pt-4 border-t border-sand-200">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider block">
                Precio por persona
              </span>
              <span className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                {trip.price ? `Desde ${formatPrice(trip.price, trip.currency)}` : 'A consultar'}
              </span>
            </div>
            <span className="text-[11px] text-stone-500">Plan en cuotas</span>
          </div>

          {/* Buttons: Ver viaje, Consultar, WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/viajes/${trip.slug}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs text-center"
            >
              <span>Ver viaje</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/viajes/${trip.slug}#consulta`}
              className="w-full inline-flex items-center justify-center py-2.5 px-3 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-800 text-xs sm:text-sm font-medium transition-colors text-center"
            >
              Consultar
            </Link>
          </div>

          <div className="mt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Consultar viaje por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
