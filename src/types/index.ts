export type LeadStatus =
  | 'Nuevo'
  | 'Contactado'
  | 'Interesado'
  | 'Seguimiento'
  | 'Reserva pendiente'
  | 'Reservado'
  | 'No interesado';

export type StageOption =
  | 'Solo estoy averiguando'
  | 'Estoy comparando opciones'
  | 'Estoy evaluando seriamente viajar'
  | 'Quiero reservar';

export interface TripDay {
  id: string;
  tripId: string;
  dayNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  meals?: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  destinationCountry: string;
  destinationCities: string;
  shortDescription: string;
  fullDescription: string;
  heroImageUrl: string;
  galleryImages: string[];
  pdfItineraryUrl?: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  startCity: string;
  endCity: string;
  intensity: string;
  recommendedAge: string;
  modality: string;
  price?: number;
  currency: string;
  spotsTotal: number;
  spotsAvailable: number;
  isFeatured: boolean;
  isLimitedSpots: boolean;
  isSoldOut: boolean;
  isPublished: boolean;
  includedServices: string[];
  notIncludedServices: string[];
  requirements: string;
  paymentMethods: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
  itineraryDays?: TripDay[];
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
}

export interface Followup {
  id: string;
  leadId: string;
  scheduledAt: string;
  notes: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface Lead {
  id: string;
  tripId?: string;
  tripName: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  passengersCount: number;
  age?: string;
  attractionReason?: string;
  concernReason?: string;
  stage: string;
  message?: string;
  status: LeadStatus;
  origin: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  createdAt: string;
  updatedAt: string;
  notes?: LeadNote[];
  followups?: Followup[];
}

export interface Reservation {
  id: string;
  leadId?: string;
  tripId: string;
  tripName: string;
  passengerName: string;
  passengersCount: number;
  totalAmount: number;
  depositAmount: number;
  pendingBalance: number;
  currency: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  notes?: string;
  reservationDate: string;
}

export interface SiteSettings {
  agencyName: string;
  logoUrl?: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  contactEmail: string;
  notificationEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  defaultCurrency: string;
}
