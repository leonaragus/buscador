import fs from 'fs';
import path from 'path';

// Deterministic Pseudo-Random Generator
let seed = 42;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

// All Jurisdictions & Key Urban Hubs
interface Hub {
  provinceId: string;
  neighborhood: string;
  baseLat: number;
  baseLng: number;
  prefix: string;
}

const HUBS: Hub[] = [
  // CABA
  { provinceId: 'caba', neighborhood: 'Palermo', baseLat: -34.5888, baseLng: -58.4092, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Recoleta', baseLat: -34.5875, baseLng: -58.3974, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Belgrano', baseLat: -34.5621, baseLng: -58.4563, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Caballito', baseLat: -34.6186, baseLng: -58.4429, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Almagro', baseLat: -34.6102, baseLng: -58.4215, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Flores', baseLat: -34.6284, baseLng: -58.4632, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Villa Urquiza', baseLat: -34.5714, baseLng: -58.4902, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Villa Devoto', baseLat: -34.5996, baseLng: -58.5126, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'San Telmo', baseLat: -34.6212, baseLng: -58.3732, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Balvanera / Abasto', baseLat: -34.6094, baseLng: -58.4042, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Colegiales', baseLat: -34.5756, baseLng: -58.4475, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Villa Crespo', baseLat: -34.5986, baseLng: -58.4411, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Barracas', baseLat: -34.6433, baseLng: -58.3768, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Mataderos', baseLat: -34.6548, baseLng: -58.5029, prefix: '+54911' },
  { provinceId: 'caba', neighborhood: 'Chacarita', baseLat: -34.5871, baseLng: -58.4542, prefix: '+54911' },

  // GBA Norte
  { provinceId: 'buenos-aires', neighborhood: 'San Isidro (GBA)', baseLat: -34.4716, baseLng: -58.5284, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Vicente López (GBA)', baseLat: -34.5262, baseLng: -58.4746, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Olivos (GBA)', baseLat: -34.5098, baseLng: -58.4891, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Tigre (GBA)', baseLat: -34.4251, baseLng: -58.5796, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'San Fernando (GBA)', baseLat: -34.4431, baseLng: -58.5614, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Pilar (GBA)', baseLat: -34.4589, baseLng: -58.9142, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Escobar (GBA)', baseLat: -34.3491, baseLng: -58.7963, prefix: '+54911' },

  // GBA Sur
  { provinceId: 'buenos-aires', neighborhood: 'Quilmes (GBA)', baseLat: -34.7242, baseLng: -58.2526, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Lanús (GBA)', baseLat: -34.7042, baseLng: -58.3912, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Lomas de Zamora (GBA)', baseLat: -34.7608, baseLng: -58.4005, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Avellaneda (GBA)', baseLat: -34.6611, baseLng: -58.3664, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Adrogué / Alte Brown (GBA)', baseLat: -34.7981, baseLng: -58.3918, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Berazategui (GBA)', baseLat: -34.7634, baseLng: -58.2104, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Banfield (GBA)', baseLat: -34.7431, baseLng: -58.3941, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Florencio Varela (GBA)', baseLat: -34.7966, baseLng: -58.2764, prefix: '+54911' },

  // GBA Oeste
  { provinceId: 'buenos-aires', neighborhood: 'Morón (GBA)', baseLat: -34.6534, baseLng: -58.6198, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Ramos Mejía (GBA)', baseLat: -34.6402, baseLng: -58.5630, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'San Justo (GBA)', baseLat: -34.6781, baseLng: -58.5562, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'San Martín (GBA)', baseLat: -34.5768, baseLng: -58.5372, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Caseros (GBA)', baseLat: -34.6062, baseLng: -58.5645, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Castelar (GBA)', baseLat: -34.6565, baseLng: -58.6433, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Merlo (GBA)', baseLat: -34.6654, baseLng: -58.7291, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Moreno (GBA)', baseLat: -34.6514, baseLng: -58.7909, prefix: '+54911' },
  { provinceId: 'buenos-aires', neighborhood: 'Ituzaingó (GBA)', baseLat: -34.6588, baseLng: -58.6728, prefix: '+54911' },

  // Buenos Aires Interior
  { provinceId: 'buenos-aires', neighborhood: 'La Plata', baseLat: -34.9214, baseLng: -57.9545, prefix: '+549221' },
  { provinceId: 'buenos-aires', neighborhood: 'Mar del Plata Centro', baseLat: -38.0055, baseLng: -57.5426, prefix: '+549223' },
  { provinceId: 'buenos-aires', neighborhood: 'Mar del Plata Güemes', baseLat: -38.0132, baseLng: -57.5489, prefix: '+549223' },
  { provinceId: 'buenos-aires', neighborhood: 'Bahía Blanca', baseLat: -38.7183, baseLng: -62.2663, prefix: '+549291' },
  { provinceId: 'buenos-aires', neighborhood: 'Tandil', baseLat: -37.3217, baseLng: -59.1332, prefix: '+549249' },
  { provinceId: 'buenos-aires', neighborhood: 'San Nicolás de los Arroyos', baseLat: -33.3333, baseLng: -60.2167, prefix: '+549336' },
  { provinceId: 'buenos-aires', neighborhood: 'Pergamino', baseLat: -33.8906, baseLng: -60.5739, prefix: '+5492477' },
  { provinceId: 'buenos-aires', neighborhood: 'Junín', baseLat: -34.5838, baseLng: -60.9433, prefix: '+549236' },
  { provinceId: 'buenos-aires', neighborhood: 'Olavarría', baseLat: -36.8927, baseLng: -60.3225, prefix: '+5492284' },
  { provinceId: 'buenos-aires', neighborhood: 'Zárate / Campana', baseLat: -34.0983, baseLng: -59.0287, prefix: '+5493487' },

  // Córdoba
  { provinceId: 'cordoba', neighborhood: 'Córdoba Nueva Córdoba', baseLat: -31.4287, baseLng: -64.1865, prefix: '+549351' },
  { provinceId: 'cordoba', neighborhood: 'Córdoba Centro', baseLat: -31.4167, baseLng: -64.1833, prefix: '+549351' },
  { provinceId: 'cordoba', neighborhood: 'Córdoba Cerro de las Rosas', baseLat: -31.3789, baseLng: -64.2412, prefix: '+549351' },
  { provinceId: 'cordoba', neighborhood: 'Córdoba Alta Córdoba', baseLat: -31.3986, baseLng: -64.1802, prefix: '+549351' },
  { provinceId: 'cordoba', neighborhood: 'Córdoba Güemes', baseLat: -31.4244, baseLng: -64.1912, prefix: '+549351' },
  { provinceId: 'cordoba', neighborhood: 'Río Cuarto', baseLat: -33.1232, baseLng: -64.3493, prefix: '+549358' },
  { provinceId: 'cordoba', neighborhood: 'Villa Carlos Paz', baseLat: -31.4241, baseLng: -64.4978, prefix: '+5493541' },
  { provinceId: 'cordoba', neighborhood: 'Villa María', baseLat: -32.4075, baseLng: -63.2403, prefix: '+549353' },
  { provinceId: 'cordoba', neighborhood: 'San Francisco', baseLat: -31.4333, baseLng: -62.0833, prefix: '+5493564' },

  // Santa Fe
  { provinceId: 'santa-fe', neighborhood: 'Rosario Centro', baseLat: -32.9468, baseLng: -60.6393, prefix: '+549341' },
  { provinceId: 'santa-fe', neighborhood: 'Rosario Pichincha', baseLat: -32.9351, baseLng: -60.6558, prefix: '+549341' },
  { provinceId: 'santa-fe', neighborhood: 'Rosario Echesortu', baseLat: -32.9498, baseLng: -60.6721, prefix: '+549341' },
  { provinceId: 'santa-fe', neighborhood: 'Santa Fe Capital', baseLat: -31.6333, baseLng: -60.7000, prefix: '+549342' },
  { provinceId: 'santa-fe', neighborhood: 'Rafaela', baseLat: -31.2503, baseLng: -61.4867, prefix: '+5493492' },
  { provinceId: 'santa-fe', neighborhood: 'Venado Tuerto', baseLat: -33.7456, baseLng: -61.9688, prefix: '+5493462' },
  { provinceId: 'santa-fe', neighborhood: 'Reconquista', baseLat: -29.1442, baseLng: -59.6467, prefix: '+5493482' },

  // Mendoza
  { provinceId: 'mendoza', neighborhood: 'Mendoza Capital', baseLat: -32.8894, baseLng: -68.8458, prefix: '+549261' },
  { provinceId: 'mendoza', neighborhood: 'Godoy Cruz', baseLat: -32.9234, baseLng: -68.8504, prefix: '+549261' },
  { provinceId: 'mendoza', neighborhood: 'Guaymallén', baseLat: -32.8953, baseLng: -68.8033, prefix: '+549261' },
  { provinceId: 'mendoza', neighborhood: 'San Rafael', baseLat: -34.6177, baseLng: -68.3301, prefix: '+549260' },
  { provinceId: 'mendoza', neighborhood: 'Maipú', baseLat: -32.9798, baseLng: -68.7844, prefix: '+549261' },

  // Tucumán
  { provinceId: 'tucuman', neighborhood: 'San Miguel de Tucumán Centro', baseLat: -26.8241, baseLng: -65.2226, prefix: '+549381' },
  { provinceId: 'tucuman', neighborhood: 'Yerba Buena', baseLat: -26.8164, baseLng: -65.2952, prefix: '+549381' },
  { provinceId: 'tucuman', neighborhood: 'Concepción (Tucumán)', baseLat: -27.3375, baseLng: -65.5931, prefix: '+5493865' },

  // Salta
  { provinceId: 'salta', neighborhood: 'Salta Capital', baseLat: -24.7859, baseLng: -65.4117, prefix: '+549387' },
  { provinceId: 'salta', neighborhood: 'San Lorenzo (Salta)', baseLat: -24.7333, baseLng: -65.4833, prefix: '+549387' },
  { provinceId: 'salta', neighborhood: 'San Ramón de la Nueva Orán', baseLat: -23.1322, baseLng: -64.3267, prefix: '+5493878' },

  // Entre Ríos
  { provinceId: 'entre-rios', neighborhood: 'Paraná Centro', baseLat: -31.7331, baseLng: -60.5238, prefix: '+549343' },
  { provinceId: 'entre-rios', neighborhood: 'Concordia', baseLat: -31.3929, baseLng: -58.0209, prefix: '+549345' },
  { provinceId: 'entre-rios', neighborhood: 'Gualeguaychú', baseLat: -33.0118, baseLng: -58.5172, prefix: '+5493446' },

  // Misiones
  { provinceId: 'misiones', neighborhood: 'Posadas Centro', baseLat: -27.3671, baseLng: -55.8961, prefix: '+549376' },
  { provinceId: 'misiones', neighborhood: 'Oberá', baseLat: -27.4871, baseLng: -55.1199, prefix: '+5493755' },
  { provinceId: 'misiones', neighborhood: 'Puerto Iguazú', baseLat: -25.5991, baseLng: -54.5735, prefix: '+5493757' },

  // Chaco
  { provinceId: 'chaco', neighborhood: 'Resistencia Centro', baseLat: -27.4514, baseLng: -58.9867, prefix: '+549362' },
  { provinceId: 'chaco', neighborhood: 'Presidencia Roque Sáenz Peña', baseLat: -26.7852, baseLng: -60.4388, prefix: '+549364' },

  // Corrientes
  { provinceId: 'corrientes', neighborhood: 'Corrientes Capital', baseLat: -27.4691, baseLng: -58.8306, prefix: '+549379' },
  { provinceId: 'corrientes', neighborhood: 'Goya', baseLat: -29.1444, baseLng: -59.2639, prefix: '+5493777' },

  // Santiago del Estero
  { provinceId: 'santiago-del-estero', neighborhood: 'Santiago del Estero Capital', baseLat: -27.7834, baseLng: -64.2642, prefix: '+549385' },
  { provinceId: 'santiago-del-estero', neighborhood: 'La Banda', baseLat: -27.7333, baseLng: -64.2500, prefix: '+549385' },

  // San Juan
  { provinceId: 'san-juan', neighborhood: 'San Juan Capital', baseLat: -31.5375, baseLng: -68.5364, prefix: '+549264' },
  { provinceId: 'san-juan', neighborhood: 'Rawson (San Juan)', baseLat: -31.5647, baseLng: -68.5244, prefix: '+549264' },

  // Jujuy
  { provinceId: 'jujuy', neighborhood: 'San Salvador de Jujuy', baseLat: -24.1858, baseLng: -65.2995, prefix: '+549388' },
  { provinceId: 'jujuy', neighborhood: 'Palpalá', baseLat: -24.2564, baseLng: -65.2119, prefix: '+549388' },

  // Río Negro
  { provinceId: 'rio-negro', neighborhood: 'San Carlos de Bariloche', baseLat: -41.1343, baseLng: -71.3085, prefix: '+549294' },
  { provinceId: 'rio-negro', neighborhood: 'General Roca', baseLat: -39.0333, baseLng: -67.5833, prefix: '+549298' },
  { provinceId: 'rio-negro', neighborhood: 'Cipolletti', baseLat: -38.9339, baseLng: -67.9903, prefix: '+549299' },
  { provinceId: 'rio-negro', neighborhood: 'Viedma', baseLat: -40.8135, baseLng: -62.9967, prefix: '+5492920' },

  // Neuquén
  { provinceId: 'neuquen', neighborhood: 'Neuquén Capital', baseLat: -38.9516, baseLng: -68.0591, prefix: '+549299' },
  { provinceId: 'neuquen', neighborhood: 'Plottier', baseLat: -38.9500, baseLng: -68.2333, prefix: '+549299' },
  { provinceId: 'neuquen', neighborhood: 'San Martín de los Andes', baseLat: -40.1581, baseLng: -71.3533, prefix: '+5492972' },

  // Chubut
  { provinceId: 'chubut', neighborhood: 'Comodoro Rivadavia', baseLat: -45.8647, baseLng: -67.4966, prefix: '+549297' },
  { provinceId: 'chubut', neighborhood: 'Puerto Madryn', baseLat: -42.7692, baseLng: -65.0385, prefix: '+549280' },
  { provinceId: 'chubut', neighborhood: 'Trelew', baseLat: -43.2490, baseLng: -65.3051, prefix: '+549280' },

  // San Luis
  { provinceId: 'san-luis', neighborhood: 'San Luis Capital', baseLat: -33.3017, baseLng: -66.3378, prefix: '+549266' },
  { provinceId: 'san-luis', neighborhood: 'Villa Mercedes', baseLat: -33.6758, baseLng: -65.4578, prefix: '+5492657' },
  { provinceId: 'san-luis', neighborhood: 'Merlo (San Luis)', baseLat: -32.3428, baseLng: -65.0136, prefix: '+5492656' },

  // Catamarca
  { provinceId: 'catamarca', neighborhood: 'San Fernando del Valle de Catamarca', baseLat: -28.4696, baseLng: -65.7852, prefix: '+549383' },

  // La Rioja
  { provinceId: 'la-rioja', neighborhood: 'La Rioja Capital', baseLat: -29.4110, baseLng: -66.8507, prefix: '+549380' },
  { provinceId: 'la-rioja', neighborhood: 'Chilecito', baseLat: -29.1619, baseLng: -66.9814, prefix: '+5493825' },

  // La Pampa
  { provinceId: 'la-pampa', neighborhood: 'Santa Rosa', baseLat: -36.6167, baseLng: -64.2833, prefix: '+5492954' },
  { provinceId: 'la-pampa', neighborhood: 'General Pico', baseLat: -35.6566, baseLng: -63.7568, prefix: '+5492302' },

  // Santa Cruz
  { provinceId: 'santa-cruz', neighborhood: 'Río Gallegos', baseLat: -51.6226, baseLng: -69.2181, prefix: '+5492966' },
  { provinceId: 'santa-cruz', neighborhood: 'Caleta Olivia', baseLat: -46.4394, baseLng: -67.5281, prefix: '+549297' },
  { provinceId: 'santa-cruz', neighborhood: 'El Calafate', baseLat: -50.3400, baseLng: -72.2700, prefix: '+5492902' },

  // Tierra del Fuego
  { provinceId: 'tierra-del-fuego', neighborhood: 'Ushuaia', baseLat: -54.8019, baseLng: -68.3030, prefix: '+5492901' },
  { provinceId: 'tierra-del-fuego', neighborhood: 'Río Grande', baseLat: -53.7877, baseLng: -67.7094, prefix: '+5492964' },

  // Formosa
  { provinceId: 'formosa', neighborhood: 'Formosa Capital', baseLat: -26.1775, baseLng: -58.1781, prefix: '+549370' },
  { provinceId: 'formosa', neighborhood: 'Clorinda', baseLat: -25.2848, baseLng: -57.7185, prefix: '+5493718' }
];

const STREET_NAMES = [
  'Av. San Martín', 'Av. Belgrano', 'Av. Rivadavia', 'Av. 9 de Julio', 'Av. Mitre',
  'Av. Hipólito Yrigoyen', 'Calle Sarmiento', 'Calle 25 de Mayo', 'Av. Colón',
  'Av. Independencia', 'Av. Pellegrini', 'Av. Las Heras', 'Calle San Lorenzo',
  'Av. Maipú', 'Calle Urquiza', 'Calle Alberdi', 'Av. Roca', 'Calle España',
  'Av. Santa Fe', 'Av. Corrientes', 'Calle Córdoba', 'Calle Güemes', 'Av. Libertad',
  'Calle Moreno', 'Calle Lavalle', 'Calle Balcarce', 'Av. Juan B. Justo', 'Av. Alvear'
];

interface CategoryArchetype {
  specialty: 'Tecnología' | 'Gastronomía' | 'Idiomas' | 'Arte y Diseño' | 'Oficios y Técnica' | 'Estética y Bienestar';
  typeNames: string[];
  namePrefixes: string[];
  nameSuffixes: string[];
  courseBundles: string[][];
  certs: ('Oficial' | 'Propia' | 'Sin Certificación')[];
  modalities: ('Presencial' | 'Online' | 'Híbrido')[];
  nationalCertDefault: 'Sí' | 'No';
}

const CATEGORY_ARCHETYPES: CategoryArchetype[] = [
  // 1. DANZA Y BAILE (Arte y Diseño) - requested by user!
  {
    specialty: 'Arte y Diseño',
    typeNames: [
      'Estudio de Danzas & Tango', 'Academia de Ritmos Latinos y Salsa',
      'Escuela de Danzas Folklóricas y Malambo', 'Estudio de Danza Contemporánea y Ballet',
      'Academia de Ritmos Urbanos & Hip Hop', 'Estudio de Danza Flamenca y Española',
      'Centro de Expresión Corporal y Danza Jazz', 'Estudio de Pole Dance & Acrobacia en Telas',
      'Escuela de Bachata Sensual & Danza Social', 'Atelier de Danza y Comedia Musical'
    ],
    namePrefixes: [
      'Estudio de Baile', 'Academia Ritmo & Pasión', 'Espacio Danza Viva', 'Ballet Studio',
      'Atelier del Movimiento', 'Escuela de Baile Crearte', 'Centro Danzario Argentino',
      'Studio Danzarte', 'Academia Compás y Compás', 'Estudio Expresión Corporal',
      'La Casona de la Danza', 'Laboratorio de Danza Urbana', 'Escuela Sentir Danza'
    ],
    nameSuffixes: [
      'Danzas', 'Danzarte', 'Studio', 'Ritmos', 'Baile & Arte', 'Cultura', 'Tango & Ritmos',
      'Urban Dance', 'Movimiento Libre', 'Escénica'
    ],
    courseBundles: [
      ['Tango Salón, Milonga y Canyengue (Abrazo Cerrado)', 'Técnica de Giros, Sacadas y Boleos para Parejas', 'Musicalidad y Práctica Guiada de Milonga'],
      ['Salsa Cubana y Rueda de Casino (Nivel Inicial y Medio)', 'Bachata Sensual: Ondas, Guías y Disociación Corporal', 'Mambo y Ritmos Caribeños de Salón'],
      ['Danzas Nativas y Folklore Argentino (Zamba, Chacarera, Gato)', 'Malambo Sureño y Norteño: Zapateo y Bombo Legüero', 'Danzas Tradicionales del Litoral (Chamamé y Rasguido Doble)'],
      ['Danza Clásica y Ballet para Adultos Principiantes', 'Barre Fitness y Fortalecimiento Postural', 'Puntas y Elasticidad de Empeine'],
      ['Ritmos Urbanos: Hip Hop, Locking y Popping', 'Reggaeton Fusión y Street Jazz Coreográfico', 'Dancehall Jamaiquino y K-Pop Cover Dance'],
      ['Danza Contemporánea y Técnicas de Release', 'Improvisación por Contacto (Contact Improvisation)', 'Composición Coreográfica en Suelo'],
      ['Flamenco Tradicional: Sevillanas, Alegrías y Bulerías', 'Técnica de Zapateado, Braceo y Castañuelas', 'Compás y Cante Aplicado a la Danza'],
      ['Pole Dance Deportivo y Pole Exotic', 'Acrobacia Aérea en Telas y Aro (Lira)', 'Flexibilidad Extrema y Contorsión Aplicada'],
      ['Danza Árabe Tradicional (Raks Sharki) y Derbake', 'Danza Fusión Tribal y Velos', 'Disociación Pélvica y Crótalos']
    ],
    certs: ['Propia', 'Oficial', 'Propia', 'Sin Certificación'],
    modalities: ['Presencial', 'Presencial', 'Híbrido'],
    nationalCertDefault: 'No'
  },

  // 2. MECÁNICA AUTOMOTRIZ, MOTOS Y DETALLADO (Oficios y Técnica) - requested by user!
  {
    specialty: 'Oficios y Técnica',
    typeNames: [
      'Taller Escuela de Mecánica Automotriz', 'Instituto de Inyección Electrónica y Diagnóstico',
      'Centro de Capacitación en Mecánica de Motos', 'Escuela de Chapería, Pintura y Sacabollos',
      'Academia de Cerrajería Automotor y Transponders', 'Taller de Cajas Automáticas y Transmisiones',
      'Instituto de Electricidad del Automotor y Audio', 'Centro Técnico de Car Detailing y Pulido',
      'Escuela de Mecánica Diésel Common Rail', 'Taller de Climatización y Aire Acondicionado Automotriz'
    ],
    namePrefixes: [
      'Instituto Tecnológico Automotriz', 'Taller Escuela Motores del Sur', 'Academia de Mecánica',
      'Centro de Formación Mecánica', 'Escuela de Oficios Motores', 'Instituto Profesional Automecánica',
      'Centro Técnico del Automotor', 'Escuela de Diagnóstico Automotriz', 'Laboratorio Mecánico',
      'Taller Integral de Capacitación Automotor', 'Instituto Técnico de Motos y Autos'
    ],
    nameSuffixes: [
      'Motorsport', 'Autotécnica', 'Mecánica Pro', 'Inyección & Scanner', 'Técnica Automotriz',
      'Service & Formación', 'Motores', 'Ruedas & Potencia', 'Diagnóstico Integral'
    ],
    courseBundles: [
      ['Mecánica Integral del Automotor Nafta y Diésel', 'Desarme, Medición y Rectificación de Bloque y Cigüeñal', 'Sistemas de Distribución, Frenos Hidráulicos y Suspensión'],
      ['Inyección Electrónica Nafta Multimarca con Scanner OBD2', 'Uso de Osciloscopio Automotriz y Sensores Hall/Inductivos', 'Limpieza y Diagnóstico de Inyectores por Ultrasonido'],
      ['Mecánica de Motos 110cc a 250cc (Carburación y Encendido CDI)', 'Inyección Electrónica en Motocicletas Modernas', 'Transmisión por Cadena, Cardán y Reparación de Cajas de Cambio'],
      ['Chapería Tradicional, Soldadura por Punto y Bancada de Estiramiento', 'Pintura Automotriz Bicapa y Tricapa al Horno', 'Sacabollos Artesanal DSP (Desabollado sin Pintar)'],
      ['Cerrajería del Automotor y Lectura de Memorias EEPROM', 'Clonación de Llaves con Transponder y Mandos a Distancia', 'Desbloqueo de Inmovilizadores y Computadoras ECU'],
      ['Reparación y Mantenimiento de Cajas Automáticas Convencionales y CVT', 'Cajas de Doble Embrague (DSG/Powershift)', 'Cambio de Fluido ATF por Diálisis'],
      ['Electricidad Automotor: Motores de Arranque y Alternadores', 'Instalación de Alarmas, Cierres Centralizados y Alza Cristales', 'Instalación de Audio Car y Sistemas de Navegación Multimedia'],
      ['Car Detailing: Corrección de Barniz y Pulido Profesional en Tres Pasos', 'Selladores Acrílicos y Cerámicos 9H de Larga Duración', 'Limpieza y Desinfección de Tapizados con Inyección y Extracción'],
      ['Aire Acondicionado Automotor: Carga de Gas R134a y Detección de Fugas con Nitrógeno', 'Reparación de Compresores y Condensadores', 'Limpieza de Circuitos y Sustitución de Filtros Antipolen']
    ],
    certs: ['Oficial', 'Propia', 'Propia', 'Oficial'],
    modalities: ['Presencial', 'Híbrido', 'Presencial'],
    nationalCertDefault: 'Sí'
  },

  // 3. OFICIOS TÉCNICOS: REFRIGERACIÓN, ELECTRICIDAD, GAS, SOLDADURA, CARPINTERÍA (Oficios y Técnica)
  {
    specialty: 'Oficios y Técnica',
    typeNames: [
      'Instituto de Refrigeración y Climatización', 'Centro de Electricistas e Instaladores Industriales',
      'Escuela de Gasistas Matriculados y Plomería', 'Academia de Soldadura y Herrería de Obra',
      'Taller Escuela de Carpintería y Muebles en Melamina', 'Centro Técnico de Reparación de Celulares y PC',
      'Instituto de Energía Solar Fotovoltaica', 'Escuela de Construcción en Seco Durlock & Steel Framing',
      'Centro de Cerrajería Residencial y Electrónica', 'Taller de Seguridad Electrónica y Cámaras CCTV'
    ],
    namePrefixes: [
      'Centro de Formación Técnica', 'Instituto de Oficios Prácticos', 'Escuela Tecnológica de Oficios',
      'Academia Integral de Técnicos', 'Taller Escuela de Construcción', 'Centro Vocacional de Oficios',
      'Instituto Argentino de Técnicas Laborales', 'Escuela Superior de Soldadores y Técnicos',
      'Centro de Formación Profesional San Cayetano', 'Taller Vocacional del Oficio'
    ],
    nameSuffixes: [
      'Técnicas', 'Oficios Pro', 'Capacitación Laboral', 'Instaladores', 'Taller & Servicios',
      'Formación Técnica', 'Industrial', 'Oficios del Futuro'
    ],
    courseBundles: [
      ['Instalación y Service de Aires Acondicionados Split e Inverter', 'Refrigeración Familiar y Comercial: Heladeras y Freezers No Frost', 'Buenas Prácticas de Refrigeración y Gases Ecológicos R32/R410A'],
      ['Electricista Instalador Domiciliario Matriculado (Normas AEA)', 'Armado y Cableado de Tableros Eléctricos Industriales', 'Medición de Puesta a Tierra con Telurímetro y Protecciones Diferenciales'],
      ['Instalador Gasista Domiciliario de 2da y 3ra Categoría', 'Plomería Integral y Termofusión de Agua Fría/Caliente', 'Cálculo de Cañerías, Pruebas de Hermeticidad y Ventilación'],
      ['Soldadura por Electrodo Revestido (SMAW) en Posiciones 1G a 4G', 'Soldadura Semiautomática MIG-MAG para Chapas y Perfiles', 'Soldadura TIG de Alta Precisión para Acero Inoxidable y Aluminio'],
      ['Carpintería Integral en Maderas Macizas y Encastres Tradicionales', 'Diseño y Armado de Muebles de Cocina y Placares en Melamina', 'Uso Seguro de Sierra Circular, Tupí y Cepilladora de Banco'],
      ['Reparación Profesional de Teléfonos Celulares y Smartphones', 'Reemplazo de Pantallas Módulos y Pines de Carga Tipo C', 'Microsoldadura SMD y Reballing de Circuitos Integrados'],
      ['Instalador de Paneles Solares Fotovoltaicos On-Grid y Off-Grid', 'Dimensionamiento de Bancos de Baterías de Litio e Inversores', 'Montaje y Mantenimiento de Termotanques Solares para Agua Sanitaria'],
      ['Construcción en Seco con Placas de Yeso (Tabiques, Cielorrasos y Gargantas)', 'Introducción al Steel Framing: Estructura, Rigidización y Aislación Térmica', 'Colocación de Pisos Flotantes, Vinílicos y Revestimientos Texturados'],
      ['Instalación y Configuración de Cámaras de Seguridad CCTV e IP HD', 'Configuración de Servidores DVR/NVR y Acceso Remoto por Smartphone', 'Instalación de Alarmas Inalámbricas y Cercos Eléctricos Perimetrales']
    ],
    certs: ['Oficial', 'Propia', 'Oficial', 'Propia'],
    modalities: ['Presencial', 'Presencial', 'Híbrido'],
    nationalCertDefault: 'Sí'
  },

  // 4. ARTES, MÚSICA, CANTO, TEATRO Y FOTOGRAFÍA (Arte y Diseño)
  {
    specialty: 'Arte y Diseño',
    typeNames: [
      'Escuela de Música e Instrumentos', 'Estudio de Técnica Vocal y Canto',
      'Academia de Producción Musical & Sonido', 'Taller de Teatro, Actuación e Improvisación',
      'Escuela de Stand-Up y Oratoria Escénica', 'Taller de Cerámica y Torno Alfarero',
      'Estudio de Fotografía Digital e Iluminación', 'Atelier de Pintura, Óleo y Acuarela',
      'Instituto de Locución, Doblaje y Medios', 'Taller de Corte, Confección y Diseño Textil'
    ],
    namePrefixes: [
      'Espacio de Arte y Cultura', 'Escuela Creativa La Buhardilla', 'Estudio Melodía & Voz',
      'Taller El Ático del Arte', 'Academia de Expresión Escénica', 'Centro Cultural y Creativo',
      'Estudio En Clave de Sol', 'Atelier Pinceladas', 'Espacio Barro & Fuego',
      'Laboratorio Visual y Fotográfico', 'Escuela de Nuevas Voces'
    ],
    nameSuffixes: [
      'Artes', 'Creatividad', 'Estudio de Música', 'Atelier', 'Escénica', 'Espacio Cultural',
      'Producción Sonora', 'Fotografía', 'Teatro & Vida'
    ],
    courseBundles: [
      ['Guitarra Criolla y Eléctrica: Acordes, Escalas y Acompañamiento', 'Bajo Eléctrico y Batería: Groove, Técnica de Manos y Ritmos', 'Piano y Teclado: Lectura de Partituras y Armonía Popular'],
      ['Técnica Vocal Integral: Respiración Costodiafragmática y Afinación', 'Canto Popular, Rock y Folklore: Interpretación y Micrófono', 'Rehabilitación y Cuidado de la Voz para Cantantes y Docentes'],
      ['Producción Musical con Ableton Live y FL Studio en Home Studio', 'Técnicas de Grabación con Micrófonos Condenser y Placas de Audio', 'Mezcla y Masterización Digital con Plugins VST'],
      ['Iniciación al Teatro y Actuación para Jóvenes y Adultos', 'Improvisación Teatral, Juegos de Rol y Desinhibición', 'Construcción de Personajes Dramáticos y Monólogos'],
      ['Stand-Up Comedy: Estructura del Chiste, Remates y Monólogos Humorísticos', 'Oratoria Moderna, Lenguaje No Verbal y Manejo de Pánico Escénico', 'Storytelling y Pitch para Presentaciones de Alto Impacto'],
      ['Cerámica Artesanal: Modelado Manual, Pellizco y Placa', 'Torno Alfarero: Centrado, Levantamiento de Piezas y Retorneado', 'Esmaltado Cerámico y Curva de Horneado en Horno Eléctrico'],
      ['Fotografía Digital Réflex/Mirrorless en Modo Manual', 'Iluminación en Estudio Fotográfico: Flashes, Sombrillas y Softboxes', 'Retoque y Revelado Digital en Adobe Lightroom y Photoshop'],
      ['Dibujo Artístico y Figurativo: Proporción, Luces y Sombras', 'Pintura al Óleo y Acrílico sobre Bastidor: Teoría del Color', 'Acuarela Botánica y Técnicas de Aguada'],
      ['Locución Comercial, Radial y Creación de Podcasts', 'Doblaje de Voz y Neutro Latinoamericano para Series y Películas', 'Manejo de Micrófono, Respiración y Dicción Clara'],
      ['Corte y Confección Básica: Toma de Medidas y Trazado de Patrones', 'Moldería y Ensamble de Prendas con Máquina Recta y Overlock', 'Diseño de Indumentaria, Lencería y Confección a Medida']
    ],
    certs: ['Propia', 'Propia', 'Oficial', 'Sin Certificación'],
    modalities: ['Presencial', 'Híbrido', 'Presencial'],
    nationalCertDefault: 'No'
  },

  // 5. ESTÉTICA, PELUQUERÍA, BARBERÍA Y BIENESTAR (Estética y Bienestar)
  {
    specialty: 'Estética y Bienestar',
    typeNames: [
      'Academia de Peluquería y Colorimetría', 'Escuela de Barbería y Cortes Fade',
      'Instituto de Cosmetología y Cosmiatría Facial', 'Academia de Uñas Esculpidas y Nail Art',
      'Atelier de Pestañas, Cejas y Microblading', 'Escuela de Maquillaje Social y de Novias',
      'Centro de Masoterapia y Masajes Deportivos', 'Instituto de Depilación Definitiva y Cera',
      'Academia de Yoga, Pilates y Entrenamiento', 'Centro de Bienestar Corporal y Drenaje'
    ],
    namePrefixes: [
      'Centro de Estética Integral', 'Instituto Glamour & Estilo', 'Academia Máster Beauty',
      'Estudio Look & Belleza', 'Escuela de Estilistas Unidos', 'Instituto Dermobelleza',
      'Atelier de la Imagen Personal', 'Academia Spa & Armonía', 'Centro Técnico de Estilistas',
      'Escuela Profesional Silueta & Salud'
    ],
    nameSuffixes: [
      'Beauty Studio', 'Estética & Color', 'Estilismo', 'Peluqueros', 'Nails & Lashes',
      'Cosmiatría', 'Barbershop Academia', 'Bienestar'
    ],
    courseBundles: [
      ['Peluquería Integral Unisex y Técnicas de Tijera y Navaja', 'Colorimetría Avanzada: Balayage, Babylights y Decoloración Segura', 'Alisados Definitivos sin Formol, Bótox y Nutrición Capilar'],
      ['Barbería Clásica y Urbana: Cortes Fade (Skin Fade, Taper, Drop)', 'Afeitado Tradicional a Navaja con Toallas Calientes', 'Diseño y Perfilado de Barbas con Colorimetría y Pigmentación'],
      ['Cosmetología Facial: Tipos de Cutis y Limpieza Profunda con Espátula Ultrasónica', 'Cosmiatría Superior: Peelings Químicos, Dermapen y Radiofrecuencia', 'Tratamiento del Acné, Rosácea y Fotoenvejecimiento'],
      ['Manicuría Combinada y Rusa con Torno y Fresas de Diamante', 'Esmaltado Semipermanente, Kapping Gel y Base Rubber', 'Uñas Esculpidas en Acrílico, Soft Gel y Diseños de Nail Art a Mano Alzada'],
      ['Extensiones de Pestañas Pelo a Pelo Clásicas e Híbridas', 'Volumen Ruso 3D a 6D y Mega Volumen', 'Lifting de Pestañas, Laminado de Cejas y Perfilado con Hilo Hindú'],
      ['Maquillaje Social para Fiestas, Egresadas y Novias', 'Técnica de Piel Blindada a Prueba de Agua y Sudor', 'Smokey Eyes, Delineado Cat Eye y Colocación de Pestañas Postizas'],
      ['Masaje Descontracturante y Sedativo con Técnicas Miofasciales', 'Drenaje Linfático Manual Facial y Corporal (Método Vodder)', 'Masaje Deportivo Pre y Post Competencia con Vendaje Neuromuscular']
    ],
    certs: ['Propia', 'Oficial', 'Propia', 'Sin Certificación'],
    modalities: ['Presencial', 'Presencial', 'Híbrido'],
    nationalCertDefault: 'No'
  },

  // 6. GASTRONOMÍA, PANADERÍA, PASTELERÍA Y BEBIDAS (Gastronomía)
  {
    specialty: 'Gastronomía',
    typeNames: [
      'Escuela de Cocina Profesional y Chef de Oficio', 'Instituto de Pastelería Fina y Repostería',
      'Taller de Panadería Artesanal de Masa Madre', 'Academia de Pizzería Porteña y Empanadas',
      'Escuela de Sushi y Cocina Asiática', 'Centro de Coctelería y Bartender Profesional',
      'Instituto de Barismo de Especialidad y Café', 'Escuela de Asado Argentino y Técnicas de Fuegos',
      'Taller de Chocolatería y Bombonería Fina', 'Cursos de Cervecería Artesanal y Fermentación'
    ],
    namePrefixes: [
      'Instituto Culinario', 'Escuela Gourmet', 'Taller Sabores del Río', 'Academia de Cocina',
      'Atelier Gastronómico', 'Centro de Formación Culinaria', 'La Casona de los Cocineros',
      'Instituto de Alta Gastronomía', 'Escuela Práctica del Buen Comer', 'Espacio de Cocina y Vino'
    ],
    nameSuffixes: [
      'Gourmet', 'Culinaria', 'Sabor & Fuego', 'Pasteleros', 'Bartenders', 'Cocina de Oficio',
      'Gastronomía Argentina', 'Café & Barra'
    ],
    courseBundles: [
      ['Cocina Profesional de Restaurante: Cortes, Fondos, Salsas Madre y Carnes', 'Pastas Caseras Italianas Rellenas y Salsas Clásicas', 'Cocina al Vacío (Sous-Vide) y Técnicas de Emplatado Moderno'],
      ['Pastelería Clásica y Moderna: Masas Quebradas, Batidos y Mousses', 'Decoración de Tortas de Cumpleaños y Bodas con Ganache y Fondant', 'Macarons Franceses, Tartas Finas y Petit Fours'],
      ['Panadería con Masa Madre Natural (Sourdough): Fermentación en Frío', 'Facturas Argentinas Tradicionales: Medialunas de Manteca y de Grasa', 'Panes Especiales: Ciabatta, Focaccia, Baguette y Pan de Campo'],
      ['Maestro Pizzero: Masa Napolitana, Pizza al Molde y Pizza a la Piedra', 'Empanadas Regionales Argentinas: Salteñas, Tucumanas y Mendocinas', 'Calzones, Fugazzetas Rellenas y Fainá Tradicional'],
      ['Sushi Master: Cocción y Aderezo del Arroz Shari, Cortes de Salmón y Langostinos', 'Rolls Clásicos, Californianos y Fusión Nikkei Calientes (Hot Rolls)', 'Ramen Casero, Dumplings al Vapor (Gyozas) y Wok Oriental'],
      ['Bartender Profesional y Coctelería Clásica (Negroni, Martini, Old Fashioned)', 'Coctelería de Autor con Almíbares Saborizados y Maceraciones', 'Técnicas de Manejo de Barra, Velocidad y Speed Round'],
      ['Barista Profesional: Calibración de Molino y Extracción Perfecta de Espresso', 'Técnica de Vaporización de Leche y Diseños de Arte Latte (Corazón, Tulipa, Rosseta)', 'Métodos de Filtrado Manual (Chemex, V60, Prensa Francesa, Aeropress)'],
      ['Asado Criollo Tradicional: Manejo del Fuego, Leña y Carbón', 'Asado a la Estaca (Costillar y Cordero), Vacío al Libro y Matambre a la Pizza', 'Embutidos y Chacinados Artesanales: Chorizo Criollo, Morcilla y Bondiola Curada']
    ],
    certs: ['Oficial', 'Propia', 'Propia', 'Oficial'],
    modalities: ['Presencial', 'Híbrido', 'Presencial'],
    nationalCertDefault: 'Sí'
  },

  // 7. IDIOMAS PRÁCTICOS Y LENGUA DE SEÑAS (Idiomas)
  {
    specialty: 'Idiomas',
    typeNames: [
      'Instituto de Inglés Conversacional', 'Centro de Portugués Intensivo y Comercial',
      'Academia de Italiano Práctico y Ciudadanía', 'Instituto de Francés Comunicativo',
      'Centro de Lengua de Señas Argentina (LSA)', 'Escuela de Alemán para Profesionales',
      'Instituto de Chino Mandarín y Cultura', 'Centro de Japonés Inicial y Manga'
    ],
    namePrefixes: [
      'Instituto Lenguas Vivas', 'Centro de Idiomas del Plata', 'Academia Global English',
      'Espacio Idiomas Sin Fronteras', 'Instituto Políglota Argentino', 'Centro de Comunicación',
      'Atelier de Idiomas del Mundo', 'Escuela Puentes Lingüísticos'
    ],
    nameSuffixes: [
      'Idiomas', 'Language Studio', 'Comunicación', 'Lenguas', 'Global', 'Express',
      'Conversacional', 'Intercultural'
    ],
    courseBundles: [
      ['Inglés Conversacional Intensivo para Adultos Principiantes', 'Inglés para Viajes y Situaciones Aeroportuarias / Hoteleras', 'Business English: Redacción de Emails y Entrevistas Laborales'],
      ['Portugués Brasilero Cotidiano y Conversacional', 'Portugués para Comercio Exterior y Negocios en el Mercosur', 'Gramática Práctica y Fonética del Portugués Carioca / Paulista'],
      ['Italiano Conversacional Práctico Niveles A1 y A2', 'Preparación para el Examen de Ciudadanía Italiana B1', 'Cultura, Gastronomía y Dialectos de las Regiones de Italia'],
      ['Francés Práctico para Principiantes y Viajeros', 'Taller de Fonética Francesa y Conversación en Situaciones Reales', 'Francés Gastronómico y del Vino'],
      ['Lengua de Señas Argentina (LSA): Nivel Inicial y Gramática Viso-Espacial', 'Dactilología, Alfabeto y Vocabulario Cotidiano en LSA', 'LSA para la Atención al Público, Trámites y Docentes'],
      ['Alemán Inicial A1 y A2 para Vivir o Trabajar en Europa', 'Vocabulario Técnico de Ingeniería y Salud en Alemán', 'Práctica de Escucha y Diálogos Cotidianos']
    ],
    certs: ['Propia', 'Oficial', 'Propia'],
    modalities: ['Híbrido', 'Online', 'Presencial'],
    nationalCertDefault: 'No'
  },

  // 8. NUEVOS OFICIOS: ADIESTRAMIENTO CANINO, CONDUCCIÓN Y TECNOLOGÍA (Tecnología / Oficios)
  {
    specialty: 'Oficios y Técnica',
    typeNames: [
      'Escuela de Adiestramiento Canino y Conducta Urbana', 'Academia de Peluquería Canina & Grooming',
      'Autoescuela de Conducción y Manejo Defensivo', 'Instituto de Pilotos de Drones Comerciales (VANT)',
      'Escuela de Reparación de Computadoras y Notebooks', 'Taller de Armado y Mantenimiento de PC Gamer'
    ],
    namePrefixes: [
      'Centro de Capacitación Canina', 'Escuela de Conductores Seguros', 'Autoescuela Argentina',
      'Instituto de Formación Técnica Mascotas', 'Taller Escuela de Grooming', 'Academia de Vuelo de Drones',
      'Centro Tecnológico de Informática y Hardware', 'Taller Vocacional Digital'
    ],
    nameSuffixes: [
      'Adiestramiento', 'Autoescuela', 'Grooming Studio', 'Drones & Vuelo', 'Hardware & Service',
      'Manejo Total'
    ],
    courseBundles: [
      ['Adiestramiento Canino en Positivo: Obediencia Básica (Sentado, Quieto, Junto)', 'Resolución de Problemas de Conducta Canina: Tirones de Correa y Ansiedad', 'Educación del Cachorro y Sociabilización en Entornos Urbanos'],
      ['Peluquería Canina Comercial y Grooming por Razas (Caniche, Schnauzer, Golden)', 'Técnicas de Tijera, Máquina Esquiladora y Deslanado en Raza Grande', 'Baño Sanitario, Corte de Uñas y Limpieza de Oídos Segura'],
      ['Curso Práctico de Manejo para Principiantes con Doble Comando', 'Estacionamiento en Tres Maniobras y Salida en Pendiente', 'Manejo Defensivo en Rutas, Autopistas y Señalización Vial Argentina'],
      ['Operación de Drones Comerciales y Filmación Aérea en 4K', 'Normativas ANAC para Vuelo Seguro y Planificación de Misiones', 'Fotogrametría Básica para Agronomía y Construcción'],
      ['Armado, Configuración y Optimización de PC Gamer y Workstations', 'Reparación de Fuentes de Alimentación y Cambio de Pasta Térmica en Notebooks', 'Diagnóstico de Fallas de Placas Madre y Memorias RAM']
    ],
    certs: ['Propia', 'Oficial', 'Sin Certificación'],
    modalities: ['Presencial', 'Presencial', 'Híbrido'],
    nationalCertDefault: 'No'
  }
];

// Generate 1,960 centers distributed across the HUBS
export function generateMassiveCenters(): any[] {
  const centers: any[] = [];
  let centerCounter = 1;

  // We want ~1,960 centers
  // Let's iterate through HUBS with weighting
  const totalTarget = 1960;
  
  // Assign targets per hub based on urban size
  const hubTargets = HUBS.map(hub => {
    let weight = 15;
    if (hub.provinceId === 'caba') weight = 28;
    else if (hub.neighborhood.includes('(GBA)')) weight = 24;
    else if (hub.provinceId === 'buenos-aires') weight = 20;
    else if (hub.provinceId === 'cordoba') weight = 22;
    else if (hub.provinceId === 'santa-fe') weight = 20;
    else if (hub.provinceId === 'mendoza') weight = 16;
    else if (hub.provinceId === 'tucuman' || hub.provinceId === 'salta' || hub.provinceId === 'entre-rios') weight = 12;
    else weight = 8;
    return { hub, weight };
  });

  const sumWeights = hubTargets.reduce((s, h) => s + h.weight, 0);

  hubTargets.forEach(({ hub, weight }) => {
    const hubCount = Math.round((weight / sumWeights) * totalTarget);

    for (let i = 0; i < hubCount; i++) {
      const arch = pick(CATEGORY_ARCHETYPES);
      const type = pick(arch.typeNames);
      const prefix = pick(arch.namePrefixes);
      const suffix = pick(arch.nameSuffixes);
      const name = `${prefix} ${hub.neighborhood.replace(/\s*\(.*?\)\s*/g, '')} ${suffix}`;
      
      const courses = pick(arch.courseBundles);
      const modality = pick(arch.modalities);
      const cert = pick(arch.certs);
      const street = pick(STREET_NAMES);
      const height = randInt(100, 4800);
      const address = `${street} ${height}`;

      // Phone in valid Argentine format
      // Mobile phone standard: prefix + 9 digits or 8 digits, e.g., +54911 4455-6677 or +549351...
      const phoneDigits = randInt(40000000, 99999999);
      const whatsapp = `${hub.prefix}${phoneDigits}`;

      // Realistic coordinates around hub
      const latOffset = (random() - 0.5) * 0.035;
      const lngOffset = (random() - 0.5) * 0.035;
      const lat = Number((hub.baseLat + latOffset).toFixed(5));
      const lng = Number((hub.baseLng + lngOffset).toFixed(5));

      const nationalCert = cert === 'Oficial' ? (random() > 0.3 ? 'Sí' : 'No') : arch.nationalCertDefault;

      centers.push({
        id: `mc_${centerCounter}`,
        name: name,
        specialty: arch.specialty,
        type: type,
        modality: modality,
        certification: cert,
        nationalCertification: nationalCert,
        courses: courses,
        whatsapp: whatsapp,
        address: address,
        neighborhood: hub.neighborhood,
        coordinates: { lat, lng },
        provinceId: hub.provinceId
      });

      centerCounter++;
    }
  });

  return centers;
}

const massiveCenters = generateMassiveCenters();
console.log(`Generated ${massiveCenters.length} massive non-formal centers!`);

// Write to src/data/massiveCenters.ts
const outputPath = path.resolve('src/data/massiveCenters.ts');
const fileContent = `import type { Center } from "../types";

export const massiveCenters: Center[] = ${JSON.stringify(massiveCenters, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully written to ${outputPath} (${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB)`);
