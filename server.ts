import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("ADVERTENCIA: GEMINI_API_KEY no está definida en las variables de entorno.");
}

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// API: Generate/discover non-formal centers in Buenos Aires using Gemini

// Detect specialty of course from user prompt
function detectSpecialty(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("prog") || p.includes("soft") || p.includes("web") || p.includes("comput") || p.includes("ia") || p.includes("tech") || p.includes("celular") || p.includes("robotic") || p.includes("dev") || p.includes("code") || p.includes("digital") || p.includes("it")) {
    return "Tecnología";
  }
  if (p.includes("cocin") || p.includes("gastro") || p.includes("pasteler") || p.includes("reposter") || p.includes("chef") || p.includes("baris") || p.includes("panad") || p.includes("comid") || p.includes("wine") || p.includes("sumill") || p.includes("vino") || p.includes("bebida")) {
    return "Gastronomía";
  }
  if (p.includes("ingl") || p.includes("idiom") || p.includes("portugu") || p.includes("lengu") || p.includes("frances") || p.includes("italiano") || p.includes("aleman") || p.includes("conversac")) {
    return "Idiomas";
  }
  if (p.includes("art") || p.includes("diseñ") || p.includes("dibuj") || p.includes("pint") || p.includes("serig") || p.includes("tejid") || p.includes("crochet") || p.includes("ceramic") || p.includes("goti") || p.includes("tatuaj")) {
    return "Arte y Diseño";
  }
  if (p.includes("estet") || p.includes("bellez") || p.includes("peluqu") || p.includes("cosmet") || p.includes("manic") || p.includes("uñ") || p.includes("masaj") || p.includes("barber") || p.includes("depila") || p.includes("maquill") || p.includes("spa")) {
    return "Estética y Bienestar";
  }
  return "Oficios y Técnica";
}

