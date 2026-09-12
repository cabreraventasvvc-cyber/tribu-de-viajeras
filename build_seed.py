import json
import os

with open('extracted_itineraries.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# 1. JAPAN DAYS
jp_pages = raw['Itinerario Japón MarzoAbril 2027_20260716_164931_0000.pdf']['pages']
jp_days = []
for i in range(3, 17):
    day_num = i - 2
    txt = jp_pages[i].strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if 'ITINERARIO' in lines:
        idx = lines.index('ITINERARIO')
        title = ' '.join(lines[:idx])
        desc = '\n'.join([l for l in lines[idx+2:] if not l.startswith('Comidas:') and not l.startswith('Fin de')])
    else:
        title = lines[0]
        desc = '\n'.join(lines[1:])
    jp_days.append({
        'id': f'jp-day-{day_num}',
        'tripId': 'trip-japon-2027',
        'dayNumber': day_num,
        'title': title,
        'description': desc
    })

# 2. ITALY DAYS
it_pages = raw['Itinerario Italia Mayo 2027_20260716_165011_0000.pdf']['pages']
it_days = []
for i in range(3, 14):
    day_num = i - 2
    txt = it_pages[i].strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if 'ITINERARIO' in lines:
        idx = lines.index('ITINERARIO')
        title = ' '.join(lines[:idx])
        desc = '\n'.join([l for l in lines[idx+2:] if not l.startswith('Comidas:')])
    else:
        title = lines[0] if lines else f'Día {day_num}'
        desc = '\n'.join(lines[1:]) if len(lines) > 1 else txt
    it_days.append({
        'id': f'it-day-{day_num}',
        'tripId': 'trip-italia-2027',
        'dayNumber': day_num,
        'title': title,
        'description': desc
    })

# 3. CHINA DAYS
cn_pages = raw['Itinerario China 2027_20260716_165103_0000.pdf']['pages']
cn_days = []
for i in range(3, 14):
    day_num = i - 2
    txt = cn_pages[i].strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if 'ITINERARIO' in lines:
        idx = lines.index('ITINERARIO')
        title = ' '.join(lines[:idx])
        desc = '\n'.join([l for l in lines[idx+2:] if not l.startswith('Comidas:')])
    else:
        title = lines[0] if lines else f'Día {day_num}'
        desc = '\n'.join(lines[1:]) if len(lines) > 1 else txt
    cn_days.append({
        'id': f'cn-day-{day_num}',
        'tripId': 'trip-china-2027',
        'dayNumber': day_num,
        'title': title,
        'description': desc
    })

ts_content = f"""import {{ Trip, Lead, SiteSettings, Reservation }} from '@/types';

export const initialSettings: SiteSettings = {{
  agencyName: 'Tribu de Viajeras',
  logoUrl: '',
  whatsappNumber: '5491171313215',
  whatsappDisplay: '+54 9 11 7131-3215',
  contactEmail: 'tribu.deviajeras1@gmail.com',
  notificationEmail: 'tribu.deviajeras1@gmail.com',
  instagramUrl: 'https://www.instagram.com/tribudeviajeras/',
  facebookUrl: 'https://www.facebook.com/tribudeviajeras/',
  address: 'Buenos Aires, Argentina',
  heroTitle: 'Viajar es descubrir el mundo, compartir experiencias y crear recuerdos para toda la vida.',
  heroSubtitle: 'Viajes grupales exclusivos para mujeres. Diseñados con cuidado, seguridad, libertad y el calor de viajar entre amigas.',
  defaultCurrency: 'USD',
}};

export const initialTrips: Trip[] = [
  {{
    id: 'trip-japon-2027',
    slug: 'japon-2027',
    title: 'Japón: tradición, magia y modernidad en un solo viaje',
    destinationCountry: 'Japón',
    destinationCities: 'Tokio, Nikko, Monte Fuji y Hakone, Kioto, Nara, Osaka, Hiroshima',
    shortDescription: 'Hay viajes que cambian la forma de ver el mundo, y Japón es uno de ellos. Una experiencia para descubrir una cultura fascinante, compartir momentos únicos y volver con recuerdos que te acompañarán para siempre.',
    fullDescription: 'Japón: tradición, magia y modernidad en un solo viaje. Un recorrido que combina la energía de Tokio, los paisajes sagrados del Monte Fuji y Hakone, los templos milenarios de Kioto, los ciervos de Nara, la gastronomía de Osaka y la emotiva historia de Hiroshima viajando en tren bala Shinkansen.',
    heroImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=1200&q=80'
    ],
    pdfItineraryUrl: '/itineraries/itinerario-japon-2027.pdf',
    startDate: '2027-03-22',
    endDate: '2027-04-03',
    durationDays: 14,
    startCity: 'Tokio',
    endCity: 'Osaka',
    intensity: 'Intensidad baja (actividades físicas ligeras)',
    recommendedAge: 'Todas las edades son bienvenidas',
    modality: 'Explorador - Parcialmente guiado (excursiones guiadas seleccionadas y tiempo libre)',
    price: 5640,
    currency: 'USD',
    spotsTotal: 16,
    spotsAvailable: 6,
    isFeatured: true,
    isLimitedSpots: true,
    isSoldOut: false,
    isPublished: true,
    includedServices: [
      'Alojamiento en hoteles de categoría seleccionada con desayuno',
      'Traslados en Shinkansen (tren bala) entre ciudades',
      'Excursión guiada al Monte Fuji y Hakone con crucero',
      'Visita por barrios históricos y templos de Tokio, Kioto, Nara y Osaka',
      'Paseo por el bosque de bambú de Arashiyama y ceremonia del té',
      'Excursión al Parque de la Paz y Museo de Hiroshima',
      'Coordinación y acompañamiento permanente del equipo de Tribu de Viajeras'
    ],
    notIncludedServices: [
      'Vuelos internacionales de ida y regreso',
      'Impuestos y tasas aéreas de aeropuerto',
      'Bebidas, comidas no especificadas y gastos personales',
      'Seguro médico de asistencia en viaje',
      'Tasa de visado a la llegada (si correspondiese)',
      'Cualquier otro servicio no mencionado en el itinerario'
    ],
    requirements: 'Pasaporte vigente por al menos 6 meses posteriores a la fecha de regreso. Ganas de vivir una aventura única en comunidad de mujeres.',
    paymentMethods: 'Seña inicial para confirmar lugar y plan de cuotas flexibles en dólares o moneda local al cambio oficial. Consultanos por opciones de financiamiento.',
    observations: 'Cupos limitados para preservar una experiencia cuidada, cálida y personalizada.',
    createdAt: '2026-09-01T12:00:00Z',
    updatedAt: '2026-09-05T12:00:00Z',
    itineraryDays: {json.dumps(jp_days, ensure_ascii=False, indent=6)}
  }},
  {{
    id: 'trip-italia-2027',
    slug: 'italia-2027',
    title: 'Un viaje por la esencia de Italia',
    destinationCountry: 'Italia',
    destinationCities: 'Roma, Asís, Florencia, Toscana (Siena y Montepulciano), Bolonia, Venecia, Sorrento, Pompeya, Capri',
    shortDescription: 'Hay viajes que se disfrutan… y otros que se recuerdan para toda la vida, Italia será uno de ellos. Ciudades milenarias, arte, gastronomía y paisajes de ensueño.',
    fullDescription: 'Un viaje por la esencia de Italia: Roma, la Ciudad Eterna; la paz medieval de Asís; los paisajes de viñedos y pueblos soñados de la Toscana; la elegancia de Florencia; los pórticos de Bolonia; los románticos canales de Venecia; las fascinantes ruinas de Pompeya; y los acantilados mediterráneos de Sorrento y Capri.',
    heroImageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80'
    ],
    pdfItineraryUrl: '/itineraries/itinerario-italia-2027.pdf',
    startDate: '2027-05-17',
    endDate: '2027-05-27',
    durationDays: 11,
    startCity: 'Roma',
    endCity: 'Roma',
    intensity: 'Intensidad baja (actividades físicas ligeras)',
    recommendedAge: 'Todas las edades son bienvenidas',
    modality: 'Explorador - Parcialmente guiado (excursiones seleccionadas)',
    price: 4233,
    currency: 'USD',
    spotsTotal: 16,
    spotsAvailable: 4,
    isFeatured: true,
    isLimitedSpots: true,
    isSoldOut: false,
    isPublished: true,
    includedServices: [
      'Alojamiento en hoteles de categoría superior con desayunos',
      'Transporte en bus turístico privado con aire acondicionado',
      'Guías locales oficiales en español en Roma, Florencia y Venecia',
      'Paseos y degustación en bodega de la Toscana (Montepulciano)',
      'Excursión guiada por Sorrento y Costa Amalfitana',
      'Entradas y visita arqueológica con guía en Pompeya',
      'Paseo en barco en Venecia hacia la Plaza San Marcos',
      'Acompañamiento permanente de Tribu de Viajeras'
    ],
    notIncludedServices: [
      'Pasaje aéreo internacional',
      'Impuestos aéreos y tasas de equipaje',
      'Bebidas en comidas y gastos personales',
      'Seguro de viaje y asistencia al viajero',
      'Tasas turísticas municipales de estancia hotelera',
      'Cualquier servicio no estipulado en el itinerario'
    ],
    requirements: 'Pasaporte con vigencia mínima de 6 meses posteriores al regreso. Tramitación de autorización de viaje ETIAS según normativa comunitaria vigente.',
    paymentMethods: 'Seña de reserva y saldo financiado en cuotas mensuales previas a la salida. Consultanos por las formas de pago.',
    observations: 'Grupo reducido de viajeras para garantizar compañerismo y confort.',
    createdAt: '2026-09-01T12:00:00Z',
    updatedAt: '2026-09-05T12:00:00Z',
    itineraryDays: {json.dumps(it_days, ensure_ascii=False, indent=6)}
  }},
  {{
    id: 'trip-china-2027',
    slug: 'china-2027',
    title: 'China Imperial: De la Gran Muralla a Shanghái',
    destinationCountry: 'China',
    destinationCities: 'Pekín, Xi\\'an, Guilin, Yangshuo, Shanghái',
    shortDescription: 'China nos espera con una historia milenaria, paisajes sorprendentes y experiencias que nos marcarán para siempre. Solo queda dar el primer paso y animarnos a vivir esta aventura inolvidable.',
    fullDescription: 'China Imperial: Una travesía asombrosa desde los monumentos eternos de Pekín y la Gran Muralla, el tren bala hacia Xi\\'an y los Guerreros de Terracota, vuelos internos incluidos hacia Guilin para navegar el idílico Río Li entre montañas de cuento, las terrazas de Longji, y la modernidad impactante de Shanghái.',
    heroImageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=1200&q=80'
    ],
    pdfItineraryUrl: '/itineraries/itinerario-china-2027.pdf',
    startDate: '2027-06-02',
    endDate: '2027-06-12',
    durationDays: 11,
    startCity: 'Pekín',
    endCity: 'Shanghái',
    intensity: 'Intensidad baja (actividades físicas ligeras)',
    recommendedAge: 'Todas las edades son bienvenidas',
    modality: 'Explorador - Parcialmente guiado (con vuelos internos incluidos)',
    price: 4218,
    currency: 'USD',
    spotsTotal: 16,
    spotsAvailable: 8,
    isFeatured: true,
    isLimitedSpots: true,
    isSoldOut: false,
    isPublished: true,
    includedServices: [
      'Hoteles 4 y 5 estrellas con desayunos diarios',
      'Vuelos domésticos incluidos: Xi\\'an a Guilin y Guilin a Shanghái',
      'Boleto de tren de alta velocidad Pekín a Xi\\'an en clase turista',
      'Almuerzos y cenas según programa (D/A)',
      'Crucero por el Río Li de Guilin a Yangshuo',
      'Entradas a Ciudad Prohibida, Palacio de Verano, Gran Muralla y Guerreros de Terracota',
      'Guías locales en español en cada destino y coordinación de Tribu'
    ],
    notIncludedServices: [
      'Vuelos internacionales de entrada y salida',
      'Impuestos aeroportuarios',
      'Visado consular a China (asesoramos paso a paso)',
      'Bebidas, gastos particulares y propinas',
      'Seguro médico internacional',
      'Cualquier concepto no detallado expresamente'
    ],
    requirements: 'Pasaporte con al menos 6 meses de vigencia al día de regreso y visado consular emitido por la Embajada de China.',
    paymentMethods: 'Seña inicial para asegurar cupo y plan de cuotas personalizadas. Consultanos por las formas de pago.',
    observations: 'Grupo reducido para brindar máxima contención y seguridad.',
    createdAt: '2026-09-01T12:00:00Z',
    updatedAt: '2026-09-05T12:00:00Z',
    itineraryDays: {json.dumps(cn_days, ensure_ascii=False, indent=6)}
  }}
];

export const initialLeads: Lead[] = [
  {{
    id: 'lead-001',
    tripId: 'trip-tailandia',
    tripName: 'Tribu - Tailandia',
    fullName: 'María luisa',
    email: 'cpnmarialuisa2305@gmail.com',
    phone: '+543834626695',
    city: 'Catamarca',
    passengersCount: 1,
    age: '52',
    attractionReason: 'Regalarme una experiencia para mi',
    concernReason: 'La seguridad',
    stage: 'Estoy evaluando seriamente viajar',
    message: 'Hola! Quisiera saber fechas exactas de salida y formas de pago disponibles.',
    status: 'Nuevo',
    origin: 'Tribu - Tailandia',
    utmSource: 'ig',
    utmMedium: 'paid',
    utmCampaign: '120247148276120014',
    createdAt: '2026-09-04T22:25:00Z',
    updatedAt: '2026-09-04T22:25:00Z',
    notes: [
      {{
        id: 'note-001',
        leadId: 'lead-001',
        content: 'La llamé el 05/09. Está interesada pero debe confirmar vacaciones en su trabajo.',
        createdAt: '2026-09-05T14:30:00Z'
      }}
    ]
  }},
  {{
    id: 'lead-002',
    tripId: 'trip-tailandia',
    tripName: 'Tribu - Tailandia',
    fullName: 'Sandra',
    email: 'sandryasesora@hotmail.com',
    phone: '+541123038248',
    city: 'Buenos Aires',
    passengersCount: 1,
    age: '46',
    attractionReason: 'Conocer Tailandia y sus playas',
    concernReason: 'Viajar sola',
    stage: 'Estoy evaluando seriamente viajar',
    message: 'Me da un poco de miedo viajar sola por primera vez, me encanta la propuesta de ir en grupo de mujeres.',
    status: 'Nuevo',
    origin: 'Tribu - Tailandia',
    utmSource: 'ig',
    utmMedium: 'paid',
    utmCampaign: '120247148276120014',
    createdAt: '2026-09-04T17:20:00Z',
    updatedAt: '2026-09-04T17:20:00Z',
    notes: [
      {{
        id: 'note-002',
        leadId: 'lead-002',
        content: 'Le envié el PDF del itinerario por WhatsApp. Quedamos en hablar el lunes.',
        createdAt: '2026-09-04T18:00:00Z'
      }}
    ]
  }},
  {{
    id: 'lead-003',
    tripId: 'trip-japon-2027',
    tripName: 'Japón: tradición, magia y modernidad',
    fullName: 'Florencia Benítez',
    email: 'flor.benitez@gmail.com',
    phone: '+5491158472910',
    city: 'Córdoba',
    passengersCount: 2,
    age: '38',
    attractionReason: 'Los cerezos en flor, la cultura y los templos sagrados de Kioto',
    concernReason: 'El idioma y las comidas',
    stage: 'Quiero reservar',
    message: 'Quiero viajar con mi hermana. ¿Tienen habitación con dos camas y cupos disponibles?',
    status: 'Interesado',
    origin: 'Japón 2027',
    utmSource: 'facebook',
    utmMedium: 'cpc',
    utmCampaign: 'japon_primavera_2027',
    createdAt: '2026-09-03T11:15:00Z',
    updatedAt: '2026-09-05T09:00:00Z',
    notes: [
      {{
        id: 'note-003',
        leadId: 'lead-003',
        content: 'Quiere reservar dos lugares. Se le envió información de seña.',
        createdAt: '2026-09-03T16:00:00Z'
      }}
    ]
  }},
  {{
    id: 'lead-004',
    tripId: 'trip-italia-2027',
    tripName: 'Un viaje por la esencia de Italia',
    fullName: 'Carla Rossi',
    email: 'carlarossi88@yahoo.com.ar',
    phone: '+5493416849201',
    city: 'Rosario',
    passengersCount: 1,
    age: '42',
    attractionReason: 'La Costa Amalfitana, Capri y la Toscana',
    concernReason: 'El ritmo de caminata',
    stage: 'Estoy comparando opciones',
    message: 'Hola tribu! ¿Se camina mucho en Roma y Florencia? Me interesa mucho el viaje.',
    status: 'Contactado',
    origin: 'Italia Mayo 2027',
    utmSource: 'ig',
    utmMedium: 'organic',
    createdAt: '2026-09-02T19:40:00Z',
    updatedAt: '2026-09-03T10:30:00Z',
    notes: [
      {{
        id: 'note-004',
        leadId: 'lead-004',
        content: 'Le aclaré que el ritmo es relajado (intensidad baja) y que hay tiempo libre para descansar.',
        createdAt: '2026-09-03T10:30:00Z'
      }}
    ]
  }},
  {{
    id: 'lead-005',
    tripId: 'trip-china-2027',
    tripName: 'China Imperial: De la Gran Muralla a Shanghái',
    fullName: 'Mariana Gomez',
    email: 'mariana.gomez@hotmail.com',
    phone: '+5491147589211',
    city: 'La Plata',
    passengersCount: 1,
    age: '55',
    attractionReason: 'Conocer la Gran Muralla y los Guerreros de Terracota',
    concernReason: 'Los trámites de visa',
    stage: 'Estoy evaluando seriamente viajar',
    message: 'Hola, ¿ustedes ayudan con el trámite de la visa para ingresar a China?',
    status: 'Seguimiento',
    origin: 'China 2027',
    utmSource: 'google',
    utmMedium: 'search',
    utmCampaign: 'china_tours_2027',
    createdAt: '2026-09-01T15:20:00Z',
    updatedAt: '2026-09-04T12:00:00Z',
    notes: [
      {{
        id: 'note-005',
        leadId: 'lead-005',
        content: 'Agendada llamada para resolver dudas de visado y pasaporte.',
        createdAt: '2026-09-02T11:00:00Z'
      }}
    ]
  }}
];

export const initialReservations: Reservation[] = [
  {{
    id: 'res-001',
    leadId: 'lead-003',
    tripId: 'trip-japon-2027',
    tripName: 'Japón: tradición, magia y modernidad en un solo viaje',
    passengerName: 'Florencia Benítez y hermana',
    passengersCount: 2,
    totalAmount: 11280,
    depositAmount: 3000,
    pendingBalance: 8280,
    currency: 'USD',
    status: 'Confirmada',
    notes: 'Habitación doble twin (dos camas separadas).',
    reservationDate: '2026-09-04T18:00:00Z'
  }}
];
"""

os.makedirs('src/lib/seed', exist_ok=True)
with open('src/lib/seed/initial-data.ts', 'w', encoding='utf-8') as f_out:
    f_out.write(ts_content)

print('Generated initial-data.ts successfully!')
