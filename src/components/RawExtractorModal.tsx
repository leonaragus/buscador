import React, { useState } from "react";
import { 
  Bot, 
  X, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  Copy, 
  Check, 
  Database, 
  Phone, 
  ExternalLink, 
  FileText,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Center } from "../data/initialCenters";
import { PROVINCES } from "../data/provinces";

interface ExtractedData {
  elegible: boolean;
  nombre_comercial?: string;
  tipo_de_ensenanza?: string;
  ubicacion_calle_altura?: string | null;
  localidad?: string;
  provincia?: string;
  telefono_principal?: string;
  es_celular_whatsapp?: "SI" | "NO" | "DUDOSO";
  link_whatsapp_directo?: string | null;
}

interface RawExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCenter: (newCenter: Center) => void;
  activeProvinceId: string;
}

const PRESET_EXAMPLES = [
  {
    label: "💇‍♀️ Academia Estética (Lanús)",
    text: `Academia de Belleza y Peluquería Integral Lanús
Dictamos cursos de Barbería Profesional, Colorimetría, Corte Unisex, Manicuría Rusa y Lifting de Pestañas.
Duración: 3 a 5 meses con certificado propio y salida laboral rápida.
Estamos en Av. Hipólito Yrigoyen 4520, Lanús Oeste, Provincia de Buenos Aires.
Consultas e inscripciones por WhatsApp: 15-4422-9988 o al teléfono fijo 4241-1122.
Horarios de atención: Lunes a Sábados de 9 a 19 hs.`
  },
  {
    label: "🏫 Universidad (Prueba de Exclusión)",
    text: `Facultad de Ciencias Económicas - Universidad de Buenos Aires
Carreras de Grado Oficiales: Licenciatura en Administración, Contador Público, Actuario y Economía.
Posgrados y Maestrías universitarias reconocidas por CONEAU y Ministerio de Educación de la Nación.
Sede Central: Av. Córdoba 2122, Barrio de Recoleta, CABA.
Inscripciones al CBC: consultar vía web oficial uba.ar. Teléfono secretaría: 011 5285-6000.`
  },
  {
    label: "🍳 Escuela Gastronómica (Córdoba)",
    text: `Taller y Escuela de Sabores Cordobeses
Cursos no formales y talleres cortos: Barismo de especialidad, Pastelería moderna, Sushi y Cocina Italiana.
Modalidad presencial con insumos incluidos.
Dirección: Duarte Quirós 850, Barrio Alberdi, Córdoba Capital, Provincia de Córdoba.
Celular WhatsApp directo: +54 9 351 556-7788. Escribinos para reservar tu mesada de trabajo.`
  },
  {
    label: "🔧 Taller de Oficios (CABA)",
    text: `Centro de Oficios Técnicos San Cristóbal
Capacitación laboral intensiva: Electricidad domiciliaria e industrial, Reparación de Aire Acondicionado Split e Inverter, Plomería y Termofusión.
Clases 100% prácticas en taller propio.
Ubicación: Av. San Juan 2410, San Cristóbal, Ciudad Autónoma de Buenos Aires.
Contacto WhatsApp alumnos: 11-6890-4321. Fijo: (011) 4941-8800.`
  }
];