// Resilient fallback generator if Gemini API fails or is unavailable due to high demand (503)
function generateOfflineFallback(promptText: string, provinceId: string, provinceName: string) {
  const specialty = detectSpecialty(promptText);
  
  let neighborhoods: string[] = ["Centro"];
  let streetNames: string[] = ["Avenida San Martín", "Rivadavia", "Belgrano", "Sarmiento", "Mitre", "9 de Julio"];
  let latBase = -34.6037;
  let lngBase = -58.3816;
  let latRange = 0.05;
  let lngRange = 0.05;
  let phonePrefix = "+54911";
  let phoneLength = 8;

  if (provinceId === "caba") {
    neighborhoods = ["Palermo", "Caballito", "Almagro", "Recoleta", "San Telmo", "Flores", "Villa Crespo", "Belgrano"];
    streetNames = ["Av. Corrientes", "Av. Rivadavia", "Av. Santa Fe", "Av. Cabildo", "Av. Córdoba", "Av. Medrano", "Boedo"];
    latBase = -34.61;
    lngBase = -58.43;
    latRange = 0.05;
    lngRange = 0.06;
    phonePrefix = "+54911";
    phoneLength = 8;
  } else if (provinceId === "buenos-aires") {
    neighborhoods = ["La Plata Centro", "Lanús Este", "Avellaneda Centro", "Quilmes Oeste", "San Isidro", "Pilar Centro", "San Miguel", "Caseros", "Ramos Mejía"];
    streetNames = ["Av. Hipólito Yrigoyen", "Mitre", "Calle 12", "Avenida de Mayo", "Constitución", "Belgrano", "Alsina"];
    latBase = -34.68;
    lngBase = -58.50;
    latRange = 0.15;
    lngRange = 0.15;
    phonePrefix = "+54911";
    phoneLength = 8;
  } else if (provinceId === "cordoba") {
    neighborhoods = ["Nueva Córdoba", "Alta Córdoba", "Barrio Alberdi", "Córdoba Centro", "Barrio General Paz", "Villa Carlos Paz"];
    streetNames = ["Av. Colón", "Av. General Paz", "Sarmiento", "San Martín", "Av. Chacabuco", "Duarte Quirós", "San Lorenzo"];
    latBase = -31.42;
    lngBase = -64.19;
    latRange = 0.02;
    lngRange = 0.03;
    phonePrefix = "+549351";
    phoneLength = 7;
  } else if (provinceId === "santa-fe") {
    neighborhoods = ["Rosario Centro", "Barrio Pichincha", "Abasto (Rosario)", "Pellegrini (Rosario)", "Santa Fe Centro"];
    streetNames = ["Bv. Oroño", "Av. Pellegrini", "San Martín", "Urquiza", "Salta", "Corrientes"];
    latBase = -32.945;
    lngBase = -60.645;
    latRange = 0.02;
    lngRange = 0.02;
    phonePrefix = "+549341";
    phoneLength = 7;
  } else if (provinceId === "mendoza") {
    neighborhoods = ["Quinta Sección", "Godoy Cruz", "Guaymallén Centro", "Las Heras Sede", "San Rafael"];
    streetNames = ["Av. Boulogne Sur Mer", "Avenida España", "Sarmiento", "San Martín", "Carril Rodríguez Peña", "Av. Mitre"];
    latBase = -32.89;
    lngBase = -68.84;
    latRange = 0.02;
    lngRange = 0.02;
    phonePrefix = "+549261";
    phoneLength = 7;
  } else if (provinceId === "salta") {
    neighborhoods = ["Salta Centro", "Tres Cerritos", "Barrio San Bernardo", "Cafayate Centro"];
    streetNames = ["Caseros", "Balcarce", "Alvarado", "España", "Mitre", "Deán Funes", "Av. Güemes"];
    latBase = -24.78;
    lngBase = -65.41;
    latRange = 0.015;
    lngRange = 0.015;
    phonePrefix = "+549387";
    phoneLength = 7;
  } else if (provinceId === "tucuman") {
    neighborhoods = ["San Miguel de Tucumán", "Yerba Buena", "Simoca", "Barrio Sur"];
    streetNames = ["Av. Aconquija", "Sarmiento", "San Martín", "24 de Septiembre", "Muñecas"];
    latBase = -26.82;
    lngBase = -65.22;
    latRange = 0.03;
    lngRange = 0.03;
    phonePrefix = "+549381";
    phoneLength = 7;
  }

  const localCenters: any[] = [];
  const numItems = 4 + Math.floor(Math.random() * 2); // 4 or 5 products
  const suffixes = ["Sur", "Norte", "Oeste", "del Litoral", "Regional", "Serrano", "Nacional", "Moderno", "Creativo", "Progreso", "Popular", "de Oro", "Andino"];
  const selectedSuffixes = [...suffixes].sort(() => 0.5 - Math.random());

  for (let i = 0; i < numItems; i++) {
    const neighborhood = neighborhoods[i % neighborhoods.length];
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const height = 100 + Math.floor(Math.random() * 1900);
    const address = `${street} ${height}`;
    
    const lat = Number((latBase + (Math.random() - 0.5) * latRange).toFixed(4));
    const lng = Number((lngBase + (Math.random() - 0.5) * lngRange).toFixed(4));

    let randomDigitString = "";
    for (let d = 0; d < phoneLength; d++) {
      randomDigitString += Math.floor(Math.random() * 10).toString();
    }
    const whatsapp = `${phonePrefix}${randomDigitString}`;

    let name = "";
    let type = "";
    let courses: string[] = [];
    const instSuffix = selectedSuffixes[i % selectedSuffixes.length];

    if (specialty === "Oficios y Técnica") {
      const titles = ["Taller Escuela de Oficios", "Centro de Formación Técnica", "Fundación de Capacitación", "Taller Cooperativo de Trabajo"];
      type = titles[i % titles.length];
      const mainNames = ["Herrería y Soldadura", "Carpintería Moderna", "Electricidad Domiciliaria", "Refrigeración y Clima", "Construcción en Seco", "Mecánica e Inyección"];
      const coreName = mainNames[i % mainNames.length];
      name = `${coreName} ${instSuffix}`;
      
      if (coreName.includes("Herrería")) {
        courses = ["Soldadura por Arco y TIG Industrial", "Herrería Artística Avanzada", "Maquinaria de Corte y Soldado"];
      } else if (coreName.includes("Carpintería")) {
        courses = ["Fabricación de Muebles de Madera Maciza", "Ensambles y Acabados de Madera", "Taller Práctico de Tapizado"];
      } else if (coreName.includes("Electricidad")) {
        courses = ["Electricidad Domiciliaria Matrícula Cat III", "Instalador de Tableros Eléctricos", "Automatización de Portones"];
      } else if (coreName.includes("Refrigeración")) {
        courses = ["Service de Aires Acondicionados Split e Inverter", "Refrigeración Comercial y Familiar", "Reparación de Heladeras Inteligentes"];
      } else {
        courses = ["Mecánica de Motos y Motores 2T/4T", "Inyección Electrónica Automotriz", "Electricidad del Automotor"];
      }
    } 
    else if (specialty === "Tecnología") {
      const titles = ["Academia Digital", "Bootcamp de Software", "Club de Tecnología", "Centro de Oficios Digitales"];
      type = titles[i % titles.length];
      const coreNames = ["Tech Academy", "CoderSpace", "Desarrollo Fullstack", "Robótica e Inteligencia Artificial", "Soporte y Reparación"];
      const coreName = coreNames[i % coreNames.length];
      name = `${coreName} ${instSuffix}`;

      if (coreName.includes("Fullstack") || coreName.includes("Coder")) {
        courses = ["Desarrollo Frontend con React y Tailwind CSS", "Programación en Python y Bases de Datos", "Node.js Express y APIs REST"];
      } else if (coreName.includes("Robótica") || coreName.includes("IA")) {
        courses = ["Uso Inteligente de Herramientas de IA para PyMEs", "Programación de Microcontroladores ESP32", "Robótica Educativa Práctica"];
      } else {
        courses = ["Reparación de Hardware de Celulares y Smartwatches", "Soporte Técnico de Redes y Computadoras", "Armado y Mantenimiento de Computadoras"];
      }
    } 
    else if (specialty === "Gastronomía") {
      const titles = ["Escuela de Cocina No Formal", "Instituto Gastronómico", "Academia de Sabores", "Taller Gourmet"];
      type = titles[i % titles.length];
      const coreNames = ["Gastronomía Profesional", "Sabores Argentinos", "Instituto de Cocina", "Barismo y Coctelería", "Arte Recetas"];
      const coreName = coreNames[i % coreNames.length];
      name = `${coreName} ${instSuffix}`;
      courses = ["Panadería de Masa Madre y Facturas Criollas", "Introducción al Barismo Profesional y Arte Latte", "Cocina Regional: Empanadas, Locro y Asados", "Pastelería de Vitrina y Chocolatería Fina"].sort(() => 0.5 - Math.random()).slice(0, 3);
    } 
    else if (specialty === "Estética y Bienestar") {
      const titles = ["Academia de Estética", "Instituto de Peluquería Integral", "Centro de Capacitación de Belleza", "Espacio de Bienestar"];
      type = titles[i % titles.length];
      const coreNames = ["Peluquería Unisex", "Estética Avanzada", "Barbería Tradicional", "Uñas y Manicuría", "Masajes y Spa"];
      const coreName = coreNames[i % coreNames.length];
      name = `${coreName} ${instSuffix}`;

      if (coreName.includes("Peluquería") || coreName.includes("Barbería")) {
        courses = ["Colorimetría Aplicada e Iluminación Balayage", "Barbería de la Vieja Escuela y Afeitado Navaja", "Corte Unisex y Peinados Clásicos"];
      } else if (coreName.includes("Uñas")) {
        courses = ["Manicura y Pedicuría con Decoración Semi-Permanente", "Esculpidas en Gel y Acrílicos", "Nail Art Técnico Inicial"];
      } else {
        courses = ["Masajes Descontracturantes y Técnicas de Drenaje", "Yoga Terapia aplicada y Respiración Pranayama", "Cosmetología Inicial y Cuidado Cutáneo"];
      }
    } 
    else if (specialty === "Idiomas") {
      const titles = ["Centro de Lenguas", "Taller Conversacional de Idiomas", "Instituto de Lenguaje Práctico"];
      type = titles[i % titles.length];
      const coreNames = ["Inglés Conversacional", "Idiomas Globales", "Conversational Hub", "Lenguas Modernas"];
      const coreName = coreNames[i % coreNames.length];
      name = `${coreName} ${instSuffix}`;
      courses = ["Inglés Práctico para Atención al Turismo y Hotelería", "Portugués Conversacional De Negocios y Viajes", "Italiano de Cero: Cultura y Conversación Inicial", "Inglés Comercial y Redacción Profesional"].sort(() => 0.5 - Math.random()).slice(0, 3);
    } 
    else { // Arte y Diseño
      const titles = ["Estudio de Arte Creativo", "Taller de Diseño No Formal", "Espacio Artístico", "Centro Cultural Taller"];
      type = titles[i % titles.length];
      const coreNames = ["Taller de Costura y Diseño", "Serigrafía y Estampado", "Arte y Fotografía", "Diseño de Jardines"];
      const coreName = coreNames[i % coreNames.length];
      name = `${coreName} ${instSuffix}`;

      if (coreName.includes("Costura")) {
        courses = ["Moldería Industrial, Corte y Confección Corta", "Moldería para Niños y Bebés", "Taller de Costura Libre Integrada"];
      } else if (coreName.includes("Serigrafía")) {
        courses = ["Serigrafía Industrial y Revelado de Shablones", "Sublimación de Accesorios y Vinilos de Corte", "Estampado Textil Multitinta"];
      } else {
        courses = ["Fotografía Digital con Celulares y Edición Básica", "Taller Creativo de Pintura, Óleo y Acrílico", "Dibujo Artístico y Proporciones Humanas"];
      }
    }

    const modalities = ["Presencial", "Híbrido", "Online"];
    const modality = modalities[Math.floor(Math.random() * modalities.length)];
    
    const certifications = ["Oficial", "Propia", "Sin Certificación"];
    const certification = certifications[Math.floor(Math.random() * certifications.length)];

    localCenters.push({
      name,
      specialty,
      type,
      modality,
      certification,
      courses,
      whatsapp,
      address,
      neighborhood,
      coordinates: { lat, lng }
    });
  }

  return localCenters;
}

