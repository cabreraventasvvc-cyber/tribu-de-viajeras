'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppGeneralLink } from '@/lib/utils';

export default function FAQPage() {
  const settings = db.getSettings();
  const waUrl = getWhatsAppGeneralLink(settings.whatsappNumber);

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Esta es una web real o una demo?',
      a: 'Es una plantilla demo lista para adaptar a una agencia real. Se puede cambiar marca, WhatsApp, email, viajes, fotos, textos y dominio.',
    },
    {
      q: '¿Los viajes se pueden modificar?',
      a: 'Si. Desde el panel administrador se pueden crear, editar, publicar o despublicar paquetes, modificar fechas, cupos, imagenes e itinerarios.',
    },
    {
      q: '¿Cómo recibo información completa sobre un viaje?',
      a: 'Podés escribirnos por WhatsApp o completar el formulario del destino que te interesa. Te enviamos la información actualizada de manera personalizada y resolvemos tus dudas antes de avanzar.',
    },
    {
      q: '¿Que sucede cuando alguien completa un formulario?',
      a: 'La consulta se guarda como lead en la base de datos y aparece en el panel privado. Desde ahi se puede cambiar el estado, agregar notas y programar seguimientos.',
    },
    {
      q: '¿Qué nivel de exigencia física tienen los viajes?',
      a: 'Nuestros viajes son de intensidad baja a moderada. Caminamos por centros históricos y atracciones, pero siempre a un ritmo tranquilo, con pausas regulares para descansar, tomar un café o sacar fotos.',
    },
    {
      q: '¿Se puede conectar con WhatsApp?',
      a: 'Si. La web tiene botones de WhatsApp y el CRM permite abrir conversaciones con mensajes personalizados segun el viaje consultado.',
    },
    {
      q: '¿Incluye cobros online?',
      a: 'No por ahora. El sistema permite registrar reservas, senas, saldos y estado de pago, pero no procesa pagos online.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-stone-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-tribu-600" />
          <span>Preguntas Frecuentes</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          Todo lo que necesitás saber
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Respuestas sobre esta demo de agencia de viajes con CRM integrado.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                  {faq.q}
                </span>
                <div
                  className={`p-1.5 rounded-full bg-sand-100 text-stone-600 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-sand-100 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp Box */}
      <div className="bg-sand-100/70 p-6 sm:p-8 rounded-3xl border border-sand-200 text-center space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          ¿Tenés alguna otra consulta o duda particular?
        </h3>
        <p className="text-stone-600 text-sm max-w-md mx-auto">
          Podemos adaptar esta plantilla a otra marca, otros destinos y otro proceso comercial.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
