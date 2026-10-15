import React, { useState } from "react";
import { Sparkles, Loader2, PlusCircle, CheckCircle, Info } from "lucide-react";
import { Center } from "../data/initialCenters";

interface AiSeederProps {
  onAddGeneratedCenters: (newCenters: Center[]) => void;
  existingNames: string[];
  activeProvinceId: string;
  activeProvinceName: string;
}

function getPresetPrompts(provinceName: string) {
  return [
    { text: `🔨 Oficios de Capacitación en ${provinceName}`, prompt: `25 centros de oficios tradicionales en la provincia de ${provinceName}, con foco en herrería, carpintería, electricidad o costura industrial.` },
    { text: `💄 Belleza y Estética en ${provinceName}`, prompt: `20 academias de estética, escuelas de maquillaje social, peluquería integral y manicura en la provincia de ${provinceName}.` },
    { text: `💻 Programación y Bootcamps en ${provinceName}`, prompt: `25 bootcamps o talleres de software, desarrollo web y uso de IA generativa no formal ubicados en la provincia de ${provinceName}.` },
    { text: `🍳 Gastronomía Profesional en ${provinceName}`, prompt: `15 centros de cocina, institutos de pastelería, barista y repostería no formal en la provincia de ${provinceName}.` }
  ];
}

export default function AiSeeder({ onAddGeneratedCenters, existingNames, activeProvinceId, activeProvinceName }: AiSeederProps) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newsCount, setNewsCount] = useState<number | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("");

  const runSeeding = async (promptQuery: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setNewsCount(null);
    setErrorStatus(null);
    
    // Simulate compilation steps for better user engagement
    const steps = [
      `Investigando academias y centros para ${activeProvinceName}...`,
      "Identificando centros de capacitación no formales...",
      `Filtrando colegios de grado y facultades/universidades en ${activeProvinceName}...`,
      `Validando enlaces de contacto para WhatsApp de la región...`,
      `Asignando coordenadas geográficas en ${activeProvinceName}...`,
      "Estructurando cursos activos y programas de certificación..."
    ];

    let stepIdx = 0;
    setCurrentStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setCurrentStep(steps[stepIdx]);
      }
    }, 2500);

    try {
      const response = await fetch("/api/centers/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptQuery,
          existingNames: existingNames.slice(0, 50), // Send up to 50 names to avoid token blowing
          provinceId: activeProvinceId,
          provinceName: activeProvinceName
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al conectar con el servidor.");
      }

      const data = await response.json();
      
      if (data.centers && Array.isArray(data.centers)) {
        // Generate clean local ids for new items
        const processed = data.centers.map((c: any, index: number) => ({
          ...c,
          id: `gen-${Date.now()}-${index}`,
          provinceId: activeProvinceId // Guarantee it belongs to the current province
        })) as Center[];

        onAddGeneratedCenters(processed);
        setNewsCount(processed.length);
      } else {
        throw new Error("La respuesta de la IA no contiene un formato de Base de Datos válido.");
      }

    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Error al consultar la inteligencia artificial.");
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setCurrentStep("");
    }
  };

  const PRESET_PROMPTS = activeProvinceId === "caba" ? [
    { text: "🔨 Oficios Tradicionales en Almagro", prompt: "25 centros de oficios tradicionales en Almagro y Villa Crespo, con foco en electricidad, plomería y carpintería." },
    { text: "💄 Estética y Belleza en Caballito", prompt: "25 academias de estética, escuelas de maquillaje social, peluquería integral y manicuría en Caballito y Flores." },
    { text: "💻 Programación e IA en Palermo/Belgrano", prompt: "25 bootcamps o talleres de software, desarrollo web y uso de IA generativa no formal ubicados en Palermo o Belgrano." },
    { text: "🍳 Gastronomía y Pastelería en Recoleta", prompt: "20 centros de cocina, institutos de pastelería, sommelier y repostería no formal en Recoleta." },
  ] : getPresetPrompts(activeProvinceName);

  return (
    <div className="bg-slate-900 text-white rounded-lg p-3.5 border border-slate-800 space-y-3">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400 animate-pulse pointer-events-none" />
        <h3 className="font-sans font-extrabold text-[11px] text-slate-100 uppercase tracking-widest">Generador de Centros con IA</h3>
      </div>
      
      <p className="text-[11px] text-slate-400 leading-normal">
        Expande tu base de datos rápidamente en <b>{activeProvinceName}</b>. Solicita especialidades específicas no formales con WhatsApp de contacto regional.
      </p>

      {/* Inputs block */}
      <div className="space-y-1.5">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder={`Ej: 20 institutos de oficios en ${activeProvinceName}...`}
          disabled={isLoading}
          className="w-full bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 rounded px-2.5 py-1.5 text-[11px] focus:outline-hidden focus:border-indigo-500 transition-all font-medium"
        />
        <button
          onClick={() => customPrompt.trim() && runSeeding(customPrompt)}
          disabled={isLoading || !customPrompt.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-950 disabled:text-slate-500 text-white py-1.5 text-[11px] font-bold rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generando Lote...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Buscar y Descubrir con IA</span>
            </>
          )}
        </button>
      </div>

      {/* Preset shortcuts selector */}
      <div className="space-y-1 pt-1">
        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Plantillas de expansión rápida:</span>
        <div className="flex flex-col gap-1">
          {PRESET_PROMPTS.map((preset, index) => (
            <button
              key={index}
              disabled={isLoading}
              onClick={() => runSeeding(preset.prompt)}
              className="text-left w-full px-2 py-1 bg-slate-800/40 hover:bg-slate-800/80 hover:text-white rounded text-[11px] text-slate-350 transition-colors border border-slate-800/40 cursor-pointer font-medium"
            >
              {preset.text}
            </button>
          ))}
        </div>
      </div>

      {/* Progress / Success indicator */}
      {isLoading && currentStep && (
        <div className="bg-slate-850 rounded p-2.5 border border-indigo-950 space-y-1.5 text-[11px] text-indigo-200">
          <div className="flex items-center space-x-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            <span className="font-bold block font-mono text-[9px] tracking-wider">PROCESANDO SOLICITUD...</span>
          </div>
          <p className="text-[10px] text-slate-400 italic leading-tight">{currentStep}</p>
        </div>
      )}

      {newsCount !== null && (
        <div className="bg-emerald-950/40 border border-emerald-900/60 rounded p-2.5 flex items-start space-x-2.5 text-emerald-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-[11px] font-bold">Lote Cargado Exitosamente</h5>
            <p className="text-[10px] text-emerald-300/80 mt-0.5 leading-tight">
              Se crearon y agregaron <b>{newsCount}</b> nuevos centros a tu base de datos de <b>{activeProvinceName}</b>.
            </p>
          </div>
        </div>
      )}

      {errorStatus && (
        <div className="bg-red-950/40 border border-red-900/60 rounded p-2.5 text-red-350 text-[10px] leading-tight">
          <span className="font-bold block text-[11px]">Error de Generación:</span>
          {errorStatus}
        </div>
      )}

      <div className="flex items-start space-x-1.5 bg-slate-950/40 p-2 rounded border border-slate-850 text-[10px] italic">
        <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-tight text-slate-500">
          Para ver los cambios reflejados, revise las estadísticas del catálogo y visualícelos en el mapa satelital.
        </p>
      </div>
    </div>
  );
}