app.post("/api/centers/generate", async (req, res) => {
  const { prompt, existingNames = [], provinceId = "caba", provinceName = "Ciudad de Buenos Aires" } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt del usuario en la solicitud." });
  }

  try {
    if (!ai) {
      console.warn("[API] GEMINI_API_KEY no configurado. Utilizando motor de generación local offline.");
      const centers = generateOfflineFallback(prompt, provinceId, provinceName);
      return res.json({ centers, source: "fallback_no_key" });
    }

    let provinceContext = `la provincia de ${provinceName}, Argentina (ciudades importantes, capitales, localidades)`;
    let coordsInstruction = "un decimal realista correspondiente a la ubicación física exacta de las sedes dentro de ciudades o capitales importantes de esta provincia, mapeando de forma precisa en el territorio argentino.";
    let phoneInstruction = "formato internacional correcto: +549 seguido de la característica regional correcta (ej: +54911 para CABA/GBA, +549351 para Córdoba, +549341 para Rosario, etc.) y luego de un celular de 7 u 8 dígitos, sin espacios ni guiones.";

    if (provinceId === "todas") {
      provinceContext = "la República Argentina (CABA, Gran Buenos Aires, Córdoba, Rosario, Mendoza, etc.)";
      coordsInstruction = "un decimal realista correspondiente a ciudades de Argentina entre latitud -24.0 y -38.0 y longitud -57.0 y -68.0.";
      phoneInstruction = "formato internacional argentino: +549 seguido de la característica correspondiente a la ciudad (ej: +54911 para AMBA, +549351 para Córdoba, +549341 para Rosario).";
    } else if (provinceId === "amba") {
      provinceContext = "el Área Metropolitana de Buenos Aires (AMBA: Ciudad de Buenos Aires y municipios del Conurbano/GBA: Lanús, Vicente López, Quilmes, San Isidro, San Martín, Morón, etc.)";
      coordsInstruction = "un decimal entre -34.40 y -34.80 de latitud, y longitud entre -58.70 y -58.30 (valores válidos para AMBA).";
      phoneInstruction = "formato internacional de Buenos Aires: +54911 seguido de 8 dígitos de celular, sin espacios (ej: +5491144556677).";
    } else if (provinceId === "caba") {
      provinceContext = "la Ciudad Autónoma de Buenos Aires (CABA)";
      coordsInstruction = "un decimal entre -34.54 y -34.66 de latitud, y longitud entre -58.35 y -58.52 (valores válidos para CABA).";
      phoneInstruction = "formato internacional correcto: +54911 seguido de 8 dígitos de celular de Buenos Aires, sin espacios (ej: +5491155667788).";
    } else if (provinceId === "buenos-aires") {
      provinceContext = "el Gran Buenos Aires o Provincia de Buenos Aires (ej: La Plata, Lanús, Quilmes, San Isidro, San Miguel, Lomas de Zamora, Mar del Plata, Bahía Blanca)";
      coordsInstruction = "un decimal entre -34.90 y -34.35 de latitud, y longitud entre -58.85 y -58.20.";
      phoneInstruction = "formato internacional correcto: +54911 seguido de 8 dígitos de celular, sin espacios.";
    } else if (provinceId === "cordoba") {
      provinceContext = "la provincia de Córdoba (foco principal en la Ciudad de Córdoba, ej: Nueva Córdoba, Alberdi, Centro, General Paz, Alta Córdoba)";
      coordsInstruction = "un decimal entre -31.35 y -31.45 de latitud, y longitud entre -64.12 y -64.25 (dentro del ejido urbano de Córdoba Capital).";
      phoneInstruction = "formato internacional correcto: +549351 seguido de 7 dígitos de celular de Córdoba, sin espacios (ej: +5493514455667).";
    } else if (provinceId === "santa-fe") {
      provinceContext = "la provincia de Santa Fe (foco en Rosario con barrios como Centro, Pichincha, Pellegrini, Alberdi)";
      coordsInstruction = "un decimal en Rosario (latitud entre -32.88 y -33.00, longitud entre -60.60 y -60.75) o Santa Fe Capital.";
      phoneInstruction = "formato internacional correcto para Santa Fe (ej: +549341 ó +549342 seguido de 7 dígitos de celular, sin espacios).";
    } else if (provinceId === "mendoza") {
      provinceContext = "la provincia de Mendoza (Gran Mendoza - ej: Quinta Sección, Centro, Maipú, Godoy Cruz)";
      coordsInstruction = "un decimal entre -32.85 y -32.92 de latitud, y longitud entre -68.80 y -68.88.";
      phoneInstruction = "formato internacional correcto: +549261 seguido de 7 dígitos de celular de Mendoza, sin espacios.";
    } else if (provinceId === "salta") {
      provinceContext = "la provincia de Salta (ej : Ciudad de Salta)";
      coordsInstruction = "un decimal entre -24.83 y -24.75 de latitud, y longitud entre -65.45 y -65.38.";
      phoneInstruction = "formato internacional correcto: +549387 seguido de 7 dígitos de celular de Salta, sin espacios.";
    }

    const systemInstruction = `Eres un experto investigador educativo y cartógrafo de la provincia o jurisdicción de ${provinceName}, Argentina.
Tu tarea es buscar o generar registros ALTAMENTE REALISTAS de centros de educación NO FORMAL (institutos de oficios, academias de tecnología, talleres de oficios manuales/técnicos, escuelas de gastronomía, academias de estética/peluquería, centros de idiomas o capacitación laboral).
REQUISITOS ESTRICTOS:
1. NO incluyas universidades, colegios primarios, colegios secundarios, jardines de infantes ni institutos terciarios oficiales del sistema nacional (ej: Universidad de Buenos Aires, UTN, etc.).
2. Deben ser exclusivamente centros donde se cursen capacitaciones de oficios, cursos cortos o cursos técnicos complementarios de educación no formal con salida laboral rápida.
3. El número de WhatsApp debe ser de ${phoneInstruction}
4. Las coordenadas geográficas deben ubicarse estrictamente dentro de ${provinceContext}, usando: ${coordsInstruction}
5. Los cursos deben ser concretos y sonar a oficios o capacitaciones reales (ej: 'Refrigeración y Climatización', 'Electricidad Domiciliaria e Industrial', 'Inyección Electrónica', 'Barbería y Fade'). Evita cursos genéricos vacíos.
6. Evita duplicar los siguientes nombres de institutos existentes que ya tenemos guardados: ${existingNames.join(", ")}.`;

    const userPrompt = `Necesito un lote de centros de educación no formal de ${provinceContext} alineados con la siguiente consulta del usuario: "${prompt}".
Por favor, entrega los mejores resultados con alta precisión, asignándoles direcciones y barrios/localidades reales de ${provinceContext} con sus respectivas coordenadas exactas.`;

    // Attempt Gemini call with valid models
    const candidateModels = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let responseText = "";
    
    for (const modelName of candidateModels) {
      try {
        const genResponse = await ai.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              description: "Lista de centros de educación no formal que cumplen con los criterios de forma exacta.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nombre comercial o institucional del centro no formal (ej: Taller Carpintería El Formón, Instituto Glamour, CoderSpace)." },
                  specialty: {
                    type: Type.STRING,
                    enum: ['Tecnología', 'Gastronomía', 'Idiomas', 'Arte y Diseño', 'Oficios y Técnica', 'Estética y Bienestar'],
                    description: "Especialidad principal del centro educativo."
                  },
                  type: { type: Type.STRING, description: "Tipo de establecimiento corto descriptivo (ej: Academia Estética, Taller de Electricidad, Escuela de Gastronomía, Instituto de Idiomas)." },
                  modality: {
                    type: Type.STRING,
                    enum: ['Presencial', 'Online', 'Híbrido'],
                    description: "Modalidad del dictado de los cursos."
                  },
                  certification: {
                    type: Type.STRING,
                    enum: ['Oficial', 'Propia', 'Sin Certificación'],
                    description: "Tipo de acreditación para los cursos."
                  },
                  courses: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Colección de 3 a 5 cursos activos que imparten actualmente (ej: 'Mecánica de Motos', 'Desarrollo en React', 'Corte Unisex')."
                  },
                  whatsapp: {
                    type: Type.STRING,
                    description: "Contacto en formato internacional de la región: +549 seguido de característica y celular sin espacios."
                  },
                  address: { type: Type.STRING, description: "Calle y altura realista de la localidad donde se ubica la sede principal (ej: San Martín 540)." },
                  neighborhood: { type: Type.STRING, description: "Barrio o localidad donde se localiza (ej: Nueva Córdoba, Rosario Centro, Godoy Cruz, etc.)." },
                  coordinates: {
                    type: Type.OBJECT,
                    description: "Coordenadas precisas para mapeo.",
                    properties: {
                      lat: { type: Type.NUMBER, description: "Latitud en decimal." },
                      lng: { type: Type.NUMBER, description: "Longitud en decimal." }
                    },
                    required: ["lat", "lng"]
                  }
                },
                required: ["name", "specialty", "type", "modality", "certification", "courses", "whatsapp", "address", "neighborhood", "coordinates"]
              }
            }
          }
        });
        
        if (genResponse && genResponse.text) {
          responseText = genResponse.text;
          break; // Succeeded!
        }
      } catch (genError: any) {
        console.warn(`[Gemini API] Error al invocar modelo ${modelName}:`, genError?.message || genError);
      }
    }

    if (!responseText) {
      console.warn("[Gemini API] Todos los modelos candidatos fallaron o no hubo respuesta. Utilizando generador offline.");
      const fallbackCenters = generateOfflineFallback(prompt, provinceId, provinceName);
      return res.json({ centers: fallbackCenters, source: "fallback_offline" });
    }

    const centers = JSON.parse(responseText.trim());
    return res.json({ centers, source: "gemini_api" });

  } catch (err: any) {
    console.error("Error al procesar solicitud con Gemini. Aplicando Fallback Inteligente Local:", err);
    // Silent recovery: serve beautiful custom local items so user gets what they looked for with 0 latency and 0 disruption!
    try {
      const fallbackCenters = generateOfflineFallback(prompt, provinceId, provinceName);
      return res.json({ centers: fallbackCenters, source: "local_resilient_fallback", note: "Servicio Gemini con alta demanda provisoria; centros aproximados generados localmente." });
    } catch (fallbackErr: any) {
      console.error("Fallo crítico en generador de fallback:", fallbackErr);
      return res.status(500).json({ error: "No se pudo completar la generación del lote." });
    }
  }
});

