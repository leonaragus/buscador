import React from "react";
import { Search, RotateCcw, Download, Upload, Plus, SlidersHorizontal, BookOpen } from "lucide-react";

export type SpecialtyType = 'Tecnología' | 'Gastronomía' | 'Idiomas' | 'Arte y Diseño' | 'Oficios y Técnica' | 'Estética y Bienestar';

interface CenterFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  selectedSpecialties: SpecialtyType[];
  toggleSpecialty: (specialty: SpecialtyType) => void;
  selectedModalities: string[];
  toggleModality: (modality: string) => void;
  selectedCertifications: string[];
  toggleCertification: (cert: string) => void;
  selectedNeighborhoods: string[];
  setSelectedNeighborhoods: (neighborhoods: string[]) => void;
  allNeighborhoods: string[];
  resetFilters: () => void;
  onOpenAddModal: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalFiltered: number;
  selectedNationalCertification: string;
  setSelectedNationalCertification: (val: string) => void;
  searchScope: 'current' | 'all';
  setSearchScope: (scope: 'current' | 'all') => void;
  activeProvinceName: string;
}

const SPECIALTIES: { value: SpecialtyType; label: string; color: string }[] = [
  { value: 'Arte y Diseño', label: '💃 Danza, Música y Arte', color: 'border-purple-200 hover:bg-purple-50 text-purple-700' },
  { value: 'Oficios y Técnica', label: '🔧 Mecánica y Oficios Técnicos', color: 'border-orange-200 hover:bg-orange-50 text-orange-700' },
  { value: 'Estética y Bienestar', label: '✂️ Estética y Barbería', color: 'border-pink-200 hover:bg-pink-50 text-pink-700' },
  { value: 'Gastronomía', label: '🍳 Gastronomía y Pastelería', color: 'border-amber-200 hover:bg-amber-50 text-amber-700' },
  { value: 'Idiomas', label: '🗣️ Idiomas y Comunicación', color: 'border-emerald-200 hover:bg-emerald-50 text-emerald-700' },
  { value: 'Tecnología', label: '💻 Programación y Tecnología', color: 'border-blue-200 hover:bg-blue-50 text-blue-700' },
];

const MODALITIES = ['Presencial', 'Online', 'Híbrido'];
const CERTIFICATIONS = [
  { value: 'Oficial', label: '📜 Certificado Oficial' },
  { value: 'Propia', label: '📋 Certificación Propia' },
  { value: 'Sin Certificación', label: '🔍 Sin Título Formal' },
];