export default function RawExtractorModal({
  isOpen,
  onClose,
  onAddCenter,
  activeProvinceId
}: RawExtractorModalProps) {
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ExtractedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async (textToProcess?: string) => {
    const input = (textToProcess !== undefined ? textToProcess : rawText).trim();
    if (!input) {
      setErrorMsg("Por favor pega texto o datos crudos del comercio para analizar.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setJsonResponse(null);
    setParsedData(null);
    setAddedSuccess(false);

    try {
      const res = await fetch("/api/agent/extract-raw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_text: input })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error en el servidor (${res.status})`);
      }

      const data: ExtractedData = await res.json();
      const jsonStr = JSON.stringify(data, null, 2);
      setJsonResponse(jsonStr);
      setParsedData(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "No se pudo procesar la solicitud con el Agente de IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!jsonResponse) return;
    navigator.clipboard.writeText(jsonResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToDatabase = () => {
    if (!parsedData || !parsedData.elegible) return;

    // Map extracted fields to internal Center schema
    const provId = mapProvinceNameToId(parsedData.provincia, activeProvinceId);
    
    // Determine category based on type or name
    let specialty: Center["specialty"] = "Oficios y Técnica";
    const typeLower = (parsedData.tipo_de_ensenanza || "").toLowerCase();
    const nameLower = (parsedData.nombre_comercial || "").toLowerCase();
    const combined = `${typeLower} ${nameLower}`;

    if (combined.includes("estétic") || combined.includes("peluquer") || combined.includes("barber") || combined.includes("manicur") || combined.includes("maquill") || combined.includes("cosmetolog")) {
      specialty = "Estética y Bienestar";
    } else if (combined.includes("gastro") || combined.includes("cocin") || combined.includes("pasteler") || combined.includes("baris") || combined.includes("coctel")) {
      specialty = "Gastronomía";
    } else if (combined.includes("idiom") || combined.includes("ingl") || combined.includes("lengu")) {
      specialty = "Idiomas";
    } else if (combined.includes("comput") || combined.includes("program") || combined.includes("soft") || combined.includes("it") || combined.includes("marketing") || combined.includes("digital")) {
      specialty = "Tecnología";
    } else if (combined.includes("teatro") || combined.includes("art") || combined.includes("músic") || combined.includes("danza") || combined.includes("cerámic") || combined.includes("pintur")) {
      specialty = "Arte y Diseño";
    }

    // Clean phone/whatsapp number
    let cleanWhatsapp = "";
    if (parsedData.link_whatsapp_directo) {
      const match = parsedData.link_whatsapp_directo.match(/wa\.me\/(\d+)/);
      if (match && match[1]) {
        cleanWhatsapp = `+${match[1]}`;
      }
    }
    if (!cleanWhatsapp && parsedData.telefono_principal) {
      cleanWhatsapp = parsedData.telefono_principal;
    }

    const defaultCoords = getApproxCoordinates(provId, parsedData.localidad);

    const newCenter: Center = {
      id: `extracted-${Date.now()}`,
      name: parsedData.nombre_comercial || "Centro de Educación No Formal",
      specialty,
      type: parsedData.tipo_de_ensenanza || "Centro de Capacitación",
      modality: "Presencial",
      certification: "Propia",
      courses: [parsedData.tipo_de_ensenanza || "Cursos y Talleres de Formación Laboral"],
      whatsapp: cleanWhatsapp,
      address: parsedData.ubicacion_calle_altura || "Consultar por WhatsApp",
      neighborhood: parsedData.localidad || "Centro",
      provinceId: provId,
      coordinates: defaultCoords,
      nationalCertification: "No"
    };

    onAddCenter(newCenter);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl my-auto overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/40 border border-indigo-400/50 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold leading-none">
                  Agente Clasificador Semántico & Scraper IA
                </h2>
                <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[10px] font-semibold uppercase px-2 py-0.5 rounded tracking-wider">
                  Argentina
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-1">
                Filtra educación formal (exclusión estricta) y extrae academias, talleres y centros de oficios con WhatsApp.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5 max-h-[75vh] overflow-y-auto">
          
          {/* Left Column: Input raw text & presets */}
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Datos Crudos del Comercio / Publicación / Web
                </label>
                <span className="text-[11px] text-slate-400">
                  Pega texto de Google Maps, Instagram, bio o web
                </span>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Pega aquí el texto extraído del comercio o aviso... ej:
Academia Glamour Lanús. Cursos de Barbería y Manicuría.
Av. Hipólito Yrigoyen 4500, Lanús.
WhatsApp: 11-4455-6677..."
                rows={9}
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none resize-none transition-all placeholder:font-sans placeholder:text-slate-400"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Ejemplos Rápidos de Prueba:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_EXAMPLES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setRawText(preset.text);
                      handleAnalyze(preset.text);
                    }}
                    className="text-left p-2 rounded border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 hover:text-indigo-900 transition-colors cursor-pointer truncate"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleAnalyze()}
                disabled={isLoading || !rawText.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analizando con IA Semántica...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Ejecutar Agente de Clasificación</span>
                  </>
                )}
              </button>
              {rawText && (
                <button
                  type="button"
                  onClick={() => { setRawText(""); setJsonResponse(null); setParsedData(null); }}
                  className="px-3 py-2.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Exclusion / Inclusion Rules Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Criterios del Agente
              </div>
              <p>
                <b className="text-red-700">🚫 Exclusión absoluta:</b> Escuelas primarias, secundarias, colegios técnicos oficiales, universidades, terciarios formales y jardines.
              </p>
              <p>
                <b className="text-emerald-700">✅ Inclusión elegible:</b> Academias de estética, oficios, gastronomía, idiomas, bootcamps de computación y talleres libres.
              </p>
            </div>
          </div>

          {/* Right Column: Output / JSON result & Database Integration */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                Salida Estricta JSON del Agente
              </span>
              {jsonResponse && (
                <button
                  onClick={handleCopyJson}
                  className="text-[11px] text-slate-600 hover:text-indigo-600 font-semibold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copiado" : "Copiar JSON"}</span>
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Error de Procesamiento</div>
                  <div>{errorMsg}</div>
                </div>
              </div>
            )}

            {/* Display JSON or Empty state */}
            <div className="relative flex-1 min-h-[220px] bg-slate-950 text-emerald-400 font-mono text-xs p-3.5 rounded-lg border border-slate-800 overflow-x-auto shadow-inner">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-slate-300 gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                  <span className="text-xs">Aplicando reglas semánticas y filtrado...</span>
                </div>
              ) : jsonResponse ? (
                <pre className="whitespace-pre-wrap break-all text-xs">
                  {jsonResponse}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-4">
                  <Bot className="w-8 h-8 mb-2 opacity-40 text-indigo-400" />
                  <span className="text-xs font-sans">
                    Ingresa datos crudos a la izquierda o selecciona un ejemplo de prueba para visualizar el JSON estructurado.
                  </span>
                </div>
              )}
            </div>

            {/* Decision Banner & Action if Parsed */}
            {parsedData && (
              <div className="flex flex-col gap-2">
                {parsedData.elegible ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Comercio Elegible: Educación No Formal</span>
                      </div>
                      <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {parsedData.tipo_de_ensenanza || "Academia"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1 bg-white p-2.5 rounded border border-emerald-100">
                      <div><b>Nombre:</b> {parsedData.nombre_comercial}</div>
                      <div><b>Ubicación:</b> {parsedData.ubicacion_calle_altura || "Sin dirección exacta"}, {parsedData.localidad}, {parsedData.provincia}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span><b>Teléfono:</b> {parsedData.telefono_principal || "No detectado"}</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          WhatsApp: {parsedData.es_celular_whatsapp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {parsedData.link_whatsapp_directo && (
                        <a
                          href={parsedData.link_whatsapp_directo}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Abrir WhatsApp</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      )}

                      <button
                        onClick={handleAddToDatabase}
                        disabled={addedSuccess}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-600 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        {addedSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Agregado a la Base de Datos!</span>
                          </>
                        ) : (
                          <>
                            <Database className="w-3.5 h-3.5" />
                            <span>Incorporar a la Base de Datos (+1)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5 text-xs text-red-900">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Negocio Descartado: No Elegible</div>
                      <p className="text-[11px] text-red-700 mt-0.5">
                        El establecimiento corresponde a educación formal (colegio, universidad, terciario oficial) o no imparte cursos/talleres libres no formales. La salida estricta es <code className="bg-red-100 px-1 py-0.5 rounded font-mono">{"{\"elegible\": false}"}</code>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            Salida JSON directa compatible con pipelines de web scraping y enriquecimiento comercial
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded font-medium text-slate-700 cursor-pointer transition-colors text-xs"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}

function mapProvinceNameToId(provinceName?: string, defaultId: string = "caba"): string {
  if (!provinceName) return defaultId;
  const p = provinceName.toLowerCase();
  if (p.includes("buenos aires") && !p.includes("ciudad") && !p.includes("caba")) return "buenos-aires";
  if (p.includes("caba") || p.includes("ciudad autónoma") || p.includes("capital federal")) return "caba";
  if (p.includes("córdoba") || p.includes("cordoba")) return "cordoba";
  if (p.includes("santa fe") || p.includes("rosario")) return "santa-fe";
  if (p.includes("mendoza")) return "mendoza";
  if (p.includes("salta")) return "salta";
  if (p.includes("tucumán") || p.includes("tucuman")) return "tucuman";
  if (p.includes("entre ríos") || p.includes("entre rios")) return "entre-rios";
  if (p.includes("neuquén") || p.includes("neuquen")) return "neuquen";
  if (p.includes("río negro") || p.includes("rio negro")) return "rio-negro";
  return defaultId;
}

function getApproxCoordinates(provinceId: string, neighborhood?: string): { lat: number; lng: number } {
  // Approximate base coordinates for common Argentine provinces
  const bases: Record<string, { lat: number; lng: number }> = {
    caba: { lat: -34.6037, lng: -58.3816 },
    "buenos-aires": { lat: -34.72, lng: -58.39 }, // Lanús / GBA
    cordoba: { lat: -31.4201, lng: -64.1888 },
    "santa-fe": { lat: -32.9587, lng: -60.6930 },
    mendoza: { lat: -32.8895, lng: -68.8458 },
    salta: { lat: -24.7821, lng: -65.4232 },
    tucuman: { lat: -26.8083, lng: -65.2176 }
  };

  const base = bases[provinceId] || bases["caba"];
  const jitterLat = (Math.random() - 0.5) * 0.02;
  const jitterLng = (Math.random() - 0.5) * 0.02;
  return {
    lat: Number((base.lat + jitterLat).toFixed(4)),
    lng: Number((base.lng + jitterLng).toFixed(4))
  };
}