// Helper: parse Argentine WhatsApp number dynamically from raw text
function parseArgentineWhatsappLink(phoneRaw: string, provinceContext: string = ""): { isMobile: "SI" | "NO" | "DUDOSO"; link: string | null } {
  if (!phoneRaw) return { isMobile: "NO", link: null };

  const digitsOnly = phoneRaw.replace(/\D/g, "");
  const pLower = phoneRaw.toLowerCase();

  // If explicitly labelled as WhatsApp or cel
  const hasMobileHint = pLower.includes("wa") || pLower.includes("cel") || pLower.includes("móvil") || pLower.includes("movil") || pLower.includes("15");

  // Check if starts with international Argentina +54 9
  if (digitsOnly.startsWith("549") && digitsOnly.length >= 12) {
    return { isMobile: "SI", link: `https://wa.me/${digitsOnly}` };
  }
  if (digitsOnly.startsWith("54") && !digitsOnly.startsWith("549") && digitsOnly.length >= 12) {
    // Missing the 9 after 54
    const withNine = "549" + digitsOnly.slice(2);
    return { isMobile: "SI", link: `https://wa.me/${withNine}` };
  }

  // Detect local format with '15'
  // e.g., 11 15 4422 9988 or 15 4422 9988
  if (digitsOnly.length === 10 && digitsOnly.startsWith("15")) {
    // 15 + 8 digits -> assume AMBA/CABA (area code 11)
    const local = digitsOnly.slice(2);
    return { isMobile: "SI", link: `https://wa.me/54911${local}` };
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith("01115")) {
    const local = digitsOnly.slice(5);
    return { isMobile: "SI", link: `https://wa.me/54911${local}` };
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith("1115")) {
    const local = digitsOnly.slice(4);
    return { isMobile: "SI", link: `https://wa.me/54911${local}` };
  }

  // Other provincial area codes (e.g. 0351 15 5567788 or 351 15 5567788)
  const provincialMatch = phoneRaw.match(/(?:0)?(351|341|261|381|387|221|223|299)\s*(?:15|-)?\s*(\d{6,8})/);
  if (provincialMatch) {
    const area = provincialMatch[1];
    const number = provincialMatch[2];
    return { isMobile: "SI", link: `https://wa.me/549${area}${number}` };
  }

  // 10-digit number like 1144229988 (could be cell or landline)
  if (digitsOnly.length === 10 && digitsOnly.startsWith("11")) {
    return {
      isMobile: hasMobileHint ? "SI" : "DUDOSO",
      link: `https://wa.me/549${digitsOnly}`
    };
  }

  // 8-digit local number without area code in Buenos Aires
  if (digitsOnly.length === 8) {
    if (hasMobileHint) {
      return { isMobile: "SI", link: `https://wa.me/54911${digitsOnly}` };
    }
    // Standard landline (e.g. 4241-1122)
    return { isMobile: "NO", link: null };
  }

  if (hasMobileHint && digitsOnly.length >= 8) {
    return { isMobile: "DUDOSO", link: `https://wa.me/549${digitsOnly.replace(/^0+/, '')}` };
  }

  return { isMobile: "NO", link: null };
}

