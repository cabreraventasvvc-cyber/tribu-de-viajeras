'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Calendar,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  FileSpreadsheet,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { db } from '@/lib/db';
import { Lead, LeadStatus } from '@/types';
import LeadCard from '@/components/admin/LeadCard';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedTab, setSelectedTab] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [dateFilter, setDateFilter] = useState('');

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const refreshLeads = () => {
    setLeads(db.getLeads());
  };

  useEffect(() => {
    refreshLeads();
  }, []);

  // Compute Trip / Landing Tabs with Counts (Idéntico a las capturas: Todas (386), Tribu - Tailandia (194), etc.)
  const landingTabs = useMemo(() => {
    const map: Record<string, number> = {
      Todas: leads.length,
    };
    leads.forEach((l) => {
      const name = l.tripName || 'Otras';
      map[name] = (map[name] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [leads]);

  // Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter
      if (selectedTab !== 'Todas' && lead.tripName !== selectedTab) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'Todos' && lead.status !== statusFilter) {
        return false;
      }
      // Date filter
      if (dateFilter) {
        const leadDate = lead.createdAt.split('T')[0];
        if (leadDate !== dateFilter) return false;
      }
      // Search query (name, email, phone, city)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lead.fullName.toLowerCase().includes(q);
        const matchEmail = lead.email.toLowerCase().includes(q);
        const matchPhone = lead.phone.toLowerCase().includes(q);
        const matchCity = (lead.city || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchCity) {
          return false;
        }
      }
      return true;
    });
  }, [leads, selectedTab, statusFilter, dateFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectPage = () => {
    const pageIds = paginatedLeads.map((l) => l.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const isPageSelected =
    paginatedLeads.length > 0 &&
    paginatedLeads.every((l) => selectedIds.includes(l.id));

  // EXPORT TO EXCEL / CSV (REQUISITO 14)
  const handleExport = (format: 'xlsx' | 'csv') => {
    const leadsToExport =
      selectedIds.length > 0
        ? leads.filter((l) => selectedIds.includes(l.id))
        : filteredLeads;

    if (leadsToExport.length === 0) {
      alert('No hay prospectos para exportar.');
      return;
    }

    const exportRows = leadsToExport.map((l) => ({
      'Nombre y Apellido': l.fullName,
      Email: l.email,
      Teléfono: l.phone,
      Ciudad: l.city || '',
      Viaje: l.tripName,
      Estado: l.status,
      'Pasajeras': l.passengersCount,
      'Edad': l.age || '',
      'Atracción': l.attractionReason || '',
      'Preocupación': l.concernReason || '',
      'Etapa': l.stage,
      Mensaje: l.message || '',
      'Fecha Ingreso': l.createdAt,
      Origen: l.origin || '',
      'UTM Source': l.utmSource || '',
      'UTM Medium': l.utmMedium || '',
      'UTM Campaign': l.utmCampaign || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos');

    const fileName = `Leads_Tribu_de_Viajeras_${new Date().toISOString().split('T')[0]}.${format}`;
    XLSX.writeFile(workbook, fileName, { bookType: format });
  };

  // Bulk status update
  const handleBulkStatus = (status: LeadStatus) => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach((id) => {
      db.updateLeadStatus(id, status);
    });
    setSelectedIds([]);
    refreshLeads();
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`¿Seguro que deseás eliminar ${selectedIds.length} prospectos?`)) {
      selectedIds.forEach((id) => db.deleteLead(id));
      setSelectedIds([]);
      refreshLeads();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle (Fiel a la foto: Mis Leads / GESTIÓN DE PROSPECTOS) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Mis Leads
          </h1>
          <p className="text-xs uppercase tracking-widest text-stone-500 font-bold">
            Gestión de Prospectos • CRM
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleExport('xlsx')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sand-100 text-stone-800 text-xs font-semibold border border-sand-300 shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Exportar Excel</span>
          </button>
          <button
            type="button"
            onClick={() => handleExport('csv')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sand-100 text-stone-800 text-xs font-semibold border border-sand-300 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-600" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* TOP LANDING PILL TABS (Fiel a las capturas de pantalla) */}
      <div className="bg-sand-100/70 p-2 rounded-2xl border border-sand-300/80 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2">
            LANDING
          </span>
          {landingTabs.map((tab) => {
            const isSelected = selectedTab === tab.name;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => {
                  setSelectedTab(tab.name);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-sand-200 border border-sand-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTION BAR: ⚡ FILTROS, ELIMINAR FILTROS, BADGES Y EXPORTAR */}
      <div className="bg-white p-4 rounded-2xl border border-sand-300/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Buttons ⚡ FILTROS & ELIMINAR FILTROS */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                showFilterDrawer
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              <span>⚡ FILTROS</span>
            </button>

            {(statusFilter !== 'Todos' || dateFilter || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('Todos');
                  setDateFilter('');
                  setSearchQuery('');
                  setSelectedTab('Todas');
                  setCurrentPage(1);
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 uppercase tracking-wider cursor-pointer"
              >
                Eliminar Filtros
              </button>
            )}
          </div>

          {/* Right: Counter badge LEADS: X DE Y, PÁG 1/Z */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-xs font-mono font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                LEADS: {filteredLeads.length} DE {leads.length}
              </span>
              <span className="text-stone-500">|</span>
              <span>
                PÁG. {currentPage}/{totalPages}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleExport('xlsx')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORTAR</span>
            </button>
          </div>
        </div>

        {/* Expandable Filter drawer */}
        {showFilterDrawer && (
          <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-150">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Filtrar por Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-sand-300 bg-white focus:outline-hidden"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Contactado">Contactado</option>
                <option value="Interesado">Interesado</option>
                <option value="Seguimiento">Seguimiento</option>
                <option value="Reserva pendiente">Reserva pendiente</option>
                <option value="Reservado">Reservado</option>
                <option value="No interesado">No interesado</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Filtrar por Fecha
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-sand-300 bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Buscador de Contacto
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Nombre, email, celular..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-sand-300 bg-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Page selector bar: ESTA PÁGINA [ ], 25 pág. v, Mostrando 1-25 */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand-200 text-xs text-stone-600">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSelectPage}
              className="inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              {isPageSelected ? (
                <CheckSquare className="w-4 h-4 text-tribu-600 fill-tribu-100" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span>ESTA PÁGINA</span>
            </button>

            <div className="flex items-center gap-1">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 rounded-md border border-sand-300 text-xs bg-white font-medium cursor-pointer"
              >
                <option value={10}>10 pág.</option>
                <option value={25}>25 pág.</option>
                <option value={50}>50 pág.</option>
                <option value={100}>100 pág.</option>
              </select>
            </div>

            <span className="text-stone-500">
              Mostrando{' '}
              {filteredLeads.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} -{' '}
              {Math.min(currentPage * pageSize, filteredLeads.length)} de{' '}
              {filteredLeads.length}
            </span>
          </div>

          {/* Bulk actions when items are selected */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-tribu-50 px-3 py-1 rounded-xl border border-tribu-200 animate-in fade-in">
              <span className="font-semibold text-tribu-900 text-xs">
                {selectedIds.length} seleccionados
              </span>
              <button
                type="button"
                onClick={() => handleBulkStatus('Contactado')}
                className="px-2 py-0.5 rounded-md bg-white border border-sand-300 text-[11px] font-semibold hover:bg-sand-50"
              >
                Marcar Contactado
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatus('Interesado')}
                className="px-2 py-0.5 rounded-md bg-white border border-sand-300 text-[11px] font-semibold hover:bg-sand-50"
              >
                Marcar Interesado
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="p-1 text-rose-600 hover:text-rose-800"
                title="Eliminar seleccionados"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subheader Badge (Fiel a la foto: LEADS DE: TRIBU - TAILANDIA) */}
      <div className="text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-sand-200/80 text-stone-700 text-xs font-bold uppercase tracking-wider">
          LEADS DE: {selectedTab.toUpperCase()}
        </span>
      </div>

      {/* LEADS LIST */}
      {paginatedLeads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sand-300 p-12 text-center space-y-3">
          <p className="font-serif text-xl font-bold text-stone-800">
            No se encontraron leads con los filtros actuales.
          </p>
          <p className="text-xs text-stone-500">
            Cambiá el viaje seleccionado o limpiá los filtros para ver todos los prospectos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              isSelected={selectedIds.includes(lead.id)}
              onToggleSelect={handleToggleSelect}
              onRefresh={refreshLeads}
            />
          ))}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-2 rounded-xl bg-white border border-sand-300 text-stone-700 hover:bg-sand-100 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-stone-700 px-3">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-2 rounded-xl bg-white border border-sand-300 text-stone-700 hover:bg-sand-100 disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
