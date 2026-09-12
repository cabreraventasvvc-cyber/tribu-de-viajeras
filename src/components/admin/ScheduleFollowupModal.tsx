'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Check } from 'lucide-react';
import { Lead } from '@/types';
import { db } from '@/lib/db';

interface ScheduleFollowupModalProps {
  lead: Lead;
  onClose: () => void;
  onScheduled: () => void;
}

export default function ScheduleFollowupModal({
  lead,
  onClose,
  onScheduled,
}: ScheduleFollowupModalProps) {
  // Default date tomorrow at 11:00 AM
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('11:00');
  const [notes, setNotes] = useState(`Llamar a ${lead.fullName} para responder dudas sobre ${lead.tripName}.`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    const scheduledIso = new Date(`${date}T${time}:00`).toISOString();
    db.addLeadFollowup(lead.id, scheduledIso, notes);
    // Also auto update status to 'Seguimiento' if it's currently 'Nuevo'
    if (lead.status === 'Nuevo') {
      db.updateLeadStatus(lead.id, 'Seguimiento');
    }

    onScheduled();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sand-200 space-y-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-tribu-700 uppercase tracking-wider">
              Agendar Seguimiento
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
              {lead.fullName}
            </h3>
            <p className="text-xs text-stone-500">{lead.phone}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sand-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Fecha
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-sand-300 focus:outline-hidden focus:ring-2 focus:ring-tribu-500 bg-sand-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Hora
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-sand-300 focus:outline-hidden focus:ring-2 focus:ring-tribu-500 bg-sand-50/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Observaciones del Seguimiento
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Confirmar si revisó el PDF y coordinar si viaja sola o con acompañante..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-tribu-500 bg-sand-50/50 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Guardar en agenda</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
