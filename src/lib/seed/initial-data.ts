import { Trip, Lead, SiteSettings, Reservation } from '@/types';

export const initialSettings: SiteSettings = {
  agencyName: 'Tribu de Viajeras',
  logoUrl: '',
  whatsappNumber: '5491171313215',
  whatsappDisplay: '+54 9 11 7131-3215',
  contactEmail: 'Tribudeviajeras1@gmail.com',
  notificationEmail: 'Tribudeviajeras1@gmail.com',
  instagramUrl: 'https://www.instagram.com/tribu.deviajeras/',
  facebookUrl: 'https://www.facebook.com/tribudeviajeras/',
  address: 'Buenos Aires, Argentina',
  heroTitle: 'Viajar es descubrir el mundo, compartir experiencias y crear recuerdos para toda la vida.',
  heroSubtitle: 'Viajes grupales exclusivos para mujeres. Diseñados con cuidado, seguridad, libertad y el calor de viajar entre amigas.',
  defaultCurrency: 'USD',
};

export const initialTrips: Trip[] = [
  {
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
    itineraryDays: [
      {
            "id": "jp-day-1",
            "tripId": "trip-japon-2027",
            "dayNumber": 1,
            "title": "Día 1 - BIENVENIDO A JAPÓN Y LLEGADA A TOKIO",
            "description": "¡Comienza nuestra aventura por Japón!\nAl llegar al Aeropuerto Internacional de Narita, nos estará esperando\nnuestro traslado privado para llevarnos cómodamente hasta Tokio. Una\nvez instaladas en el hotel, tendremos tiempo para descansar, empezar a\nconectar con la energía de esta increíble ciudad y prepararnos para vivir\nuna experiencia inolvidable junto a nuestra tribu de viajeras."
      },
      {
            "id": "jp-day-2",
            "tripId": "trip-japon-2027",
            "dayNumber": 2,
            "title": "Día 2- CONTRASTES DE TOKIO",
            "description": "Hoy comenzaremos a descubrir la esencia de Tokio, una ciudad donde la\ntradición y la innovación conviven en perfecta armonía.\nRecorreremos el histórico barrio de Asakusa, visitaremos el emblemático\nTemplo Senso-ji y pasearemos por la tradicional calle Nakamise, llena de\ntiendas y sabores típicos. Luego disfrutaremos de increíbles vistas desde\nel Tokyo Skytree, uno de los miradores más altos del mundo.\nNuestra aventura continuará en el sereno Santuario Meiji, rodeado de\nnaturaleza, para después sumergirnos en la energía de Harajuku y el\nfamoso cruce de Shibuya. Para cerrar este día inolvidable, viviremos una\nexperiencia única en teamLab Borderless, donde el arte, la luz y la\ntecnología crean un espectáculo que despierta todos los sentidos.\nAl finalizar, regresaremos a nuestro hotel para descansar y prepararnos\npara una nueva jornada llena de experiencias."
      },
      {
            "id": "jp-day-3",
            "tripId": "trip-japon-2027",
            "dayNumber": 3,
            "title": "Día 3 - MONTAÑAS SAGRADAS DE NIKKO (B)",
            "description": "Hoy dejaremos atrás el ritmo de Tokio para descubrir Nikko, un destino\nrodeado de montañas, bosques y algunos de los santuarios más\nimportantes de Japón.\nVisitaremos el impresionante Santuario Toshogu, declarado Patrimonio\nde la Humanidad por la UNESCO, recorreremos el emblemático Puente\nShinkyo y conoceremos el histórico Templo Rinno-ji, donde la\nespiritualidad y la naturaleza se unen en un entorno único.\nMás tarde nos maravillaremos con las espectaculares Cataratas Kegon,\nuno de los paisajes naturales más famosos del país. Al finalizar la\nexcursión, regresaremos a Tokio con el corazón lleno de nuevos\nrecuerdos y la sensación de haber descubierto otra cara de Japón."
      },
      {
            "id": "jp-day-4",
            "tripId": "trip-japon-2027",
            "dayNumber": 4,
            "title": "Día 4 - OCIO EN TOKIO (B)",
            "description": "Hoy tendremos el día libre para descubrir Tokio a nuestro propio ritmo.\nSerá la oportunidad perfecta para recorrer sus calles, hacer compras,\nvisitar algún museo, conocer cafeterías tradicionales o simplemente\ndejarnos sorprender por los rincones únicos de esta fascinante ciudad.\nCada una podrá vivir Tokio a su manera, disfrutando de esos pequeños\nmomentos que hacen que un viaje se vuelva verdaderamente\ninolvidable.\nAl finalizar el día, nos reuniremos para continuar juntas nuestra aventura\nrumbo a Kioto, la ciudad donde nos espera la esencia más tradicional\nde Japón."
      },
      {
            "id": "jp-day-5",
            "tripId": "trip-japon-2027",
            "dayNumber": 5,
            "title": "Día 5 - HAKONE",
            "description": "Hoy nos despediremos de Tokio para adentrarnos en los increíbles\npaisajes naturales de Hakone, una de las regiones más hermosas de\nJapón.\nComenzaremos visitando el Museo al Aire Libre de Hakone, donde el arte\ny la naturaleza se combinan de una manera única. Luego recorreremos el\nimpresionante Valle de Owakudani, famoso por su actividad volcánica y\nsus vistas espectaculares.\nMás tarde disfrutaremos de un relajante paseo en barco por el Lago Ashi,\nrodeado de montañas, y visitaremos el encantador Santuario de Hakone,\nun lugar de paz y espiritualidad en medio del bosque.\nAl finalizar el día, nos alojaremos en Hakone para descansar y seguir\ndisfrutando de la tranquilidad de este maravilloso destino."
      },
      {
            "id": "jp-day-6",
            "tripId": "trip-japon-2027",
            "dayNumber": 6,
            "title": "Día 6 - DE HAKONE A KYOTO EN",
            "description": "SHINKANSEN (B)\nDespués del desayuno viviremos una de las experiencias más emblemáticas\nde Japón: viajaremos a bordo del famoso tren bala Shinkansen rumbo a Kioto.\nAl llegar, nos trasladaremos al hotel y tendremos tiempo libre para comenzar a\ndescubrir esta ciudad a nuestro ritmo. Sus calles tradicionales, templos y\nambiente sereno nos invitarán a bajar el ritmo y disfrutar de la esencia más\nauténtica de Japón.\nSerá el comienzo de una nueva etapa del viaje, llena de historia, cultura y\nmomentos inolvidables para compartir juntas."
      },
      {
            "id": "jp-day-7",
            "tripId": "trip-japon-2027",
            "dayNumber": 7,
            "title": "Día 7 - ARASHIYAMA BAMBÚ, CEREMONIA",
            "description": "DEL TÉ Y TEMPLO DORADO (B)\nHoy descubriremos algunos de los rincones más emblemáticos de Kioto,\nuna ciudad donde la historia y las tradiciones japonesas siguen vivas.\nComenzaremos recorriendo el mágico Bosque de Bambú de Arashiyama\ny visitaremos el Templo Tenryu-ji, Patrimonio de la Humanidad por la\nUNESCO. Luego pasearemos por el pintoresco Puente Togetsukyo y\nviviremos una auténtica ceremonia del té, una de las tradiciones más\nrepresentativas de la cultura japonesa.\nPara finalizar este increíble día, conoceremos el majestuoso Kinkaku-ji, el\nfamoso Pabellón Dorado, uno de los templos más fotografiados y\nadmirados de Japón.\nRegresaremos a nuestro hotel en Kioto con nuevos recuerdos y una\nconexión aún más profunda con la esencia de este fascinante país."
      },
      {
            "id": "jp-day-8",
            "tripId": "trip-japon-2027",
            "dayNumber": 8,
            "title": "Día 8 - CALLES ANTIGUAS DE KYOTO, GION Y",
            "description": "CASTILLO DE NIJO (B)\nHoy seguiremos descubriendo la magia de Kioto y sus lugares más\nemblemáticos.\nVisitaremos el impresionante Templo Kiyomizu-dera, famoso por su\ngran terraza de madera y sus increíbles vistas de la ciudad. Después\npasearemos por las tradicionales calles de Ninenzaka y Sannenzaka,\nrepletas de casas históricas, pequeñas tiendas y encantadoras\ncafeterías que nos harán sentir que viajamos en el tiempo.\nNuestra aventura continuará en Gion, el histórico barrio de las geishas,\ndonde podremos disfrutar de su atmósfera única. Para finalizar el día,\nrecorreremos el Castillo de Nijo, una joya de la época samurái que nos\npermitirá conocer una parte fascinante de la historia de Japón.\nAl finalizar la jornada, regresaremos a nuestro hotel en Kioto para\ndescansar y prepararnos para seguir viviendo nuevas experiencias\njuntas."
      },
      {
            "id": "jp-day-9",
            "tripId": "trip-japon-2027",
            "dayNumber": 9,
            "title": "Día 9 - KYOTO EN EL TIEMPO LIBRE (B)",
            "description": "Hoy tendremos el día libre para disfrutar de Kioto a nuestro propio\nritmo. Será el momento ideal para volver a nuestros lugares favoritos,\ndescubrir templos escondidos, recorrer tiendas de artesanías, probar la\ngastronomía local o simplemente perdernos por sus encantadoras\ncalles llenas de historia.\nKioto invita a disfrutar sin apuros, dejándonos sorprender por su calma,\nsu belleza y esos pequeños detalles que hacen que cada paseo se\nconvierta en un recuerdo especial.\nAl finalizar el día, regresaremos a nuestro hotel para descansar y\nprepararnos para las próximas aventuras que aún nos esperan."
      },
      {
            "id": "jp-day-10",
            "tripId": "trip-japon-2027",
            "dayNumber": 10,
            "title": "Día 10 - PUERTAS TORII, CIERVOS DE NARA Y",
            "description": "SANTUARIOS ANTIGUOS (B)\nHoy comenzaremos el día visitando uno de los lugares más icónicos de\nJapón: el Santuario Fushimi Inari Taisha, famoso por sus miles de torii\nrojos que forman un paisaje verdaderamente inolvidable.\nLuego viajaremos hacia Nara, la primera capital permanente de Japón,\ndonde conoceremos el famoso Parque de Nara y sus simpáticos ciervos,\nconsiderados sagrados. También visitaremos el impresionante Templo\nTodai-ji, hogar del Gran Buda, y el hermoso Santuario Kasuga Taisha,\nrodeado de naturaleza y miles de faroles tradicionales.\nAl finalizar esta jornada llena de historia, cultura y paisajes únicos,\ncontinuaremos nuestro viaje hacia Osaka, donde pasaremos la noche y\nnos prepararemos para seguir descubriendo Japón juntas."
      },
      {
            "id": "jp-day-11",
            "tripId": "trip-japon-2027",
            "dayNumber": 11,
            "title": "Día 11 - CASTILLO DE OSAKA, MERCADOS Y",
            "description": "LUCES DE DOTONBORI (B)\nHoy descubriremos Osaka, una ciudad vibrante, moderna y\nreconocida por su increíble gastronomía y su energía única.\nComenzaremos visitando el emblemático Castillo de Osaka, uno de los\nsímbolos históricos más importantes del país, rodeado de hermosos\njardines. Luego recorreremos uno de los tradicionales mercados\nlocales, donde podremos conocer los sabores más auténticos de la\ncocina japonesa.\nMás tarde pasearemos por la famosa calle comercial Shinsaibashi y\nfinalizaremos el día en Dotonbori, el corazón de Osaka, donde las luces\nde neón, el canal y el ambiente animado crean una postal inolvidable.\nAl terminar esta experiencia, regresaremos a nuestro hotel para\ndescansar después de haber vivido otra jornada llena de momentos\núnicos junto a nuestra tribu de viajeras."
      },
      {
            "id": "jp-day-12",
            "tripId": "trip-japon-2027",
            "dayNumber": 12,
            "title": "Día 12 - VIAJE DE LA PAZ A HIROSHIMA EN",
            "description": "SHINKANSEN (B)\nHoy viviremos una experiencia muy especial viajando en el famoso tren\nbala Shinkansen hasta Hiroshima, una ciudad que transformó una de las\npáginas más difíciles de la historia en un poderoso mensaje de esperanza\ny paz.\nRecorreremos el Parque Conmemorativo de la Paz, conoceremos la\nemblemática Cúpula de la Bomba Atómica y visitaremos el Museo\nConmemorativo de la Paz, un lugar que invita a reflexionar y valorar la\nimportancia de la paz entre los pueblos.\nAl finalizar esta emotiva jornada, regresaremos a Osaka en Shinkansen,\nllevando con nosotras una experiencia que, sin dudas, dejará una\nprofunda huella en nuestro viaje por Japón."
      },
      {
            "id": "jp-day-13",
            "tripId": "trip-japon-2027",
            "dayNumber": 13,
            "title": "Día 13 - OCIO EN OSAKA (B)",
            "description": "Hoy tendremos el último día libre para disfrutar de Osaka a nuestro\npropio ritmo. Será la oportunidad perfecta para hacer las últimas\ncompras, probar la deliciosa gastronomía local, recorrer esos lugares\nque aún nos quedaron pendientes o simplemente relajarnos y disfrutar\nde la ciudad.\nUn día para aprovechar cada momento, compartir las últimas\nexperiencias con nuestra tribu de viajeras y despedirnos de Japón\nllevándonos recuerdos, emociones y amistades que nos acompañarán\nmucho más allá de este viaje.\nAl finalizar el día, regresaremos a nuestro hotel para descansar antes de\nemprender el regreso a casa."
      },
      {
            "id": "jp-day-14",
            "tripId": "trip-japon-2027",
            "dayNumber": 14,
            "title": "Día 14 -  HORA DE DESPEDIRSE",
            "description": "DDespués del desayuno, nos despediremos de\nJapón y nos trasladaremos al Aeropuerto\nInternacional de Kansai para tomar nuestro vuelo de\nregreso.\nLlegará el momento de volver a casa con la valija llena de recuerdos,\nnuevas amistades y experiencias que nos acompañarán para siempre.\nDurante estos días compartimos templos milenarios, ciudades vibrantes,\npaisajes increíbles y una cultura que nos sorprendió en cada paso.\nPorque los mejores viajes no solo nos llevan a conocer nuevos destinos,\ntambién nos transforman. Y Japón, sin duda, será una experiencia que\nquedará para siempre en nuestros corazones."
      }
]
  },
  {
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
    itineraryDays: [
      {
            "id": "it-day-1",
            "tripId": "trip-italia-2027",
            "dayNumber": 1,
            "title": "Día 1 - Llegada a Roma - ¡Benvenuti a Roma!",
            "description": "¡Comienza nuestra aventura por Italia!\nAl llegar a Roma, la Ciudad Eterna, comenzaremos a vivir una\nexperiencia inolvidable. Después de instalarnos en el hotel, tendremos\ntiempo para relajarnos, disfrutar de las primeras postales de esta\nmaravillosa ciudad y empezar a sentir la magia de un destino que nos\nsorprenderá en cada paso.\nSerá el inicio de un viaje lleno de historia, arte, sabores y momentos\núnicos que compartiremos junto a nuestra tribu de viajeras.\nAlojamiento: Roma."
      },
      {
            "id": "it-day-2",
            "tripId": "trip-italia-2027",
            "dayNumber": 2,
            "title": "Dia 2- Roma > Asís > Siena > Florencia - Un",
            "description": "viaje por las maravillas medievales\nDespués del desayuno dejaremos atrás Roma para comenzar un recorrido\npor algunos de los paisajes más encantadores de Italia.\nNuestra primera parada será Asís, una ciudad medieval que invita a viajar\nen el tiempo. Allí visitaremos la majestuosa Basílica de San Francisco y\ntendremos tiempo libre para recorrer sus pintorescas calles, disfrutar de su\nambiente y almorzar.\nPor la tarde continuaremos hacia Siena, una de las joyas de la Toscana.\nDescubriremos su encantador centro histórico, declarado Patrimonio de\nla Humanidad por la UNESCO, y conoceremos la espectacular Piazza del\nCampo, una de las plazas más emblemáticas de Italia.\nMientras atravesamos los inolvidables paisajes de la campiña toscana,\nllegaremos a Florencia, la cuna del Renacimiento, donde nos alojaremos\npara seguir descubriendo la magia de Italia.\nComidas: Desayuno.\nAlojamiento: Florencia."
      },
      {
            "id": "it-day-3",
            "tripId": "trip-italia-2027",
            "dayNumber": 3,
            "title": "Día 3 - Florencia - La cuna del Renacimiento",
            "description": "Hoy nos espera una de las ciudades más fascinantes de Italia: Florencia,\nla cuna del Renacimiento y un verdadero museo al aire libre.\nRecorreremos sus lugares más emblemáticos, como la imponente\nCatedral de Santa María del Fiore con la famosa cúpula de Brunelleschi,\nel Campanario de Giotto y el histórico Baptisterio. También pasearemos\npor la elegante Piazza della Signoria, conoceremos el Palazzo Vecchio y\nvisitaremos la Basílica de Santa Croce, donde descansan grandes\nfiguras de la historia italiana.\nPor la tarde tendremos tiempo libre para seguir descubriendo Florencia\na nuestro ritmo, recorrer sus encantadoras calles, disfrutar de su\ngastronomía o, si lo deseamos, realizar una excursión opcional a Pisa\npara conocer su famosa Torre Inclinada o visitar la prestigiosa Galería\nUffizi.\nUna jornada para dejarnos enamorar por el arte, la historia y la belleza de\nuna de las ciudades más extraordinarias del mundo.\nComidas: Desayuno.\nAlojamiento: Florencia."
      },
      {
            "id": "it-day-4",
            "tripId": "trip-italia-2027",
            "dayNumber": 4,
            "title": "Día 4 - Venecia > Región vinícola de Toscana",
            "description": "(Montepulciano) > Roma\nDespués del desayuno nos despediremos de la encantadora Venecia\npara emprender el regreso hacia Roma, atravesando una vez más los\npaisajes de la maravillosa Toscana.\nEn el camino haremos una parada en Montepulciano, un pintoresco\npueblo medieval ubicado en lo alto de una colina. Tendremos tiempo\nlibre para recorrer sus calles empedradas, descubrir sus rincones llenos\nde historia, disfrutar de sus impresionantes vistas sobre el Valle de Orcia\ny almorzar a nuestro ritmo.\nPor la tarde continuaremos el viaje hacia Roma, donde finalizaremos\neste inolvidable recorrido por el norte de Italia. Llegaremos al hotel para\ndescansar y prepararnos para la próxima etapa de nuestra aventura,\nllevando con nosotras recuerdos que ya forman parte de esta\nexperiencia única.\nComidas: Desayuno.\nAlojamiento: Roma."
      },
      {
            "id": "it-day-5",
            "tripId": "trip-italia-2027",
            "dayNumber": 5,
            "title": "Día 5 - Venecia - La magia de la Serenísima",
            "description": "Después del desayuno nos dirigiremos al corazón de Venecia, una\nciudad única en el mundo, construida sobre el agua y llena de rincones\nque parecen sacados de un cuento.\nComenzaremos nuestro recorrido en la emblemática Plaza San Marcos,\ndonde conoceremos el exterior del majestuoso Palacio Ducal y\ncruzaremos el famoso Puente de los Suspiros, dos de los grandes\nsímbolos de la ciudad.\nLuego tendremos tiempo libre para disfrutar Venecia a nuestro ritmo:\nrecorrer sus encantadoras callejuelas, cruzar sus pintorescos puentes,\ndescubrir pequeñas plazas escondidas, pasear junto a sus canales o\nsimplemente sentarnos a disfrutar de un café mientras nos dejamos\nenvolver por la magia de este destino incomparable.\nAl finalizar el día regresaremos al hotel, llevando con nosotras postales y\nrecuerdos que solo Venecia puede regalar.\nComidas: Desayuno.\nAlojamiento: Venecia Mestre."
      },
      {
            "id": "it-day-6",
            "tripId": "trip-italia-2027",
            "dayNumber": 6,
            "title": "Día 6 - Venecia > Región vinícola de Toscana",
            "description": "(Montepulciano) > Roma\nDespués del desayuno nos despediremos de Venecia para continuar\nnuestro recorrido por la encantadora región de la Toscana.\nNuestra próxima parada será Montepulciano, uno de los pueblos\nmedievales más hermosos de Italia. Tendremos tiempo para recorrer sus\ncalles empedradas, disfrutar de sus increíbles vistas sobre el Valle de\nOrcia y descubrir el encanto de sus plazas, tiendas y rincones llenos de\nhistoria. También contaremos con tiempo libre para almorzar y vivir la\nesencia de este destino a nuestro propio ritmo.\nPor la tarde emprenderemos el regreso hacia Roma, donde finalizaremos\nesta primera etapa de nuestro recorrido y nos alojaremos para continuar\ndescubriendo las maravillas del sur de Italia.\nComidas: Desayuno.\nAlojamiento: Roma."
      },
      {
            "id": "it-day-7",
            "tripId": "trip-italia-2027",
            "dayNumber": 7,
            "title": "Día 7 - Roma - La magnificencia del Vaticano y",
            "description": "las maravillas de la Antigüedad\nHoy tendremos el día libre para disfrutar de Roma a nuestro propio ritmo.\nSerá la oportunidad perfecta para recorrer sus plazas llenas de historia,\ndescubrir sus encantadoras calles, saborear un auténtico café italiano o\nsimplemente dejarnos sorprender por la magia de una ciudad donde\ncada rincón tiene una historia para contar.\nQuienes lo deseen también podrán realizar excursiones opcionales para\ncompletar esta experiencia. Será posible visitar los Museos Vaticanos, la\nCapilla Sixtina y la Plaza de San Pedro, o viajar en el tiempo recorriendo\nel Coliseo, el Foro Romano y el Monte Palatino, algunos de los lugares\nmás emblemáticos del Imperio Romano.\nUn día para vivir Roma a nuestra manera y seguir creando recuerdos\ninolvidables junto a nuestra tribu de viajeras.\nComidas: Desayuno.\nAlojamiento: Roma."
      },
      {
            "id": "it-day-8",
            "tripId": "trip-italia-2027",
            "dayNumber": 8,
            "title": "Día 8 - Roma > Sorrento - La carretera",
            "description": "panorámica de la Costa Amalfitana\nDespués del desayuno comenzaremos una jornada inolvidable rumbo\nal sur de Italia, donde nos esperan algunos de los paisajes y lugares más\nfascinantes del país.\nNuestra primera parada será Pompeya, la legendaria ciudad romana\nque quedó sepultada por la erupción del Vesubio. Acompañadas por\nnuestro guía, recorreremos sus antiguas calles, casas y templos,\ndescubriendo cómo era la vida hace casi dos mil años.\nAntes de la visita disfrutaremos de un almuerzo con una auténtica pizza\nnapolitana, una experiencia gastronómica que no puede faltar en un\nviaje por Italia.\nPor la tarde continuaremos recorriendo la espectacular Costa\nSorrentina, con paisajes que nos regalarán algunas de las postales más\nhermosas del viaje, hasta llegar a Sorrento, donde nos espera la cena y\nuna noche para disfrutar del encanto del Mediterráneo.\nComidas: Desayuno, almuerzo y cena.\nAlojamiento: Sorrento."
      },
      {
            "id": "it-day-9",
            "tripId": "trip-italia-2027",
            "dayNumber": 9,
            "title": "Día 9 - Sorrento",
            "description": "Hoy tendremos el día libre para disfrutar de Sorrento, uno de los\nrincones más encantadores de la costa italiana. Podremos pasear por\nsus coloridas calles, recorrer sus miradores con vistas al Mediterráneo,\nrelajarnos entre jardines y plazas llenas de vida o simplemente disfrutar\ndel inconfundible estilo de vida italiano.\nQuienes lo deseen podrán realizar una excursión opcional a la\nespectacular isla de Capri, famosa por sus aguas cristalinas, sus\npaisajes de ensueño y su elegante ambiente. Una experiencia\ninolvidable para quienes quieran descubrir uno de los destinos más\nexclusivos de Italia.\nAl finalizar el día regresaremos al hotel para compartir una deliciosa\ncena y seguir disfrutando de esta aventura junto a nuestra tribu de\nviajeras.\nImportante: Durante la temporada de invierno, la excursión opcional a\nCapri puede no realizarse debido a los horarios de los ferris. En ese\ncaso, disfrutaremos de más tiempo libre para seguir descubriendo\nSorrento.\nComidas: Desayuno y cena.\nAlojamiento: Sorrento."
      },
      {
            "id": "it-day-10",
            "tripId": "trip-italia-2027",
            "dayNumber": 10,
            "title": "Día 10 - Sorrento > Pompeya > Roma - Un viaje",
            "description": "en el tiempo\nDespués del desayuno disfrutaremos de una mañana libre para seguir\nviviendo la esencia de Sorrento. Será el momento ideal para recorrer sus\nencantadoras calles, hacer las últimas compras, probar el tradicional\nlimoncello o simplemente relajarnos frente al mar Mediterráneo.\nQuienes lo deseen también podrán realizar una excursión opcional a la\nespectacular Costa Amalfitana, uno de los paisajes costeros más famosos\ny fotografiados del mundo, con pueblos que parecen colgados sobre los\nacantilados y vistas que quedarán para siempre en nuestra memoria.\nPor la tarde emprenderemos el regreso hacia Roma, donde nos\nalojaremos para pasar nuestra última noche en Italia y comenzar a\ndespedirnos de este viaje inolvidable.\nComidas: Desayuno.\nAlojamiento: Roma."
      },
      {
            "id": "it-day-11",
            "tripId": "trip-italia-2027",
            "dayNumber": 11,
            "title": "Día 11 -  Salida de Roma - ¡Arrivederci Italia!",
            "description": "Después del desayuno llegará el momento de\ndespedirnos de Italia. Nos trasladaremos al\naeropuerto para emprender el regreso a casa,\nllevando con nosotras mucho más que\nfotografías y\nsouvenirs.\nDurante estos días compartimos ciudades llenas de historia, paisajes\ninolvidables, sabores únicos y momentos que quedarán grabados para\nsiempre en nuestra memoria. Desde las calles de Roma hasta los canales\nde Venecia, pasando por la Toscana, Florencia, Pompeya y la costa\nmediterránea, cada rincón nos regaló una nueva emoción.\nPorque los mejores viajes no terminan cuando el avión despega; continúan\nen cada recuerdo, en cada amistad y en cada historia que volvemos a\ncontar. Italia siempre tendrá un lugar especial en nuestros corazones.\nComidas: Desayuno."
      }
]
  },
  {
    id: 'trip-china-2027',
    slug: 'china-2027',
    title: 'China Imperial: De la Gran Muralla a Shanghái',
    destinationCountry: 'China',
    destinationCities: 'Pekín, Xi\'an, Guilin, Yangshuo, Shanghái',
    shortDescription: 'China nos espera con una historia milenaria, paisajes sorprendentes y experiencias que nos marcarán para siempre. Solo queda dar el primer paso y animarnos a vivir esta aventura inolvidable.',
    fullDescription: 'China Imperial: Una travesía asombrosa desde los monumentos eternos de Pekín y la Gran Muralla, el tren bala hacia Xi\'an y los Guerreros de Terracota, vuelos internos incluidos hacia Guilin para navegar el idílico Río Li entre montañas de cuento, las terrazas de Longji, y la modernidad impactante de Shanghái.',
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
      'Vuelos domésticos incluidos: Xi\'an a Guilin y Guilin a Shanghái',
      'Boleto de tren de alta velocidad Pekín a Xi\'an en clase turista',
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
    itineraryDays: [
      {
            "id": "cn-day-1",
            "tripId": "trip-china-2027",
            "dayNumber": 1,
            "title": "DÍA 1 - BIENVENIDAS A CHINA - LLEGADA A PEKÍN",
            "description": "¡Comienza nuestra gran aventura! Al llegar a Pekín, nos estará\nesperando un traslado para llevarnos cómodamente hasta el hotel.\nCapital de China y cuna de una historia milenaria, Pekín nos recibirá\ncon una fascinante mezcla de tradición y modernidad. Tendremos el\nresto del día libre para comenzar a descubrir sus calles, disfrutar de\nnuestro primer contacto con la cultura china o simplemente\ndescansar después del vuelo y prepararnos para todo lo que nos\nespera.\nNoche en Pekín."
      },
      {
            "id": "cn-day-2",
            "tripId": "trip-china-2027",
            "dayNumber": 2,
            "title": "DÍA 2- TESOROS CULTURALES DE PEKÍN (D/A)",
            "description": "Después del desayuno, comenzaremos a descubrir algunos de los\nlugares más emblemáticos de la capital china. Visitaremos la\nimponente Plaza de Tiananmén y recorreremos la majestuosa\nCiudad Prohibida, antiguo hogar de los emperadores y uno de los\ncomplejos palaciegos más impresionantes del mundo.\nLuego subiremos al Parque Jingshan, desde donde disfrutaremos\nde una espectacular vista panorámica de la Ciudad Prohibida. Tras\nel almuerzo, nos adentraremos en los tradicionales hutongs de\nPekín, paseando por la animada calle Nanluoguxiang, repleta de\nhistoria, tiendas y cafeterías con mucho encanto.\nPara completar la experiencia, visitaremos una casa de té\ntradicional, donde conoceremos una de las costumbres más\nrepresentativas de la cultura china.\nAl finalizar la jornada regresaremos al hotel. Quienes lo deseen\npodrán aprovechar la noche para disfrutar de un espectáculo típico\no degustar el famoso pato laqueado de Pekín.\nNoche en Pekín."
      },
      {
            "id": "cn-day-3",
            "tripId": "trip-china-2027",
            "dayNumber": 3,
            "title": "DÍA 3 - EXPLORANDO LA GRAN MURALLA Y",
            "description": "LOS ICONOS MODERNOS DE PEKÍN (D/A)\nDespués del desayuno viviremos uno de los momentos más\nesperados del viaje: la visita a la imponente Gran Muralla China, una\nde las maravillas del mundo y símbolo de la historia del país.\nPodremos recorrer parte de este increíble monumento a pie o, si lo\npreferimos, subir en teleférico para disfrutar de vistas panorámicas\ninolvidables.\nDe regreso a Pekín haremos una parada en un taller de tallado en\njade, donde conoceremos el trabajo artesanal de una de las piedras\nmás valoradas de la cultura china.\nAntes de regresar al hotel, realizaremos una parada para fotografiar\ndos de los íconos más modernos de la ciudad: el Estadio Nacional,\nconocido como el Nido de Pájaro, y el Cubo de Agua, construidos\npara los Juegos Olímpicos de 2008.\nNoche en Pekín."
      },
      {
            "id": "cn-day-4",
            "tripId": "trip-china-2027",
            "dayNumber": 4,
            "title": "DÍA 4 - PEKÍN - XIAN EN TREN DE ALTA",
            "description": "VELOCIDAD (D/A)\nHoy tendremos el día libre para descubrir Tokio a nuestro propio ritmo.\nSerá la oportunidad perfecta para recorrer sus calles, hacer compras,\nvisitar algún museo, conocer cafeterías tradicionales o simplemente\ndejarnos sorprender por los rincones únicos de esta fascinante ciudad.\nCada una podrá vivir Tokio a su manera, disfrutando de esos pequeños\nmomentos que hacen que un viaje se vuelva verdaderamente\ninolvidable.\nAl finalizar el día, nos reuniremos para continuar juntas nuestra aventura\nrumbo a Kioto, la ciudad donde nos espera la esencia más tradicional\nde Japón."
      },
      {
            "id": "cn-day-5",
            "tripId": "trip-china-2027",
            "dayNumber": 5,
            "title": "DÍA 5 - DISFRUTAR DE LOS TESOROS",
            "description": "ETERNOS DE XI'AN (D/A)\nDespués del desayuno visitaremos uno de los grandes tesoros de\nChina: los impresionantes Guerreros de Terracota, una de las\nmaravillas arqueológicas más importantes del mundo. Allí\nconoceremos la historia de este increíble ejército de miles de figuras\nque protegía la tumba del primer emperador chino.\nTambién tendremos la oportunidad de descubrir el arte de la\ncerámica en un taller tradicional, donde veremos cómo se elaboran\nestas famosas figuras.\nPor la tarde recorreremos el emblemático Campanario de Xi'an y\nvisitaremos el histórico Patio de Gao, donde conoceremos antiguas\ntradiciones chinas como el recorte de papel y el teatro de sombras.\nPara finalizar el día pasearemos por el animado Barrio Musulmán, un\nlugar ideal para recorrer sus mercados, probar la gastronomía local y\ndisfrutar de una de las zonas más auténticas de la ciudad.\nAl regresar al hotel, quienes lo deseen podrán asistir al espectacular\nShow de la Dinastía Tang, una experiencia opcional que revive la\ngrandeza de la antigua China.\nNoche en Xi'an."
      },
      {
            "id": "cn-day-6",
            "tripId": "trip-china-2027",
            "dayNumber": 6,
            "title": "DÍA 6 - XIAN VUELA A GUILIN (B/L) - VUELO",
            "description": "INCLUIDO\nDespués del desayuno disfrutaremos de un recorrido por algunos de\nlos lugares más representativos de Xi'an. Visitaremos la antigua\nMuralla de la Ciudad, uno de los sistemas defensivos mejor\nconservados de China, y conoceremos la elegante Pagoda del Gran\nGanso Salvaje junto a la Plaza Norte, dos verdaderos símbolos de la\nciudad.\nLuego del almuerzo, nos dirigiremos al Mausoleo de Hanyang,\nconsiderado uno de los museos arqueológicos más importantes del\npaís, donde descubriremos fascinantes vestigios de la antigua China.\nMás tarde tomaremos nuestro vuelo hacia Guilin, una ciudad famosa\npor sus paisajes de montañas kársticas y ríos de extraordinaria\nbelleza. Al llegar, nos trasladaremos al hotel para descansar y\nprepararnos para seguir descubriendo este increíble destino.\nNoche en Guilin."
      },
      {
            "id": "cn-day-7",
            "tripId": "trip-china-2027",
            "dayNumber": 7,
            "title": "DÍA 7 - AVENTURA EN LAS TERRAZAS DE",
            "description": "LONGJI Y EL PUEBLO MINORITARIO DE\nGUILIN (D/A)\nDespués del desayuno nos dirigiremos hacia una de las postales más\nimpresionantes de China: las famosas Terrazas de Arroz de Longji,\ntambién conocidas como la Espina Dorsal del Dragón.\nTras una breve caminata, contemplaremos este increíble paisaje\nmodelado durante más de 700 años por las comunidades locales,\nque transformaron las montañas en un verdadero espectáculo de\nnaturaleza e ingeniería.\nAlmorzaremos en un restaurante tradicional de la zona y luego\nregresaremos a Guilin. Quienes lo deseen podrán disfrutar de un\npaseo opcional en crucero nocturno por los Cuatro Lagos, una\nexperiencia ideal para admirar la ciudad iluminada desde el agua.\nNoche en Guilin."
      },
      {
            "id": "cn-day-8",
            "tripId": "trip-china-2027",
            "dayNumber": 8,
            "title": "DÍA 8 - CRUCERO POR EL RÍO LI DE GUILIN A",
            "description": "YANGSHUO (D/A)\nDespués del desayuno viviremos una de las experiencias más\ninolvidables del viaje: un crucero por el río Li, considerado uno de\nlos paisajes más espectaculares de China.\nMientras navegamos disfrutaremos de un almuerzo buffet a bordo y\ncontemplaremos un escenario de montañas kársticas, pequeños\npueblos y exuberante vegetación que parece sacado de un cuento.\nSerá un recorrido perfecto para relajarnos, tomar fotografías\nincreíbles y disfrutar de la belleza natural de la región.\nAl llegar a Yangshuo tendremos tiempo para pasear por la famosa\nCalle del Oeste, uno de los rincones con más encanto de la ciudad,\nideal para recorrer sus tiendas, cafés y mercados locales.\nAl finalizar la tarde regresaremos a Guilin.\nNoche en Guilin."
      },
      {
            "id": "cn-day-9",
            "tripId": "trip-china-2027",
            "dayNumber": 9,
            "title": "DÍA 9 - VUELO DE GUILIN A SHANGHAI (B/L) -",
            "description": "VUELO INCLUIDO\nDespués del desayuno comenzaremos el día visitando la\nemblemática Colina de la Trompa de Elefante, el símbolo más\nrepresentativo de Guilin, cuya curiosa forma recuerda a un elefante\nbebiendo agua del río Li.\nContinuaremos con un paseo por la ribera del río Li y el lago Shanhu,\ndonde admiraremos las elegantes Pagodas Gemelas de Oro y Plata,\nuno de los paisajes más fotografiados de la ciudad.\nMás tarde conoceremos la sorprendente Cueva de la Flauta de Caña,\nun fascinante mundo subterráneo lleno de estalactitas, estalagmitas\ny coloridas formaciones rocosas que crean un escenario realmente\nmágico.\nDespués del almuerzo nos trasladaremos al aeropuerto para tomar el\nvuelo hacia Shanghái. Al llegar, nos recibirá nuestro guía para\nacompañarnos al hotel y comenzar a descubrir una de las ciudades\nmás modernas y vibrantes de China.\nNoche en Shanghái."
      },
      {
            "id": "cn-day-10",
            "tripId": "trip-china-2027",
            "dayNumber": 10,
            "title": "DÍA 10 - DESCUBRE EL ENCANTO DE",
            "description": "SHANGHAI (D/A)\nDespués del desayuno comenzaremos a descubrir Shanghái, una\nciudad donde la tradición y la modernidad conviven en perfecta\narmonía. Recorreremos el encantador casco histórico, caminando por\nlas tradicionales calles de Shikumen y el famoso Bund, el elegante\npaseo costero que ofrece algunas de las mejores vistas del imponente\nskyline de la ciudad.\nLuego visitaremos el hermoso Jardín Yuyuan, un oasis de\ntranquilidad en pleno corazón de Shanghái, donde conoceremos la\nesencia de los jardines tradicionales chinos. Después del almuerzo\ncontinuaremos hacia el Templo del Buda de Jade, uno de los lugares\nmás sagrados y representativos de la ciudad.\nTambién visitaremos el Museo de la Seda y nos dirigiremos al\nmoderno distrito financiero de Lujiazui, donde subiremos a la\nimpresionante Torre de Shanghái para disfrutar de una vista\npanorámica inolvidable de la ciudad.\nAl finalizar la jornada regresaremos al hotel. Quienes lo deseen\npodrán disfrutar por la noche del famoso espectáculo acrobático ERA,\nuna de las experiencias más recomendadas de Shanghái.\nNoche en Shanghái."
      },
      {
            "id": "cn-day-11",
            "tripId": "trip-china-2027",
            "dayNumber": 11,
            "title": "DÍA 11 - HASTA PRONTO, CHINA (D)",
            "description": "Después del desayuno tendremos tiempo libre para disfrutar de\nnuestras últimas horas en Shanghái, realizar algunas compras o\nsimplemente recorrer la ciudad antes de despedirnos de este\nincreíble destino.\nA la hora indicada nos trasladaremos al aeropuerto para tomar el\nvuelo de regreso. Quienes lo deseen podrán optar por llegar en el\nmoderno tren Maglev, una de las experiencias más curiosas de\nShanghái, o realizar el traslado tradicional al aeropuerto.\nNos despediremos de China con la valija llena de recuerdos y la\nemoción de haber descubierto una cultura fascinante, ciudades\nmilenarias y paisajes que quedarán para siempre en nuestra memoria.\nFin de nuestros servicios. ✨"
      }
]
  }
];

