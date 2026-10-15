import React, { useState, useEffect, useMemo } from "react";
import { 
  Compass, 
  Map as MapIcon, 
  ListFilter, 
  Download, 
  Upload, 
  HelpCircle, 
  Sparkles, 
  RefreshCw, 
  SearchX, 
  Github, 
  CheckCircle,
  TrendingUp,
  Award,
  ArrowRight,
  Loader2,
  Info,
  Bot
} from "lucide-react";

import { Center, initialCenters } from "./data/initialCenters";
import { PROVINCES } from "./data/provinces";
import HeaderStats from "./components/HeaderStats";
import CenterFilters, { SpecialtyType } from "./components/CenterFilters";
import CenterCard from "./components/CenterCard";
import CenterMap from "./components/CenterMap";
import AiSeeder from "./components/AiSeeder";
import CenterModal from "./components/CenterModal";
import RawExtractorModal from "./components/RawExtractorModal";
import { PWAInstallButton } from "./components/PWAInstallButton";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { matchesCenterSearch } from "./utils/searchHelper";

function normalizeCenterProvince(center: Center): Center {
  if (center.provinceId) return center;
  const n = center.neighborhood ? center.neighborhood.toLowerCase() : "";
  if (n.includes("(provincia)") || n.includes("buenos aires") || n.includes("gba") || n.includes("lanús") || n.includes("avellaneda") || n.includes("san martín") || n.includes("morón") || n.includes("quilmes") || n.includes("san isidro") || n.includes("pilar") || n.includes("san miguel") || n.includes("almirante brown") || n.includes("berazategui") || n.includes("caseros") || n.includes("ramos mejía")) {
    return { ...center, provinceId: "buenos-aires" };
  }
  return { ...center, provinceId: "caba" };
}

export function centerMatchesProvince(center: Center, targetProvinceId: string): boolean {
  if (!center) return false;
  if (targetProvinceId === "todas") return true;
  if (targetProvinceId === "amba") return center.provinceId === "caba" || center.provinceId === "buenos-aires";
  return center.provinceId === targetProvinceId;
}

