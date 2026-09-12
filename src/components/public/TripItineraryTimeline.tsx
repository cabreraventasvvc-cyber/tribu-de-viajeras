'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Coffee, Utensils } from 'lucide-react';
import { TripDay } from '@/types';

interface ItineraryTimelineProps {
  days: TripDay[];
}

export default function TripItineraryTimeline({ days }: ItineraryTimelineProps) {
  // Open the first 3 days by default, or all if short
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    days.forEach((d) => {
      all[d.dayNumber] = true;
    });
    setOpenDays(all);
  };

  const collapseAll = () => {
    setOpenDays({});
  };

  if (!days || days.length === 0) {
    return (
      <div className="p-8 text-center bg-sand-50 rounded-2xl border border-sand-200 text-stone-500">
        El itinerario detallado se publicará en breve.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-sand-200">
        <span className="text-xs sm:text-sm font-medium text-stone-500">
          {days.length} días de aventuras programadas
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandAll}
            className="text-xs text-tribu-600 hover:text-tribu-800 font-medium cursor-pointer"
          >
            Abrir todos
          </button>
          <span className="text-stone-300">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
          >
            Cerrar todos
          </button>
        </div>
      </div>

      <div className="relative pl-4 sm:pl-6 space-y-4 border-l-2 border-tribu-200 ml-3 sm:ml-4">
        {days.map((day) => {
          const isOpen = Boolean(openDays[day.dayNumber]);

          return (
            <div key={day.id || day.dayNumber} className="relative group">
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute -left-[25px] sm:-left-[33px] top-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isOpen
                    ? 'bg-tribu-600 border-white text-white shadow-xs'
                    : 'bg-white border-tribu-300 text-tribu-600'
                }`}
              >
                <span className="text-[10px] sm:text-xs font-bold leading-none">
                  {day.dayNumber}
                </span>
              </div>

              {/* Day Card */}
              <div
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-sand-300 shadow-sm'
                    : 'bg-white/80 border-sand-200 hover:border-sand-300'
                }`}
              >
                {/* Header / Trigger */}
                <button
                  type="button"
                  onClick={() => toggleDay(day.dayNumber)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 focus:outline-hidden cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-tribu-100 text-tribu-800 text-[11px] font-bold uppercase tracking-wider">
                        Día {day.dayNumber}
                      </span>
                      {day.meals && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 bg-sand-100 px-2 py-0.5 rounded-full">
                          <Coffee className="w-3 h-3 text-tribu-600" />
                          {day.meals}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-tribu-600 transition-colors">
                      {day.title}
                    </h4>
                  </div>
                  <div className="p-1 rounded-full bg-sand-100 text-stone-500 shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Body Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-stone-600 text-sm leading-relaxed border-t border-sand-100 animate-in fade-in duration-200">
                    <div className="whitespace-pre-line space-y-2 pt-2">
                      {day.description}
                    </div>

                    {day.imageUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden max-h-60 border border-sand-200">
                        <img
                          src={day.imageUrl}
                          alt={day.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
