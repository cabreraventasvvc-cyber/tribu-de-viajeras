import { Lead, LeadNote, LeadStatus, Followup, Reservation, Trip } from '@/types';
import { db } from '@/lib/db';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

type LeadNoteRow = {
  id: string;
  lead_id: string;
  content: string;
  created_at: string;
};

type FollowupRow = {
  id: string;
  lead_id: string;
  scheduled_at: string;
  notes?: string | null;
  is_completed?: boolean | null;
  created_at: string;
};

type LeadRow = {
  id: string;
  trip_id?: string | null;
  trip_name: string;
  full_name: string;
  email: string;
  phone: string;
  city?: string | null;
  passengers_count?: number | null;
  age?: string | null;
  attraction_reason?: string | null;
  concern_reason?: string | null;
  stage?: string | null;
  message?: string | null;
  status?: string | null;
  origin?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  created_at: string;
  updated_at: string;
  lead_notes?: LeadNoteRow[];
  followups?: FollowupRow[];
};

type ReservationRow = {
  id: string;
  lead_id?: string | null;
  trip_id: string;
  trip_name: string;
  passenger_name: string;
  passengers_count?: number | null;
  total_amount: number;
  deposit_amount?: number | null;
  pending_balance?: number | null;
  currency?: string | null;
  status?: string | null;
  notes?: string | null;
  reservation_date: string;
};

type TripRow = {
  id: string;
  slug: string;
  title: string;
  destination_country: string;
  destination_cities: string;
  short_description: string;
  full_description: string;
  hero_image_url: string;
  gallery_images?: string[] | null;
  pdf_itinerary_url?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  duration_days?: number | null;
  start_city?: string | null;
  end_city?: string | null;
  intensity?: string | null;
  recommended_age?: string | null;
  modality?: string | null;
  price?: number | null;
  currency?: string | null;
  spots_total?: number | null;
  spots_available?: number | null;
  is_featured?: boolean | null;
  is_limited_spots?: boolean | null;
  is_sold_out?: boolean | null;
  is_published?: boolean | null;
  included_services?: string[] | null;
  not_included_services?: string[] | null;
  requirements?: string | null;
  payment_methods?: string | null;
  observations?: string | null;
  created_at: string;
  updated_at: string;
};

function mapNote(row: LeadNoteRow): LeadNote {
  return {
    id: row.id,
    leadId: row.lead_id,
    content: row.content,
    createdAt: row.created_at,
  };
}

function mapFollowup(row: FollowupRow): Followup {
  return {
    id: row.id,
    leadId: row.lead_id,
    scheduledAt: row.scheduled_at,
    notes: row.notes || '',
    isCompleted: Boolean(row.is_completed),
    createdAt: row.created_at,
  };
}

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    tripId: row.trip_id || undefined,
    tripName: row.trip_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    city: row.city || '',
    passengersCount: row.passengers_count || 1,
    age: row.age || undefined,
    attractionReason: row.attraction_reason || '',
    concernReason: row.concern_reason || '',
    stage: row.stage || 'Solo estoy averiguando',
    message: row.message || '',
    status: (row.status || 'Nuevo') as LeadStatus,
    origin: row.origin || 'Sitio Web Directo',
    utmSource: row.utm_source || undefined,
    utmMedium: row.utm_medium || undefined,
    utmCampaign: row.utm_campaign || undefined,
    utmContent: row.utm_content || undefined,
    utmTerm: row.utm_term || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: (row.lead_notes || [])
      .map(mapNote)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    followups: (row.followups || [])
      .map(mapFollowup)
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)),
  };
}

function mapReservation(row: ReservationRow): Reservation {
  return {
    id: row.id,
    leadId: row.lead_id || undefined,
    tripId: row.trip_id,
    tripName: row.trip_name,
    passengerName: row.passenger_name,
    passengersCount: row.passengers_count || 1,
    totalAmount: Number(row.total_amount || 0),
    depositAmount: Number(row.deposit_amount || 0),
    pendingBalance: Number(row.pending_balance || 0),
    currency: row.currency || 'USD',
    status: (row.status || 'Confirmada') as Reservation['status'],
    notes: row.notes || '',
    reservationDate: row.reservation_date,
  };
}

