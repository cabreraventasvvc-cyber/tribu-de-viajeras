'use client';

import React, { useState } from 'react';
import { MessageCircle, Calendar, FileText, Trash2, CheckSquare, Square } from 'lucide-react';
import { Lead, LeadStatus } from '@/types';
import { formatDateTime, getWhatsAppLeadDirectLink } from '@/lib/utils';
import { deleteAdminLead, updateAdminLeadStatus } from '@/lib/admin/data';
import LeadNotesModal from './LeadNotesModal';
import ScheduleFollowupModal from './ScheduleFollowupModal';
import LeadDetailModal from './LeadDetailModal';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRefresh: () => void | Promise<void>;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  Nuevo: 'bg-blue-100 text-blue-800 border-blue-200',
  Contactado: 'bg-teal-100 text-teal-800 border-teal-200',
  Interesado: 'bg-purple-100 text-purple-800 border-purple-200',
  Seguimiento: 'bg-amber-100 text-amber-800 border-amber-200',
  'Reserva pendiente': 'bg-orange-100 text-orange-800 border-orange-200',
  Reservado: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'No interesado': 'bg-stone-200 text-stone-700 border-stone-300',
};

export default function LeadCard({
  lead,
  isSelected,
  onToggleSelect,
  onRefresh,
}: LeadCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const notesCount = lead.notes?.length || 0;

  const handleStatusChange = async (newStatus: LeadStatus) => {
    try {
      await updateAdminLeadStatus(lead.id, newStatus);
      await onRefresh();
    } catch {
      alert('No se pudo actualizar el estado del lead.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que deseás eliminar el lead de ${lead.fullName}?`)) {
      try {
        await deleteAdminLead(lead.id);
        await onRefresh();
      } catch {
        alert('No se pudo eliminar el lead.');
      }
    }
  };

  const waUrl = getWhatsAppLeadDirectLink(lead.phone, lead.fullName, lead.tripName);

  return (
    <>
      <div
        className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md p-4 sm:p-5 ${
          isSelected ? 'border-tribu-600 ring-1 ring-tribu-600 bg-tribu-50/20' : 'border-sand-300/80'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Column 1 (Left 4 cols): Checkbox, Name, Email, Tel, WhatsApp, UTM Tags */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => onToggleSelect(lead.id)}
                className="mt-1 text-stone-400 hover:text-stone-700 focus:outline-hidden cursor-pointer"
                aria-label="Seleccionar lead"
              >
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-tribu-600 fill-tribu-100" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-0.5 overflow-hidden">
                <h4 className="font-bold text-base sm:text-lg text-stone-900 leading-tight">
                  {lead.fullName}
                </h4>
                <p className="text-xs text-stone-500 truncate">{lead.email}</p>
                <p className="text-xs font-semibold text-stone-800">
                  Tel: {lead.phone}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp button (Fiel a la captura: botón verde con texto WhatsApp) */}
            <div className="pl-8">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Origin and UTM Tags (chips inferiores de la foto) */}
            <div className="pl-8 flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-medium">
                Origen: {lead.origin || lead.tripName}
              </span>
              {lead.utmSource && (
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono">
                  utm_source: {lead.utmSource}
                </span>
              )}
              {lead.utmMedium && (
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono">
                  utm_medium: {lead.utmMedium}
                </span>
              )}
              {lead.utmCampaign && (
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono truncate max-w-[200px]">
                  utm_campaign: {lead.utmCampaign}
                </span>
              )}
            </div>
          </div>

          {/* Column 2 (Center 5 cols): RESPUESTAS DE LA ENCUESTA */}
          <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 lg:border-l border-sand-200 pt-3 lg:pt-0 lg:pl-5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              RESPUESTAS:
            </span>

            {/* Q1 */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-sky-700">
                ¿¿QUÉ ES LO QUE MÁS TE ATRAE DE ESTE VIAJE??
              </p>
              <p className="text-xs text-rose-600 font-medium">
                {lead.attractionReason || 'No especificado'}
              </p>
            </div>

            {/* Q2 */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-sky-700">
                ¿¿QUÉ ES LO QUE MÁS TE PREOCUPA DE UN VIAJE ASÍ??
              </p>
              <p className="text-xs text-rose-600 font-medium">
                {lead.concernReason || 'No especificado'}
              </p>
            </div>

            {/* Q3 */}
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-sky-700">
                ¿¿EN QUÉ ETAPA ESTÁS??
              </p>
              <p className="text-xs text-rose-600 font-semibold">
                {lead.stage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline pt-1 inline-block cursor-pointer"
            >
              Ver todas las respuestas &rarr;
            </button>
          </div>

          {/* Column 3 (Right 3 cols): Borrar, INGRESO, ESTADO, Agendar, Ver Notas */}
          <div className="lg:col-span-3 space-y-3 border-t lg:border-t-0 lg:border-l border-sand-200 pt-3 lg:pt-0 lg:pl-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  INGRESO:
                </span>
                <span className="text-xs font-semibold text-stone-800">
                  {formatDateTime(lead.createdAt)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                Borrar
              </button>
            </div>

            {/* Status Dropdown */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                ESTADO:
              </span>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                  STATUS_COLORS[lead.status] || 'bg-sand-100 text-stone-800 border-sand-300'
                }`}
              >
                <option value="Nuevo">NUEVO</option>
                <option value="Contactado">CONTACTADO</option>
                <option value="Interesado">INTERESADO</option>
                <option value="Seguimiento">SEGUIMIENTO</option>
                <option value="Reserva pendiente">RESERVA PENDIENTE</option>
                <option value="Reservado">RESERVADO</option>
                <option value="No interesado">NO INTERESADO</option>
              </select>
            </div>

            {/* Action Buttons: Agendar, Ver Notas */}
            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={() => setShowSchedule(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold border border-sky-200 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNotes(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Ver Notas ({notesCount})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNotes && (
        <LeadNotesModal
          lead={lead}
          onClose={() => setShowNotes(false)}
          onUpdated={onRefresh}
        />
      )}

      {showSchedule && (
        <ScheduleFollowupModal
          lead={lead}
          onClose={() => setShowSchedule(false)}
          onScheduled={onRefresh}
        />
      )}

      {showDetails && (
        <LeadDetailModal
          lead={lead}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
