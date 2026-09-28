import { Trip, Lead, SiteSettings, Reservation, LeadStatus, LeadNote, Followup } from '@/types';
import { initialTrips, initialLeads, initialSettings, initialReservations } from '../seed/initial-data';

// Browser-safe storage key
const STORAGE_KEYS = {
  TRIPS: 'rutas_del_alma_trips_v1',
  LEADS: 'rutas_del_alma_leads_v1',
  SETTINGS: 'rutas_del_alma_settings_v1',
  RESERVATIONS: 'rutas_del_alma_reservations_v1',
};

class DataStore {
  private trips: Trip[] = [];
  private leads: Lead[] = [];
  private settings: SiteSettings = initialSettings;
  private reservations: Reservation[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined') {
      try {
        const storedTrips = localStorage.getItem(STORAGE_KEYS.TRIPS);
        this.trips = storedTrips ? JSON.parse(storedTrips) : initialTrips;

        const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
        this.leads = storedLeads ? JSON.parse(storedLeads) : initialLeads;

        const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        this.settings = storedSettings ? JSON.parse(storedSettings) : initialSettings;

        const storedReservations = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
        this.reservations = storedReservations ? JSON.parse(storedReservations) : initialReservations;
      } catch (e) {
        console.error('Error loading data from localStorage', e);
        this.trips = initialTrips;
        this.leads = initialLeads;
        this.settings = initialSettings;
        this.reservations = initialReservations;
      }
    } else {
      this.trips = initialTrips;
      this.leads = initialLeads;
      this.settings = initialSettings;
      this.reservations = initialReservations;
    }
    this.isInitialized = true;
  }

  private persist(key: string, data: any) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving data to localStorage', e);
      }
    }
  }

  // TRIPS
  getTrips(): Trip[] {
    if (!this.isInitialized) this.init();
    return [...this.trips];
  }

  getPublishedTrips(): Trip[] {
    return this.getTrips().filter((t) => t.isPublished);
  }

  getTripBySlug(slug: string): Trip | undefined {
    return this.getTrips().find((t) => t.slug === slug);
  }

  getTripById(id: string): Trip | undefined {
    return this.getTrips().find((t) => t.id === id);
  }

  saveTrip(trip: Trip): Trip {
    const existingIndex = this.trips.findIndex((t) => t.id === trip.id);
    const now = new Date().toISOString();
    const updated = { ...trip, updatedAt: now };

    if (existingIndex >= 0) {
      this.trips[existingIndex] = updated;
    } else {
      updated.createdAt = now;
      this.trips.unshift(updated);
    }
    this.persist(STORAGE_KEYS.TRIPS, this.trips);
    return updated;
  }

  deleteTrip(id: string): boolean {
    const prevLen = this.trips.length;
    this.trips = this.trips.filter((t) => t.id !== id);
    if (this.trips.length !== prevLen) {
      this.persist(STORAGE_KEYS.TRIPS, this.trips);
      return true;
    }
    return false;
  }

  duplicateTrip(id: string): Trip | undefined {
    const original = this.getTripById(id);
    if (!original) return undefined;

    const newId = `trip-${Date.now()}`;
    const newSlug = `${original.slug}-copia-${Math.floor(Math.random() * 1000)}`;
    const duplicated: Trip = {
      ...original,
      id: newId,
      slug: newSlug,
      title: `${original.title} (Copia)`,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      itineraryDays: original.itineraryDays?.map((d) => ({
        ...d,
        id: `day-${Date.now()}-${d.dayNumber}`,
        tripId: newId,
      })),
    };

    this.trips.unshift(duplicated);
    this.persist(STORAGE_KEYS.TRIPS, this.trips);
    return duplicated;
  }

  // LEADS
  getLeads(): Lead[] {
    if (!this.isInitialized) this.init();
    return [...this.leads];
  }

  createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead {
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
      followups: [],
    };
    this.leads.unshift(newLead);
    this.persist(STORAGE_KEYS.LEADS, this.leads);
    return newLead;
  }

  updateLeadStatus(id: string, status: LeadStatus): Lead | undefined {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) return undefined;
    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    this.persist(STORAGE_KEYS.LEADS, this.leads);
    return { ...lead };
  }

  addLeadNote(leadId: string, content: string): LeadNote | undefined {
    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) return undefined;
    const note: LeadNote = {
      id: `note-${Date.now()}`,
      leadId,
      content,
      createdAt: new Date().toISOString(),
    };
    if (!lead.notes) lead.notes = [];
    lead.notes.unshift(note);
    lead.updatedAt = new Date().toISOString();
    this.persist(STORAGE_KEYS.LEADS, this.leads);
    return note;
  }

  addLeadFollowup(leadId: string, scheduledAt: string, notes: string): Followup | undefined {
    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) return undefined;
    const followup: Followup = {
      id: `flw-${Date.now()}`,
      leadId,
      scheduledAt,
      notes,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    if (!lead.followups) lead.followups = [];
    lead.followups.unshift(followup);
    lead.updatedAt = new Date().toISOString();
    this.persist(STORAGE_KEYS.LEADS, this.leads);
    return followup;
  }

  deleteLead(id: string): boolean {
    const prevLen = this.leads.length;
    this.leads = this.leads.filter((l) => l.id !== id);
    if (this.leads.length !== prevLen) {
      this.persist(STORAGE_KEYS.LEADS, this.leads);
      return true;
    }
    return false;
  }

  // RESERVATIONS
  getReservations(): Reservation[] {
    if (!this.isInitialized) this.init();
    return [...this.reservations];
  }

  saveReservation(reservation: Reservation): Reservation {
    const idx = this.reservations.findIndex((r) => r.id === reservation.id);
    if (idx >= 0) {
      this.reservations[idx] = reservation;
    } else {
      this.reservations.unshift(reservation);
    }
    this.persist(STORAGE_KEYS.RESERVATIONS, this.reservations);
    return reservation;
  }

  // SETTINGS
  getSettings(): SiteSettings {
    if (!this.isInitialized) this.init();
    return { ...this.settings };
  }

  saveSettings(newSettings: SiteSettings): SiteSettings {
    this.settings = { ...newSettings };
    this.persist(STORAGE_KEYS.SETTINGS, this.settings);
    return { ...this.settings };
  }
}

export const db = new DataStore();
