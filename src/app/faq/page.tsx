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
      q: '¿Qué edad tienen las viajeras de la Tribu?',
      a: 'Todas las edades son bienvenidas. Por lo general, nuestras viajeras van desde los 28 hasta más de 65 años. Lo que nos une no es la edad, sino la curiosidad, las ganas de disfrutar, el respeto y el espíritu aventurero.',
    },
    {
      q: '¿Puedo sumarme si no tengo con quién viajar?',
      a: '¡Totalmente! La inmensa mayoría de las integrantes se inscriben solas. Si no querés abonar el suplemento de habitación individual, te asignamos una compañera de habitación del grupo con la que previamente charlamos para asegurar compatibilidad y afinidad.',
    },
    {
      q: '¿Cómo son las formas de pago?',
      a: 'Se realiza una seña inicial en concepto de reserva de cupo (en dólares estadounidenses o equivalente). El saldo restante se cancela mediante un plan de cuotas periódicas antes del viaje, brindándote previsibilidad total.',
    },
    {
      q: '¿Qué sucede con los pasajes aéreos internacionales?',
      a: 'Te asesoramos con los vuelos recomendados para llegar en el horario conveniente del itinerario. Podés emitirlos por tu cuenta o con la agencia de viajes asociada para viajar en los mismos tramos que la coordinadora.',
    },
    {
      q: '¿Qué nivel de exigencia física tienen los viajes?',
      a: 'Nuestros viajes son de intensidad baja a moderada. Caminamos por centros históricos y atracciones, pero siempre a un ritmo tranquilo, con pausas regulares para descansar, tomar un café o sacar fotos.',
    },
    {
      q: '¿Necesito tramitar visa o pasaporte?',
      a: 'Necesitás pasaporte con vigencia mínima de 6 meses posteriores a la fecha de regreso. Para Japón e Italia (ETIAS) e itinerarios como China que requieren visa consular, te brindamos asesoramiento integral y el paso a paso detallado.',
    },
    {
      q: '¿Incluye seguro de asistencia médica?',
      a: 'Cada viajera debe contar con un seguro de asistencia médica internacional para viajar tranquila. Si ya tenés cobertura con tu tarjeta de crédito o prepaga podés presentarla, o te cotizamos opciones recomendadas con descuento.',
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
          Respuestas a las dudas más comunes sobre la experiencia de viajar en nuestra tribu.
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
          Nos encanta conversar con cada viajera para despejar inquietudes y que viajes con 100% de tranquilidad.
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