export default function CenterFilters({
  searchText,
  setSearchText,
  selectedSpecialties,
  toggleSpecialty,
  selectedModalities,
  toggleModality,
  selectedCertifications,
  toggleCertification,
  selectedNeighborhoods,
  setSelectedNeighborhoods,
  allNeighborhoods,
  resetFilters,
  onOpenAddModal,
  onExport,
  onImport,
  totalFiltered,
  selectedNationalCertification,
  setSelectedNationalCertification,
  searchScope,
  setSearchScope,
  activeProvinceName
}: CenterFiltersProps) {

  const handleNeighborhoodChange = (neighborhood: string) => {
    if (selectedNeighborhoods.includes(neighborhood)) {
      setSelectedNeighborhoods(selectedNeighborhoods.filter(n => n !== neighborhood));
    } else {
      setSelectedNeighborhoods([...selectedNeighborhoods, neighborhood]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4 flex flex-col h-full overflow-hidden">
      
      {/* Search Header */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center space-x-1.5 text-slate-850">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-800">Búsqueda y Filtros</h2>
          </div>
          <button 
            onClick={resetFilters}
            className="text-[11px] text-slate-550 hover:text-slate-800 font-mono flex items-center gap-0.5 cursor-pointer transition-colors font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar
          </button>
        </div>

        {/* Search input with Clear button */}
        <div className="relative">
          <input
            id="filter-search-input"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar danza, mecánica, estética, oficios, idiomas, cocina..."
            className="w-full pl-8 pr-7 py-1.5 text-[11px] bg-slate-50 border border-slate-200 rounded hover:border-slate-300 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
          />
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-450 pointer-events-none" />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer font-bold"
              title="Borrar texto"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Scope Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md text-[10px] font-semibold">
          <button
            type="button"
            onClick={() => setSearchScope('current')}
            className={`flex-1 py-1 px-1.5 rounded transition-all text-center cursor-pointer truncate ${
              searchScope === 'current'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title={`Buscar solo en ${activeProvinceName}`}
          >
            📍 {activeProvinceName.split(" (")[0]}
          </button>
          <button
            type="button"
            onClick={() => setSearchScope('all')}
            className={`flex-1 py-1 px-1.5 rounded transition-all text-center cursor-pointer ${
              searchScope === 'all'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Buscar en todos los centros de Argentina"
          >
            🇦🇷 Todo el País
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4" style={{ maxHeight: "calc(100vh - 430px)" }}>
        {/* Specialties Panel */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Especialidad académica</h3>
          <div className="grid grid-cols-1 gap-1">
            {SPECIALTIES.map((spec) => {
              const isActive = selectedSpecialties.includes(spec.value);
              return (
                <button
                  key={spec.value}
                  id={`filter-spec-${spec.value.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleSpecialty(spec.value)}
                  className={`w-full text-left px-2 py-1 rounded border text-[11px] font-bold cursor-pointer transition-all flex items-center justify-between ${
                    isActive 
                      ? "border-indigo-650 bg-indigo-600 text-white" 
                      : `border-slate-200 text-slate-700 bg-white hover:bg-slate-50`
                  }`}
                >
                  <span>{spec.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modality Section */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Modalidad de Dictado</h3>
          <div className="grid grid-cols-3 gap-1">
            {MODALITIES.map((mod) => {
              const isActive = selectedModalities.includes(mod);
              return (
                <button
                  key={mod}
                  id={`filter-mod-${mod.toLowerCase()}`}
                  onClick={() => toggleModality(mod)}
                  className={`py-1 text-[11px] font-extrabold rounded border text-center cursor-pointer transition-all ${
                    isActive 
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {mod}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certification section */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Tipo de Certificación</h3>
          <div className="space-y-1.5">
            {CERTIFICATIONS.map((cert) => {
              const isActive = selectedCertifications.includes(cert.value);
              return (
                <label 
                  key={cert.value}
                  className="flex items-center space-x-2 px-1.5 py-0.5 rounded hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => toggleCertification(cert.value)}
                    className="rounded border-slate-300 text-indigo-600 w-3.5 h-3.5 cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[11px] font-medium text-slate-600">{cert.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Validez Nacional Filter section */}
        <div className="space-y-1 bg-slate-50/50 p-2 border border-slate-100 rounded-xl">
          <h3 className="text-[10px] font-bold text-slate-700 font-mono uppercase tracking-wider flex items-center justify-between">
            <span>Validez Nacional</span>
            {selectedNationalCertification !== "Todas" && (
              <span className="bg-indigo-150 text-indigo-700 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-full">Activo</span>
            )}
          </h3>
          <div className="flex gap-1 mt-1">
            {['Todas', 'Sí', 'No'].map((option) => {
              const isActive = selectedNationalCertification === option;
              return (
                <button
                  key={option}
                  id={`filter-national-${option.toLowerCase()}`}
                  type="button"
                  onClick={() => setSelectedNationalCertification(option)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded border text-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Neighborhood filter */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Filtrar por Barrio o Municipio (CABA/GBA)</h3>
          <div className="max-h-28 overflow-y-auto border border-slate-200 rounded p-1.5 space-y-1 bg-slate-50">
            {[...allNeighborhoods].filter(Boolean).sort().map((n) => {
              const isSelected = selectedNeighborhoods.includes(n);
              return (
                <label 
                  key={n}
                  className="flex items-center space-x-2 text-[11px] text-slate-700 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleNeighborhoodChange(n)}
                    className="rounded border-slate-350 text-indigo-600 w-3.5 h-3.5 cursor-pointer accent-indigo-600"
                  />
                  <span className="font-semibold">{n}</span>
                </label>
              );
            })}
            {allNeighborhoods.length === 0 && (
              <p className="text-[11px] text-slate-400 italic">No hay barrios cargados</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Database Actions */}
      <div className="pt-2.5 border-t border-slate-200 space-y-2 shrink-0">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500">
          <span>RESTRICCIÓN</span>
          <span className="text-red-650" style={{ color: '#dc2626' }}>NO FACULTADES / COLEGIO</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* Export Database button */}
          <button
            onClick={onExport}
            className="flex items-center justify-center space-x-1 py-1 px-1.5 border border-slate-200 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded text-[11px] font-semibold cursor-pointer transition-all"
            title="Exportar base de datos a archivo JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>

          {/* Import Database input & button */}
          <label
            className="flex items-center justify-center space-x-1 py-1 px-1.5 border border-slate-200 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded text-[11px] font-semibold cursor-pointer transition-all hover:bg-slate-100"
            title="Importar base de datos desde archivo JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar</span>
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Manually Add a new center */}
        <button
          onClick={onOpenAddModal}
          id="btn-add-manual-center"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Centro Manual
        </button>

        <div className="text-center">
          <p className="text-[11px] text-slate-500 font-mono">
            Filtrados: <span className="font-bold text-slate-750">{totalFiltered}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