export const initialLeads: Lead[] = [
  {
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
      {
        id: 'note-001',
        leadId: 'lead-001',
        content: 'La llamé el 05/09. Está interesada pero debe confirmar vacaciones en su trabajo.',
        createdAt: '2026-09-05T14:30:00Z'
      }
    ]
  },
  {
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
      {
        id: 'note-002',
        leadId: 'lead-002',
        content: 'Le envié el PDF del itinerario por WhatsApp. Quedamos en hablar el lunes.',
        createdAt: '2026-09-04T18:00:00Z'
      }
    ]
  },
  {
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
      {
        id: 'note-003',
        leadId: 'lead-003',
        content: 'Quiere reservar dos lugares. Se le envió información de seña.',
        createdAt: '2026-09-03T16:00:00Z'
      }
    ]
  },
  {
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
      {
        id: 'note-004',
        leadId: 'lead-004',
        content: 'Le aclaré que el ritmo es relajado (intensidad baja) y que hay tiempo libre para descansar.',
        createdAt: '2026-09-03T10:30:00Z'
      }
    ]
  },
  {
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
      {
        id: 'note-005',
        leadId: 'lead-005',
        content: 'Agendada llamada para resolver dudas de visado y pasaporte.',
        createdAt: '2026-09-02T11:00:00Z'
      }
    ]
  }
];

export const initialReservations: Reservation[] = [
  {
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
  }
];
