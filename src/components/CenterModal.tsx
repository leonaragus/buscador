import React, { useState, useEffect } from "react";
import { X, Send, Award, HelpCircle, MapPin, CheckSquare, Plus, Trash, CheckCircle2 } from "lucide-react";
import { Center } from "../data/initialCenters";
import { PROVINCES } from "../data/provinces";

interface CenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'add' | 'help';
  center?: Center | null;
  onAddManualCenter?: (center: Center) => void;
  activeProvinceId?: string;
  onToggleContacted?: (id: string) => void;
}

const SPECIALTIES = [
  'Tecnología',
  'Gastronomía',
  'Idiomas',
  'Arte y Diseño',
  'Oficios y Técnica',
  'Estética y Bienestar',
];

const MODALITIES = ['Presencial', 'Online', 'Híbrido'];
const CERTIFICATIONS = ['Oficial', 'Propia', 'Sin Certificación'];

export default function CenterModal({ isOpen, onClose, mode, center, onAddManualCenter, activeProvinceId, onToggleContacted }: CenterModalProps) {
  // --- Add Center State ---
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("Tecnología");
  const [type, setType] = useState("");
  const [modality, setModality] = useState("Presencial");
  const [certification, setCertification] = useState("Propia");
  const [nationalCertification, setNationalCertification] = useState<'Sí' | 'No'>("No");
  const [whatsapp, setWhatsapp] = useState("+54911");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("Palermo");
  const [lat, setLat] = useState("-34.6037");
  const [lng, setLng] = useState("-58.3816");
  const [formProvinceId, setFormProvinceId] = useState("caba");
  
  const [courseInput, setCourseInput] = useState("");
  const [courses, setCourses] = useState<string[]>([]);

  // Sync defaults whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      const activeId = activeProvinceId || "caba";
      setFormProvinceId(activeId);
      
      // Auto-configure lat, lng, and whatsapp prefix for user convenience
      const prov = PROVINCES.find(p => p.id === activeId);
      if (prov) {
        setLat(String(prov.lat));
        setLng(String(prov.lng));
      }
      
      if (activeId === "cordoba") {
        setWhatsapp("+549351");
        setNeighborhood("Nueva Córdoba");
      } else if (activeId === "santa-fe") {
        setWhatsapp("+549341");
        setNeighborhood("Rosario Centro");
      } else if (activeId === "mendoza") {
        setWhatsapp("+549261");
        setNeighborhood("Ciudad Capital");
      } else if (activeId === "salta") {
        setWhatsapp("+549387");
        setNeighborhood("Salta Centro");
      } else if (activeId === "buenos-aires") {
        setWhatsapp("+54911");
        setNeighborhood("Lanús");
      } else {
        setWhatsapp("+54911");
        setNeighborhood("Palermo");
      }
    }
  }, [isOpen, activeProvinceId]);

  if (!isOpen) return null;

  const handleAddCourse = () => {
    if (courseInput.trim() && !courses.includes(courseInput.trim())) {
      setCourses([...courses, courseInput.trim()]);
      setCourseInput("");
    }
  };

  const handleRemoveCourse = (idx: number) => {
    setCourses(courses.filter((_, i) => i !== idx));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !type.trim() || !address.trim() || courses.length === 0) {
      alert("Por favor completa todos los campos requeridos y añade por lo menos un curso.");
      return;
    }

    // Verify coordinates are numbers
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (isNaN(latNum) || isNaN(lngNum)) {
      alert("Por favor inserta coordenadas geográficas de latitud y longitud válidas.");
      return;
    }

    // Verify WhatsApp starts with +549
    let processedWhatsapp = whatsapp.trim().replace(/\s+/g, '');
    if (!processedWhatsapp.startsWith("+549") || processedWhatsapp.length < 10) {
      alert("El número de WhatsApp debe comenzar con el código internacional argentino '+549' seguido por la característica y número (ej: +5491144556677 para CABA, +5493514455667 para Córdoba)");
      return;
    }

    const newCenter: Center = {
      id: `man-${Date.now()}`,
      name: name.trim(),
      specialty: specialty as any,
      type: type.trim(),
      modality: modality as any,
      certification: certification as any,
      courses,
      whatsapp: processedWhatsapp,
      address: address.trim(),
      neighborhood,
      coordinates: { lat: latNum, lng: lngNum },
      nationalCertification: nationalCertification,
      provinceId: formProvinceId
    };

    if (onAddManualCenter) {
      onAddManualCenter(newCenter);
    }

    // Reset Form
    setName("");
    setType("");
    setCourses([]);
    setWhatsapp("+54911");
    setAddress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col relative max-h-[90vh]">
        
        {/* Header bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center space-x-2">
            {mode === 'view' && <HelpCircle className="w-5 h-5 text-indigo-500" />}
            {mode === 'add' && <Plus className="w-5 h-5 text-indigo-500" />}
            {mode === 'help' && <HelpCircle className="w-5 h-5 text-indigo-500" />}
            
            <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wide">
              {mode === 'view' && "Detalles de la Academia"}
              {mode === 'add' && "Registrar Sede No Formal"}
              {mode === 'help' && "Guía de Educación No Formal"}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* VIEW MODE */}
          {mode === 'view' && center && (
            <div className="space-y-4 text-xs text-slate-600 font-sans">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-full uppercase tracking-wider">
                    {center.specialty}
                  </span>
                  
                  {onToggleContacted && (
                    <label className="inline-flex items-center space-x-1.5 cursor-pointer select-none bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 rounded-full py-1 px-3 transition-colors animate-fade-in" title="Marcar/Desmarcar como ya contactado">
                      <input
                        type="checkbox"
                        checked={!!center.contacted}
                        onChange={() => onToggleContacted(center.id)}
                        className="w-3.5 h-3.5 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider">¿Ya contactado?</span>
                    </label>
                  )}
                </div>
                <h4 className="text-xl font-bold font-display text-slate-800 leading-tight">
                  {center.name}
                </h4>
                <p className="text-slate-400 font-mono text-[11px] mt-1">{center.type}</p>
              </div>

              {/* Geographic Info Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 block text-xs">Ubicación Geográfica</span>
                    <span className="text-[11px] text-slate-500 block">{center.address}, {center.neighborhood}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Coordenadas: {center.coordinates.lat.toFixed(5)}, {center.coordinates.lng.toFixed(5)}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 block text-xs">Acreditación Académica</span>
                    <span className="text-[11px] text-slate-500 block">
                      {center.certification === 'Oficial' ? '📜 Certificación Oficial homologada o matrícula avalada.' : '📋 Certificación propia del centro privado. Educación complementaria.'}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      <b>¿Ofrece Certificación Nacional?:</b> {
                        center.nationalCertification ? center.nationalCertification :
                        (center.certification === 'Oficial' ? 'Sí' : 'No')
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Courses Bullet List */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-xs">Cursos y Capacitaciones Listas:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {center.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-sans font-medium text-slate-700 text-xs">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="pt-2">
                {(() => {
                  const cleanPhone = center.whatsapp.replace('+', '').replace(/\s+/g, '');
                  const message = encodeURIComponent(`Hola, vi su centro "${center.name}" en EduNoFormal Argentina y quería consultar sobre días, horarios y costos de inscripción para sus cursos (${center.courses.slice(0, 3).join(", ")}). ¡Muchas gracias!`);
                  const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;
                  return (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white shadow-md hover:shadow-lg transition-all rounded-xl py-3 px-4 font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.253 8.477 3.521 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm12.022-2.13c1.802 0 3.568-.484 5.114-1.4l.366-.218 3.805.998-.383-3.692.239-.383c.995-1.586 1.52-3.424 1.516-5.31C22.75 6.13 17.925 1.305 12 1.305c-5.922 0-10.74 4.814-10.745 10.739-.001 1.884.49 3.731 1.422 5.33l.255.438-.973 3.551 3.636-.954.385.228c1.498.887 3.204 1.354 4.956 1.355zm5.786-7.915c-.318-.159-1.88-.928-2.17-.1.033-.29-.12-.435-.435-.595-.157-.079-.766-.316-1.465-.939-.543-.484-.91-1.082-.102-1.241-.11-.159-.24-.319-.36-.48-.684-.913-1.12-1.133-1.44-.813-.23.23-.46.33-.69.57-.23.23-.41.37-.69.59-.28.22-.57.44-.81.67-.32.32-.61.64-.81.93s-.36.56-.2.1.28-.56.9-.12.56.32 1.15.86c.64.59.88.94 1.17 1.3.28.37.28.69.14.99-.14.29-.63.92-.81 1.14-.15.22-.38.29-.63.14-.25-.15-1.07-.39-2.03-1.25-.75-.67-1.26-1.51-1.41-1.76-.14-.26-.01-.39.11-.51.12-.12.25-.29.38-.44.13-.15.17-.25.26-.43.09-.18.04-.34-.01-.45-.06-.11-.53-1.28-.73-1.76-.19-.48-.39-.41-.53-.41h-.45c-.15 0-.41.06-.63.29-.22.23-.85.83-.85 2.03 0 1.2 1.25 2.45 1.33 2.53.08.08 1.48 2.26 3.59 3.17.51.22.9.36 1.21.46.52.16.99.14 1.37.08.41-.06 1.88-.77 2.14-1.51.25-.74.25-1.37.18-1.51-.08-.14-.29-.22-.61-.38z"/>
                      </svg>
                      <span>Abrir Chat de WhatsApp ({center.whatsapp})</span>
                    </a>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ADD MANUAL CENTER FORM */}
          {mode === 'add' && (
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              
              {/* Institution Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Nombre del Centro *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Academia Gótico del Calzado"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                />
              </div>

              {/* Province selection */}
              <div className="grid grid-cols-1 gap-1">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Provincia de Ubicación *</label>
                  <select
                    value={formProvinceId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setFormProvinceId(selectedId);
                      
                      // Auto-configure lat, lng, and whatsapp prefix for user convenience
                      const prov = PROVINCES.find(p => p.id === selectedId);
                      if (prov) {
                        setLat(String(prov.lat));
                        setLng(String(prov.lng));
                      }
                      
                      if (selectedId === "cordoba") {
                        setWhatsapp("+549351");
                        setNeighborhood("Nueva Córdoba");
                      } else if (selectedId === "santa-fe") {
                        setWhatsapp("+549341");
                        setNeighborhood("Rosario Centro");
                      } else if (selectedId === "mendoza") {
                        setWhatsapp("+549261");
                        setNeighborhood("Ciudad Capital");
                      } else if (selectedId === "salta") {
                        setWhatsapp("+549387");
                        setNeighborhood("Salta Centro");
                      } else if (selectedId === "buenos-aires") {
                        setWhatsapp("+54911");
                        setNeighborhood("Lanús");
                      } else {
                        setWhatsapp("+54911");
                        setNeighborhood("Palermo");
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  >
                    {PROVINCES.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specialty & Modality */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Especialidad Directiva</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  >
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Modalidad de Clases</label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  >
                    {MODALITIES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Specialty detail (Type) */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Tipo Descriptivo (Sub-categoría) *</label>
                <input
                  type="text"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Ej: Escuela de Oficios de Costura, Academia de Código..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                />
              </div>

              {/* Certification & National Certification & WhatsApp */}
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Certificación</label>
                  <select
                    value={certification}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCertification(val);
                      if (val === 'Oficial') {
                        setNationalCertification('Sí');
                      } else {
                        setNationalCertification('No');
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  >
                    {CERTIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">¿Validez Nac.?</label>
                  <select
                    value={nationalCertification}
                    onChange={(e) => setNationalCertification(e.target.value as 'Sí' | 'No')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  >
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej: +549114400223"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex justify-between px-1">
                <span>Formato de WhatsApp obligatorio: +54911</span>
                <span>Si es Oficial, suele tener validez nacional</span>
              </div>

              {/* Address & Neighborhood */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Dirección Física *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Soler 4300 o Av. Mitre 800"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Barrio o Municipio *</label>
                  <input
                    type="text"
                    required
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ej: Palermo o Avellaneda"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Ubicación Latitud *</label>
                  <input
                    type="text"
                    required
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Ej: -34.588"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Ubicación Longitud *</label>
                  <input
                    type="text"
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="Ej: -58.409"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Adding specific individual courses */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="font-bold text-slate-800 block text-xs">Cursos dictados actualmente ({courses.length}) *</label>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    placeholder="Ej: Carpintería Inicial con Router"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-400 focus:bg-white transition-all text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddCourse}
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-3 py-2 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="space-y-1.5 max-h-24 overflow-y-auto bg-slate-50 border border-slate-100 rounded-xl p-2">
                  {courses.map((c, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-slate-100 text-[11px]">
                      <span className="truncate max-w-[280px]">{c}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveCourse(i)} 
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {courses.length === 0 && (
                    <p className="text-[10px] text-slate-400 italic text-center py-2">No agregaste ningún curso aún.</p>
                  )}
                </div>
              </div>

              {/* Form Submission */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl font-medium text-slate-600 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 rounded-xl font-bold font-display shadow-xs transition-colors cursor-pointer"
                >
                  Registrar Centro
                </button>
              </div>

            </form>
          )}

          {/* HELP MODE */}
          {mode === 'help' && (
            <div className="space-y-4 text-xs text-slate-600">
              <h4 className="font-display font-bold text-slate-800 text-sm">¿De qué se trata este buscador?</h4>
              <p className="leading-relaxed text-[11px]">
                Esta plataforma interactiva reúne un padrón nacional de más de <b>3.200 centros, academias de estética y bienestar, escuelas de danza, institutos de mecánica, talleres de oficios, cocina, idiomas y artes</b> de la <b>Educación No Formal</b> en Buenos Aires (CABA + Conurbano + PBA) y en todas las provincias argentinas con enlace directo a sus WhatsApps.
              </p>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 space-y-2.5">
                <h5 className="font-semibold text-xs flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-amber-700" />
                  ALCANCE Y COBERTURA:
                </h5>
                <p className="text-[11px] leading-relaxed">
                  En Argentina existen miles de academias privadas, institutos de estética y centros de formación profesional. Este padrón se actualiza permanentemente e incluye una herramienta de <b>Descubrimiento con IA</b> para sumar cualquier academia o zona que no figure todavía en la base local.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-800 text-xs">Instrucciones de Uso:</h5>
                <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-normal list-inside">
                  <li>Elegí tu provincia o explorá <b>"Todo el País"</b> y <b>"AMBA"</b> desde las pestañas superiores.</li>
                  <li>Filtrá por oficios, estética, cosmetología, peluquería, gastronomía o tecnología.</li>
                  <li>Consultá el mapa satelital para ver las sedes y talleres más cercanos a tu ubicación.</li>
                  <li>Contactate directamente por WhatsApp comercial con un solo clic.</li>
                  <li>Usá el <b>Generador / Descubridor con IA</b> para incorporar academias de cualquier barrio o especialidad.</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-center"
                >
                  Entendido, ¡Comenzar!
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
