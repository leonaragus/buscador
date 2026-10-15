import React from "react";
import { MapPin, School, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Center } from "../data/initialCenters";

interface CenterCardProps {
  center: Center;
  isSelected: boolean;
  onSelect: (center: Center) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleContacted: (id: string) => void;
  key?: any;
}

const SPECIALTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Tecnología': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
  'Gastronomía': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  'Idiomas': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  'Arte y Diseño': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  'Oficios y Técnica': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  'Estética y Bienestar': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
};

export default function CenterCard({ center, isSelected, onSelect, isExpanded, onToggleExpand, onToggleContacted }: CenterCardProps) {
  const colors = SPECIALTY_COLORS[center.specialty] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100' };

  // Generate premade whatsapp link
  const message = encodeURIComponent(`Hola, vi su de centro no formal "${center.name}" registrado en la Base de Datos Educativa y me gustaría consultar sobre las fechas de inscripción y costos para sus cursos activos de (ej: ${center.courses.slice(0, 2).join(", ")}). ¡Muchas gracias!`);
  const whatsappUrl = `https://wa.me/${center.whatsapp.replace('+', '').replace(/\s+/g, '')}?text=${message}`;

  // Badges following the "High Density" spec
  const getModalityBadge = (mod: string) => {
    if (mod === 'Presencial') {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#e0f2fe] text-[#075985]">Presencial</span>;
    } else if (mod === 'Online' || mod === 'Virtual') {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#fef3c7] text-[#92400e]">Virtual</span>;
    } else {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#f3e8ff] text-[#6b21a8]">Híbrido</span>;
    }
  };

  return (
    <div 
      id={`center-card-${center.id}`}
      className={`bg-white rounded-lg border transition-all p-3 flex flex-col justify-between ${
        isSelected 
          ? "border-indigo-600 ring-1 ring-indigo-100 bg-indigo-50/15" 
          : "border-slate-200"
      }`}
    >
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center space-x-1.5 shrink-0">
            <label 
              className="inline-flex items-center space-x-1 cursor-pointer select-none py-0.5 px-1.5 rounded-md hover:bg-slate-50 transition-colors border border-slate-100" 
              title="Marcar si esta institución ya fue contactada"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={!!center.contacted}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleContacted(center.id);
                }}
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
              />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contactado</span>
            </label>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
              {center.specialty}
            </span>
          </div>
          <div className="shrink-0">
            {center.certification === 'Oficial' ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#dcfce7] text-[#166534] text-[9px] font-bold border border-[#bbf7d0]" title="Cuenta con acreditaciones oficiales o matrícula habilitante">
                Oficial
              </span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-[#64748b] text-[9px] font-bold border border-slate-200">
                {center.certification === 'Propia' ? 'Cert. Propia' : 'No Formal'}
              </span>
            )}
          </div>
        </div>

        <h4 
          className="font-sans font-bold text-slate-900 text-[13px] leading-tight cursor-pointer hover:text-indigo-600 transition-colors" 
          onClick={() => onSelect(center)}
        >
          {center.name}
        </h4>
        
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <School className="w-3 h-3 text-slate-400 pointer-events-none" />
          <span className="truncate">{center.type}</span>
        </p>

        <p className="text-[10px] flex items-center gap-1.5 mt-0.5">
          <span className="font-mono text-slate-400 font-bold uppercase text-[9px]">Validez Nacional:</span>
          {center.nationalCertification ? (
            center.nationalCertification === 'Sí' ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">Sí</span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-200">No</span>
            )
          ) : (
            center.certification === 'Oficial' ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">Sí</span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-200">No</span>
            )
          )}
        </p>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-2 gap-2 mt-2 py-1.5 border-y border-slate-100 text-slate-600 text-[11px]">
        <div className="flex items-center space-x-1 min-w-0">
          <MapPin className="w-3 H-3 text-slate-400 shrink-0" />
          <span className="truncate text-[11px]" title={`${center.address}, ${center.neighborhood}`}>{center.address}</span>
        </div>
        <div className="flex items-center justify-end space-x-1 font-semibold text-slate-700">
          <span className="px-1 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600">{center.neighborhood}</span>
          {getModalityBadge(center.modality)}
        </div>
      </div>

      {/* Courses Accordion Toggle */}
      <div className="mt-1.5 text-xs">
        <button 
          onClick={onToggleExpand}
          className="w-full flex items-center justify-between py-1 text-slate-500 hover:text-slate-800 transition-colors text-[11px] font-medium cursor-pointer"
        >
          <span>Mostrar {center.courses.length} Cursos Activos</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-1 bg-slate-50 rounded-md p-2 border border-slate-150 space-y-1">
            {center.courses.map((course, idx) => (
              <div key={idx} className="flex items-start space-x-1 text-[11px] text-slate-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-sans leading-snug">{course}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-5 gap-1.5 mt-2.5">
        
        {/* Align to Map map center */}
        <button
          onClick={() => onSelect(center)}
          className="col-span-2 text-center text-[11px] text-slate-600 hover:text-slate-950 border border-slate-250 bg-white hover:bg-slate-50 rounded-md font-semibold transition-colors py-1.5 cursor-pointer"
        >
          Ver en Mapa
        </button>

        {/* WhatsApp launching */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3 bg-[#25d366] hover:bg-[#20ba56] text-white rounded-md text-[11px] font-bold flex items-center justify-center space-x-1 shadow-xs hover:shadow-sm transition-all py-1.5"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.253 8.477 3.521 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm12.022-2.13c1.802 0 3.568-.484 5.114-1.4l.366-.218 3.805.998-.383-3.692.239-.383c.995-1.586 1.52-3.424 1.516-5.31C22.75 6.13 17.925 1.305 12 1.305c-5.922 0-10.74 4.814-10.745 10.739-.001 1.884.49 3.731 1.422 5.33l.255.438-.973 3.551 3.636-.954.385.228c1.498.887 3.204 1.354 4.956 1.355zm5.786-7.915c-.318-.159-1.88-.928-2.17-.1.033-.29-.12-.435-.435-.595-.157-.079-.766-.316-1.465-.939-.543-.484-.91-1.082-.102-1.241-.11-.159-.24-.319-.36-.48-.684-.913-1.12-1.133-1.44-.813-.23.23-.46.33-.69.57-.23.23-.41.37-.69.59-.28.22-.57.44-.81.67-.32.32-.61.64-.81.93s-.36.56-.2.1.28-.56.9-.12.56.32 1.15.86c.64.59.88.94 1.17 1.3.28.37.28.69.14.99-.14.29-.63.92-.81 1.14-.15.22-.38.29-.63.14-.25-.15-1.07-.39-2.03-1.25-.75-.67-1.26-1.51-1.41-1.76-.14-.26-.01-.39.11-.51.12-.12.25-.29.38-.44.13-.15.17-.25.26-.43.09-.18.04-.34-.01-.45-.06-.11-.53-1.28-.73-1.76-.19-.48-.39-.41-.53-.41h-.45c-.15 0-.41.06-.63.29-.22.23-.85.83-.85 2.03 0 1.2 1.25 2.45 1.33 2.53.08.08 1.48 2.26 3.59 3.17.51.22.9.36 1.21.46.52.16.99.14 1.37.08.41-.06 1.88-.77 2.14-1.51.25-.74.25-1.37.18-1.51-.08-.14-.29-.22-.61-.38z"/>
          </svg>
          <span className="font-sans">WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
