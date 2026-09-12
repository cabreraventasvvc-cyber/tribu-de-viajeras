'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, CheckCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { db } from '@/lib/db';
import { Reservation, Trip } from '@/types';
import { formatPrice, formatDateShort } from '@/lib/utils';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [passengerName, setPassengerName] = useState('');
  const [selectedTripId, setSelectedTripId] = useState('');
  const [passengersCount, setPassengersCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(5640);
  const [depositAmount, setDepositAmount] = useState(1500);
  const [currency, setCurrency] = useState('USD');
  const [notes, setNotes] = useState('');

  const refresh = () => {
    setReservations(db.getReservations());
    setTrips(db.getTrips());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !selectedTripId) return;

    const trip = trips.find((t) => t.id === selectedTripId);
    const pendingBalance = Math.max(0, totalAmount - depositAmount);

    db.saveReservation({
      id: `res-${Date.now()}`,
      tripId: selectedTripId,
      tripName: trip ? trip.title : 'Viaje 2027',
      passengerName,
      passengersCount: Number(passengersCount),
      totalAmount: Number(totalAmount),
      depositAmount: Number(depositAmount),
      pendingBalance,
      currency,
      status: 'Confirmada',
      notes,
      reservationDate: new Date().toISOString(),
    });

    setShowModal(false);
    setPassengerName('');
    setNotes('');
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Control de Reservas
          </h1>
          <p className="text-xs text-stone-500">
            Registro de viajeras confirmadas, señas recibidas y saldos pendientes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (trips.length > 0) setSelectedTripId(trips[0].id);
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tribu-600 hover:bg-tribu-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nueva Reserva</span>
        </button>
      </div>

      {/* Summary totals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Total Reservas
          </span>
          <p className="font-serif text-2xl font-bold text-stone-900">
            {reservations.length} viajeras
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Total Señas Cobradas
          </span>
          <p className="font-serif text-2xl font-bold text-emerald-700">
            USD{' '}
            {reservations
              .reduce((acc, r) => acc + (r.depositAmount || 0), 0)
              .toLocaleString('es-AR')}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Saldo Total Pendiente
          </span>
          <p className="font-serif text-2xl font-bold text-amber-700">
            USD{' '}
            {reservations
              .reduce((acc, r) => acc + (r.pendingBalance || 0), 0)
              .toLocaleString('es-AR')}
          </p>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-3xl border border-sand-300 shadow-xs overflow-hidden">
        {reservations.length === 0 ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            No hay reservas registradas todavía. Podés crear una o convertir un prospecto a RESERVADO.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-sand-100/70 border-b border-sand-300 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-5 py-3.5">Pasajera</th>
                  <th className="px-5 py-3.5">Viaje</th>
                  <th className="px-5 py-3.5">Fecha Reserva</th>
                  <th className="px-5 py-3.5">Importe Total</th>
                  <th className="px-5 py-3.5">Seña</th>
                  <th className="px-5 py-3.5">Saldo Pendiente</th>
                  <th className="px-5 py-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200 font-medium">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-sand-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-stone-900">
                      {r.passengerName}
                      <span className="block text-[11px] font-normal text-stone-500">
                        {r.passengersCount} pasajera(s)
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate text-stone-800">
                      {r.tripName}
                    </td>
                    <td className="px-5 py-4 text-stone-500">
                      {formatDateShort(r.reservationDate)}
                    </td>
                    <td className="px-5 py-4 font-bold text-stone-900">
                      {formatPrice(r.totalAmount, r.currency)}
                    </td>
                    <td className="px-5 py-4 font-semibold text-emerald-700">
                      {formatPrice(r.depositAmount, r.currency)}
                    </td>
                    <td className="px-5 py-4 font-bold text-amber-700">
                      {formatPrice(r.pendingBalance, r.currency)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add Reservation */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sand-300 space-y-4"
          >
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Registrar Reserva Confirmada
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Nombre de la Pasajera
                </label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Ej: Florencia Benítez"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Viaje Seleccionado
                </label>
                <select
                  value={selectedTripId}
                  onChange={(e) => {
                    setSelectedTripId(e.target.value);
                    const t = trips.find((x) => x.id === e.target.value);
                    if (t?.price) setTotalAmount(t.price);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white"
                >
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pasajeras
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Moneda
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-white"
                  >
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Importe Total
                  </label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Seña Pagada
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-sand-300 font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Habitación a compartir con otra viajera..."
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-stone-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-tribu-600 hover:bg-tribu-700 text-white font-semibold shadow-xs"
                >
                  Guardar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
