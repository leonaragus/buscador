export interface Province {
  id: string; // alphanumeric id, e.g., "caba", "buenos-aires", "cordoba"
  name: string; // Full human-readable name, e.g., "Ciudad de Buenos Aires"
  shortName: string; // 3-letter abbreviation, e.g., "CAB", "PBA", "CBA"
  lat: number; // Latitude of the province's main city/center
  lng: number; // Longitude of the province's main city/center
  zoom: number; // Dynamic map zoom levels
}

export const PROVINCES: Province[] = [
  { id: "todas", name: "Todo el País (Nacional)", shortName: "ARG", lat: -34.6037, lng: -58.3816, zoom: 5 },
  { id: "amba", name: "Buenos Aires Total (CABA + GBA)", shortName: "AMBA", lat: -34.6037, lng: -58.4500, zoom: 11 },
  { id: "caba", name: "Ciudad de Buenos Aires (CABA)", shortName: "CABA", lat: -34.6037, lng: -58.3816, zoom: 12 },
  { id: "buenos-aires", name: "Provincia de Buenos Aires", shortName: "PBA", lat: -34.9214, lng: -57.9545, zoom: 10 },
  { id: "cordoba", name: "Córdoba", shortName: "CBA", lat: -31.4135, lng: -64.1811, zoom: 11 },
  { id: "santa-fe", name: "Santa Fe", shortName: "SFE", lat: -32.9468, lng: -60.6393, zoom: 11 },
  { id: "mendoza", name: "Mendoza", shortName: "MDZ", lat: -32.8894, lng: -68.8458, zoom: 12 },
  { id: "tucuman", name: "Tucumán", shortName: "TUC", lat: -26.8241, lng: -65.2226, zoom: 12 },
  { id: "salta", name: "Salta", shortName: "SLA", lat: -24.7859, lng: -65.4117, zoom: 12 },
  { id: "entre-rios", name: "Entre Ríos", shortName: "ERS", lat: -31.7331, lng: -60.5238, zoom: 11 },
  { id: "misiones", name: "Misiones", shortName: "MIS", lat: -27.3671, lng: -55.8961, zoom: 11 },
  { id: "chaco", name: "Chaco", shortName: "CHA", lat: -27.4514, lng: -58.9867, zoom: 11 },
  { id: "corrientes", name: "Corrientes", shortName: "CRR", lat: -27.4691, lng: -58.8306, zoom: 11 },
  { id: "santiago-del-estero", name: "Santiago del Estero", shortName: "SDE", lat: -27.7834, lng: -64.2642, zoom: 12 },
  { id: "jujuy", name: "Jujuy", shortName: "JUJ", lat: -24.1858, lng: -65.2995, zoom: 12 },
  { id: "san-juan", name: "San Juan", shortName: "SJU", lat: -31.5375, lng: -68.5364, zoom: 12 },
  { id: "rio-negro", name: "Río Negro", shortName: "RNG", lat: -41.1343, lng: -71.3085, zoom: 11 },
  { id: "neuquen", name: "Neuquén", shortName: "NQN", lat: -38.9516, lng: -68.0591, zoom: 11 },
  { id: "chubut", name: "Chubut", shortName: "CHB", lat: -43.3002, lng: -65.1023, zoom: 11 },
  { id: "san-luis", name: "San Luis", shortName: "SLU", lat: -33.3017, lng: -66.3378, zoom: 12 },
  { id: "catamarca", name: "Catamarca", shortName: "CAT", lat: -28.4696, lng: -65.7852, zoom: 12 },
  { id: "la-rioja", name: "La Rioja", shortName: "LRJ", lat: -29.4110, lng: -66.8507, zoom: 12 },
  { id: "la-pampa", name: "La Pampa", shortName: "LPA", lat: -36.6167, lng: -64.2833, zoom: 11 },
  { id: "santa-cruz", name: "Santa Cruz", shortName: "SCZ", lat: -51.6226, lng: -69.2181, zoom: 11 },
  { id: "tierra-del-fuego", name: "Tierra del Fuego", shortName: "TDF", lat: -54.8019, lng: -68.3030, zoom: 12 },
  { id: "formosa", name: "Formosa", shortName: "FOR", lat: -26.1775, lng: -58.1781, zoom: 12 },
];