function mapTrip(row: TripRow): Trip {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    destinationCountry: row.destination_country,
    destinationCities: row.destination_cities,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    heroImageUrl: row.hero_image_url,
    galleryImages: row.gallery_images || [],
    pdfItineraryUrl: row.pdf_itinerary_url || undefined,
    startDate: row.start_date || '',
    endDate: row.end_date || '',
    durationDays: row.duration_days || 1,
    startCity: row.start_city || '',
    endCity: row.end_city || '',
    intensity: row.intensity || 'Baja',
    recommendedAge: row.recommended_age || 'Todas las edades',
    modality: row.modality || '',
    price: row.price ? Number(row.price) : undefined,
    currency: row.currency || 'USD',
    spotsTotal: row.spots_total || 0,
    spotsAvailable: row.spots_available || 0,
    isFeatured: Boolean(row.is_featured),
    isLimitedSpots: Boolean(row.is_limited_spots),
    isSoldOut: Boolean(row.is_sold_out),
    isPublished: row.is_published !== false,
    includedServices: row.included_services || [],
    notIncludedServices: row.not_included_services || [],
    requirements: row.requirements || '',
    paymentMethods: row.payment_methods || '',
    observations: row.observations || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getClient() {
  return isSupabaseConfigured && supabase ? supabase : null;
}

export async function getAdminSession() {
  const client = getClient();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session;
}

export async function signInAdmin(email: string, password: string) {
  const client = getClient();
  if (!client) {
    const validEmail = 'tribudeviajeras1@gmail.com';
    const validPass = 'tribu2027admin';
    if (email.trim().toLowerCase() !== validEmail || password !== validPass) {
      throw new Error('Credenciales incorrectas.');
    }
    return;
  }

  const { error } = await client.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;
}

export async function signOutAdmin() {
  const client = getClient();
  if (client) await client.auth.signOut();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('tribu_admin_session');
  }
}

export async function getAdminLeads(): Promise<Lead[]> {
  const client = getClient();
  if (!client) return db.getLeads();

  const { data, error } = await client
    .from('leads')
    .select('*, lead_notes(*), followups(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data || []) as LeadRow[]).map(mapLead);
}

export async function getAdminTrips(): Promise<Trip[]> {
  const client = getClient();
  if (!client) return db.getTrips();

  const { data, error } = await client
    .from('trips')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) throw error;
  return ((data || []) as TripRow[]).map(mapTrip);
}

export async function getAdminReservations(): Promise<Reservation[]> {
  const client = getClient();
  if (!client) return db.getReservations();

  const { data, error } = await client
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: false });

  if (error) throw error;
  return ((data || []) as ReservationRow[]).map(mapReservation);
}

export async function saveAdminReservation(reservation: Reservation): Promise<Reservation> {
  const client = getClient();
  if (!client) return db.saveReservation(reservation);

  const payload = {
    lead_id: reservation.leadId || null,
    trip_id: reservation.tripId,
    trip_name: reservation.tripName,
    passenger_name: reservation.passengerName,
    passengers_count: reservation.passengersCount,
    total_amount: reservation.totalAmount,
    deposit_amount: reservation.depositAmount,
    pending_balance: reservation.pendingBalance,
    currency: reservation.currency,
    status: reservation.status,
    notes: reservation.notes || '',
    reservation_date: reservation.reservationDate,
  };

  const { data, error } = await client
    .from('reservations')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return mapReservation(data as ReservationRow);
}

export async function updateAdminLeadStatus(id: string, status: LeadStatus) {
  const client = getClient();
  if (!client) {
    db.updateLeadStatus(id, status);
    return;
  }

  const { error } = await client
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteAdminLead(id: string) {
  const client = getClient();
  if (!client) {
    db.deleteLead(id);
    return;
  }

  const { error } = await client.from('leads').delete().eq('id', id);
  if (error) throw error;
}

export async function addAdminLeadNote(leadId: string, content: string): Promise<LeadNote> {
  const client = getClient();
  if (!client) {
    const note = db.addLeadNote(leadId, content);
    if (!note) throw new Error('No se pudo guardar la nota.');
    return note;
  }

  const { data, error } = await client
    .from('lead_notes')
    .insert({ lead_id: leadId, content })
    .select()
    .single();

  if (error) throw error;

  await client
    .from('leads')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', leadId);

  return mapNote(data as LeadNoteRow);
}

export async function addAdminFollowup(
  leadId: string,
  scheduledAt: string,
  notes: string,
  currentStatus?: LeadStatus
): Promise<Followup> {
  const client = getClient();
  if (!client) {
    const followup = db.addLeadFollowup(leadId, scheduledAt, notes);
    if (currentStatus === 'Nuevo') db.updateLeadStatus(leadId, 'Seguimiento');
    if (!followup) throw new Error('No se pudo guardar el seguimiento.');
    return followup;
  }

  const { data, error } = await client
    .from('followups')
    .insert({ lead_id: leadId, scheduled_at: scheduledAt, notes })
    .select()
    .single();

  if (error) throw error;

  await client
    .from('leads')
    .update({
      status: currentStatus === 'Nuevo' ? 'Seguimiento' : currentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', leadId);

  return mapFollowup(data as FollowupRow);
}

export async function updateAdminFollowupCompletion(followupId: string, isCompleted: boolean) {
  const client = getClient();
  if (!client) {
    const stored = localStorage.getItem('tribu_leads_v1');
    if (!stored) return;
    const leads: Lead[] = JSON.parse(stored);
    const next = leads.map((lead) => ({
      ...lead,
      followups: (lead.followups || []).map((followup) =>
        followup.id === followupId ? { ...followup, isCompleted } : followup
      ),
    }));
    localStorage.setItem('tribu_leads_v1', JSON.stringify(next));
    return;
  }

  const { error } = await client
    .from('followups')
    .update({ is_completed: isCompleted })
    .eq('id', followupId);

  if (error) throw error;
}