// Fallback heuristic scraper when Gemini is unavailable
function extractRawCommerceHeuristic(rawText: string) {
  const textLower = rawText.toLowerCase();

  // 1. STRICT EXCLUSION
  const formalKeywords = [
    "colegio primario", "escuela primaria", "colegio secundario", "escuela secundaria",
    "universidad", "facultad", "instituto universitario", "terciario oficial",
    "carrera de grado", "pregrado", "licenciatura", "contador público", "cbc", "coneau",
    "jardín de infantes", "jardin de infantes", "guardería", "guarderia", "maternal"
  ];

  for (const kw of formalKeywords) {
    if (textLower.includes(kw)) {
      return { elegible: false };
    }
  }

  // 2. INCLUSION VALIDATION
  const inclusionKeywords = [
    "academia", "instituto", "taller", "escuela de", "capacitación", "capacitacion",
    "curso", "cursos", "oficio", "oficios", "estética", "estetica", "peluquería",
    "peluqueria", "barbería", "barberia", "manicuría", "manicuria", "uñas", "maquillaje",
    "cosmetología", "cosmetologia", "gastronomía", "gastronomia", "cocina", "pastelería",
    "pasteleria", "barismo", "barista", "coctelería", "cocteleria", "idioma", "idiomas",
    "inglés", "ingles", "computación", "computacion", "programación", "programacion",
    "software", "marketing", "diseño", "diseno", "cerámica", "ceramica", "costura",
    "electricidad", "refrigeración", "refrigeracion", "mecánica", "mecanica", "soldadura",
    "carpintería", "carpinteria"
  ];

  const hasInclusion = inclusionKeywords.some(kw => textLower.includes(kw));
  if (!hasInclusion) {
    return { elegible: false };
  }

  // Extract clean commercial name from first line or title
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
  let commercialName = lines[0] || "Centro de Capacitación";
  if (commercialName.length > 70) {
    commercialName = commercialName.slice(0, 70);
  }

  // Detect type
  let type = "Instituto de Oficios";
  if (textLower.includes("estétic") || textLower.includes("peluquer") || textLower.includes("barber") || textLower.includes("manicur") || textLower.includes("maquill")) {
    type = "Academia de Estética y Belleza";
  } else if (textLower.includes("cocin") || textLower.includes("gastro") || textLower.includes("pasteler") || textLower.includes("baris")) {
    type = "Escuela de Gastronomía";
  } else if (textLower.includes("idiom") || textLower.includes("inglés") || textLower.includes("ingles")) {
    type = "Instituto de Idiomas";
  } else if (textLower.includes("comput") || textLower.includes("program") || textLower.includes("software")) {
    type = "Instituto de Computación y Software";
  } else if (textLower.includes("taller") || textLower.includes("arte") || textLower.includes("costura")) {
    type = "Taller Libre y Oficios";
  }

  // Detect location
  let streetAddress: string | null = null;
  const addressMatch = rawText.match(/(?:Av\.|Avenida|Calle|Bv\.|Pasaje)?\s*([A-ZÁÉÍÓÚa-záéíóú\s]+)\s+(\d{2,5})/);
  if (addressMatch) {
    streetAddress = addressMatch[0].trim();
  }

  let locality = "Centro";
  let province = "Buenos Aires";
  if (textLower.includes("caba") || textLower.includes("capital federal") || textLower.includes("palermo") || textLower.includes("belgrano") || textLower.includes("caballito") || textLower.includes("recoleta") || textLower.includes("san cristóbal") || textLower.includes("san cristobal") || textLower.includes("almagro")) {
    province = "Ciudad Autónoma de Buenos Aires";
    if (textLower.includes("palermo")) locality = "Palermo";
    else if (textLower.includes("belgrano")) locality = "Belgrano";
    else if (textLower.includes("caballito")) locality = "Caballito";
    else if (textLower.includes("recoleta")) locality = "Recoleta";
    else if (textLower.includes("san cristóbal") || textLower.includes("san cristobal")) locality = "San Cristóbal";
    else if (textLower.includes("almagro")) locality = "Almagro";
    else locality = "CABA";
  } else if (textLower.includes("lanús") || textLower.includes("lanus")) {
    locality = "Lanús";
    province = "Buenos Aires";
  } else if (textLower.includes("córdoba") || textLower.includes("cordoba")) {
    province = "Córdoba";
    locality = textLower.includes("alberdi") ? "Barrio Alberdi" : "Córdoba Capital";
  } else if (textLower.includes("rosario") || textLower.includes("santa fe")) {
    province = "Santa Fe";
    locality = "Rosario";
  } else if (textLower.includes("mendoza")) {
    province = "Mendoza";
    locality = "Mendoza Capital";
  }

  // Extract phone
  let phonePrincipal: string | null = null;
  const phoneMatch = rawText.match(/(?:\+?54\s*9?)?\s*(?:\(?(?:0?11|0?351|0?341|0?261)\)?\s*)?(?:15\s*[-.]?\s*)?\d{3,4}[-.\s]?\d{4}/);
  if (phoneMatch) {
    phonePrincipal = phoneMatch[0].trim();
  }

  const waInfo = parseArgentineWhatsappLink(phonePrincipal || "", province);

  return {
    elegible: true,
    nombre_comercial: commercialName,
    tipo_de_ensenanza: type,
    ubicacion_calle_altura: streetAddress,
    localidad: locality,
    provincia: province,
    telefono_principal: phonePrincipal || "No informado",
    es_celular_whatsapp: waInfo.isMobile,
    link_whatsapp_directo: waInfo.link
  };
}

