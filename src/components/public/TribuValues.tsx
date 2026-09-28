import React from 'react';
import { Heart, ShieldCheck, Smile, Sparkles, Compass, Users } from 'lucide-react';

export default function TribuValues() {
  const values = [
    {
      icon: Users,
      title: 'Grupos Reducidos',
      description:
        'Armamos salidas pequenas para cuidar el ritmo, la atencion y la experiencia de cada viajero.',
    },
    {
      icon: ShieldCheck,
      title: 'Cuidado Integral',
      description:
        'Cuidamos cada detalle logistico: traslados, hoteles seleccionados y acompanamiento continuo para que solo tengas que disfrutar.',
    },
    {
      icon: Compass,
      title: 'Viajar Acompanado',
      description:
        'Muchas personas se suman solas y encuentran un grupo cuidado para compartir destino, charla y momentos memorables.',
    },
    {
      icon: Smile,
      title: 'Tu Propio Ritmo',
      description:
        'Diseñamos itinerarios equilibrados entre paseos guiados con expertos locales y tiempo libre para pasear, descansar o ir de compras.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tribu-100 text-tribu-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Nuestra Filosofia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            ¿Por que viajar con Rutas del Alma?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            No somos una agencia demo de turismo masivo. Mostramos como vender experiencias humanas,
            cercanas y faciles de gestionar desde un CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-sand-50/70 p-6 sm:p-7 rounded-3xl border border-sand-200 hover:border-tribu-300 transition-all hover:shadow-md flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-tribu-100 text-tribu-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-tribu-600 group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
