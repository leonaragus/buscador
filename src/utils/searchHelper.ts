import { Center } from "../types";

export function normalizeForSearch(str: string): string {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Synonyms and trade stems common in Argentine professional training searches
const TRADE_SYNONYMS: Record<string, string[]> = {
  refrigeracion: ["refrigeracion", "refrigerador", "climatizacion", "aire acondicionado", "split", "frio"],
  climatizacion: ["refrigeracion", "climatizacion", "aire acondicionado", "split"],
  aire: ["aire", "refrigeracion", "climatizacion", "split"],
  electricista: ["electricidad", "electrico", "electrotecnia", "tableros", "industrial"],
  electricidad: ["electricidad", "electricista", "electrico", "electrotecnia", "luminaria"],
  gasista: ["gas", "gasista", "plomeria", "plomero", "sanitario", "termofusion"],
  plomeria: ["plomeria", "plomero", "gas", "sanitario", "canerias", "griferia"],
  plomero: ["plomeria", "plomero", "gas", "sanitario", "canerias"],
  mecanica: ["mecanica", "mecanico", "moto", "motos", "auto", "autos", "automotor", "inyeccion", "frenos", "chaperia", "pintura", "scanner", "cajas automaticas", "detailing"],
  mecanico: ["mecanica", "mecanico", "moto", "motos", "auto", "autos", "automotor", "inyeccion", "taller"],
  moto: ["moto", "motos", "motocicleta", "mecanica", "mecanico", "ciclomotor"],
  motos: ["moto", "motos", "motocicleta", "mecanica", "mecanico", "ciclomotor"],
  chaperia: ["chaperia", "chapa", "pintura", "sacabollos", "automotriz", "mecanica"],
  inyeccion: ["inyeccion", "electronica", "scanner", "obd2", "mecanica", "automotor", "common rail"],
  danza: ["danza", "danzas", "baile", "bailar", "ballet", "folklore", "tango", "malambo", "salsa", "bachata", "ritmos", "urbano", "contemporaneo", "flamenco", "tap", "pole dance", "chacarera", "zamba"],
  danzas: ["danza", "danzas", "baile", "ballet", "tango", "folklore", "salsa", "bachata", "ritmos"],
  baile: ["danza", "baile", "bailar", "ballet", "tango", "folklore", "salsa", "bachata", "ritmos"],
  tango: ["tango", "milonga", "danza", "baile", "canyengue"],
  folklore: ["folklore", "folclore", "malambo", "danzas nativas", "chacarera", "zamba", "bombo"],
  ballet: ["ballet", "danza clasica", "danza", "puntas", "barre"],
  salsa: ["salsa", "bachata", "ritmos latinos", "casino", "danza", "baile"],
  bachata: ["bachata", "salsa", "ritmos latinos", "danza", "baile"],
  musica: ["musica", "guitarra", "piano", "bateria", "canto", "bajo", "violin", "teclado", "produccion musical", "acordes"],
  canto: ["canto", "vocal", "voz", "afinacion", "respiracion", "musica", "cantante"],
  guitarra: ["guitarra", "criolla", "electrica", "acordes", "musica"],
  piano: ["piano", "teclado", "musica"],
  bateria: ["bateria", "percusion", "musica"],
  teatro: ["teatro", "actuacion", "actor", "actriz", "improvisacion", "dramatico", "clown", "comedia musical"],
  actuacion: ["actuacion", "teatro", "actor", "comedia musical", "escenica"],
  standup: ["stand up", "standup", "comedia", "humor", "oratoria", "teatro"],
  ceramica: ["ceramica", "alfareria", "torno", "barro", "esmaltado", "arte"],
  fotografia: ["fotografia", "foto", "iluminacion", "lightroom", "photoshop", "camara", "retrato"],
  adiestramiento: ["adiestramiento", "canino", "perro", "perros", "conducta", "grooming", "mascotas"],
  canino: ["canino", "adiestramiento", "peluqueria canina", "grooming", "perro", "mascotas"],
  grooming: ["grooming", "peluqueria canina", "canino", "perro"],
  manejo: ["manejo", "conduccion", "autoescuela", "conductor", "registro", "chofer", "vial"],
  conduccion: ["manejo", "conduccion", "autoescuela", "conductor", "manejar"],
  autoescuela: ["autoescuela", "manejo", "conduccion", "conductor"],
  programacion: ["programacion", "programador", "software", "desarrollo", "web", "bootcamp", "fullstack", "python", "javascript", "react"],
  programador: ["programacion", "programador", "software", "desarrollo", "web", "bootcamp"],
  peluqueria: ["peluqueria", "peluquero", "barberia", "barbero", "peinados", "corte", "estilista", "colorimetria", "alisados", "balayage", "tricologia"],
  peluquero: ["peluqueria", "peluquero", "barberia", "barbero", "peinados", "corte", "estilista"],
  barberia: ["barberia", "barbero", "peluqueria", "fade", "navaja", "corte masculino"],
  estetica: ["estetica", "belleza", "cosmetologia", "cosmiatria", "masajes", "spa", "pestanas", "cejas", "drenaje", "dermoestetica", "aparatologia", "peeling", "limpieza facial", "microblading", "lifting", "unas", "peluqueria", "estilismo", "bienestar", "depilacion"],
  belleza: ["belleza", "estetica", "cosmetologia", "cosmiatria", "peluqueria", "manicuria", "maquillaje", "unas", "pestanas"],
  cosmetologia: ["cosmetologia", "cosmetologa", "cosmiatria", "cosmiatra", "dermoestetica", "estetica", "facial", "peeling", "cutis", "limpieza facial"],
  cosmiatria: ["cosmiatria", "cosmiatra", "cosmetologia", "dermoestetica", "estetica", "aparatologia", "hifu", "dermapen"],
  pestanas: ["pestanas", "pestañas", "lifting", "lash", "volumen ruso", "cejas", "mirada", "extensiones"],
  cejas: ["cejas", "microblading", "laminado", "perfilado", "brow", "henna", "visagismo"],
  maquillaje: ["maquillaje", "makeup", "make up", "automaquillaje", "social", "artistico", "fx", "novias", "piel blindada"],
  masajes: ["masajes", "masaje", "masoterapia", "descontracturante", "drenaje", "linfatico", "sedativo", "spa", "maderoterapia", "reflexologia"],
  masoterapia: ["masoterapia", "masajes", "masajista", "drenaje", "terapias corporales"],
  depilacion: ["depilacion", "depiladora", "laser", "soprano", "cera", "definitiva", "sistema espanol"],
  manicuria: ["manicuria", "manicura", "unas", "nail", "pedicuria", "pedicura", "semipermanente", "acrilico", "polygel", "kapping", "soft gel"],
  manicura: ["manicuria", "manicura", "unas", "nail", "pedicuria", "pedicura"],
  unas: ["unas", "manicuria", "manicura", "nail", "esculpidas", "semipermanente", "polygel", "kapping"],
  costura: ["costura", "confeccion", "molderia", "diseno", "textil", "alta costura", "vestidos", "maquinas", "lenceria"],
  modista: ["costura", "confeccion", "molderia", "diseno", "textil"],
  cocina: ["cocina", "cocinero", "gastronomia", "chef", "pasteleria", "panaderia", "reposteria", "barista"],
  cocinero: ["cocina", "cocinero", "gastronomia", "chef", "pasteleria"],
  pasteleria: ["pasteleria", "reposteria", "panaderia", "chocolate", "dulce", "cocina"],
  idiomas: ["idiomas", "ingles", "portugues", "italiano", "frances", "conversacional", "senas"],
  ingles: ["ingles", "idiomas", "conversacional", "first"],
  aduana: ["aduana", "aduanera", "comercio exterior", "despachante", "aranceles"],
  aduanera: ["aduana", "aduanera", "comercio exterior", "despachante"],
  computacion: ["computacion", "informatica", "excel", "redes", "ofimatica", "operador", "sistemas"],
  soldadura: ["soldadura", "soldador", "herreria", "tig", "mig", "electrodo", "herrero"],
  herreria: ["herreria", "herrero", "soldadura", "forja", "hierro"],
  carpinteria: ["carpinteria", "carpintero", "muebles", "melamina", "madera"],
  cerrajeria: ["cerrajeria", "cerrajero", "llaves", "cerraduras"]
};

// Check if a single query token matches a target text (directly or via known synonyms)
function tokenMatches(token: string, targetText: string): boolean {
  if (targetText.includes(token)) return true;

  // Check synonyms
  const synonyms = TRADE_SYNONYMS[token];
  if (synonyms) {
    for (const syn of synonyms) {
      if (targetText.includes(syn)) return true;
    }
  }

  // Prefix matching if token is long enough (e.g., 'electri' matches 'electricidad')
  if (token.length >= 5 && targetText.includes(token.slice(0, 5))) {
    return true;
  }

  return false;
}

export function matchesCenterSearch(center: Center, query: string): boolean {
  const cleanQuery = normalizeForSearch(query);
  if (!cleanQuery) return true;

  const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);
  if (tokens.length === 0) return true;

  // Aggregate all searchable text for this center
  const centerText = normalizeForSearch([
    center.name,
    center.specialty,
    center.type,
    center.neighborhood,
    center.address,
    center.provinceId,
    center.modality,
    center.certification,
    ...(Array.isArray(center.courses) ? center.courses : [])
  ].join(" "));

  // All tokens must match either directly, through synonyms, or prefixes
  return tokens.every(token => tokenMatches(token, centerText));
}
