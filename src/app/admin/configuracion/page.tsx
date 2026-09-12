'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check, Settings, Sparkles } from 'lucide-react';
import { db } from '@/lib/db';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(db.getSettings());
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Configuración General
          </h1>
          <p className="text-xs text-stone-500">
            Editá los datos de contacto, WhatsApp oficial, redes y textos principales de la agencia.
          </p>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>¡Configuración guardada!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contacto & WhatsApp */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
            1. Datos de Contacto y WhatsApp
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Nombre de la Agencia / Emprendimiento
              </label>
              <input
                type="text"
                required
                value={settings.agencyName}
                onChange={(e) => handleChange('agencyName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Email de Atención / Notificaciones
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Número de WhatsApp (Sin signos ni espacios para enlaces)
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="5491171313215"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-mono"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Ej: <code>5491171313215</code> para Argentina.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                WhatsApp Visual (Texto para mostrar en pantalla)
              </label>
              <input
                type="text"
                value={settings.whatsappDisplay}
                onChange={(e) => handleChange('whatsappDisplay', e.target.value)}
                placeholder="+54 9 11 7131-3215"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Dirección / Ubicación
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Buenos Aires, Argentina"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
            2. Redes Sociales
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Enlace de Instagram
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://www.instagram.com/tribu.deviajeras/"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Enlace de Facebook
              </label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                placeholder="https://www.facebook.com/tribudeviajeras/"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Textos Principales del Hero */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
            3. Frase Principal de la Portada (Hero)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Título Hero
              </label>
              <textarea
                rows={2}
                value={settings.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Subtítulo Hero
              </label>
              <textarea
                rows={2}
                value={settings.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
}
