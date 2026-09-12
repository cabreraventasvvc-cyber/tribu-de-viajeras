import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price?: number, currency: string = 'USD'): string {
  if (price === undefined || price === null) return 'A consultar';
  // Formats to 5.640 or 4.233 as in Argentina/Spanish locale
  return `${currency} ${price.toLocaleString('es-AR')}`;
}

export function formatDateShort(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} - ${hours}:${minutes} hr.`;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function getWhatsAppTripLink(agencyPhone: string, tripTitle: string): string {
  const clean = cleanPhoneNumber(agencyPhone);
  const message = `Hola, quisiera recibir información sobre el viaje a ${tripTitle}.`;
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppInquiryFallbackLink(
  agencyPhone: string,
  data: {
    tripName: string;
    fullName: string;
    email: string;
    phone?: string;
    city?: string;
    passengersCount?: number;
    stage?: string;
    message?: string;
  }
): string {
  const clean = cleanPhoneNumber(agencyPhone);
  const lines = [
    `Hola! Quiero consultar por ${data.tripName}.`,
    `Nombre: ${data.fullName}`,
    `Email: ${data.email}`,
    data.phone ? `WhatsApp/Teléfono: ${data.phone}` : '',
    data.city ? `Ciudad: ${data.city}` : '',
    data.passengersCount ? `Cantidad de pasajeras: ${data.passengersCount}` : '',
    data.stage ? `Etapa: ${data.stage}` : '',
    data.message ? `Mensaje: ${data.message}` : '',
  ].filter(Boolean);

  return `https://wa.me/${clean}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function getWhatsAppGeneralLink(agencyPhone: string): string {
  const clean = cleanPhoneNumber(agencyPhone);
  const message = 'Hola! Quisiera recibir información y asesoramiento sobre los viajes de Tribu de Viajeras.';
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLeadDirectLink(leadPhone: string, leadName: string, tripName?: string): string {
  const clean = cleanPhoneNumber(leadPhone);
  const tripText = tripName ? ` por el viaje a ${tripName}` : '';
  const message = `Hola ${leadName}! Te escribo de Tribu de Viajeras en respuesta a tu consulta${tripText}. ¿Cómo estás?`;
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