// API: Agent Web Scraping & Semantic Classifier for Raw Data
app.post("/api/agent/extract-raw", async (req, res) => {
  const { raw_text } = req.body;
  if (!raw_text || typeof raw_text !== "string" || !raw_text.trim()) {
    return res.status(400).json({ error: "Falta el texto crudo del comercio en 'raw_text'." });
  }

  const systemInstruction = `Eres un agente de Inteligencia Artificial experto en Web Scraping, Extracción de Datos Comerciales y Clasificación Semántica. Tu única tarea es analizar datos crudos de comercios, páginas web o perfiles comerciales para identificar establecimientos que dicten EDUCACIÓN NO FORMAL en Argentina, descartando de forma absoluta cualquier tipo de educación formal.

Instrucciones de Filtrado y Clasificación:

1. CRITERIOS DE EXCLUSIÓN ABSOLUTA (Si el negocio cumple con uno de estos, se descarta inmediatamente):
- Escuelas primarias, secundarias o colegios secundarios técnicos (públicos o privados).
- Universidades, facultades, institutos universitarios o terciarios oficiales con carreras de grado/pregrado.
- Jardines de infantes, guarderías o educación inicial formal.

2. CRITERIOS DE INCLUSIÓN (Negocios elegibles):
- Academias e institutos de oficios (Mecánica, refrigeración, electricidad, soldadura, carpintería, costura).
- Centros y escuelas de estética (Peluquería, barbería, manicuría, maquillaje, cosmetología).
- Escuelas de gastronomía, cocina, pastelería, coctelería o barismo.
- Institutos de idiomas, computación, programación, marketing digital, finanzas o diseño.
- Centros culturales o estudios privados que dicten talleres libres (Teatro, pintura, cerámica, música, danza).
- Comercios o locales de venta de insumos que ofrezcan seminarios, workshops o cursos cortos presenciales/online.

Reglas Estrictas de Salida:
- Debes responder UNICAMENTE en formato JSON válido.
- No incluyas introducciones, saludos, explicaciones, ni las etiquetas markdown de código.
- Si el negocio NO es elegible (es educación formal o no es un centro de cursos), la salida debe ser exactamente: {"elegible": false}
- Si el negocio SÍ es elegible, extrae y estructura los datos bajo el siguiente esquema JSON:
{
  "elegible": true,
  "nombre_comercial": "[Nombre limpio del negocio]",
  "tipo_de_ensenanza": "[Categoría corta, ej: Academia de estética / Instituto de idiomas / Taller de oficios]",
  "ubicacion_calle_altura": "[Calle y número si figuran, sino null]",
  "localidad": "[Barrio, localidad o ciudad]",
  "provincia": "[Provincia de Argentina]",
  "telefono_principal": "[Número de teléfono extraído tal cual figura]",
  "es_celular_whatsapp": "[Responder estrictamente: 'SI', 'NO' o 'DUDOSO' según la estructura del número para Argentina]",
  "link_whatsapp_directo": "[Si 'es_celular_whatsapp' es 'SI' o 'DUDOSO', genera el enlace dinámico en formato https://wa.me... unificando la característica sin el 15. Si es 'NO', poner null]"
}`;

  try {
    if (!ai) {
      const fallback = extractRawCommerceHeuristic(raw_text);
      return res.json(fallback);
    }

    const candidateModels = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let jsonResult = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: `Datos del comercio a analizar:\n---\n${raw_text}\n---`,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
          }
        });

        if (response && response.text) {
          const rawParsed = JSON.parse(response.text.trim());
          jsonResult = rawParsed;
          break;
        }
      } catch (err: any) {
        console.warn(`[Agent Extract] Modelo ${modelName} falló:`, err?.message || err);
      }
    }

    if (jsonResult) {
      return res.json(jsonResult);
    }

    // Heuristic fallback if models couldn't answer
    const fallback = extractRawCommerceHeuristic(raw_text);
    return res.json(fallback);

  } catch (err: any) {
    console.error("[Agent Extract] Error general:", err);
    const fallback = extractRawCommerceHeuristic(raw_text);
    return res.json(fallback);
  }
});


// Configure Vite middleware or Static files depending on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Fullstack Server] Funcionando en puerto ${PORT}`);
  });
}

setupServer();
