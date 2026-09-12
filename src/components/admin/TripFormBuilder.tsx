'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Image as ImageIcon,
  FileText,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Trip, TripDay } from '@/types';
import { db } from '@/lib/db';

interface TripFormBuilderProps {
  initialData?: Trip;
  isEditing?: boolean;
}

export default function TripFormBuilder({ initialData, isEditing = false }: TripFormBuilderProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [destinationCountry, setDestinationCountry] = useState(
    initialData?.destinationCountry || ''
  );
  const [destinationCities, setDestinationCities] = useState(
    initialData?.destinationCities || ''
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ''
  );
  const [fullDescription, setFullDescription] = useState(
    initialData?.fullDescription || ''
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    initialData?.heroImageUrl ||
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
  );
  const [galleryImagesText, setGalleryImagesText] = useState(
    (initialData?.galleryImages || []).join('\n')
  );
  const [pdfItineraryUrl, setPdfItineraryUrl] = useState(
    initialData?.pdfItineraryUrl || ''
  );
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [durationDays, setDurationDays] = useState(initialData?.durationDays || 10);
  const [startCity, setStartCity] = useState(initialData?.startCity || '');
  const [endCity, setEndCity] = useState(initialData?.endCity || '');
  const [intensity, setIntensity] = useState(initialData?.intensity || 'Intensidad baja');
  const [recommendedAge, setRecommendedAge] = useState(
    initialData?.recommendedAge || 'Todas las edades son bienvenidas'
  );
  const [modality, setModality] = useState(
    initialData?.modality || 'Explorador - Parcialmente guiado'
  );
  const [price, setPrice] = useState<number | undefined>(initialData?.price || 4000);
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [spotsTotal, setSpotsTotal] = useState(initialData?.spotsTotal || 16);
  const [spotsAvailable, setSpotsAvailable] = useState(initialData?.spotsAvailable || 8);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [isLimitedSpots, setIsLimitedSpots] = useState(initialData?.isLimitedSpots ?? true);
  const [isSoldOut, setIsSoldOut] = useState(initialData?.isSoldOut ?? false);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);

  // Inclusions / Exclusions
  const [includedText, setIncludedText] = useState(
    (initialData?.includedServices || []).join('\n')
  );
  const [notIncludedText, setNotIncludedText] = useState(
    (initialData?.notIncludedServices || []).join('\n')
  );

  const [requirements, setRequirements] = useState(
    initialData?.requirements || 'Pasaporte con al menos 6 meses de vigencia.'
  );
  const [paymentMethods, setPaymentMethods] = useState(
    initialData?.paymentMethods || 'Seña y cuotas fijas mensuales.'
  );
  const [observations, setObservations] = useState(initialData?.observations || '');

  // Itinerary Days
  const [itineraryDays, setItineraryDays] = useState<TripDay[]>(
    initialData?.itineraryDays && initialData.itineraryDays.length > 0
      ? initialData.itineraryDays
      : [
          {
            id: 'day-1',
            tripId: initialData?.id || '',
            dayNumber: 1,
            title: 'Día 1 - Llegada y Bienvenida',
            description: 'Llegada al destino, traslado al hotel y encuentro de bienvenida.',
          },
        ]
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !slug) {
      // Auto generate slug
      const generated = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleAddDay = () => {
    const nextNum = itineraryDays.length + 1;
    const newDay: TripDay = {
      id: `day-${Date.now()}-${nextNum}`,
      tripId: initialData?.id || '',
      dayNumber: nextNum,
      title: `Día ${nextNum} - Nuevo destino`,
      description: 'Descripción de las actividades y paseos...',
    };
    setItineraryDays([...itineraryDays, newDay]);
  };

  const handleRemoveDay = (index: number) => {
    if (itineraryDays.length <= 1) return;
    const filtered = itineraryDays.filter((_, idx) => idx !== index);
    // re-number days
    const renumbered = filtered.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    setItineraryDays(renumbered);
  };

  const handleDayChange = (index: number, field: keyof TripDay, value: any) => {
    const copy = [...itineraryDays];
    copy[index] = { ...copy[index], [field]: value };
    setItineraryDays(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !destinationCountry) {
      alert('Por favor completá los campos requeridos (Título, Slug, País).');
      return;
    }

    const tripPayload: Trip = {
      id: initialData?.id || `trip-${Date.now()}`,
      slug: slug.trim().toLowerCase(),
      title: title.trim(),
      destinationCountry: destinationCountry.trim(),
      destinationCities: destinationCities.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim(),
      heroImageUrl: heroImageUrl.trim(),
      galleryImages: galleryImagesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      pdfItineraryUrl: pdfItineraryUrl.trim() || undefined,
      startDate,
      endDate,
      durationDays: Number(durationDays),
      startCity: startCity.trim(),
      endCity: endCity.trim(),
      intensity: intensity.trim(),
      recommendedAge: recommendedAge.trim(),
      modality: modality.trim(),
      price: price ? Number(price) : undefined,
      currency,
      spotsTotal: Number(spotsTotal),
      spotsAvailable: Number(spotsAvailable),
      isFeatured,
      isLimitedSpots,
      isSoldOut,
      isPublished,
      includedServices: includedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      notIncludedServices: notIncludedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: requirements.trim(),
      paymentMethods: paymentMethods.trim(),
      observations: observations.trim(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      itineraryDays: itineraryDays.map((d, idx) => ({ ...d, dayNumber: idx + 1 })),
    };

    db.saveTrip(tripPayload);
    router.push('/admin/viajes');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-5">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a lista de viajes</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {isEditing ? `Editar Viaje: ${title}` : 'Crear Nuevo Paquete de Viaje'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/viajes')}
            className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 text-xs font-semibold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Guardar Cambios' : 'Publicar Viaje'}</span>
          </button>
        </div>
      </div>

      {/* Toggles bar */}
      <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-xs flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="rounded text-tribu-600 focus:ring-tribu-500 w-4 h-4"
          />
          <span>Publicado en la web</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded text-tribu-600 focus:ring-tribu-500 w-4 h-4"
          />
          <span>Destacado en Home</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
          <input
            type="checkbox"
            checked={isLimitedSpots}
            onChange={(e) => setIsLimitedSpots(e.target.checked)}
            className="rounded text-tribu-600 focus:ring-tribu-500 w-4 h-4"
          />
          <span>Mostrar "Cupos Limitados"</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-rose-700 cursor-pointer">
          <input
            type="checkbox"
            checked={isSoldOut}
            onChange={(e) => setIsSoldOut(e.target.checked)}
            className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
          />
          <span>Marcar como Agotado</span>
        </label>
      </div>

      {/* Section 1: General Info */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-5">
        <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
          1. Datos Principales del Viaje
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Título del Viaje <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Japón: tradición, magia y modernidad en un solo viaje"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              URL amigable (Slug) <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="bg-sand-100 px-3 py-2.5 rounded-l-xl border border-r-0 border-sand-300 text-stone-500 text-xs">
                /viajes/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="japon-2027"
                className="w-full px-3 py-2.5 rounded-r-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              País de Destino <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              placeholder="Ej: Japón, Italia, China..."
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Ciudades / Paradas
            </label>
            <input
              type="text"
              value={destinationCities}
              onChange={(e) => setDestinationCities(e.target.value)}
              placeholder="Ej: Tokio, Nikko, Monte Fuji y Hakone, Kioto, Nara, Osaka, Hiroshima"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-stone-900 text-sm focus:ring-2 focus:ring-tribu-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Dates & Logistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Fecha de Salida
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Fecha de Regreso
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Duración (Días)
            </label>
            <input
              type="number"
              min={1}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Precio Desde
            </label>
            <div className="flex">
              <input
                type="number"
                value={price ?? ''}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="5640"
                className="w-full px-3 py-2 rounded-l-xl border border-sand-300 text-xs font-bold"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-2 py-2 rounded-r-xl border border-l-0 border-sand-300 text-xs bg-sand-100"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Ciudad de Inicio
            </label>
            <input
              type="text"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              placeholder="Ej: Tokio"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Ciudad donde Finaliza
            </label>
            <input
              type="text"
              value={endCity}
              onChange={(e) => setEndCity(e.target.value)}
              placeholder="Ej: Osaka"
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Cupos Totales
            </label>
            <input
              type="number"
              min={1}
              value={spotsTotal}
              onChange={(e) => setSpotsTotal(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Cupos Disponibles
            </label>
            <input
              type="number"
              min={0}
              value={spotsAvailable}
              onChange={(e) => setSpotsAvailable(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Descripción Corta (Para tarjetas del catálogo)
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Resumen atractivo que convide a conocer más..."
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs sm:text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Descripción Completa
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Texto completo de presentación del viaje..."
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs sm:text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Images and PDF */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-5">
        <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
          2. Imágenes y Archivo PDF del Itinerario
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
            URL de la Portada Principal
          </label>
          <input
            type="url"
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs font-mono mb-2"
          />
          {heroImageUrl && (
            <div className="w-48 h-28 rounded-xl overflow-hidden border border-sand-300">
              <img src={heroImageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
            Galería de Imágenes (Una URL por línea)
          </label>
          <textarea
            rows={3}
            value={galleryImagesText}
            onChange={(e) => setGalleryImagesText(e.target.value)}
            placeholder="https://images.unsplash.com/photo-...\nhttps://images.unsplash.com/photo-..."
            className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs font-mono resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
            Ruta o Enlace al Archivo PDF oficial
          </label>
          <input
            type="text"
            value={pdfItineraryUrl}
            onChange={(e) => setPdfItineraryUrl(e.target.value)}
            placeholder="Ej: /itineraries/itinerario-japon-2027.pdf"
            className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs font-mono"
          />
          <p className="text-[11px] text-stone-400 mt-1">
            Los PDFs cargados en la carpeta pública pueden enlazarse directamente con <code>/itineraries/nombre.pdf</code>.
          </p>
        </div>
      </div>

      {/* Section 3: Inclusions, Exclusions, Requirements */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-5">
        <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-sand-200 pb-3">
          3. Servicios, Requisitos y Pagos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Servicios Incluidos (Un ítem por línea)
            </label>
            <textarea
              rows={5}
              value={includedText}
              onChange={(e) => setIncludedText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 mb-1">
              Servicios No Incluidos (Un ítem por línea)
            </label>
            <textarea
              rows={5}
              value={notIncludedText}
              onChange={(e) => setNotIncludedText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Requisitos & Documentación
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Formas de Pago
            </label>
            <textarea
              rows={3}
              value={paymentMethods}
              onChange={(e) => setPaymentMethods(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-sand-300 text-xs resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: DYNAMIC ITINERARY BUILDER (Día 1, Día 2... sin límite fijo) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              4. Constructor de Itinerario Día por Día
            </h2>
            <p className="text-xs text-stone-500">
              Podés agregar ilimitados días. Cada uno con su título, descripción y fotos.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddDay}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Día {itineraryDays.length + 1}</span>
          </button>
        </div>

        <div className="space-y-4">
          {itineraryDays.map((day, idx) => (
            <div
              key={day.id || idx}
              className="p-5 rounded-2xl bg-sand-50 border border-sand-300 space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-tribu-600 text-white font-bold text-xs uppercase">
                    Día {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={day.meals || ''}
                    onChange={(e) => handleDayChange(idx, 'meals', e.target.value)}
                    placeholder="Comidas (Ej: D/A)"
                    className="px-2.5 py-1 rounded-md border border-sand-300 text-xs bg-white w-28"
                  />
                </div>

                {itineraryDays.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(idx)}
                    className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Eliminar este día"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={day.title}
                  onChange={(e) => handleDayChange(idx, 'title', e.target.value)}
                  placeholder={`Título del Día ${idx + 1}...`}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs font-bold text-stone-900 bg-white"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={day.description}
                  onChange={(e) => handleDayChange(idx, 'description', e.target.value)}
                  placeholder="Descripción de las actividades, traslados y visitas..."
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs bg-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleAddDay}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-200 hover:bg-sand-300 text-stone-800 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Día {itineraryDays.length + 1} al Itinerario</span>
          </button>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/viajes')}
          className="px-5 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 text-xs font-semibold cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Guardar Cambios' : 'Publicar Paquete'}</span>
        </button>
      </div>
    </form>
  );
}
