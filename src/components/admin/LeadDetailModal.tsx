'use client';

import React from 'react';
import { X, Calendar, MessageCircle, MapPin, Users, Tag, Globe } from 'lucide-react';
import { Lead } from '@/types';
import { formatDateTime, getWhatsAppLeadDirectLink } from '@/lib/utils';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  const waUrl = getWhatsAppLeadDirectLink(lead.phone, lead.fullName, lead.tripName);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-sand-200 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between border-b border-sand-200 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-tribu-100 text-tribu-800 text-[11px] font-bold uppercase tracking-wider">
              {lead.status}
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {lead.fullName}
            </h3>
            <p className="text-xs text-stone-500">
              Ingresó el {formatDateTime(lead.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-sand-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info & Direct WhatsApp */}
        <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Email</span>
            <span className="font-semibold text-stone-900">{lead.email}</span>
          </div>
          <div>
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Teléfono</span>
            <span className="font-semibold text-stone-900">{lead.phone}</span>
          </div>
          <div>
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Ciudad</span>
            <span className="font-semibold text-stone-900">{lead.city || 'No indicada'}</span>
          </div>
          <div>
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Pasajeras / Edad</span>
            <span className="font-semibold text-stone-900">
              {lead.passengersCount} viajera(s) {lead.age ? `• ${lead.age} años` : ''}
            </span>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Iniciar conversación en WhatsApp con {lead.fullName.split(' ')[0]}</span>
        </a>

        {/* Full Form Responses */}
        <div className="space-y-4 pt-2">
          <h4 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wider text-xs">
            Respuestas completas del formulario:
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                ¿Qué es lo que más te atrae de este viaje?
              </span>
              <p className="text-xs text-tribu-800 font-medium">
                {lead.attractionReason || 'Sin respuesta'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                ¿Qué es lo que más te preocupa de un viaje así?
              </span>
              <p className="text-xs text-tribu-800 font-medium">
                {lead.concernReason || 'Sin respuesta'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                ¿En qué etapa estás?
              </span>
              <p className="text-xs text-tribu-800 font-bold">
                {lead.stage}
              </p>
            </div>

            {lead.message && (
              <div className="p-3.5 rounded-xl bg-sand-50/70 border border-sand-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Mensaje / Consulta adicional
                </span>
                <p className="text-xs text-stone-700 whitespace-pre-line">
                  {lead.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Campaign & UTM Attribution Chips */}
        <div className="pt-3 border-t border-sand-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
            Parámetros de Campaña (UTM):
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium">
              Origen: {lead.origin}
            </span>
            {lead.utmSource && (
              <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[10px] font-medium">
                utm_source: {lead.utmSource}
              </span>
            )}
            {lead.utmMedium && (
              <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[10px] font-medium">
                utm_medium: {lead.utmMedium}
              </span>
            )}
            {lead.utmCampaign && (
              <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[10px] font-medium">
                utm_campaign: {lead.utmCampaign}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