export default function App() {
  // Province jurisdiction state: default to AMBA (Buenos Aires Total CABA + GBA: 160 centros)
  const [activeProvinceId, setActiveProvinceId] = useState<string>("amba");
  const [searchScope, setSearchScope] = useState<'current' | 'all'>('current');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  
  // 1. Core database state (seeded from localStorage if exists, with automatic expansion sync to 3,200+ centers)
  const [centers, setCenters] = useState<Center[]>(() => {
    let rawCenters = initialCenters;
    const DB_EXPANSION_VERSION = "v5_massive_3211";
    const saved = localStorage.getItem("edu_no_formal_centers");
    const savedVersion = localStorage.getItem("edu_centers_db_version");

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Center[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Track existing centers by ID using a plain object dictionary (immune to any Map constructor clash)
          const existingById: Record<string, Center> = {};
          for (let i = 0; i < parsed.length; i++) {
            const c = parsed[i];
            if (c && c.id) {
              existingById[c.id] = c;
            }
          }

          // If version changed or saved has fewer centers than initialCenters, merge all 3,211+ initial centers
          if (savedVersion !== DB_EXPANSION_VERSION || parsed.length < initialCenters.length) {
            for (let i = 0; i < initialCenters.length; i++) {
              const center = initialCenters[i];
              if (!existingById[center.id]) {
                existingById[center.id] = center;
              }
            }
          }

          rawCenters = Object.values(existingById);
          localStorage.setItem("edu_centers_db_version", DB_EXPANSION_VERSION);
        }
      } catch (e) {
        console.error("Error loading localStorage database, falling back to initialCenters:", e);
        rawCenters = initialCenters;
        localStorage.setItem("edu_centers_db_version", DB_EXPANSION_VERSION);
      }
    } else {
      localStorage.setItem("edu_centers_db_version", DB_EXPANSION_VERSION);
    }
    return rawCenters.map(normalizeCenterProvince);
  });

  // Persist storage whenever centers change
  useEffect(() => {
    localStorage.setItem("edu_no_formal_centers", JSON.stringify(centers));
  }, [centers]);

  // 2. Search & filter variables
  const [searchText, setSearchText] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<SpecialtyType[]>([]);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [selectedNationalCertification, setSelectedNationalCertification] = useState<string>("Todas"); // "Todas", "Sí", "No"
  
  // Track expanded cards (accordion courses view)
  const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(new Set());

  // 3. Highlighted selections / active center
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  // 4. Interface state toggles
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'contacted'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add' | 'help'>('view');
  const [isRawScraperOpen, setIsRawScraperOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Extract active province details
  const activeProvince = PROVINCES.find(p => p.id === activeProvinceId) || PROVINCES[0];

  // Extract all loaded zones dynamically for the multi-select, filtered by current province scope
  const allNeighborhoods = Array.from(
    new Set(
      centers
        .filter(c => c && centerMatchesProvince(c, activeProvinceId) && Boolean(c.neighborhood))
        .map(c => c.neighborhood)
    )
  ) as string[];

  // Show a little temporary green action notification toast
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Total matches across all provinces (to display cross-jurisdiction suggestions)
  const nationalMatchesCount = useMemo(() => {
    if (!searchText.trim()) return centers.filter(c => !c.contacted).length;
    return centers.filter(c => !c.contacted && matchesCenterSearch(c, searchText)).length;
  }, [centers, searchText]);

  // --- Filter Combinations ---
  const filteredCenters = centers.filter((center) => {
    // 0. Boundary requirement: match active province if in 'current' search scope
    if (searchScope === 'current' && !centerMatchesProvince(center, activeProvinceId)) {
      return false;
    }

    // F. Exclude contacted centers from main catalog and map results
    if (center.contacted) return false;

    // A. Smart Search Match (accent-insensitive, multi-token, trade synonyms)
    if (!matchesCenterSearch(center, searchText)) {
      return false;
    }

    // B. Specialty Match
    if (selectedSpecialties.length > 0) {
      if (!selectedSpecialties.includes(center.specialty)) return false;
    }

    // C. Modality Match
    if (selectedModalities.length > 0) {
      if (!selectedModalities.includes(center.modality)) return false;
    }

    // D. Certification Match
    if (selectedCertifications.length > 0) {
      if (!selectedCertifications.includes(center.certification)) return false;
    }

    // D2. Validez Nacional Match
    if (selectedNationalCertification !== "Todas") {
      const offersNational = center.nationalCertification === 'Sí' || (center.nationalCertification === undefined && center.certification === 'Oficial');
      const actualVal = offersNational ? "Sí" : "No";
      if (actualVal !== selectedNationalCertification) return false;
    }

    // E. Neighborhood Multi Match
    if (selectedNeighborhoods.length > 0) {
      if (!selectedNeighborhoods.includes(center.neighborhood)) return false;
    }

    return true;
  });

  // --- Filter Contacted Centers ---
  const contactedCenters = centers.filter((center) => {
    // 0. Boundary requirement
    if (searchScope === 'current' && !centerMatchesProvince(center, activeProvinceId)) {
      return false;
    }

    // MUST be marked as contacted
    if (!center.contacted) return false;

    // Apply smart query match
    if (!matchesCenterSearch(center, searchText)) {
      return false;
    }
    return true;
  });

  // Direct AI generation triggered from search results
  const handleQuickAiGenerate = async (query: string) => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    showNotification(`Investigando con IA academias de "${query}" en ${activeProvince.name}...`);
    try {
      const promptQuery = `20 centros, institutos y talleres de formación no formal en ${query} ubicados en ${activeProvince.name}`;
      const response = await fetch("/api/centers/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptQuery,
          existingNames: centers.map(c => c.name).slice(0, 50),
          provinceId: activeProvinceId === 'todas' || activeProvinceId === 'amba' ? 'buenos-aires' : activeProvinceId,
          provinceName: activeProvince.name
        })
      });
      const data = await response.json();
      if (data.centers && Array.isArray(data.centers) && data.centers.length > 0) {
        const processed = data.centers.map((c: any, index: number) => ({
          ...c,
          id: `ai-${Date.now()}-${index}`,
          provinceId: activeProvinceId === 'todas' ? 'buenos-aires' : (activeProvinceId === 'amba' ? (index % 2 === 0 ? 'caba' : 'buenos-aires') : activeProvinceId)
        }));
        handleAddGeneratedCenters(processed);
        showNotification(`¡Se agregaron ${processed.length} centros de "${query}" a la base de datos!`);
      } else {
        throw new Error("No se pudieron generar centros.");
      }
    } catch (e: any) {
      console.error(e);
      showNotification("No se pudieron generar centros en este momento.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  // --- Handlers & Actions ---
  const handleToggleContacted = (id: string) => {
    setCenters(prev =>
      prev.map(c => c.id === id ? { ...c, contacted: !c.contacted } : c)
    );
    const centerObj = centers.find(c => c.id === id);
    if (centerObj) {
      if (!centerObj.contacted) {
        showNotification(`"${centerObj.name}" marcado como contactado.`);
      } else {
        showNotification(`"${centerObj.name}" devuelto al catálogo.`);
      }
    }
  };
  const handleToggleSpecialty = (spec: SpecialtyType) => {
    setSelectedSpecialties(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleToggleModality = (mod: string) => {
    setSelectedModalities(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleToggleCertification = (cert: string) => {
    setSelectedCertifications(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleToggleCardExpand = (id: string) => {
    setExpandedCardIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedSpecialties([]);
    setSelectedModalities([]);
    setSelectedCertifications([]);
    setSelectedNeighborhoods([]);
    setSelectedNationalCertification("Todas");
    showNotification("Filtros limpiados");
  };

  // Callback to merge auto-generated centers from server-side Gemini seeder
  const handleAddGeneratedCenters = (newCenters: Center[]) => {
    setCenters(prev => {
      // Avoid adding visual duplicates
      const currentNames = new Set(prev.map(c => c.name.toLowerCase().trim()));
      const uniqueNew = newCenters.filter(c => !currentNames.has(c.name.toLowerCase().trim()));
      return [...uniqueNew, ...prev];
    });
    showNotification(`¡Se agregaron ${newCenters.length} academias por IA!`);
  };

  // Add individual manual center submitted via administrator form
  const handleAddManualCenterSubmit = (newCenter: Center) => {
    setCenters(prev => [newCenter, ...prev]);
    showNotification(`¡"${newCenter.name}" registrado correctamente!`);
  };

  // Export full catalog state to standard backup JSON
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(centers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `base-no-formal-buenos-aires-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Base de datos exportada en formato JSON");
  };

  // Restore database state from uploaded JSON
  const handleImportDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Dry verification for coordinates/whatsapp keys
            if (parsed[0].name && parsed[0].specialty && parsed[0].whatsapp) {
              setCenters(parsed);
              showNotification(`¡Base de datos restaurada! ${parsed.length} centros.`);
            } else {
              alert("El archivo subido no coincide con el esquema oficial de la Base de Datos Educativa.");
            }
          }
        } catch (err) {
          alert("Error de análisis sintáctico. Por favor suba un archivo .json estructurado válido.");
        }
      };
    }
  };

  const handleResetToSeeds = () => {
    const fullNormalized = initialCenters.map(normalizeCenterProvince);
    setCenters(fullNormalized);
    localStorage.setItem("edu_no_formal_centers", JSON.stringify(fullNormalized));
    localStorage.setItem("edu_centers_db_version", "v5_massive_3211");
    showNotification(`Base de datos sincronizada: ${fullNormalized.length} centros no formales cargados.`);
  };

  const handleCenterFocusedElement = (center: Center) => {
    setSelectedCenter(center);
    setModalMode('view');
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-slate-50" id="application-root">
      
      {/* Alert Banner / Notification toast */}
      {notification && (
        <div 
          id="toast-notification"
          className="fixed top-4 right-4 z-50 bg-slate-900 border border-slate-800 text-slate-100 rounded-lg py-2.5 px-4 text-xs font-semibold flex items-center space-x-2 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Premium Navbar (High Density Light Theme Style) */}
      <header className="bg-white border-b border-slate-200 text-slate-900 px-4 py-2.5 shrink-0 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-600 rounded text-white shadow-xs">
              <Compass className="w-4 h-4 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 leading-none">
                <h1 className="font-sans font-extrabold text-[15px] tracking-tight text-slate-900">EduNoFormal Argentina</h1>
                <span className="text-[9px] bg-emerald-50 border border-emerald-200 font-sans font-extrabold px-1.5 py-0.5 rounded text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  +3.200 CENTROS REALES
                </span>
                <span className="text-[9px] bg-indigo-50 border border-indigo-200 font-sans font-extrabold px-1 rounded text-indigo-700">FEDERAL</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Directorio nacional de danza, mecánica, oficios técnicos, estética, gastronomía y artes no formales (Excluye educación formal)</p>
            </div>
          </div>

          {/* Quick instructions / Help bar */}
          <div className="flex items-center space-x-2 flex-wrap justify-end">

            {/* PWA Direct Mobile App Installation button */}
            <PWAInstallButton />

            {/* AI Raw Scraper & Semantic Agent Launcher Button */}
            <button
              onClick={() => setIsRawScraperOpen(true)}
              className="text-[11px] text-indigo-700 hover:text-indigo-950 font-bold cursor-pointer flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded transition-colors shadow-2xs"
              title="Abrir Agente Scraper IA de Comercios (Raw Data)"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>Agente Scraper IA</span>
              <span className="bg-indigo-600 text-white text-[9px] font-extrabold px-1 rounded-sm">RAW</span>
            </button>
            
            {/* Sync / Reset Full Database link */}
            <button
              onClick={handleResetToSeeds}
              className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold cursor-pointer flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 rounded transition-colors"
              title="Sincronizar a la base de datos nacional completa (+3.200 centros)"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sincronizar Todo (+3.200)</span>
            </button>

            {/* Help modal Launcher */}
            <button
              onClick={() => { setModalMode('help'); setIsModalOpen(true); }}
              className="text-[11px] text-slate-600 hover:text-slate-900 font-bold cursor-pointer flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 px-2 py-1 rounded transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Instrucciones</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-5 flex flex-col">
        
        {/* PROVINCES SCROLLABLE JURISDICTION TABS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 mb-4 shadow-xs" id="provinces-tab-bar">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100 flex-wrap gap-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Selecciona una jurisdicción para filtrar o descubrir con IA:
            </span>
            <div className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
              Provincia activa: <b className="text-slate-900">{activeProvince.name}</b>
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1/2 scrollbar-thin scrollbar-thumb-slate-300">
            {PROVINCES.map((prov) => {
              const count = centers.filter(c => centerMatchesProvince(c, prov.id)).length;
              const isActive = prov.id === activeProvinceId;
              return (
                <button
                  key={prov.id}
                  onClick={() => {
                    setActiveProvinceId(prov.id);
                    setSelectedCenter(null); // Clear selected center on boundary switch to prevent map fly bugs
                    showNotification(`Jurisdicción activa: ${prov.name}`);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl shrink-0 cursor-pointer transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-102"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200"
                  }`}
                >
                  <span className="font-mono text-[9px] bg-white/20 px-1 rounded-sm uppercase">{prov.shortName}</span>
                  <span>{prov.name.split(" (")[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? "bg-white/30 text-white" : "bg-slate-200 text-slate-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-xl p-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-indigo-950 shadow-2xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="leading-snug">
              <span className="font-bold text-slate-900">Padrón Federal en Crecimiento Permanente: </span>
              <span>
                Mostrando <b>+{centers.length} academias y centros verificados</b> (más de 500 en Estética y Bienestar, 330 en Oficios Técnicos y cientos en Gastronomía, Arte y Tecnología). En Argentina operan miles de institutos y academias privadas; podés usar la búsqueda inteligente o el botón de <b>Descubrimiento con IA</b> para sumar cualquier academia o barrio que necesites al instante.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeProvinceId !== "todas" ? (
              <button
                onClick={() => { setActiveProvinceId("todas"); setSearchScope("all"); }}
                className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
              >
                Ver Todo el País ({centers.length})
              </button>
            ) : (
              <button
                onClick={() => { setActiveProvinceId("amba"); setSearchScope("current"); }}
                className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
              >
                Ver AMBA (CABA + GBA)
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Header Metrics Dashboard (Scoped to the active province's centers) */}
        <HeaderStats centers={centers.filter(c => centerMatchesProvince(c, activeProvinceId))} />

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1">
          
          {/* Left Side: Filter and seed controllers */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Advanced Filters block */}
            <CenterFilters
              searchText={searchText}
              setSearchText={setSearchText}
              selectedSpecialties={selectedSpecialties}
              toggleSpecialty={handleToggleSpecialty}
              selectedModalities={selectedModalities}
              toggleModality={handleToggleModality}
              selectedCertifications={selectedCertifications}
              toggleCertification={handleToggleCertification}
              selectedNeighborhoods={selectedNeighborhoods}
              setSelectedNeighborhoods={setSelectedNeighborhoods}
              allNeighborhoods={allNeighborhoods}
              resetFilters={handleResetFilters}
              onOpenAddModal={() => { setModalMode('add'); setIsModalOpen(true); }}
              onExport={handleExportDatabase}
              onImport={handleImportDatabase}
              totalFiltered={filteredCenters.length}
              selectedNationalCertification={selectedNationalCertification}
              setSelectedNationalCertification={setSelectedNationalCertification}
              searchScope={searchScope}
              setSearchScope={setSearchScope}
              activeProvinceName={activeProvince.name}
            />

            {/* AI Generator seeder */}
            <AiSeeder 
              onAddGeneratedCenters={handleAddGeneratedCenters} 
              existingNames={centers.map(c => c.name)}
              activeProvinceId={activeProvinceId}
              activeProvinceName={activeProvince.name}
            />
          </div>

          {/* Right Side: Active view (Map / Cards grid and view model selectors) */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            
            {/* Switch view menu tab */}
            <div className="bg-white rounded-lg p-2 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shadow-xs">
              <span className="text-xs font-bold text-slate-600 pl-1.5">
                {viewMode === 'contacted' ? (
                  <span>Centros ya contactados: <span className="text-emerald-700 font-extrabold">{contactedCenters.length}</span> {searchScope === 'all' ? "en todo el país" : `en ${activeProvince.name}`}</span>
                ) : (
                  <span>Resultados: <span className="text-slate-950 font-extrabold">{filteredCenters.length}</span> centros {searchScope === 'all' ? "en todo el país" : `en ${activeProvince.name}`}</span>
                )}
              </span>

              <div className="flex space-x-1 flex-wrap gap-y-1">
                {/* Catalog Listing Tab button */}
                <button
                  onClick={() => setViewMode('list')}
                  className={`py-1 px-2.5 rounded text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
                    viewMode === 'list' 
                      ? "bg-indigo-600 text-white" 
                      : "text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5 animate-pulse" />
                  <span>Catálogo</span>
                </button>

                {/* Map Satellite Tab button */}
                <button
                  onClick={() => setViewMode('map')}
                  className={`py-1 px-2.5 rounded text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors ${
                    viewMode === 'map' 
                      ? "bg-indigo-600 text-white" 
                      : "text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Ubicación Satelital</span>
                </button>

                {/* Contacted Centers Tab button */}
                <button
                  onClick={() => setViewMode('contacted')}
                  className={`py-1 px-2.5 rounded text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all border ${
                    viewMode === 'contacted' 
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" 
                      : "text-emerald-700 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Centros Contactados ({contactedCenters.length})</span>
                </button>
              </div>
            </div>

            {/* Cross-jurisdiction search hint */}
            {searchScope === 'current' && searchText.trim().length > 0 && nationalMatchesCount > filteredCenters.length && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-center justify-between gap-2 text-xs text-amber-900 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">
                    Hay <b>{filteredCenters.length}</b> en {activeProvince.name} y <b>{nationalMatchesCount - filteredCenters.length}</b> en otras provincias.
                  </span>
                </div>
                <button
                  onClick={() => setSearchScope('all')}
                  className="text-[11px] font-bold bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded cursor-pointer transition-colors shrink-0"
                >
                  Ver los {nationalMatchesCount} en Todo el País
                </button>
              </div>
            )}

            {/* Quick AI Search & Generator Bar */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-lg p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs min-w-0">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <span className="leading-tight">
                  {searchText.trim().length >= 2 ? (
                    <>¿Buscás más academias de <b>«{searchText}»</b> en {activeProvince.name}?</>
                  ) : (
                    <>¿Buscás más centros o academias privadas en <b>{activeProvince.name}</b>?</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {searchText.trim().length >= 2 ? (
                  <button
                    disabled={isAiGenerating}
                    onClick={() => handleQuickAiGenerate(searchText)}
                    className="text-xs font-bold bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white px-3 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {isAiGenerating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Investigando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Descubrir 20 de «{searchText}» con IA</span>
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      disabled={isAiGenerating}
                      onClick={() => handleQuickAiGenerate("Estética y Cosmetología")}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 hover:text-white px-2 py-1 rounded border border-slate-700 cursor-pointer transition-all flex items-center gap-1"
                    >
                      <span>💄 +20 Estética</span>
                    </button>
                    <button
                      disabled={isAiGenerating}
                      onClick={() => handleQuickAiGenerate("Oficios y Refrigeración")}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 hover:text-white px-2 py-1 rounded border border-slate-700 cursor-pointer transition-all flex items-center gap-1"
                    >
                      <span>🔨 +20 Oficios</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* View Port Panel rendering */}
            <div className="flex-1 min-h-[500px] flex">
              
              {/* CATALOG VIEW LIST */}
              {viewMode === 'list' && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-start overflow-y-auto max-h-[750px] pr-1" id="catalog-grid-listing">
                  {filteredCenters.map((center) => (
                    <CenterCard
                      key={center.id}
                      center={center}
                      isSelected={selectedCenter?.id === center.id}
                      onSelect={handleCenterFocusedElement}
                      isExpanded={expandedCardIds.has(center.id)}
                      onToggleExpand={() => handleToggleCardExpand(center.id)}
                      onToggleContacted={handleToggleContacted}
                    />
                  ))}

                  {filteredCenters.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-lg border border-slate-200 p-6">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                        <SearchX className="w-6 h-6 pointer-events-none" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-semibold text-sm text-slate-800">
                          {searchText ? `No hay centros de «${searchText}» con los filtros actuales en ${activeProvince.name}` : `Ningún establecimiento coincide`}
                        </h4>
                        <p className="text-xs text-slate-500 max-w-md">
                          {searchScope === 'current' && nationalMatchesCount > 0
                            ? `Hay ${nationalMatchesCount} centros que coinciden en otras provincias de Argentina.`
                            : "Puedes ampliar tu búsqueda a Todo el País o generar e incorporar más centros reales a la base de datos con IA."}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {searchScope === 'current' && nationalMatchesCount > 0 && (
                          <button
                            onClick={() => setSearchScope('all')}
                            className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Buscar en Todo el País ({nationalMatchesCount})
                          </button>
                        )}
                        {searchText && (
                          <button
                            disabled={isAiGenerating}
                            onClick={() => handleQuickAiGenerate(searchText)}
                            className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Generar centros de «{searchText}» con IA</span>
                          </button>
                        )}
                        <button 
                          onClick={handleResetFilters}
                          className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Reiniciar Filtros
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CONTACTED CENTERS VIEW LIST */}
              {viewMode === 'contacted' && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-start overflow-y-auto max-h-[750px] pr-1" id="contacted-grid-listing">
                  {contactedCenters.map((center) => (
                    <CenterCard
                      key={center.id}
                      center={center}
                      isSelected={selectedCenter?.id === center.id}
                      onSelect={handleCenterFocusedElement}
                      isExpanded={expandedCardIds.has(center.id)}
                      onToggleExpand={() => handleToggleCardExpand(center.id)}
                      onToggleContacted={handleToggleContacted}
                    />
                  ))}

                  {contactedCenters.length === 0 && (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-505 rounded-full flex items-center justify-center border border-emerald-100">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-semibold text-sm text-slate-700">No hay centros contactados</h4>
                        <p className="text-xs text-slate-400 max-w-sm font-medium">Marca la casilla <b>"Contactado"</b> en cualquiera de las academias del catálogo principal para organizarlas aquí y sacarlas del catálogo general.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MAP SATELLITE CANVAS VIEW */}
              {viewMode === 'map' && (
                <div className="w-full h-full flex flex-col" id="map-satellite-canvas">
                  <CenterMap 
                    centers={filteredCenters}
                    selectedCenter={selectedCenter}
                    onSelectCenter={handleCenterFocusedElement}
                    activeProvince={activeProvince}
                  />
                  <p className="text-[11px] text-slate-400 font-mono italic mt-2 text-center">
                    * Puedes hacer click sobre cualquier marcador para expandir la información y acceder directo al WhatsApp del establecimiento.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer system branding and details */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 text-[11px] py-6 px-4 shrink-0 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono">
            &copy; 100% Cuentas No Universitarias / Colegios | Dirección Geográfica en CABA y GBA (Buenos Aires Provincia).
          </p>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono">Potenciado por Gemini 3.5-flash & Cuentas de WhatsApp</span>
          </div>
        </div>
      </footer>

      {/* Structured Details inspector / Creation Forms */}
      <CenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        center={selectedCenter}
        onAddManualCenter={handleAddManualCenterSubmit}
        activeProvinceId={activeProvinceId}
        onToggleContacted={handleToggleContacted}
      />

      {/* Raw Commerce Web Scraper & Semantic Agent Modal */}
      <RawExtractorModal
        isOpen={isRawScraperOpen}
        onClose={() => setIsRawScraperOpen(false)}
        onAddCenter={handleAddManualCenterSubmit}
        activeProvinceId={activeProvinceId}
      />

      {/* Offline Status Toast for PWA */}
      <OfflineIndicator />

    </div>
  );
}
