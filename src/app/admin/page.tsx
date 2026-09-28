'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Map,
  Calendar,
  CreditCard,
  PlusCircle,
  ArrowRight,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { Lead, Trip, Reservation } from '@/types';
import { formatDateTime, getWhatsAppLeadDirectLink } from '@/lib/utils';
import { getAdminLeads, getAdminReservations, getAdminTrips } from '@/lib/admin/data';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [leadData, tripData, reservationData] = await Promise.all([
          getAdminLeads(),
          getAdminTrips(),
          getAdminReservations(),
        ]);
        setLeads(leadData);
        setTrips(tripData);
        setReservations(reservationData);
      } catch (err) {
        console.error('No se pudieron cargar los indicadores del panel.', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'Nuevo').length;
  const publishedTripsCount = trips.filter((t) => t.isPublished).length;

  // Extract all followups across leads
  const allFollowups = leads.flatMap((l) =>
    (l.followups || []).map((f) => ({ ...f, leadName: l.fullName, phone: l.phone, trip: l.tripName }))
  );
  const pendingFollowups = allFollowups.filter((f) => !f.isCompleted);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-tribu-600 to-tribu-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            Panel de Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
            ¡Hola, Administradora!
          </h1>
          <p className="text-tribu-100 text-xs sm:text-sm max-w-xl">
            Tenés <strong>{newLeadsCount} prospectos nuevos</strong> esperando respuesta y{' '}
            <strong>{pendingFollowups.length} seguimientos agendados</strong>.
            {loading && ' Sincronizando datos...'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/viajes/nuevo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-900 font-semibold text-xs shadow-md hover:bg-sand-100 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-tribu-600" />
            <span>Agregar viaje</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tribu-800/80 hover:bg-tribu-800 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <span>Ver todos los leads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {totalLeads}
            </span>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {newLeadsCount} nuevos
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="text-[11px] text-stone-500 hover:text-stone-800 font-medium inline-block pt-1"
          >
            Gestionar prospectos &rarr;
          </Link>
        </div>

        {/* Metric 2: Viajes Activos */}
        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Viajes Publicados</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Map className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {publishedTripsCount}
            </span>
            <span className="text-[11px] text-stone-500">de {trips.length} totales</span>
          </div>
          <Link
            href="/admin/viajes"
            className="text-[11px] text-stone-500 hover:text-stone-800 font-medium inline-block pt-1"
          >
            Ver paquetes &rarr;
          </Link>
        </div>

        {/* Metric 3: Seguimientos Pendientes */}
        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Seguimientos</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {pendingFollowups.length}
            </span>
            <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
              por contactar
            </span>
          </div>
          <Link
            href="/admin/seguimientos"
            className="text-[11px] text-stone-500 hover:text-stone-800 font-medium inline-block pt-1"
          >
            Abrir agenda &rarr;
          </Link>
        </div>

        {/* Metric 4: Reservas */}
        <div className="bg-white p-5 rounded-2xl border border-sand-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Reservas</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {reservations.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              confirmadas
            </span>
          </div>
          <Link
            href="/admin/reservas"
            className="text-[11px] text-stone-500 hover:text-stone-800 font-medium inline-block pt-1"
          >
            Ver reservas &rarr;
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Leads and Pending Followups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (7 cols): Recent Leads */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-sand-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Últimas Consultas Recibidas
              </h3>
              <p className="text-xs text-stone-500">Prospectos captados en la web y campañas</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-tribu-600 hover:text-tribu-800 font-semibold"
            >
              Ver todas &rarr;
            </Link>
          </div>

          <div className="divide-y divide-sand-100">
            {leads.slice(0, 5).map((lead) => {
              const waUrl = getWhatsAppLeadDirectLink(lead.phone, lead.fullName, lead.tripName);

              return (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-stone-900 truncate">
                        {lead.fullName}
                      </p>
                      <span className="px-2 py-0.5 rounded-md bg-sand-100 text-stone-700 text-[10px] font-semibold uppercase">
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-tribu-700 font-medium truncate">
                      {lead.tripName}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      {formatDateTime(lead.createdAt)}
                    </p>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors shrink-0"
                    title="Chatear por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (5 cols): Agenda de Seguimientos */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-sand-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Agenda de Seguimientos
              </h3>
              <p className="text-xs text-stone-500">Llamadas y mensajes programados</p>
            </div>
            <Link
              href="/admin/seguimientos"
              className="text-xs text-tribu-600 hover:text-tribu-800 font-semibold"
            >
              Ver agenda &rarr;
            </Link>
          </div>

          {pendingFollowups.length === 0 ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              No tenés seguimientos pendientes para hoy.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingFollowups.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{f.leadName}</span>
                    <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDateTime(f.scheduledAt)}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px]">{f.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
