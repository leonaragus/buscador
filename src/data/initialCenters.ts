import type { Center } from "../types";
import { additionalCenters } from "./additionalCenters";
import { expandedCenters } from "./expandedCenters";
import { massiveCenters } from "./massiveCenters";

export type { Center };

const staticCenters: Center[] = [
  {
    id: "c1",
    name: "Coderhouse",
    specialty: "Tecnología",
    type: "Academia de Tecnología & Bootcamps",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Desarrollo Web Fullstack",
      "React JS Avanzado",
      "Diseño de Experiencia de Usuario (UI/UX)",
      "Marketing Digital Avanzado",
      "Data Analytics"
    ],
    whatsapp: "+5491150313456",
    address: "Av. Coronel Díaz 2450 (Oficinas Virtuales)",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5888, lng: -58.4092 }
  },
  {
    id: "c2",
    name: "Digital House",
    specialty: "Tecnología",
    type: "Academia de Habilidades Digitales",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Certified Tech Developer (Mercado Libre / Globant)",
      "Programación Web Full Stack Java",
      "Data Science",
      "Product Management"
    ],
    whatsapp: "+5491132908712",
    address: "Av. Monroe 860",
    neighborhood: "Belgrano",
    coordinates: { lat: -34.5541, lng: -58.4485 }
  },
  {
    id: "c3",
    name: "Instituto Gato Dumas",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía Profesional",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cocina Profesional (2 años)",
      "Pastelería Profesional (1 año)",
      "Sommelier Profesional",
      "Gerenciamiento Gastronómico",
      "Panadería Artesanal y Masa Madre"
    ],
    whatsapp: "+5491148116530",
    address: "Av. Córdoba 1751",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5989, lng: -58.3912 }
  },
  {
    id: "c4",
    name: "IAG - Instituto Argentino de Gastronomía",
    specialty: "Gastronomía",
    type: "Escuela Profesional de Cocina",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Profesional Gastronómico",
      "Pastelero Profesional",
      "Panadero de Alta Gama",
      "Cocina Saludable e Intolerancias"
    ],
    whatsapp: "+5491148161414",
    address: "Montevideo 938",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5968, lng: -58.3892 }
  },
  {
    id: "c5",
    name: "AACI - Asociación Argentina de Cultura Inglesa",
    specialty: "Idiomas",
    type: "Instituto de Lengua y Cultura",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Inglés Adultos (Todos los niveles)",
      "Preparación Exámenes de Cambridge (FCE, CAE, CPE)",
      "Inglés de Negocios y Oratoria",
      "Clases de Conversación Dinámica"
    ],
    whatsapp: "+5491143220011",
    address: "Suipacha 1333",
    neighborhood: "Retiro",
    coordinates: { lat: -34.5935, lng: -58.3795 }
  },
  {
    id: "c6",
    name: "Alliance Française de Buenos Aires",
    specialty: "Idiomas",
    type: "Centro de Lengua y Cultura Francesa",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Francés General Intensivo (A1-C2)",
      "Taller de Conversación y Francofonía",
      "Preparación Exámenes DELF/DALF",
      "Francés para Turismo y Viajeros"
    ],
    whatsapp: "+5491143117156",
    address: "Av. Córdoba 946",
    neighborhood: "San Nicolás",
    coordinates: { lat: -34.5995, lng: -58.3812 }
  },
  {
    id: "c7",
    name: "Escuela Da Vinci",
    specialty: "Arte y Diseño",
    type: "Escuela de Arte Multimedial y Nuevas Tecnologías",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Desarrollo de Videojuegos con Unity",
      "Modelado 3D y Renderizado con Blender",
      "Ilustración Digital y Concept Art",
      "Diseño Gráfico Digital",
      "Programación Web Front-End"
    ],
    whatsapp: "+5491150320055",
    address: "Av. Corrientes 2037",
    neighborhood: "Balvanera",
    coordinates: { lat: -34.6044, lng: -58.3955 }
  },
  {
    id: "c8",
    name: "El Sindicato de la Carpintería",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Oficios Madera",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Carpintería de Banco (Nivel Inicial)",
      "Construcción y Ensamble de Muebles Modernos",
      "Taller de Restauración y Lustre de Madera",
      "Introducción al Labrado y Talla Manual"
    ],
    whatsapp: "+5491136624910",
    address: "Concepción Arenal 3420",
    neighborhood: "Colegiales",
    coordinates: { lat: -34.5802, lng: -58.4489 }
  },
  {
    id: "c9",
    name: "Motivarte - Escuela de Fotografía",
    specialty: "Arte y Diseño",
    type: "Instituto de Enseñanza Fotográfica",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Profesional de la Fotografía (Trayecto Completo)",
      "Iluminación de Estudio y Flash de Zapata",
      "Fotografía de Moda y Retrato",
      "Retoque Digital con Lightroom y Photoshop"
    ],
    whatsapp: "+5491147730455",
    address: "Malabia 1141",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5921, lng: -58.4323 }
  },
  {
    id: "c10",
    name: "IAP - Instituto de Alta Peluquería",
    specialty: "Estética y Bienestar",
    type: "Academia de Belleza y Peluquería",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Estilista Profesional / Peluquería Integral",
      "Barbería Clásica y Cortes Urbanos",
      "Colorimetría Aplicada y Decoloración Avanzada",
      "Manicuría y Esculpidas en Gel",
      "Maquillaje Social y de Fiesta"
    ],
    whatsapp: "+5491149018899",
    address: "Av. Rivadavia 5122",
    neighborhood: "Caballito",
    coordinates: { lat: -34.6185, lng: -58.4372 }
  },
  {
    id: "c11",
    name: "Centro de Formación Profesional UOCRA",
    specialty: "Oficios y Técnica",
    type: "Escuela Sindical de Oficios Constructivos",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Electricidad de Obra e Industrial",
      "Instalaciones Sanitarias y Gas Matriculado",
      "Construcción en Seco (Steel Framing)",
      "Lectura de Planos e Introducción a Cómputos"
    ],
    whatsapp: "+5491143430044",
    address: "Av. Belgrano 1870",
    neighborhood: "Almagro",
    coordinates: { lat: -34.6112, lng: -58.3944 }
  },
  {
    id: "c12",
    name: "Istituto Italiano di Cultura de Buenos Aires",
    specialty: "Idiomas",
    type: "Centro de Idioma y Cultura Italiana",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Italiano General (A1, A2, B1, B2, C1, C2)",
      "Taller Literario y Análisis Cinematográfico",
      "Curso Especial de Conversación Avanzada",
      "Cursos de Preparación Examen CILS"
    ],
    whatsapp: "+5491152526800",
    address: "Paraguay 1178",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5985, lng: -58.3845 }
  },
  {
    id: "c13",
    name: "Eter - Escuela de Comunicación",
    specialty: "Arte y Diseño",
    type: "Escuela de Periodismo, Radio y Medios",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Doblaje de Voz Profesional",
      "Locución para Podcast y Streaming de Radio",
      "Periodismo Deportivo Digital",
      "Edición de Sonido en ProTools"
    ],
    whatsapp: "+5491143828100",
    address: "Acevedo 262",
    neighborhood: "Villa Crespo",
    coordinates: { lat: -34.5988, lng: -58.4385 }
  },
  {
    id: "c14",
    name: "Mausi Sebess",
    specialty: "Gastronomía",
    type: "Escuela de Cocina Integral",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Chef Internacional",
      "Panadero y Facturero Profesional",
      "Chocolatería y Confitería Clásica y de Vanguardia",
      "Sushi Master y Cocina Asiática"
    ],
    whatsapp: "+5491147861100",
    address: "Maure 1540",
    neighborhood: "Belgrano",
    coordinates: { lat: -34.5689, lng: -58.4395 }
  },
  {
    id: "c15",
    name: "Silkey Mundial Academia Recoleta",
    specialty: "Estética y Bienestar",
    type: "Centro de Estética Capilar y Cosmetología",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Tratamientos Capilares Orgánicos y Alisados",
      "Cortes de Tendencia Femeninos y Masculinos",
      "Peinados de Novia y Alta Costura",
      "Maquillaje Artístico y Especial FX"
    ],
    whatsapp: "+5491145885000",
    address: "Av. Santa Fe 3144",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5881, lng: -58.4068 }
  },
  {
    id: "c16",
    name: "Club de Reparadores - Talleres Populares",
    specialty: "Oficios y Técnica",
    type: "Centro Social de Auto-Instrucción",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Clínica de Reparación de Pequeños Electrodomésticos",
      "Costura Resiliente y Customización de Ropa",
      "Reparación de Bicicletas de Paseo y Ruta"
    ],
    whatsapp: "+5491125449876",
    address: "Camargo 450",
    neighborhood: "Villa Crespo",
    coordinates: { lat: -34.5992, lng: -58.4412 }
  },
  {
    id: "c17",
    name: "Cursos del Rojas (UBA Extensión)",
    specialty: "Arte y Diseño",
    type: "Centro Cultural Universitario",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Iniciación Actoral con Improvisación",
      "Guion de Cine y Series de TV",
      "Fotografía Analógica y Revelado Blanco y Negro",
      "Canto Grupal e Instrumentos Viento",
      "Dibujo Humorístico e Ilustración de Cuentos"
    ],
    whatsapp: "+5491152854700",
    address: "Av. Corrientes 2038",
    neighborhood: "Balvanera",
    coordinates: { lat: -34.6041, lng: -58.3952 }
  },
  {
    id: "c18",
    name: "Nueva Escuela de Diseño y Comunicación",
    specialty: "Arte y Diseño",
    type: "Instituto Superior de Diseño No Formal",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Tatuaje Profesional e Higiene Sanitaria",
      "Diseño de Indumentaria y Moldería Práctica",
      "Organización y Ambientación de Eventos Creativos",
      "Fotografía Publicitaria de Producto"
    ],
    whatsapp: "+5491143714652",
    address: "Av. Callao 67",
    neighborhood: "San Nicolás",
    coordinates: { lat: -34.6091, lng: -58.3921 }
  },
  {
    id: "c19",
    name: "Goethe-Institut Buenos Aires",
    specialty: "Idiomas",
    type: "Asociación Cultural de Lengua Alemana",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Alemán General (Niveles Básicos A1 - Avanzados C2)",
      "Alemán Laboral / Trabajo Directo en Europa",
      "Talleres de Literatura y Cultura Alemana",
      "Preparación Exámenes Internacionales Goethe-Zertifikat"
    ],
    whatsapp: "+5491150319991",
    address: "Av. Corrientes 343",
    neighborhood: "San Nicolás",
    coordinates: { lat: -34.6025, lng: -58.3712 }
  },
  {
    id: "c20",
    name: "El Arte de Vivir Buenos Aires",
    specialty: "Estética y Bienestar",
    type: "Fundación de Desarrollo Personal",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Happiness Program (Técnicas de Respiración y Meditación)",
      "Yoga Sadhana y Postura Correctiva",
      "Manejo del Estrés y Liderazgo de Alto Impacto"
    ],
    whatsapp: "+5491151686616",
    address: "Uriburu 1175",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5979, lng: -58.4005 }
  },
  {
    id: "c21",
    name: "Escuela de Oficios Textiles de Barracas",
    specialty: "Oficios y Técnica",
    type: "Asociación de Confección Textil",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Confección de Indumentaria y Costura Recta",
      "Ensamble en Overlock e Overlock Industrial",
      "Patronaje y Moldería Industrial Femenina",
      "Diseño de Estampas y Serigrafía en Tela"
    ],
    whatsapp: "+5491168212644",
    address: "Av. Regimiento de Patricios 1950",
    neighborhood: "Barracas",
    coordinates: { lat: -34.6415, lng: -58.3712 }
  },
  {
    id: "c22",
    name: "Centro Cultural Rojas - Área Danza",
    specialty: "Arte y Diseño",
    type: "Centro de Formación Artística",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Danza Contemporánea e Improvisación Corporal",
      "Tango de Salón: Técnica y Estilo Porteño",
      "Ritmos Latinos y Salsa Inicial",
      "Elongación y Preparación Física para Bailarines"
    ],
    whatsapp: "+5491152854722",
    address: "Av. Corrientes 2038",
    neighborhood: "Balvanera",
    coordinates: { lat: -34.6042, lng: -58.3953 }
  },
  {
    id: "c23",
    name: "Coderhouse - Inteligencia Artificial",
    specialty: "Tecnología",
    type: "Academia de Innovación",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Prompt Engineering con Modelos Generativos",
      "Automatización de Tareas con Python e Inteligencia Artificial",
      "Productividad Corporativa con IA",
      "Machine Learning para Project Managers"
    ],
    whatsapp: "+5491150313457",
    address: "Av. Coronel Díaz 2450",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5889, lng: -58.4093 }
  },
  {
    id: "c24",
    name: "L'Ecole - Escuela de Sommeliers",
    specialty: "Gastronomía",
    type: "Escuela Profesional de Vinos de Buenos Aires",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Sommelier Profesional Avalado (2 años)",
      "Curso Introductorio a la Cata y Degustación de Vinos",
      "Maridaje de Vinos de Autor y Gastronomía Criolla",
      "Coctelería Clásica de Vinos y Destilados"
    ],
    whatsapp: "+5491133445566",
    address: "Jorge Luis Borges 1920",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5835, lng: -58.4215 }
  },
  {
    id: "c25",
    name: "Lenguas Vivas 'J. R. Fernández' - Cursos Extensión",
    specialty: "Idiomas",
    type: "Instituto de Lenguas Extranjeras No Formal",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Inglés Avanzado Aplicado a Traducción Literaria",
      "Portugués de Negocios y Cultura Brasileña",
      "Francés General y Talleres de Lectura Crítica",
      "Japonés Inicial y Estructura Silábica"
    ],
    whatsapp: "+5491148143004",
    address: "Carlos Pellegrini 1515",
    neighborhood: "Retiro",
    coordinates: { lat: -34.5912, lng: -58.3789 }
  },
  {
    id: "c26",
    name: "Taller de Orfebrería y Platería Criolla",
    specialty: "Oficios y Técnica",
    type: "Escuela de Oficios Tradicionales",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Cincelado de Metales (Plata, Cobre, Latón)",
      "Creación de Joyería Clásica y Engarces Básicos",
      "Introducción a la Filigrana de Plata No Formal"
    ],
    whatsapp: "+5491167778899",
    address: "Defensa 1040",
    neighborhood: "San Telmo",
    coordinates: { lat: -34.6198, lng: -58.3712 }
  },
  {
    id: "c27",
    name: "Cursos del San Martín (Complejo Teatral)",
    specialty: "Arte y Diseño",
    type: "Talleres Artísticos Públicos",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Vestuario Escénico y Moldería Teatral",
      "Maquillaje de Caracterización y Máscaras Artísticas",
      "Construcción de Escenarios y Carpintería de Escenografía",
      "Taller de Dirección Teatral No Profesional"
    ],
    whatsapp: "+5491143741381",
    address: "Av. Corrientes 1530",
    neighborhood: "San Nicolás",
    coordinates: { lat: -34.6041, lng: -58.3888 }
  },
  {
    id: "c28",
    name: "Estudio Regia - Escuela de Estética y Uñas",
    specialty: "Estética y Bienestar",
    type: "Estudio Escuela de Diseños de Uñas y Cuidado Facial",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Diseñador de Uñas Esculpidas Profesional (Acrílico/Gel)",
      "Nail Art Avanzado con Técnicas 3D",
      "Lifting de Pestañas y Perfilado de Cejas Orgánico"
    ],
    whatsapp: "+5491157771234",
    address: "Av. Santa Fe 1940",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5945, lng: -58.3915 }
  },
  {
    id: "c29",
    name: "Taller de Electrónica de Almagro",
    specialty: "Oficios y Técnica",
    type: "Taller Técnico Comunitario",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Soldadura de Circuitos Impresos y SMD",
      "Detección de Fallas en Celulares y Tablets de Gama Media",
      "Introducción a la Programación de Controladores Arduino"
    ],
    whatsapp: "+5491144445555",
    address: "Gascón 780",
    neighborhood: "Almagro",
    coordinates: { lat: -34.6067, lng: -58.4212 }
  },
  {
    id: "c30",
    name: "Buenos Aires Language Center (BALC)",
    specialty: "Idiomas",
    type: "Academia de Idiomas Intensiva",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Curso de Conversación en Inglés para Nómades Digitales",
      "Español Rioplatense para Extranjeros",
      "Inglés Tecnológico y Preparación para Entrevistas de Código"
    ],
    whatsapp: "+5491122334455",
    address: "Honduras 5500 (Campus Virtual)",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5822, lng: -58.4344 }
  },
  {
    id: "c31",
    name: "Instituto Tecnológico de Avellaneda (ITAV)",
    specialty: "Tecnología",
    type: "Academia de Oficios Digitales",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Reparación de Hardware y Redes Computacionales",
      "Introducción a la Programación con Python",
      "Administración y Soporte Linux en Servidores",
      "Desarrollo Front-End con React y Bootstrap"
    ],
    whatsapp: "+5491160410022",
    address: "Av. Mitre 750",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6624, lng: -58.3651 }
  },
  {
    id: "c32",
    name: "Escuela de Pastelería y Repostería de Quilmes",
    specialty: "Gastronomía",
    type: "Taller Gastronómico de Especialidad",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Decoración Profesional de Tortas y Cupcakes",
      "Elaboración de Chocolatería y Bombones Artesanales",
      "Facturería Porteña y Panadería Tradicional",
      "Pastelería para Eventos y Mesas Dulces"
    ],
    whatsapp: "+5491138241515",
    address: "Humberto Primo 210",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7214, lng: -58.2583 }
  },
  {
    id: "c33",
    name: "Academia de Estética y Barbería San Martín",
    specialty: "Estética y Bienestar",
    type: "Instituto de Belleza Tradicional",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Barbería Profesional y Corte Clásico",
      "Cosmetología y Cuidado de la Piel Inicial",
      "Manicuría Rápida y Esmaltado Semipermanente",
      "Depilación Sistema Español y Descartable"
    ],
    whatsapp: "+5491157123499",
    address: "Belgrano 3890",
    neighborhood: "San Martín (Provincia)",
    coordinates: { lat: -34.5771, lng: -58.5379 }
  },
  {
    id: "c34",
    name: "Taller Textil y Costura Industrial Lanús",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario de Oficios Textiles",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Operación de Máquinas Rectas e Interlock",
      "Moldería Básica y Forrado de Camperas",
      "Corte de Telas y Tizado de Moldes"
    ],
    whatsapp: "+5491129481122",
    address: "Av. Hipólito Yrigoyen 4150",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7011, lng: -58.3905 }
  },
  {
    id: "c35",
    name: "Centro Universitario y de Idiomas Vicente López",
    specialty: "Idiomas",
    type: "Centro Municipal de Lenguas No Formal",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Portugués Conversación con Foco Comercial",
      "Inglés Intermedio e Introducción al Turismo",
      "Italiano para Viajeros y Ciudadanía"
    ],
    whatsapp: "+5491147981100",
    address: "Carlos Villate 4480",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5262, lng: -58.4815 }
  },
  {
    id: "c36",
    name: "Asociación Musical y Luthería de Morón",
    specialty: "Arte y Diseño",
    type: "Conservatorio Escuela Independiente",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Luthería Básica: Reparación de Guitarras y Voces",
      "Ensamble de Instrumentos de Viento de Metal",
      "Taller de Guitarra Criolla y Composición de Canciones"
    ],
    whatsapp: "+5491168249911",
    address: "Nuestra Señora del Buen Viaje 820",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6517, lng: -58.6217 }
  },
  {
    id: "c37",
    name: "Instituto de Soldadura Ramos Mejía",
    specialty: "Oficios y Técnica",
    type: "Escuela Técnica de Soldadura y Herrería",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Soldadura Eléctrica por Arco (Electrodo Revestido)",
      "Soldadura de Precisión TIG para Aceros y Aluminio",
      "Herrería de Obra y Construcción de Portones",
      "Seguridad Industrial en Operaciones Metalúrgicas"
    ],
    whatsapp: "+5491128456677",
    address: "Av. de Mayo 1420",
    neighborhood: "Ramos Mejía (Provincia)",
    coordinates: { lat: -34.6565, lng: -58.5661 }
  },
  {
    id: "c38",
    name: "Centro de Estética Integral San Isidro",
    specialty: "Estética y Bienestar",
    type: "Academia de Cosmética e Imagen",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Maquillaje Social y de Novias Avanzado",
      "Cosmetología Médica Auxiliar y Peeling",
      "Masajes Descontracturantes y Drenaje Linfático",
      "Perfilado de Cejas y Micropigmentación Semipermanente"
    ],
    whatsapp: "+5491158392211",
    address: "Belgrano 410",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4716, lng: -58.5085 }
  },
  {
    id: "c39",
    name: "Academia de Tecnologías Digitales Pilar",
    specialty: "Tecnología",
    type: "Bootcamp de Desarrollo de Software",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Programación Web con Python y Django",
      "Diseño de Redes y Seguridad Informática",
      "Análisis de Datos con Pandas e SQL",
      "Desarrollo de Aplicaciones Móviles con Flutter"
    ],
    whatsapp: "+5491153123499",
    address: "Ruta 25 Nro. 1450",
    neighborhood: "Pilar (Provincia)",
    coordinates: { lat: -34.4586, lng: -58.9142 }
  },
  {
    id: "c40",
    name: "Escuela Gastronómica del Delta (Tigre)",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía y Panificados",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cocina Profesional de Río y Mariscos",
      "Elaboración de Conservas y Ahumados Artesanales",
      "Panadería de Masa Madre e Intolerancias",
      "Pastelería Clásica de Río"
    ],
    whatsapp: "+5491167442111",
    address: "Paseo Victorica 520",
    neighborhood: "Tigre (Provincia)",
    coordinates: { lat: -34.4172, lng: -58.5794 }
  },
  {
    id: "c41",
    name: "Clube de Idiomas Lomas de Zamora",
    specialty: "Idiomas",
    type: "Centro de Idiomas Comunitario",
    modality: "Online",
    certification: "Sin Certificación",
    courses: [
      "Inglés Conversacional Intermedio-Avanzado",
      "Portugués para Negocios y Turismo CABA/GBA",
      "Taller Práctico de Italiano Inicial para Trámites"
    ],
    whatsapp: "+5491129381144",
    address: "España 320",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7578, lng: -58.4025 }
  },
  {
    id: "c42",
    name: "Taller de Alfarería y Cerámica La Plata",
    specialty: "Arte y Diseño",
    type: "Taller Libre de Artes de Fuego",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Moldería Básica de Arcilla en Torno Alfarero",
      "Esmaltado de Baja y Alta Temperatura",
      "Escultura Figurativa en Cerámica",
      "Modelado Manual y Técnicas Ancestrales"
    ],
    whatsapp: "+5492215948332",
    address: "Calle 12 Nro. 890",
    neighborhood: "La Plata (Provincia)",
    coordinates: { lat: -34.9205, lng: -57.9536 }
  },
  {
    id: "c43",
    name: "Asociación de Electricistas de Lanús",
    specialty: "Oficios y Técnica",
    type: "Cursos de Oficios Eléctricos Cat. III",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Electricidad Domiciliaria e Industrial I",
      "Instalación de Paneles Solares Fotovoltaicos",
      "Cálculo de Tableros Eléctricos y Cableados"
    ],
    whatsapp: "+5491149221199",
    address: "Anatole France 1850",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7121, lng: -58.3812 }
  },
  {
    id: "c44",
    name: "Escuela de Belleza Viviana (Tres de Febrero)",
    specialty: "Estética y Bienestar",
    type: "Instituto de Belleza de Manos",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Esmaltado Semipermanente y Nail Art Avanzado",
      "Corta y Modelado de Uñas de Gel y Acrílicas",
      "Cosmiatría Inicial y Limpiezas Profundas"
    ],
    whatsapp: "+5491138472911",
    address: "Urquiza 4890",
    neighborhood: "Tres de Febrero (Provincia)",
    coordinates: { lat: -34.6062, lng: -58.5615 }
  },
  {
    id: "c45",
    name: "Centro del Lenguaje y Señas Argentinas Moreno",
    specialty: "Idiomas",
    type: "Escuela de Lenguas No Formal",
    modality: "Online",
    certification: "Oficial",
    courses: [
      "Lengua de Señas Argentina (LSA) - Niveles I y II",
      "Inclusión Comunicativa en Organismos Públicos",
      "Taller Práctico de Expresión Corporal para LSA"
    ],
    whatsapp: "+5491157122111",
    address: "Bartolomé Mitre 2890",
    neighborhood: "Moreno (Provincia)",
    coordinates: { lat: -34.6492, lng: -58.7845 }
  },
  {
    id: "c46",
    name: "Taller de Panadería Quilmes Oeste",
    specialty: "Gastronomía",
    type: "Escuela Gastronómica de Oficios",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Panadería Comercial y Preparación de medialunas",
      "Elaboración de Prepizzas y Panes de Hamburguesa",
      "Facturería Porteña y Pan Dulce Tradicional"
    ],
    whatsapp: "+5491133984422",
    address: "Av. Calchaquí 1290",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7311, lng: -58.2812 }
  },
  {
    id: "c47",
    name: "Estudio de Arte Electrónico y 3D Banfield",
    specialty: "Arte y Diseño",
    type: "Estudio de Animación y Diseño Libre",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Modelado de Personajes 3D con Blender",
      "Ilustración Digital y Pintura en Photoshop",
      "Animación de Texturas y Concept Art"
    ],
    whatsapp: "+5491168123490",
    address: "Maipú 490",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7431, lng: -58.3951 }
  },
  {
    id: "c48",
    name: "Taller-Escuela de Ebanistería Morón",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario de Maderas",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Ebanistería Básica y Restauración de Muebles",
      "Tallado en Madera y Torneado Artístico",
      "Lustrado a Goma Laca y Tratamientos de Madera"
    ],
    whatsapp: "+5491137452243",
    address: "Sarmiento 420",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6495, lng: -58.6189 }
  },
  {
    id: "c49",
    name: "Academia de Barbería y Estética Avellaneda",
    specialty: "Estética y Bienestar",
    type: "Academia de Peluquería Integral",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Peluquería Masculina y Barbería de Precisión",
      "Diseño de Barbas Tradicionales con Navaja",
      "Estructuras y Técnicas de Coloración Capilar"
    ],
    whatsapp: "+5491138401122",
    address: "Av. Belgrano 980",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6651, lng: -58.3695 }
  },
  {
    id: "c50",
    name: "Escuela de Joyería y Orfebrería Palermo",
    specialty: "Arte y Diseño",
    type: "Taller de Diseño de Joyas Independiente",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Técnicas Básicas de Orfebrería y Modelado en Cera",
      "Engarce de Piedras Semipreciosas y Soldadura en Plata",
      "Diseño Conceptual de Colecciones de Joyas",
      "Tratamientos Químicos de Metales y Pátinas"
    ],
    whatsapp: "+5491129482910",
    address: "Gorriti 4520",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5901, lng: -58.4285 }
  },
  {
    id: "c51",
    name: "Taller de Refrigeración y Aire Acondicionado Flores",
    specialty: "Oficios y Técnica",
    type: "Escuela de Oficios Mecánicos y Térmicos",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Instalación y Carga de Aire Acondicionado Split",
      "Reparación de Heladeras Familiares y Comerciales",
      "Termodinámica Básica y Circuitos Eléctricos de Frío"
    ],
    whatsapp: "+5491167441122",
    address: "Av. Rivadavia 6500",
    neighborhood: "Flores",
    coordinates: { lat: -34.6292, lng: -58.4611 }
  },
  {
    id: "c52",
    name: "Capacitación en Mecánica de Motos San Martín",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Motores",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Mecánica General de Motores de 2 y 4 Tiempos",
      "Sistemas de Inyección Electrónica de Motocicletas",
      "Armado, Carburación y Embrague Completo"
    ],
    whatsapp: "+5491157291100",
    address: "Mitre 4100",
    neighborhood: "San Martín (Provincia)",
    coordinates: { lat: -34.5714, lng: -58.5412 }
  },
  {
    id: "c53",
    name: "Academia de Alta Costura San Telmo",
    specialty: "Arte y Diseño",
    type: "Taller de Diseño Textil",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Moldería Industrial de Alta Costura",
      "Técnicas de Bordado en Piedras y Lentejuelas",
      "Corte y Confección de Vestidos de Fiesta"
    ],
    whatsapp: "+5491128471133",
    address: "Defensa 1120",
    neighborhood: "San Telmo",
    coordinates: { lat: -34.6192, lng: -58.3712 }
  },
  {
    id: "c54",
    name: "Instituto Gastronómico PastryArt Almagro",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía Privado",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Pastelería Francesa Profesional e Macarons",
      "Panes Especiales y Repostería Alemana",
      "Decoración Temática Infantil en Fondant"
    ],
    whatsapp: "+5491138402211",
    address: "Rivadavial 4100",
    neighborhood: "Almagro",
    coordinates: { lat: -34.6112, lng: -58.4215 }
  },
  {
    id: "c55",
    name: "Escuela de Teatro y Expresión Corporal Belgrano",
    specialty: "Arte y Diseño",
    type: "Taller de Teatro Independiente",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Improvisación Teatral y Expresión Corporal",
      "Actuación para Cámara y Cine Inicial",
      "Dramaturgia de Emergencia y Creación de Guion"
    ],
    whatsapp: "+5491168241155",
    address: "Cabildo 2800",
    neighborhood: "Belgrano",
    coordinates: { lat: -34.5612, lng: -58.4551 }
  },
  {
    id: "c56",
    name: "Club de Idiomas Orientales Belgrano",
    specialty: "Idiomas",
    type: "Academia de Idiomas Modernos",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Japonés Inicial - Nihongo Kyoushitsu",
      "Chino Mandarín Conversacional y Caligrafía",
      "Coreano para K-Culture y Negocios"
    ],
    whatsapp: "+5491129381155",
    address: "Arribeños 2210 (Barrio Chino)",
    neighborhood: "Belgrano",
    coordinates: { lat: -34.5562, lng: -58.4489 }
  },
  {
    id: "c57",
    name: "Estética Canina y Peluquería Puppies Caballito",
    specialty: "Estética y Bienestar",
    type: "Escuela Profesional de Oficios para Mascotas",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Peluquería Canina Comercial y de Exposición",
      "Higiene, Cosmetología y Stripping de Razas",
      "Primeros Auxilios Aplicados a la Estética Animal"
    ],
    whatsapp: "+5491138401155",
    address: "Av. Juan B. Alberdi 1400",
    neighborhood: "Caballito",
    coordinates: { lat: -34.6215, lng: -58.4411 }
  },
  {
    id: "c58",
    name: "Mecánica del Automotor San Fernando",
    specialty: "Oficios y Técnica",
    type: "Taller de Entrenamiento Automotor",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Auxiliar Mecánico en Sistemas de Frenos y Tren Delantero",
      "Sistemas de Inyección de Nafta Clásicos",
      "Afinamiento de Motores y Puesta a Punto"
    ],
    whatsapp: "+5491157122244",
    address: "Av. Libertador 2200",
    neighborhood: "San Fernando (Provincia)",
    coordinates: { lat: -34.4412, lng: -58.5412 }
  },
  {
    id: "c59",
    name: "Instituto de Fotografía RevelArte Recoleta",
    specialty: "Arte y Diseño",
    type: "Escuela de Fotografía Libre",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Fotografía Básica y Manejo de Cámara Reflex",
      "Revelado Químico de Película Blanco y Negro",
      "Taller de Retrato y Manejo de Luces de Estudio"
    ],
    whatsapp: "+5491129481199",
    address: "Uriburu 1250",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5951, lng: -58.4012 }
  },
  {
    id: "c60",
    name: "Academia de Bartender y Coctelería Caballito",
    specialty: "Gastronomía",
    type: "Escuela de Coctelería Profesional",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Bartender Inicial y Mixología Moderna",
      "Elaboración de Licores Caseros y Almíbares",
      "Cerveza Tirada y Gestión de Barras de Eventos"
    ],
    whatsapp: "+5491138472211",
    address: "Av. Acoyte 320",
    neighborhood: "Caballito",
    coordinates: { lat: -34.6152, lng: -58.4361 }
  },
  {
    id: "c61",
    name: "Taller Textil de Confección Ramos Mejía",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario Textil",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Corte y Confección Básica de Indumentaria",
      "Confección Industrial: Camisas y Jeans",
      "Sastrería para Principiantes"
    ],
    whatsapp: "+5491128148899",
    address: "Bolívar 450",
    neighborhood: "Ramos Mejía (Provincia)",
    coordinates: { lat: -34.6591, lng: -58.5612 }
  },
  {
    id: "c62",
    name: "Academia Web3 y Solidity Caseros",
    specialty: "Tecnología",
    type: "Academia de Software No Formal",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Introducción a Blockchain y Contratos Inteligentes",
      "Desarrollo Full-Stack Solidity con Hardhat",
      "Protocolos DeFi y Seguridad de Contratos"
    ],
    whatsapp: "+5491157122112",
    address: "Belgrano 4810 (Campus Virtual)",
    neighborhood: "Tres de Febrero (Provincia)",
    coordinates: { lat: -34.6012, lng: -58.5522 }
  },
  {
    id: "c63",
    name: "Herrería Artística y Forja Bernal",
    specialty: "Oficios y Técnica",
    type: "Taller de Cursos Metalúrgicos",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Forjado Tradicional en Carbón para Muebles",
      "Herrería Artística y Elaboración de Rejas Coloniales",
      "Talla y Esmerilado de Piezas Metálicas Decorativas"
    ],
    whatsapp: "+5491129381188",
    address: "Av. Zapiola 410",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7061, lng: -58.2815 }
  },
  {
    id: "c64",
    name: "Instituto de Lengua Italiana San Isidro",
    specialty: "Idiomas",
    type: "Instituto de Idiomas No Formal",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Italiano Intensivo para Ciudadanía y Entrevistas",
      "Taller Literario y Lectura en Italiano Clásico",
      "Cultura y Conversación Italiana Avanzada"
    ],
    whatsapp: "+5491158391100",
    address: "Chacabuco 350",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4695, lng: -58.5065 }
  },
  {
    id: "c65",
    name: "Taller Escuela de Mosaico y Vitral Flores",
    specialty: "Arte y Diseño",
    type: "Instituto de Cursos Artísticos",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Taller de Vitralismo Tradicional con Plomo",
      "Mosaico Veneciano y Método Directo sobre Pared",
      "Taller de Trencadís y Decoración de Macetas"
    ],
    whatsapp: "+5491168242200",
    address: "Membrillar 150",
    neighborhood: "Flores",
    coordinates: { lat: -34.6315, lng: -58.4591 }
  },
  {
    id: "c66",
    name: "Academia de Masoterapia Morón",
    specialty: "Estética y Bienestar",
    type: "Centro de Capacitación Belleza",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Técnicas de Masaje Deportivo y Rehabilitador",
      "Reflexología Holística y Digitopuntura de Manos",
      "Piedras Calientes y Aromaterapia Aplicada"
    ],
    whatsapp: "+5491168241199",
    address: "San Martín 890",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6501, lng: -58.6201 }
  },
  {
    id: "c67",
    name: "Escuela de Cocina Tradicional Villa Urquiza",
    specialty: "Gastronomía",
    type: "Estudio Cocineros Independientes",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Cocina Criolla: Guisos, Empanadas y Locro",
      "Taller de Pastas Caseras y Salsas Clásicas",
      "Pizzas Clásicas de Molde y Media Masa Porteña"
    ],
    whatsapp: "+5491138402244",
    address: "Av. Olazábal 4900",
    neighborhood: "Villa Urquiza",
    coordinates: { lat: -34.5712, lng: -58.4891 }
  },
  {
    id: "c68",
    name: "Peluquería Canina Vicente López",
    specialty: "Estética y Bienestar",
    type: "Academia de Oficios Caninos",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Iniciación al Grooming Canino Comercial",
      "Cortes Específicos de Caniche, Schnauzer y Cocker",
      "Baño, Cepillado Eficiente y Desanudado"
    ],
    whatsapp: "+5491147589911",
    address: "Av. Maipú 1200",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5312, lng: -58.4715 }
  },
  {
    id: "c69",
    name: "Taller Universitario de Carpintería Almagro",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario Organizado",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Carpintería Tradicional con Encastres Manuales",
      "Uso de Herramientas Eléctricas Portátiles Seguras",
      "Diseño e Instalación de Cocinas y Placards"
    ],
    whatsapp: "+5491129385522",
    address: "Guardia Vieja 3800",
    neighborhood: "Almagro",
    coordinates: { lat: -34.6025, lng: -58.4192 }
  },
  {
    id: "c70",
    name: "Academia de Robótica Wilde (Avellaneda)",
    specialty: "Tecnología",
    type: "Instituto de Ciencias No Formal",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Programación de Microcontroladores Arduino Uno",
      "Sensores, Motores y Robótica Celular",
      "Taller de Domótica Práctica para el Hogar"
    ],
    whatsapp: "+5491157129933",
    address: "Las Flores 850",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6951, lng: -58.3185 }
  },
  {
    id: "c71",
    name: "Taller Mecánico e Inyección Electrónica San Justo",
    specialty: "Oficios y Técnica",
    type: "Escuela de Mecánica Práctica",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Mecánica General e Inyección de Combustible",
      "Electricidad Avanzada y Diagnóstico Computarizado de Motores",
      "Sistemas de Transmisión Manual y Automática"
    ],
    whatsapp: "+5491130985544",
    address: "Arieta 2200",
    neighborhood: "San Justo (Provincia)",
    coordinates: { lat: -34.6790, lng: -58.5630 }
  },
  {
    id: "c72",
    name: "Instituto de Gastronomía y Sommelier Lomas de Zamora",
    specialty: "Gastronomía",
    type: "Academia Profesional Independiente",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cursos de Cocinero Profesional de Restaurantes",
      "Introducción a la Enología y Cata de Vinos de Guarda",
      "Gestión Económica de Emprendimientos Gastronómicos"
    ],
    whatsapp: "+5491138401199",
    address: "Meeks 320",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7610, lng: -58.4010 }
  },
  {
    id: "c73",
    name: "Escuela de Oficios Digitales y Ciberseguridad Lanús",
    specialty: "Tecnología",
    type: "Instituto de Sistemas No Formal",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Hacking Ético e Introducción a la Defensa de Redes",
      "Administración Avanzada de Bases de Datos NoSQL",
      "Análisis de Tráfico de Red con Wireshark"
    ],
    whatsapp: "+5491157121155",
    address: "Av. 9 de Julio 1250",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.6990, lng: -58.3840 }
  },
  {
    id: "c74",
    name: "Academia de Peluquería Canina Adrogué",
    specialty: "Estética y Bienestar",
    type: "Escuela de Grooming Profesional",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Técnicas de Peluquería Comercial sobre Caniche y Maltés",
      "Manejo de Tijera de Pulir e Instrumental de Precisión",
      "Estereotipos y Cortes de Razas de Pelo Duro"
    ],
    whatsapp: "+5491129381111",
    address: "La Rosa 890",
    neighborhood: "Almirante Brown (Provincia)",
    coordinates: { lat: -34.7981, lng: -58.3891 }
  },
  {
    id: "c75",
    name: "Taller Flamenco e Instrumentos de Cuerda Castelar",
    specialty: "Arte y Diseño",
    type: "Taller Artístico e Instrumentos",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Guitarra Flamenca: Compás y Técnicas de Rasgueado",
      "Construcción y Reparación de Guitarras Criollas (Luthería)",
      "Canto Tradicional y Ensamble Musical de Barrio"
    ],
    whatsapp: "+5491168248833",
    address: "Arias 2300",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6610, lng: -58.6390 }
  },
  {
    id: "c76",
    name: "Escuela de Repostería y Budines Florencio Varela",
    specialty: "Gastronomía",
    type: "Taller de Panadería Comunitario",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Elaboración de Budines, Muffins y Rosca de Reyes",
      "Repostería Básica y Forrado de Tortas Comunes",
      "Panes Saludables con Semillas y harinas alternativas"
    ],
    whatsapp: "+5491129382211",
    address: "España 2100",
    neighborhood: "Florencio Varela (Provincia)",
    coordinates: { lat: -34.8150, lng: -58.2710 }
  },
  {
    id: "c77",
    name: "Taller de Marroquinería y Calzado de Cuero Sarandí",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Cuero",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Confección de Carteras, Billeteras y Accesorios de Cuero",
      "Costura Manual de Zapatero y Aparado de Calzado",
      "Uso Completo de Máquinas de Coser para Cuero Pesado"
    ],
    whatsapp: "+5491138402288",
    address: "Av. Mitre 2900",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6810, lng: -58.3410 }
  },
  {
    id: "c78",
    name: "Instituto Superior de Idiomas San Fernando (No Formal)",
    specialty: "Idiomas",
    type: "Academia de Lenguas Modernas",
    modality: "Híbrido",
    certification: "Oficial",
    courses: [
      "Inglés de Negocios y Terminología de Comercio Exterior",
      "Francés Conversacional Inicial para Viajeros",
      "Portugués Intensivo y Taller de Cultura Brasileña"
    ],
    whatsapp: "+5491157122144",
    address: "Constitución 1100",
    neighborhood: "San Fernando (Provincia)",
    coordinates: { lat: -34.4440, lng: -58.5580 }
  },
  {
    id: "c79",
    name: "Laboratorio de Inteligencia Artificial Aplicada Vicente López",
    specialty: "Tecnología",
    type: "Bootcamp Tecnológico No Formal",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Ingeniería de Prompts Aplicada a Negocios",
      "Automatizaciones de Clientes con ChatGPT y Make",
      "Creación de Chatbots Interactivos de WhatsApp sin Código"
    ],
    whatsapp: "+5491138471100",
    address: "Av. Libertador 1500",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5220, lng: -58.4780 }
  },
  {
    id: "c80",
    name: "Taller Escuela de Muebles en Melamina San Miguel",
    specialty: "Oficios y Técnica",
    type: "Escuela de Oficios de Muebles",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Diseño y Planificación de Muebles de Cocina en Melamina",
      "Lectura de Planos, Despiece y Optimización de Placas",
      "Técnicas de Armado e Instalación en Obra"
    ],
    whatsapp: "+5491129486633",
    address: "Av. Presidente Perón 1900",
    neighborhood: "San Miguel (Provincia)",
    coordinates: { lat: -34.5420, lng: -58.7120 }
  },
  {
    id: "c81",
    name: "Academia Estética de Uñas y Pestañas Caseros",
    specialty: "Estética y Bienestar",
    type: "Instituto de Uñas y Cosmiatría",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Manicuría Rusa y Esmaltado Semipermanente Profesional",
      "Diseño y Extensión de Pestañas Pelo a Pelo (Lashistas)",
      "Lifting de Pestañas y Perfilado con Hilo Orgánico"
    ],
    whatsapp: "+5491138402233",
    address: "Fischetti 4700",
    neighborhood: "Tres de Febrero (Provincia)",
    coordinates: { lat: -34.6050, lng: -58.5560 }
  },
  {
    id: "c82",
    name: "Centro de Capacitación Gastronómica Pilar",
    specialty: "Gastronomía",
    type: "Escuela de Chefs Clásicos",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cocina Saludable e Introducción al Servicio de Catering",
      "Armado de Menúes Gourmet de Cinco Pasos",
      "Habilitación Bromatológica y Manipulación de Alimentos"
    ],
    whatsapp: "+5491157125511",
    address: "Tucumán 410",
    neighborhood: "Pilar (Provincia)",
    coordinates: { lat: -34.4570, lng: -58.9110 }
  },
  {
    id: "c83",
    name: "Taller Protegido de Costura e Indumentaria Luján",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario Textil",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Costura Básica, Dobladillos y Ajustes de Prendas",
      "Confección y Moldería de Delantales y Ropa de Trabajo",
      "Técnicas de Bordado sobre hilos rústicos"
    ],
    whatsapp: "+5492323572211",
    address: "San Martín 780",
    neighborhood: "Luján (Provincia)",
    coordinates: { lat: -34.5690, lng: -59.1210 }
  },
  {
    id: "c84",
    name: "Escuela de Fotografía e Iluminación Tigre",
    specialty: "Arte y Diseño",
    type: "Escuela Fotográfica Independiente",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Manejo de Cámara Reflex y Composición Fotográfica al Aire Libre",
      "Fotografía de Productos y Alimentos con Luz Sutil",
      "Revelado Digital en Adobe Lightroom Classic"
    ],
    whatsapp: "+5491168249955",
    address: "Av. Cazón 1200",
    neighborhood: "Tigre (Provincia)",
    coordinates: { lat: -34.4250, lng: -58.5750 }
  },
  {
    id: "c85",
    name: "Academia Privada de Idioma Alemán San Isidro",
    specialty: "Idiomas",
    type: "Estudio Alemán de Idiomas No Formal",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Alemán Inicial A1-A2 enfocado en Viajes",
      "Alemán Técnico para Ingenieros y Científicos",
      "Taller Literario de Autores de la Selva Negra"
    ],
    whatsapp: "+5491129381188",
    address: "Av. Centenario 850",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4780, lng: -58.5150 }
  },
  {
    id: "c86",
    name: "Espacio de Arte y Serigrafía Textil Berazategui",
    specialty: "Arte y Diseño",
    type: "Taller de Cursos de Serigrafía",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Estampado de Remeras con Shablón y Tintas de Agua",
      "Fotomaratón y Grabado Físico sobre Telas Sintéicas",
      "Creación de Logos y Preparación de Cuadros Serigráficos"
    ],
    whatsapp: "+5491138401177",
    address: "Calle 14 Nro. 4100",
    neighborhood: "Berazategui (Provincia)",
    coordinates: { lat: -34.7620, lng: -58.2110 }
  },
  {
    id: "c87",
    name: "Taller de Reparación de Celulares y Tablets San Martín",
    specialty: "Oficios y Técnica",
    type: "Centro de Capacitación de Microelectrónica",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Diagnóstico y Soldadura de Placas de Celulares",
      "Cambio de Módulos, Glass y Pin de Carga",
      "Software de Dispositivos Móviles: Android e iOS"
    ],
    whatsapp: "+5491157121177",
    address: "Perdriel 2800",
    neighborhood: "San Martín (Provincia)",
    coordinates: { lat: -34.5790, lng: -58.5450 }
  },
  {
    id: "c88",
    name: "Taller Libre de Pastelería Artesanal Moreno",
    specialty: "Gastronomía",
    type: "Cursos Libres de Pastelería",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Elaboración de Alfajores Regionales y Artesanales",
      "Facturas Porteñas de Grasa y Manteca Clásicas",
      "Taller de Budines Navideños y Panes de Pascua"
    ],
    whatsapp: "+5491129381123",
    address: "Zeballos 350",
    neighborhood: "Moreno (Provincia)",
    coordinates: { lat: -34.6510, lng: -58.7810 }
  },
  {
    id: "c89",
    name: "Academia del Estilo y barbería de Quilmes Centro",
    specialty: "Estética y Bienestar",
    type: "Academia de Belleza Capilar",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Tratamientos de Alisado Keratínico y Shock de Brillo",
      "Peinados Profesionales para Bodas e Invitadas de Honor",
      "Iniciación al Color y Decoloración sin Daño"
    ],
    whatsapp: "+5491157129911",
    address: "Mitre 480",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7230, lng: -58.2610 }
  },
  {
    id: "c90",
    name: "Coding Bootcamp No Formal La Plata",
    specialty: "Tecnología",
    type: "Institución de Cursos Web",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Desarrollo de Aplicaciones en React y Tailwind CSS",
      "Node.js Inicial y Programación de Servidores con Express",
      "Control de Versiones en Git y GitHub para Trabajo en Equipo"
    ],
    whatsapp: "+54922158402211",
    address: "Calle 50 Nro. 780",
    neighborhood: "La Plata (Provincia)",
    coordinates: { lat: -34.9180, lng: -57.9490 }
  },
  {
    id: "c91",
    name: "Taller de Alfarería y Torno Cerámica San Isidro",
    specialty: "Arte y Diseño",
    type: "Taller Artístico de Cerámica",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Modelado Básil en Torno Alfarero de Piezas de Mesa",
      "Preparación de Esmaltes de Alta Temperatura de Ceniza",
      "Decoración Bajo Cubierta y Técnicas de Calado"
    ],
    whatsapp: "+5491168241122",
    address: "Rivadavia 150",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4680, lng: -58.5110 }
  },
  {
    id: "c92",
    name: "Instituto de Tapicería y Lustrado de Muebles Lanús",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Muebles",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Tapicería Tradicional de Sillas y Sofás en Resortes",
      "Lustrado a Muñeca con Goma Laca para Antigüedades",
      "Colocación de Resortes e Interiores de cinchas elásticas"
    ],
    whatsapp: "+5491129388833",
    address: "Salta 1900",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7150, lng: -58.3750 }
  },
  {
    id: "c93",
    name: "Academia del Café y Barismo Profesional Campana",
    specialty: "Gastronomía",
    type: "Instituto de Barismo No Formal",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Técnicas de Extracción de Café Espresso Perfecto",
      "Taller de Arte Latte Clásico e Corazones y Tulipanes",
      "Gestión de cafeterías de Especialidad y Proveedores"
    ],
    whatsapp: "+5493489584422",
    address: "Av. Rocca 150",
    neighborhood: "Campana (Provincia)",
    coordinates: { lat: -34.1620, lng: -58.9590 }
  },
  {
    id: "c94",
    name: "Escuela Profesional de Cosmiatría Adrogué",
    specialty: "Estética y Bienestar",
    type: "Escuela de Belleza Holística",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cosmiatría Aplicada a Pieles Sensibles y Acnéicas",
      "Técnicas de Masaje Facial Kobido Japones Rejuvenecedor",
      "Drenaje Linfático Manual Facial Completo"
    ],
    whatsapp: "+5491157124499",
    address: "Drumond 320",
    neighborhood: "Almirante Brown (Provincia)",
    coordinates: { lat: -34.7960, lng: -58.3810 }
  },
  {
    id: "c95",
    name: "Taller Libre de Guitarra y Percusión Escobar",
    specialty: "Arte y Diseño",
    type: "Taller Comunitario Artístico",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Guitarra Popular y Canto Colectivo de Fogón",
      "Cajón Peruano y Ritmos Latinoamericanos",
      "Iniciación al Charango y Técnicas de Rasgueo"
    ],
    whatsapp: "+5493484589911",
    address: "Mitre 850",
    neighborhood: "Escobar (Provincia)",
    coordinates: { lat: -34.3490, lng: -58.7990 }
  },
  {
    id: "c96",
    name: "Taller de Costura y Telas Elásticas Claypole",
    specialty: "Oficios y Técnica",
    type: "Taller Textil Independiente",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Costura y armado de Bikinis, Mallas y Lencería Elástica",
      "Enhebrado y Ajuste del Tensor de Máquina Overlock",
      "Moldería y Escala de talles para Ropa interior Femenina"
    ],
    whatsapp: "+5491129381143",
    address: "Alcorta 650",
    neighborhood: "Almirante Brown (Provincia)",
    coordinates: { lat: -34.8110, lng: -58.3410 }
  },
  {
    id: "c97",
    name: "Bootcamp Front-End y Diseño UX/UI Morón Sur",
    specialty: "Tecnología",
    type: "Academia de Tecnología de Comunidad",
    modality: "Híbrido",
    certification: "Propia",
    courses: [
      "Diseño de Interfaces de Usuario con Figma y Componentes",
      "Desarrollo Web Eficiente con HTML, CSS y Javascript",
      "Maquetación Responsive con Tailwind CSS y Flexbox"
    ],
    whatsapp: "+5491138402266",
    address: "Av. Don Bosco 1400",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6650, lng: -58.6110 }
  },
  {
    id: "c98",
    name: "Taller de Panadería de Masa Madre San Fernando Centro",
    specialty: "Gastronomía",
    type: "Taller de Gastronomía Común",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Cultivo y Cuidado de la Levadura Salvaje (Masa Madre)",
      "Panes Rústicos Integrales y Baguettes con Largos Tiempos",
      "Focaccias Decoradas con Hierbas y Aceites Aromáticos"
    ],
    whatsapp: "+5491168241177",
    address: "Sarmiento 420",
    neighborhood: "San Fernando (Provincia)",
    coordinates: { lat: -34.4390, lng: -58.5630 }
  },
  {
    id: "c99",
    name: "Escuela del Vestido e Indumentaria Lomas de Zamora",
    specialty: "Arte y Diseño",
    type: "Colegio de Diseños No Formal",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Sastrería Masculina: Sacos, Chalecos y Pantalones Clásicos",
      "Diseño Textil e Estampados de Moda Rápida",
      "Patronaje y Graduación Industrial sobre moldes de Papel"
    ],
    whatsapp: "+5491129487733",
    address: "Loria 490",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7615, lng: -58.4060 }
  },
  {
    id: "c100",
    name: "Club de Idioma Ruso Vicente López",
    specialty: "Idiomas",
    type: "Club Cultural de Idiomas No Formal",
    modality: "Online",
    certification: "Sin Certificación",
    courses: [
      "Idioma Ruso Inicial y Alfabeto Cirílico",
      "Conversación Práctica y Literatura de Autores Clásicos",
      "Vocabulario de Viaje y Tradiciones Culturales"
    ],
    whatsapp: "+5491138401144",
    address: "Carlos Pellegrini 1450",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5260, lng: -58.4860 }
  },
  {
    id: "c101",
    name: "Taller Mecánico de Motos de Alta Cilindrada Wilde",
    specialty: "Oficios y Técnica",
    type: "Escuela de Oficios de Motores de Carrera",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Puesta a Punto de Motores de Cilindrada Superior a 250cc",
      "Sistemas de Amortiguación Monoshock y Horquillas Invertidas",
      "Diagnóstico Electrónico de Computadora de Motores Japoneses"
    ],
    whatsapp: "+5491157121100",
    address: "Avenida Mitre 5800",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6980, lng: -58.3150 }
  },
  {
    id: "c102",
    name: "Estudio de Luthería y Reparación de Violines Quilmes",
    specialty: "Arte y Diseño",
    type: "Taller de Construcción de Instrumentos Acústicos",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Iniciación al Tallado de las Tapas de Violines y violas",
      "Lustrado y Barnizado Natural al Alcohol y Aceite",
      "Ajustado de Almas, Puentes y Clavijas de Ébano"
    ],
    whatsapp: "+5491129381154",
    address: "Alvear 210",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7210, lng: -58.2540 }
  },
  {
    id: "c103",
    name: "Centro de Capacitación Práctica de Refrigeración Tigre",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Refrigeración Doméstica",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Detección de Fugas de Gas y Soldadura de Caños de Cobre",
      "Reparación de Heladeras No Frost y Controles Electrónicos Lógicos",
      "Instalación y Limpieza Integral de Unidades Split de Aire"
    ],
    whatsapp: "+5491157122211",
    address: "Italia 850",
    neighborhood: "Tigre (Provincia)",
    coordinates: { lat: -34.4210, lng: -58.5830 }
  },
  {
    id: "c104",
    name: "Taller de Alimentos Saludables y Conservas Lomas Sur",
    specialty: "Gastronomía",
    type: "Escuela Familiar Gastronómica",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Elaboración Segura de Escabeches, Mermeladas y Salsas de Tomate",
      "Técnicas de Envasado al Vacío y Pasteurizado en Agua Hirviendo",
      "Fermentaciones de Alimentos: Chucrut, Kimchi e Introducción al kéfir"
    ],
    whatsapp: "+5491129381177",
    address: "Garibaldi 1200",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7730, lng: -58.4090 }
  },
  {
    id: "c105",
    name: "Academia de Barbería de Vanguardia Ramos Mejía Noroeste",
    specialty: "Estética y Bienestar",
    type: "Instituto de Barbería Contemporánea",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Cortes Modernos: Degradados con Navaja y Máquina (Fade)",
      "Tatuajes de Pelo y Líneas de Estilo en Cuero Cabelludo (Hair Tattoo)",
      "Tratamiento Tradicional de la Barba de Toalla Caliente"
    ],
    whatsapp: "+5491138402241",
    address: "Alsina 210",
    neighborhood: "Ramos Mejía (Provincia)",
    coordinates: { lat: -34.6530, lng: -58.5610 }
  },
  {
    id: "c106",
    name: "Curso de Desarrollo Full-Stack Tecnológica San Martín",
    specialty: "Tecnología",
    type: "Academia de Código No Académica",
    modality: "Online",
    certification: "Oficial",
    courses: [
      "Estructuras Avanzadas de Base de Datos PostgreSQL y Knex.js",
      "Desarrollo Backend en Node.js, Express y Autenticación con JWT",
      "Deploy de Servidores y Aplicaciones Web en Plataformas Cloud"
    ],
    whatsapp: "+5491157122243",
    address: "San Luis 1950 (Campus Virtual)",
    neighborhood: "San Martín (Provincia)",
    coordinates: { lat: -34.5750, lng: -58.5390 }
  },
  {
    id: "c107",
    name: "Taller Comunitario de Carpintería Florencio Varela",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario de Maderas",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Construcción Práctica de Bancos de Madera, Banquitos y Estantes",
      "Tratamiento y Conservación de Maderas Económicas de Eucalipto",
      "Pintura, Decapado y Acabado rústico para Muebles de Jardín"
    ],
    whatsapp: "+5491129381112",
    address: "Chacabuco 1450",
    neighborhood: "Florencio Varela (Provincia)",
    coordinates: { lat: -34.8110, lng: -58.2750 }
  },
  {
    id: "c108",
    name: "Estudio de Pintura Óleo y Técnicas Clásicas Olivos",
    specialty: "Arte y Diseño",
    type: "Escuela de Bellas Artes Sutiles No Formal",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Iniciación al Óleo: Teoría del Color y Mezclas de Pigmentos",
      "Técnicas de Veladuras Clásicas y Espátula sobre Lienzo",
      "Taller de Dibujo de Retratos e Sombras con Carbonilla"
    ],
    whatsapp: "+5491168241133",
    address: "Corrientes 1200",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5120, lng: -58.4890 }
  },
  {
    id: "c109",
    name: "Taller de Pastelería para Eventos San Justo Centro",
    specialty: "Gastronomía",
    type: "Instituto Gastronómico Práctico",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Pastelería para Eventos Infantiles y Cumpleaños de 15",
      "Decoración de Tortas Forradas con Técnicas de Drip Cake",
      "Catering Dulce de Cupcakes y Cookies Temáticos"
    ],
    whatsapp: "+5491138402220",
    address: "Villegas 2450",
    neighborhood: "San Justo (Provincia)",
    coordinates: { lat: -34.6750, lng: -58.5590 }
  },
  {
    id: "c110",
    name: "Academia del Lenguaje y Club de Italiano Adrogué",
    specialty: "Idiomas",
    type: "Club de Idiomas de Barrio",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Curso Práctico de Italiano Conversacional y Fonética",
      "Italiano Intensivo para Trámites Consulares de Ciudadanía",
      "Ciclo de Cine y Literatura Italiana Clásica"
    ],
    whatsapp: "+5491129381172",
    address: "Seguí 450",
    neighborhood: "Almirante Brown (Provincia)",
    coordinates: { lat: -34.7930, lng: -58.3850 }
  },
  {
    id: "c111",
    name: "Taller Escuela de Reparación de Instrumentos Eléctricos Munro",
    specialty: "Arte y Diseño",
    type: "Taller de Luthería de Guitarras Eléctricas",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Calibración y Octavado de Guitarras Eléctricas y Bajos Activos",
      "Soldadura de Circuitos de Micrófonos, Potenciómetros y Llaves Selectoras",
      "Rectificado y Coronado de Trastes de Madera"
    ],
    whatsapp: "+5491168242255",
    address: "Vélez Sarsfield 4500",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5290, lng: -58.5210 }
  },
  {
    id: "c112",
    name: "Academia de Masajes y Reiki Lanús Este",
    specialty: "Estética y Bienestar",
    type: "Instituto de Terapias No Formales",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Masaje Holístico Descontracturante con Piedras Calientes",
      "Iniciación al Nivel de Reiki Usui I y Sanación de Chakras",
      "Aromaterapia Aplicada al Bienestar del Hogar y Oficina"
    ],
    whatsapp: "+5491138401133",
    address: "Avenida 9 de Julio 1900",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7040, lng: -58.3710 }
  },
  {
    id: "c113",
    name: "Cursos de Instalación de Cámaras de Seguridad San Fernando Sur",
    specialty: "Oficios y Técnica",
    type: "Taller de Oficios Tecnológicos",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Conexión y Configuración de Cámaras de Vigilancia CCTV e IP",
      "Sistemas de Alarma Centralizada Domiciliaria",
      "Configuración de Acceso Remoto por Aplicación Móvil de Cámaras"
    ],
    whatsapp: "+5491157122288",
    address: "Av. Avellaneda 2100",
    neighborhood: "San Fernando (Provincia)",
    coordinates: { lat: -34.4510, lng: -58.5710 }
  },
  {
    id: "c114",
    name: "Taller de Alfarería y Arte Tradicional Luján Oeste",
    specialty: "Arte y Diseño",
    type: "Taller Comunitario Cerámico",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Alfarería Manual en Arcilla Local e Engobes de Color",
      "Quema de Cerámica a Cielo Abierto y Técnicas Tradicionales",
      "Artesanía de Arcilla Utilitaria para Cocina"
    ],
    whatsapp: "+5492323589922",
    address: "Mitre 1850",
    neighborhood: "Luján (Provincia)",
    coordinates: { lat: -34.5710, lng: -59.1350 }
  },
  {
    id: "c115",
    name: "Escuela Profesional de Panadería y Medialunas Morón Norte",
    specialty: "Gastronomía",
    type: "Cursos Clásicos de Panadería",
    modality: "Presencial",
    certification: "Oficial",
    courses: [
      "Elaboración Práctica de Medialunas de Manteca y Grasa Porteñas",
      "Panes Franceses, de Trinchera, Flautitas y Galletas rústicas",
      "Rosca de Pascua Tradicional y Donas Rellenas de Dulce de Leche"
    ],
    whatsapp: "+5491138404499",
    address: "Sarmiento 1100",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6460, lng: -58.6230 }
  },
  {
    id: "c116",
    name: "Coding Academy No Formal Quilmes Oeste",
    specialty: "Tecnología",
    type: "Academia de Software No Formal",
    modality: "Online",
    certification: "Propia",
    courses: [
      "Fundamentos de ReactJS y Desarrollo Web Frontend Moderno",
      "HTML5 Semántico, CSS Grid, Flexbox y animaciones aplicadas",
      "Fundamentos de Lógica de Programación e Algoritmos con Javascript"
    ],
    whatsapp: "+5491129381152",
    address: "Andrés Baranda 1450 (Campus Virtual)",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7290, lng: -58.2750 }
  },
  {
    id: "c117",
    name: "Taller Textil de Patronaje y Confección Wilde",
    specialty: "Oficios y Técnica",
    type: "Taller Textil Comunitario",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Patronaje Básico de Remeras, Buzos de Frisa y Joggings",
      "Operación Segura de Máquinas de Coser Collareta y Rectas",
      "Círculo de Costura e Intercambio de Retazos Comunales"
    ],
    whatsapp: "+5491129382255",
    address: "Mendoza 1200",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6990, lng: -58.3220 }
  },
  {
    id: "c118",
    name: "Estudio de Canto Profesional y Técnica Vocal Vicente López",
    specialty: "Arte y Diseño",
    type: "Estudio de Música Independiente",
    modality: "Presencial",
    certification: "Propia",
    courses: [
      "Respiración Diafragmática y Calentamiento de Cuerdas Voces",
      "Interpretación de Canciones Populares y Afinación de Oído",
      "Pérdida de Pánico Escénico y Manejo Práctico de Micrófono"
    ],
    whatsapp: "+5491168241198",
    address: "Sarmiento 1400",
    neighborhood: "Vicente López (Provincia)",
    coordinates: { lat: -34.5240, lng: -58.4840 }
  },
  {
    id: "c119",
    name: "Academia Estética de Depilación y Cejas Florencio Varela",
    specialty: "Estética y Bienestar",
    type: "Escuela de Belleza Facial",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Perfilado de Cejas Clásico y Planchado de Vellos Rebeldes",
      "Depilación Sistema Español Clásico con Cera Descartable",
      "Tinte Completo de Pestañas con Henna Vegetal de Larga Duración"
    ],
    whatsapp: "+5491129381199",
    address: "Monteagudo 1800",
    neighborhood: "Florencio Varela (Provincia)",
    coordinates: { lat: -34.8140, lng: -58.2820 }
  },
  {
    id: "c120",
    name: "Taller Comunitario de Soldadura Eléctrica y Herrería Claypole",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Soldadura Física",
    modality: "Presencial",
    certification: "Sin Certificación",
    courses: [
      "Instalación de rejas e soldaduras por arco manual electrodo",
      "Prácticas Seguras de Amolado, Corte de Barras de Hierro Macizo",
      "Hornos e Instrumentos de Herrería de Jardín"
    ],
    whatsapp: "+5491129383322",
    address: "Aconquija 420",
    neighborhood: "Almirante Brown (Provincia)",
    coordinates: { lat: -34.8150, lng: -58.3490 }
  },
  {
    id: "c121",
    name: "Academia de Estética Capilar y Cosmetología Integral Lomas",
    specialty: "Estética y Bienestar",
    type: "Academia de Capacitación Capilar",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Peluquería Unisex con Diseño de Cortes",
      "Tratamientos Nutritivos e Hidratación Capilar",
      "Peinados de Fiesta, Eventos y Novias"
    ],
    whatsapp: "+5491158902233",
    address: "Sarmiento 220",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7625, lng: -58.4065 }
  },
  {
    id: "c122",
    name: "Taller de Alfarería y Torno Cerámico La Estación Banfield",
    specialty: "Arte y Diseño",
    type: "Taller Cerámico Comunitario",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Manejo de Arcilla de Alta Temperatura en Torno Alfarero",
      "Preparación de Esmaltes de Ceniza y Óxidos Metálicos",
      "Modelado de Vajilla Utilitaria de Uso Diario"
    ],
    whatsapp: "+5491138402299",
    address: "French 450",
    neighborhood: "Lomas de Zamora (Provincia)",
    coordinates: { lat: -34.7450, lng: -58.3970 }
  },
  {
    id: "c123",
    name: "Centro de Oficios Gastronómicos de Pastelería San Miguel",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Pastelería Comercial con Técnicas Modernas de Decoración",
      "Elaboración de Facturas Porteñas y Masas Finas",
      "Taller Práctico de Chocolatería y Bombones Artesanales"
    ],
    whatsapp: "+5491157123399",
    address: "Av. Pres. Arturo Umberto Illia 1250",
    neighborhood: "San Miguel (Provincia)",
    coordinates: { lat: -34.5450, lng: -58.7180 }
  },
  {
    id: "c124",
    name: "Academia de Diseño Web Frontend y Experiencia UX Martínez",
    specialty: "Tecnología",
    type: "Bootcamp de Desarrollo Digital",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "Sí",
    courses: [
      "Maquetación Web Responsive con HTML5 y Tailwind CSS",
      "Diseño de Interfaces de Usuario con Figma y Sistemas de Variables",
      "Interactividad de Clientes y APIs con Javascript Moderno"
    ],
    whatsapp: "+5491138401188",
    address: "Av. Santa Fe 1200",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4890, lng: -58.4980 }
  },
  {
    id: "c125",
    name: "Estética de Mascotas y Peluquería Canina Villa Urquiza",
    specialty: "Estética y Bienestar",
    type: "Escuela Profesional de Oficios para Mascotas",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Iniciación al Grooming Comercial de Razas Pequeñas",
      "Baño Higiénico, Corte de Uñas y Limpieza de Oídos",
      "Manejo de Tijera de Entresacar y Cortes Comunes de Caniche"
    ],
    whatsapp: "+5491168241144",
    address: "Av. Triunvirato 4100",
    neighborhood: "Villa Urquiza",
    coordinates: { lat: -34.5750, lng: -58.4870 }
  },
  {
    id: "c126",
    name: "Taller Textil de Moldería y Diseño de Vestidos Flores",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela Textil No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Patronaje y Tizado Industrial de Prendas Femeninas",
      "Uso Completo de Máquinas de Coser Overlock y Rectas",
      "Confección de Faldas, Pantalones y Camisas de Vestir"
    ],
    whatsapp: "+5491138402255",
    address: "Av. Avellaneda 2800",
    neighborhood: "Flores",
    coordinates: { lat: -34.6295, lng: -58.4720 }
  },
  {
    id: "c127",
    name: "Escuela de Oficios Mecánicos de Motocicletas Pilar",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Motores",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Mecánica General de Motores de Calle (110cc a 250cc)",
      "Carburación, Encendido Eléctrico y Afinación Clásica",
      "Sistemas de Transmisión por Cadena y Frenos de Disco"
    ],
    whatsapp: "+5491157121122",
    address: "Ruta 8 Nro. 890",
    neighborhood: "Pilar (Provincia)",
    coordinates: { lat: -34.4530, lng: -58.9190 }
  },
  {
    id: "c128",
    name: "Instituto de Reparación de Computadoras y Notebooks San Justo",
    specialty: "Oficios y Técnica",
    type: "Escuela Práctica de Oficios de Hardware",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Armado, Configuración y Mantenimiento de Computadoras de Escritorio",
      "Detección de Fallas en Placa Madre y Reemplazo de Componentes",
      "Reparación Física de Notebooks, Bisagras y Pantallas LCD"
    ],
    whatsapp: "+5491138404411",
    address: "Villegas 2200",
    neighborhood: "San Justo (Provincia)",
    coordinates: { lat: -34.6785, lng: -58.5615 }
  },
  {
    id: "c129",
    name: "Taller de Encuadernación y Restauración de Libros Almagro",
    specialty: "Arte y Diseño",
    type: "Cursos Libres de Artes del Papel",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Encuadernación Artesanal de Tapa Dura e Costura Copta",
      "Restauración Básica de Libros Antiguos y Tratamientos del Papel",
      "Marmoleado Húmedo de Papel y Creación de Guardas"
    ],
    whatsapp: "+5491129381166",
    address: "Guardia Vieja 3600",
    neighborhood: "Almagro",
    coordinates: { lat: -34.6045, lng: -58.4170 }
  },
  {
    id: "c130",
    name: "Academia de Barismo Profesional y Arte Latte Recoleta",
    specialty: "Gastronomía",
    type: "Academia de Barismo No Formal",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "Sí",
    courses: [
      "Técnicas de Extracción del Café e Espresso Perfecto",
      "Taller Práctico de Arte Latte: Corazones, Tulipanes y Cisnes",
      "Administración y Proveedores de Cafeterías de Especialidad"
    ],
    whatsapp: "+5491138402212",
    address: "Junín 1400",
    neighborhood: "Recoleta",
    coordinates: { lat: -34.5915, lng: -58.3975 }
  },
  {
    id: "c131",
    name: "Centro de Idioma Chino Mandarín y Caligrafía Belgrano",
    specialty: "Idiomas",
    type: "Academia de Idiomas No CABA/Provincia",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Introducción al Chino Mandarín Conversacional - Nivel HSK 1",
      "Taller Práctico de Escritura y Caligrafía de Caracteres Hanzi",
      "Cultura, Costumbres y Negocios en el Contexto Asiático"
    ],
    whatsapp: "+5491129381133",
    address: "Arribeños 2150",
    neighborhood: "Belgrano",
    coordinates: { lat: -34.5575, lng: -58.4475 }
  },
  {
    id: "c132",
    name: "Taller de Mosaico Veneciano y Vitroles Artísticos Lanús",
    specialty: "Arte y Diseño",
    type: "Taller Comunitario de Vitrales",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Corte y Colocación de Mosaicos Venecianos sobre Superficies",
      "Ensamble de Vitrales con Cinta de Cobre (Técnica Tiffany)",
      "Creación de Espejos y Cuadros Decorativos en Mosaico"
    ],
    whatsapp: "+5491168242211",
    address: "Iberlucea 2800",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7045, lng: -58.3920 }
  },
  {
    id: "c133",
    name: "Instituto de Reparación de Heladeras y Equipos de Climatizacíon Morón",
    specialty: "Oficios y Técnica",
    type: "Cursos Prácticos de Refrigeración",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Instalación Domiciliaria de Aire Acondicionado Split y Ventana",
      "Cambio de Motores Compresores y Termostatos en de Heladeras",
      "Soldadura de Cañerías de Cobre con Soplete de Gas MAPP"
    ],
    whatsapp: "+5491138405522",
    address: "Belgrano 450",
    neighborhood: "Morón (Provincia)",
    coordinates: { lat: -34.6515, lng: -58.6235 }
  },
  {
    id: "c134",
    name: "Academia de Redes Sociales y Marketing de Contenidos Palermo",
    specialty: "Tecnología",
    type: "Instituto de Habilidades Digitales No Formal",
    modality: "Online",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Creación de Calendario Editorial y Estrategias en Instagram y TikTok",
      "Introducción a la Publicidad Digital en Meta Ads y Google Search",
      "Edición de Video en CapCut para Marcas Personales y Emprendedores"
    ],
    whatsapp: "+5491138472288",
    address: "Av. Santa Fe 3400 (Sede Virtual)",
    neighborhood: "Palermo",
    coordinates: { lat: -34.5820, lng: -58.4110 }
  },
  {
    id: "c135",
    name: "Escuela del Pan de Masa Madre y Facturería Tradicional Quilmes",
    specialty: "Gastronomía",
    type: "Taller Gastronómico Común",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Creación, Cuidado y Alimentación de Masa Madre Silvestre",
      "Panes Rústicos Integrales, Baguettes y Ciabattas de Alta Hidratación",
      "Focaccias Decoradas e Introducción a la Masa de Pizza de Larghísima Fermentación"
    ],
    whatsapp: "+5491129382277",
    address: "Garibaldi 150",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7225, lng: -58.2615 }
  },
  {
    id: "c136",
    name: "Taller Comunitario de Tejido Elástico y Lencería Avellaneda",
    specialty: "Oficios y Técnica",
    type: "Taller Textil Independiente",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Diseño y Confección de Vestidos de Baño, Bikinis y Mallas",
      "Hebrado, Tensado y Operación de Maquinaria Overlock Familiar",
      "Moldería Básica y Escala de talles de Ropa Interior Femenina"
    ],
    whatsapp: "+5491129381192",
    address: "Alsina 180",
    neighborhood: "Avellaneda (Provincia)",
    coordinates: { lat: -34.6625, lng: -58.3645 }
  },
  {
    id: "c137",
    name: "Academia de Maquillaje Social y Caracterización San Isidro Centro",
    specialty: "Estética y Bienestar",
    type: "Academia de Cosmética e Imagen",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Técnicas de Maquillaje Social para Eventos y Bodas de Novias",
      "Maquillaje de Época y Caracterización Teatral de Personajes",
      "Automaquillaje, Biotipos Cutáneos y Cuidado Diario de la Piel"
    ],
    whatsapp: "+5491158902288",
    address: "Belgrano 340",
    neighborhood: "San Isidro (Provincia)",
    coordinates: { lat: -34.4735, lng: -58.5090 }
  },
  {
    id: "c138",
    name: "Asociación del Calzado, Carteras y Artículos de Cuero Lanús Oeste",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela de Marroquinería",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    courses: [
      "Confección Artesanal de Carteras, Mochilas y Billeteras en Cuero y PU",
      "Aparado de Calzado y Técnicas de Costuras Manuales de Zapatero",
      "Diseño y Moldería de Bolsos de Mano de Uso Urbano"
    ],
    whatsapp: "+5491138403399",
    address: "Av. 25 de Mayo 420",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7015, lng: -58.3965 }
  },
  {
    id: "c139",
    name: "Taller Artesanal de Serigrafía Textil y Estampado Moreno Norte",
    specialty: "Arte y Diseño",
    type: "Taller Comunitario de Estampas",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Estampado de Remeras con Shablones de Madera y Plásticos",
      "Preparado de Tintas al Agua, Tintas Plastisol y Pigmentaciones Especiales",
      "Grabado de Cuadros por Emulsión Fotográfica Casera con Lámpara"
    ],
    whatsapp: "+5491168241155",
    address: "Libertador 450",
    neighborhood: "Moreno (Provincia)",
    coordinates: { lat: -34.6435, lng: -58.7895 }
  },
  {
    id: "c140",
    name: "Club de Idioma Portugués y Cultura de Brasil Caseros Norte",
    specialty: "Idiomas",
    type: "Club de Idiomas Comunitario",
    modality: "Online",
    certification: "Propia",
    nationalCertification: "No",
    courses: [
      "Portugués Inicial Conversacional enfocado en Turismo",
      "Cultura, Lecturas de Autores Brasileños y Música Popular Bossa Nova",
      "Portugués de Negocios y Reglas Gramaticales Básicas"
    ],
    whatsapp: "+5491129384411",
    address: "Urquiza 4940 (Sede Virtual)",
    neighborhood: "Tres de Febrero (Provincia)",
    coordinates: { lat: -34.6035, lng: -58.5585 }
  },
  {
    id: "c141",
    name: "Academia del Oficio Gastronómico de la Cañada Córdoba",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "cordoba",
    courses: [
      "Chef Profesional en Panadería y Pastelería",
      "Cocina Criolla con Técnicas de Emplatado Moderno",
      "Barismo e Introducción a la Cafetería de Especialidad"
    ],
    whatsapp: "+5493512204488",
    address: "Av. Marcelo T. de Alvear 450",
    neighborhood: "Nueva Córdoba",
    coordinates: { lat: -31.4195, lng: -64.1882 }
  },
  {
    id: "c142",
    name: "Córdoba Tech Bootcamp & IA",
    specialty: "Tecnología",
    type: "Academia de Software No Formal",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "Sí",
    provinceId: "cordoba",
    courses: [
      "Fullstack Web Developer: Node.js, Express y React",
      "Herramientas de Inteligencia Artificial para Oficios y PyMEs",
      "Introducción a la Ciencia de Datos y Machine Learning"
    ],
    whatsapp: "+5493516640022",
    address: "24 de Septiembre 1100",
    neighborhood: "General Paz",
    coordinates: { lat: -31.4110, lng: -64.1685 }
  },
  {
    id: "c143",
    name: "Instituto del Vestido y Alta Costura del Paraná Rosario",
    specialty: "Arte y Diseño",
    type: "Escuela Textil No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "santa-fe",
    courses: [
      "Sastrería Masculina, Sacos y Tapados",
      "Diseño de Indumentaria y Moldería para Lencería",
      "Enhebrado y Costura en Overlock Industrial"
    ],
    whatsapp: "+5493415842233",
    address: "Urquiza 1420",
    neighborhood: "Centro (Rosario)",
    coordinates: { lat: -32.9431, lng: -60.6385 }
  },
  {
    id: "c144",
    name: "Centro de Estética e Imagen Integral Mendoza",
    specialty: "Estética y Bienestar",
    type: "Academia de Cosmética e Imagen",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "mendoza",
    courses: [
      "Peluquería de Vanguardia y Colorimetría Avanzada",
      "Cosmetología Médica Complementaria y Biotipos Cutáneos",
      "Manicuría y Esculpidas en Gel y Acrílico"
    ],
    whatsapp: "+5492613840011",
    address: "Emilio Civit 520",
    neighborhood: "Quinta Sección (Mendoza)",
    coordinates: { lat: -32.8945, lng: -68.8580 }
  },
  {
    id: "c145",
    name: "Taller de Alfarería y Cerámica del Valle de Salta",
    specialty: "Arte y Diseño",
    type: "Centro de Artesanías No Formal",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "salta",
    courses: [
      "Modelado en Arcillas Locales y Técnicas de Bruñido",
      "Esmaltes Naturales y Quema en Horno de Leña de Alta Temperatura",
      "Decoración de Piezas Cerámicas con Engobes Tradicionales"
    ],
    whatsapp: "+5493874450099",
    address: "Balcarce 340",
    neighborhood: "Centro (Salta)",
    coordinates: { lat: -24.7825, lng: -65.4105 }
  },
  {
    id: "c146",
    name: "Escuela de Herrería y Carpintería Nueva Córdoba",
    specialty: "Oficios y Técnica",
    type: "Fundación de Capacitación de Oficios",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "cordoba",
    courses: [
      "Carpintería de Madera Maciza y Ensambles Tradicionales",
      "Herrería Artística, Soldadura TIG y Electrodo Revestido",
      "Restauración de Muebles Antiguos y Lustre a la Goma Laca"
    ],
    whatsapp: "+5493514210088",
    address: "San Lorenzo 320",
    neighborhood: "Nueva Córdoba",
    coordinates: { lat: -31.4248, lng: -64.1862 }
  },
  {
    id: "c147",
    name: "Asociación de Hotelería y Gastronomía de Punilla",
    specialty: "Gastronomía",
    type: "Instituto del Gremio Hotelero Gastronómico",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "cordoba",
    courses: [
      "Atención al Cliente, Hotelería y Recepción Profesional",
      "Buffet Frío, Catering para Eventos Corporativos y Banquetes",
      "Mozo de Salón de Alta Gama y Sumillería Inicial"
    ],
    whatsapp: "+5493541422003",
    address: "Av. San Martín 680",
    neighborhood: "Villa Carlos Paz",
    coordinates: { lat: -31.4116, lng: -64.4925 }
  },
  {
    id: "c148",
    name: "Taller de Costura y Confección Alta Córdoba",
    specialty: "Oficios y Técnica",
    type: "Escuela Taller de Costura No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "No",
    provinceId: "cordoba",
    courses: [
      "Operación de Overlock e Interlock Industrial",
      "Moldería Básica, Corte y tizado de Prendas de Punto",
      "Arreglos de Sastrería y customización de ropa usada"
    ],
    whatsapp: "+5493514781234",
    address: "Mariano Fragueiro 1820",
    neighborhood: "Alta Córdoba",
    coordinates: { lat: -31.3985, lng: -64.1895 }
  },
  {
    id: "c149",
    name: "Academia Serrana de Idiomas y Turismo Alternativo",
    specialty: "Idiomas",
    type: "Academia de Lenguas No Formal",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "cordoba",
    courses: [
      "Inglés Práctico conversacional enfocado en Turismo de Montaña",
      "Portugués de Recepción para Coordinadores e Informantes Turísticos",
      "Ecoturismo, Senderismo Seguro y Reconocimiento de Flora Autóctona"
    ],
    whatsapp: "+5493541528822",
    address: "Juan B. Justo 140",
    neighborhood: "Villa Carlos Paz",
    coordinates: { lat: -31.4168, lng: -64.4852 }
  },
  {
    id: "c150",
    name: "Instituto Técnico de Refrigeración y Aire de Córdoba",
    specialty: "Oficios y Técnica",
    type: "Centro de Formación Técnica S.R.L.",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "cordoba",
    courses: [
      "Instalación y Service de Aires Acondicionados Split e Inverter",
      "Refrigeración Comercial, Cámaras Frigoríficas y Heladeras no-frost",
      "Reparación de Lavarropas Automáticos y Placas Electrónicas Blandas"
    ],
    whatsapp: "+5493512304050",
    address: "Castro Barros 840",
    neighborhood: "Bajo Galán",
    coordinates: { lat: -31.3992, lng: -64.2014 }
  },
  {
    id: "c151",
    name: "Centro de Formación Profesional Pichincha Rosario",
    specialty: "Oficios y Técnica",
    type: "Escuela Profesional No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "santa-fe",
    courses: [
      "Electricidad Domiciliaria Matrícula Categoría III",
      "Soldadura de Cañerías de Gas por Fusión Termoplástica",
      "Instalador Sanitario Domiciliario y Redes Cloacales Cortas"
    ],
    whatsapp: "+5493414251122",
    address: "Salta 2240",
    neighborhood: "Pichincha (Rosario)",
    coordinates: { lat: -32.9362, lng: -60.6481 }
  },
  {
    id: "c152",
    name: "Escuela Gastronómica del Litoral Santa Fe Capital",
    specialty: "Gastronomía",
    type: "Instituto Superior Incorporado No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "santa-fe",
    courses: [
      "Panadería Artesanal, Masa Madre y Medialunas Tradicionales",
      "Cursos Cortos de Sushiman y Cocina de Fusión Asiática",
      "Introducción a la Chocolatería Fina y Templado por Siembra"
    ],
    whatsapp: "+5493424567221",
    address: "San Martín 2850",
    neighborhood: "Centro (Santa Fe)",
    coordinates: { lat: -31.6421, lng: -60.7042 }
  },
  {
    id: "c153",
    name: "Espacio de Arte, Estampado y Serigrafía Pellegrini",
    specialty: "Arte y Diseño",
    type: "Estudio Taller de Arte No Formal",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "santa-fe",
    courses: [
      "Serigrafía Textil, Revelado de Shablones y Registro de Colores",
      "Sublimación de Tazas y Accesorios Metálicos y Plásticos",
      "Estampado en Vinilo de Corte y Termotransferibles"
    ],
    whatsapp: "+5493415998811",
    address: "Av. Pellegrini 1430",
    neighborhood: "Abasto (Rosario)",
    coordinates: { lat: -32.9568, lng: -60.6455 }
  },
  {
    id: "c154",
    name: "Academia de Peluquería y Estética de Santa Fe",
    specialty: "Estética y Bienestar",
    type: "Centro de Estudios No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "santa-fe",
    courses: [
      "Colorimetría e Iluminación Balayage en Cabellos Oscuros",
      "Cortes Femeninos Clásicos, Desmechados y Peinados de Fiesta",
      "Modelado de Barbas, Barbería de la Vieja Escuela y Afeitado Navaja"
    ],
    whatsapp: "+5493415124500",
    address: "Corrientes 730",
    neighborhood: "Centro (Rosario)",
    coordinates: { lat: -32.9452, lng: -60.6391 }
  },
  {
    id: "c155",
    name: "Taller de Robótica e IoT Rosario",
    specialty: "Tecnología",
    type: "Club de Tecnología No Formal",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "santa-fe",
    courses: [
      "Robótica Educativa con Bloques y Dispositivos de Bajo Costo",
      "Programación de Microcontroladores ESP32 con C++ y Wi-Fi",
      "Sensores de Humedad y Sistemas de Riego Automatizado"
    ],
    whatsapp: "+5493413554433",
    address: "Bv. Oroño 840",
    neighborhood: "Centro (Rosario)",
    coordinates: { lat: -32.9465, lng: -60.6515 }
  },
  {
    id: "c156",
    name: "Escuela de Oficios Vitivinícolas y Enología de Mendoza",
    specialty: "Gastronomía",
    type: "Instituto Tecnológico del Vino",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "mendoza",
    courses: [
      "Introducción a la Poda de Viñedos y Trabajo de Canopia",
      "Operación de Maquinaria de Bodega y Tanques de Fermentación",
      "Técnicas de Degustación Organoléptica y Cata de Malbec"
    ],
    whatsapp: "+5492614521234",
    address: "Sarmiento 210",
    neighborhood: "Quinta Sección",
    coordinates: { lat: -32.8931, lng: -68.8525 }
  },
  {
    id: "c157",
    name: "Centro de Capacitación Mecánica del Oeste Godoy Cruz",
    specialty: "Oficios y Técnica",
    type: "Taller Escuela No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "mendoza",
    courses: [
      "Diagnóstico Computarizado de Inyección Electrónica Automotriz",
      "Electricidad del Automotor y Mantenimiento de Motores de Arranque",
      "Reparación de Caja de Cambios Manuales y Embragues"
    ],
    whatsapp: "+5492615554100",
    address: "Carril Rodríguez Peña 1280",
    neighborhood: "Godoy Cruz",
    coordinates: { lat: -32.9248, lng: -68.8351 }
  },
  {
    id: "c158",
    name: "Curso de Construcción Tradicional en Seco Guaymallén",
    specialty: "Oficios y Técnica",
    type: "Taller Comunitario No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "mendoza",
    courses: [
      "Instalador de Tabiquería Knauf y Revestimientos de Yeso",
      "Manejo de Steel Framing, Cálculos de Estructuras Livianas",
      "Techados Secos Prácticos y Aislación Hidrófuga e Ignífuga"
    ],
    whatsapp: "+5492616890321",
    address: "Bandera de Los Andes 2400",
    neighborhood: "Guaymallén",
    coordinates: { lat: -32.8985, lng: -68.8105 }
  },
  {
    id: "c159",
    name: "Academia de Gastronomía Andina Mendoza",
    specialty: "Gastronomía",
    type: "Escuela Profesional No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "No",
    provinceId: "mendoza",
    courses: [
      "Cata y Sommelier de Vinos de Altura de Luján de Cuyo y Uco",
      "Pastas Rellenas Italianas y Salsas Especiales del Chef",
      "Cocina de Fuegos: Asados a la Estaca, Hornos de Barro y Chinchulines"
    ],
    whatsapp: "+5492614839955",
    address: "Av. Boulogne Sur Mer 920",
    neighborhood: "Las Heras",
    coordinates: { lat: -32.8814, lng: -68.8612 }
  },
  {
    id: "c160",
    name: "Instituto de Estética Holística San Rafael",
    specialty: "Estética y Bienestar",
    type: "Taller Integral No Formal",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "mendoza",
    courses: [
      "Masajes Descontracturantes, Drenaje Linfático y Reflexología Podal",
      "Yoga Terapia aplicada, Técnicas de Respiración Pranayama",
      "Aromaterapia Científica, Mezclas Medicinales y Aceites Corporales"
    ],
    whatsapp: "+5492604620011",
    address: "Av. Mitre 540",
    neighborhood: "San Rafael",
    coordinates: { lat: -34.6135, lng: -68.3282 }
  },
  {
    id: "c161",
    name: "Taller de Tejidos Tradicionales y Confección de Salta",
    specialty: "Oficios y Técnica",
    type: "Asociación Vecinal No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "No",
    provinceId: "salta",
    courses: [
      "Tejido en Telar Criollo, Hilados de Lana de Oveja y Llama",
      "Bordado a Mano de Flores, Tapices y Confección de Ponchos",
      "Tintes Naturales usando Raíces, Hojas y Cochinilla"
    ],
    whatsapp: "+5493874987211",
    address: "Caseros 1100",
    neighborhood: "Centro (Salta)",
    coordinates: { lat: -24.7891, lng: -65.4158 }
  },
  {
    id: "c162",
    name: "Instituto Gastronómico y Barismo Cafayate",
    specialty: "Gastronomía",
    type: "Academia Gourmet No Formal",
    modality: "Presencial",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "salta",
    courses: [
      "Barismo de Especialidad y Arte Latte Práctico",
      "Cocina Regional del NOA: Empanadas Salteñas y Humita al Plato",
      "Servicio de Bodegas y Turismo Enológico de Cafayate"
    ],
    whatsapp: "+5493868421005",
    address: "Av. Güemes Norte 150",
    neighborhood: "Cafayate",
    coordinates: { lat: -26.0691, lng: -65.9764 }
  },
  {
    id: "c163",
    name: "Centro de Oficios El Milagro Salta",
    specialty: "Oficios y Técnica",
    type: "Escuela del Obispado de Salta No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "salta",
    courses: [
      "Mecánica de Motos Monocilíndricas, Carburadores y Encendido",
      "Electricidad Auxiliar de Obra con Enfoque en Seguridad Eléctrica",
      "Sanitarista Auxiliar de Obra e Instalación de Griferías Modernas"
    ],
    whatsapp: "+5493874130099",
    address: "Mitre 1420",
    neighborhood: "Centro (Salta)",
    coordinates: { lat: -24.7816, lng: -65.4055 }
  },
  {
    id: "c164",
    name: "Escuela Salteña de Guías de Trekking y Montaña",
    specialty: "Idiomas",
    type: "Instituto de Capacitación Turística",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "salta",
    courses: [
      "Inglés Práctico para Guiados Intensivos en los Valles Calchaquíes",
      "Primeros Auxilios en Áreas Agrestes (WFR) y Navegación Terrestre",
      "Geografía Física de Salta, Senderos de Quebrada de las Conchas"
    ],
    whatsapp: "+5493875102555",
    address: "Deán Funes 280",
    neighborhood: "Centro (Salta)",
    coordinates: { lat: -24.7852, lng: -65.4124 }
  },
  {
    id: "c165",
    name: "Centro de Formación Técnica San Martín Herrería",
    specialty: "Oficios y Técnica",
    type: "Taller Cooperativo Municipal No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "buenos-aires",
    courses: [
      "Carpintería de Aluminio, Corte de Perfiles y Colocación de Vidrios",
      "Herrería y Construcción de Portones Levadizos Automáticos",
      "Introducción a la Herrería de Obra: Soldadura por Arco de Electrodo"
    ],
    whatsapp: "+5491147551020",
    address: "Av. 25 de Mayo 1420",
    neighborhood: "San Martín (Provincia)",
    coordinates: { lat: -34.5765, lng: -58.5385 }
  },
  {
    id: "c166",
    name: "Taller Textil de Confección Industrial Lanús",
    specialty: "Oficios y Técnica",
    type: "Cooperativa de Trabajo Textil Sede Lanús",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "No",
    provinceId: "buenos-aires",
    courses: [
      "Confección en Máquina Recta, Collareta y Overlock Industrial",
      "Moldería para Indumentaria de Bebés y Niños Pequeños",
      "Planificación de Producción Textil en Pequeñas Empresas"
    ],
    whatsapp: "+5491157833033",
    address: "Av. Hipólito Yrigoyen 4120",
    neighborhood: "Lanús (Provincia)",
    coordinates: { lat: -34.7032, lng: -58.3912 }
  },
  {
    id: "c167",
    name: "Academia de Gastronomía y Panadería de La Plata",
    specialty: "Gastronomía",
    type: "Instituto de Gastronomía No Formal",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "Sí",
    provinceId: "buenos-aires",
    courses: [
      "Panes de Masa Madre e Introducción a la Fermentación Lenta",
      "Cocina Saludable Vegana, Nutrición Básica y Platos a Base de Plantas",
      "Curso Técnico de Seguridad e Higiene de Alimentos (Manipulador)"
    ],
    whatsapp: "+5492214221199",
    address: "Calle 12 N° 780",
    neighborhood: "La Plata (Provincia)",
    coordinates: { lat: -34.9212, lng: -57.9548 }
  },
  {
    id: "c168",
    name: "Escuela de Reparación de Computadoras y Celulares Quilmes",
    specialty: "Tecnología",
    type: "Taller de Servicios Digitales S.R.L.",
    modality: "Híbrido",
    certification: "Propia",
    nationalCertification: "No",
    provinceId: "buenos-aires",
    courses: [
      "Reparación Hardware de Smartphones Android y cambio de pantallas",
      "Electrónica básica de Notebooks, soldadura SMD y Reballing",
      "Instalación de Sistemas Operativos, Backups de Datos y Antivirus"
    ],
    whatsapp: "+5491138240404",
    address: "Mitre 620",
    neighborhood: "Quilmes (Provincia)",
    coordinates: { lat: -34.7214, lng: -58.2588 }
  },
  {
    id: "c169",
    name: "Centro de Capacitación Gastronómica Simoca",
    specialty: "Gastronomía",
    type: "Centro de Oficios de Simoca",
    modality: "Presencial",
    certification: "Oficial",
    nationalCertification: "No",
    provinceId: "tucuman",
    courses: [
      "Confección y Cocción de las tradicionales Empanadas tucumanas",
      "Pastelería Artesanal: Rosquetes, Tabletas de Miel de Caña y Dulces",
      "Elaboración de Quesos Criollos de Alta Calidad y Conservas"
    ],
    whatsapp: "+5493816223344",
    address: "Sarmiento 250",
    neighborhood: "Simoca (Tucumán)",
    coordinates: { lat: -27.2635, lng: -65.2391 }
  },
  {
    id: "c170",
    name: "Instituto de Oficios Tecnológicos Yerba Buena",
    specialty: "Tecnología",
    type: "Academia Web No Formal",
    modality: "Online",
    certification: "Propia",
    nationalCertification: "Sí",
    provinceId: "tucuman",
    courses: [
      "Introducción a la Programación con Python y Estructuras Fundamentales",
      "E-commerce de Alto Impacto para PyMEs con WooCommerce y Shopify",
      "Marketing Digital, Publicidad en Redes Meta Ads y Google Search"
    ],
    whatsapp: "+5493815556600",
    address: "Av. Aconquija 2100",
    neighborhood: "Yerba Buena (Tucumán)",
    coordinates: { lat: -26.8164, lng: -65.2952 }
  }
];
export const initialCenters: Center[] = [...staticCenters, ...additionalCenters, ...expandedCenters, ...massiveCenters];



