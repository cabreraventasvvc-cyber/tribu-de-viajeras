'use client';

import React, { useState } from 'react';
import { X, Plus, Calendar, Clock } from 'lucide-react';
import { Lead, LeadNote } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { db } from '@/lib/db';

interface LeadNotesModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdated: () => void;
}

export default function LeadNotesModal({ lead, onClose, onUpdated }: LeadNotesModalProps) {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<LeadNote[]>(lead.notes || []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const created = db.addLeadNote(lead.id, newNote.trim());
    if (created) {
      setNotes([created, ...notes]);
      setNewNote('');
      onUpdated();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-sand-200 space-y-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-tribu-700 uppercase tracking-wider">
              Historial de Notas Internas
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
              {lead.fullName}
            </h3>
            <p className="text-xs text-stone-500">{lead.tripName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sand-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Note Input Form */}
        <form onSubmit={handleAddNote} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            Nueva Nota o Comentario
          </label>
          <textarea
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Ej: La llamé el 05/09. Está interesada pero debe confirmar vacaciones en su trabajo..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-tribu-500 bg-sand-50/50 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar nota</span>
            </button>
          </div>
        </form>

        {/* Existing Notes History */}
        <div className="space-y-3 pt-2 border-t border-sand-200 max-h-72 overflow-y-auto pr-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Notas registradas ({notes.length})
          </span>

          {notes.length === 0 ? (
            <p className="text-xs text-stone-400 py-4 text-center">
              No hay notas cargadas para este lead todavía.
            </p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl bg-sand-50 border border-sand-200 text-xs space-y-1.5"
              >
                <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{formatDateTime(n.createdAt)}</span>
                </div>
                <p className="text-stone-800 leading-relaxed font-medium whitespace-pre-line">
                  {n.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
