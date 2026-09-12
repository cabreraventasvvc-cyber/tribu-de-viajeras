'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MessageCircle, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';
import { db } from '@/lib/db';
import { Lead } from '@/types';
import { formatDateTime, getWhatsAppLeadDirectLink } from '@/lib/utils';

interface FollowupItem {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  tripName: string;
  scheduledAt: string;
  notes: string;
  isCompleted: boolean;
  createdAt: string;
}

export default function AdminFollowupsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'pending' | 'completed' | 'all'>('pending');

  const refresh = () => {
    setLeads(db.getLeads());
  };

  useEffect(() => {
    refresh();
  }, []);

  // Collect all followups
  const followups: FollowupItem[] = leads.flatMap((lead) =>
    (lead.followups || []).map((f) => ({
      ...f,
      leadId: lead.id,
      leadName: lead.fullName,
      leadPhone: lead.phone,
      tripName: lead.tripName,
    }))
  );

  const filtered = followups.filter((f) => {
    if (filter === 'pending') return !f.isCompleted;
    if (filter === 'completed') return f.isCompleted;
    return true;
  });

  const toggleComplete = (leadId: string, followupId: string, current: boolean) => {
    const lead = leads.find((l) => l.id === leadId);
    if (lead && lead.followups) {
      const flw = lead.followups.find((f) => f.id === followupId);
      if (flw) {
        flw.isCompleted = !current;
        // Save back to db
        db.saveTrip; // force persist via lead update
        const stored = localStorage.getItem('tribu_leads_v1');
        if (stored) {
          const list: Lead[] = JSON.parse(stored);
          const idx = list.findIndex((l) => l.id === leadId);
          if (idx >= 0 && list[idx].followups) {
            const fIdx = list[idx].followups!.findIndex((f) => f.id === followupId);
            if (fIdx >= 0) {
              list[idx].followups![fIdx].isCompleted = !current;
              localStorage.setItem('tribu_leads_v1', JSON.stringify(list));
            }
          }
        }
        refresh();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Seguimientos Pendientes
          </h1>
          <p className="text-xs text-stone-500">
            Agenda de contactos, llamadas y mensajes programados para futuras viajeras.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 bg-sand-100 p-1.5 rounded-xl border border-sand-300 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-white text-tribu-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pendientes ({followups.filter((f) => !f.isCompleted).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'completed'
                ? 'bg-white text-tribu-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Completados ({followups.filter((f) => f.isCompleted).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-tribu-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos ({followups.length})
          </button>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sand-300 p-12 text-center space-y-2">
          <p className="font-serif text-xl font-bold text-stone-800">
            No hay seguimientos en esta categoría.
          </p>
          <p className="text-xs text-stone-500">
            Podés agendar un nuevo seguimiento directamente desde la sección "Mis Leads" presionando el botón "Agendar".
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const waUrl = getWhatsAppLeadDirectLink(item.leadPhone, item.leadName, item.tripName);

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  item.isCompleted
                    ? 'bg-stone-50 border-sand-200 opacity-60'
                    : 'bg-white border-sand-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleComplete(item.leadId, item.id, item.isCompleted)}
                    className="mt-0.5 text-stone-400 hover:text-emerald-600 cursor-pointer"
                    title={item.isCompleted ? 'Desmarcar' : 'Marcar como completado'}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        item.isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'
                      }`}
                    />
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-stone-900">
                        {item.leadName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-tribu-50 text-tribu-800 text-[11px] font-semibold">
                        {item.tripName}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium whitespace-pre-line">
                      {item.notes}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <Clock className="w-3.5 h-3.5" />
                        Agendado para: {formatDateTime(item.scheduledAt)}
                      </span>
                      <span>Tel: {item.leadPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Contactar WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => toggleComplete(item.leadId, item.id, item.isCompleted)}
                    className="px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {item.isCompleted ? 'Reabrir' : 'Completado'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
