'use client';

import React, { useState, useEffect } from 'react';
import TripCard from '@/components/public/TripCard';
import { db } from '@/lib/db';
import { Trip, SiteSettings } from '@/types';
import { Search, Filter, Compass } from 'lucide-react';

export default function TripsCatalogPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Todos');

  useEffect(() => {
    setTrips(db.getPublishedTrips());
    setSettings(db.getSettings());
  }, []);

  const countries = ['Todos', ...Array.from(new Set(trips.map((t) => t.destinationCountry)))];

  const filteredTrips = trips.filter((t) => {
    const matchCountry =
      selectedCountry === 'Todos' || t.destinationCountry === selectedCountry;
    const matchSearch =
      search.trim() === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destinationCities.toLowerCase().includes(search.toLowerCase()) ||
      t.destinationCountry.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-tribu-600" />
          <span>Salidas Programadas 2027</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          Nuestros Viajes y Destinos
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Recorridos demo pensados para mostrar una web de agencia con consultas, CRM y reservas.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sand-200 shadow-xs mb-10 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Country Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {countries.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCountry(c)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selectedCountry === c
                  ? 'bg-tribu-600 text-white shadow-xs'
                  : 'bg-sand-100 text-stone-700 hover:bg-sand-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por destino, ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-sand-300 focus:outline-hidden focus:ring-2 focus:ring-tribu-500 bg-sand-50/50"
          />
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 space-y-3">
          <p className="text-stone-700 font-serif text-xl font-bold">
            No se encontraron viajes con esos criterios.
          </p>
          <p className="text-stone-500 text-sm">
            Probá quitando los filtros o escribinos directamente para consultar por próximos destinos.
          </p>
          <button
            onClick={() => {
              setSelectedCountry('Todos');
              setSearch('');
            }}
            className="px-5 py-2 rounded-full bg-tribu-600 text-white text-xs font-semibold cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              agencyPhone={settings.whatsappNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
