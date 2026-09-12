'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Copy,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { db } from '@/lib/db';
import { Trip } from '@/types';
import { formatPrice, formatDateShort } from '@/lib/utils';

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const refreshTrips = () => {
    setTrips(db.getTrips());
  };

  useEffect(() => {
    refreshTrips();
  }, []);

  const handleDuplicate = (id: string) => {
    const dup = db.duplicateTrip(id);
    if (dup) {
      refreshTrips();
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Seguro que deseás eliminar el viaje "${title}"?`)) {
      db.deleteTrip(id);
      refreshTrips();
    }
  };

  const handleTogglePublish = (trip: Trip) => {
    db.saveTrip({
      ...trip,
      isPublished: !trip.isPublished,
    });
    refreshTrips();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Paquetes y Salidas de Viaje
          </h1>
          <p className="text-xs text-stone-500">
            Administrá los destinos, itinerarios día por día y cupos de la agencia.
          </p>
        </div>

        <Link
          href="/admin/viajes/nuevo"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Agregar Nuevo Viaje</span>
        </Link>
      </div>

      {/* Trips list */}
      <div className="grid grid-cols-1 gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl border border-sand-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Image & Info */}
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                <img
                  src={trip.heroImageUrl}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[11px] font-bold">
                    {trip.destinationCountry}
                  </span>
                  {trip.isPublished ? (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      PUBLICADO
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-600 text-[10px] font-bold">
                      BORRADOR
                    </span>
                  )}
                  {trip.isSoldOut && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                      AGOTADO
                    </span>
                  )}
                  {trip.isLimitedSpots && !trip.isSoldOut && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                      CUPOS LIMITADOS
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 truncate">
                  {trip.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-tribu-600" />
                    {formatDateShort(trip.startDate)} - {formatDateShort(trip.endDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-tribu-600" />
                    {trip.durationDays} días ({trip.itineraryDays?.length || 0} cargados)
                  </span>
                  <span className="font-bold text-tribu-700">
                    {formatPrice(trip.price, trip.currency)}
                  </span>
                  <span>
                    Cupos: {trip.spotsAvailable}/{trip.spotsTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-sand-200 shrink-0">
              {/* View on site */}
              <Link
                href={`/viajes/${trip.slug}`}
                target="_blank"
                className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 transition-colors"
                title="Ver en la web pública"
              >
                <Eye className="w-4 h-4" />
              </Link>

              {/* Publish toggle */}
              <button
                type="button"
                onClick={() => handleTogglePublish(trip)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  trip.isPublished
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
                title={trip.isPublished ? 'Despublicar viaje' : 'Publicar viaje'}
              >
                {trip.isPublished ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </button>

              {/* Duplicate */}
              <button
                type="button"
                onClick={() => handleDuplicate(trip.id)}
                className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 transition-colors cursor-pointer"
                title="Duplicar viaje e itinerario"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* Edit */}
              <Link
                href={`/admin/viajes/${trip.id}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-xs"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Editar</span>
              </Link>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDelete(trip.id, trip.title)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                title="Eliminar viaje"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
