import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Center } from "../data/initialCenters";
import { Province } from "../data/provinces";

interface CenterMapProps {
  centers: Center[];
  selectedCenter: Center | null;
  onSelectCenter: (center: Center) => void;
  activeProvince: Province;
}

const SPECIALTY_MARKER_COLORS: Record<string, string> = {
  'Tecnología': '#2563eb', // Blue
  'Gastronomía': '#d97706', // Amber
  'Idiomas': '#10b981', // Emerald
  'Arte y Diseño': '#8b5cf6', // Purple
  'Oficios y Técnica': '#f97316', // Orange
  'Estética y Bienestar': '#ec4899', // Pink
};

export default function CenterMap({ centers, selectedCenter, onSelectCenter, activeProvince }: CenterMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 2. Initialize Leaflet Map Instance (if not already hydrated)
    if (!mapInstanceRef.current) {
      // Create map centered on initially selected province
      const map = L.map(mapContainerRef.current, {
        center: [activeProvince.lat, activeProvince.lng],
        zoom: activeProvince.zoom || 11,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Load street tiles (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Create Group Layer for markers
      const markerGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markerGroup;

      mapInstanceRef.current = map;
    }

    // Unmount safe clean-up
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync province view location
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const validCenters = centers.filter(c => c?.coordinates && typeof c.coordinates.lat === 'number' && typeof c.coordinates.lng === 'number');
    if (validCenters.length > 0) {
      const bounds = validCenters.map(c => [c.coordinates.lat, c.coordinates.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    } else {
      map.setView([activeProvince.lat, activeProvince.lng], activeProvince.zoom || 11);
    }
  }, [activeProvince]);

  // Update markers whenever centers array changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const map = mapInstanceRef.current;
    const markerGroup = markersGroupRef.current;

    // Clear existing markers
    markerGroup.clearLayers();
    markersMapRef.current.clear();

    // Re-populate markers (cap at 750 on wide views to maintain silky smooth 60fps Leaflet performance)
    const MAX_MAP_PINS = 750;
    const centersToRender = centers.length > MAX_MAP_PINS ? centers.slice(0, MAX_MAP_PINS) : centers;

    centersToRender.forEach((center) => {
      const color = SPECIALTY_MARKER_COLORS[center.specialty] || '#64748b';
      
      // Build a premium circular vector pin marker instead of ugly default blue asset pins
      const htmlIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="
              width: 15px; 
              height: 15px; 
              background-color: ${color}; 
              border: 3px solid white; 
              border-radius: 50%;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
              transition: all 0.2s ease-in-out;
            " class="marker-circle"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([center.coordinates.lat, center.coordinates.lng], {
        icon: htmlIcon
      });

      // Bind dynamic details popup
      const popupContent = `
        <div style="font-family: inherit; width: 180px; padding: 2px;">
          <b style="font-size: 13px; color: #1e293b; display: block; margin-bottom: 2px;">${center.name}</b>
          <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: ${color}; margin-bottom: 6px; display: block;">${center.specialty}</span>
          <span style="font-size: 11px; display: block; color: #64748b; margin-bottom: 8px;">📍 ${center.address}</span>
          <button id="map-popup-btn-${center.id}" style="
            width: 100%;
            background-color: #0f172a;
            color: white;
            border: none;
            padding: 5px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
          ">Ver Detalles</button>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Map marker click behavior
      marker.on('click', () => {
        onSelectCenter(center);
      });

      marker.on('popupopen', () => {
        // Handle clicking "Ver Detalles" button inside popup
        setTimeout(() => {
          const btn = document.getElementById(`map-popup-btn-${center.id}`);
          if (btn) {
            btn.onclick = (e) => {
              e.stopPropagation();
              onSelectCenter(center);
            };
          }
        }, 50);
      });

      marker.addTo(markerGroup);
      markersMapRef.current.set(center.id, marker);
    });

    // Auto-adjust zoom bounds of the map to fit all current markers
    const validMarkers = centers.filter(c => c?.coordinates && typeof c.coordinates.lat === 'number' && typeof c.coordinates.lng === 'number');
    if (validMarkers.length > 0) {
      const bounds = validMarkers.map(c => [c.coordinates.lat, c.coordinates.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

  }, [centers]);

  // Handle flyTo when center is highlighted by user in listing
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCenter?.coordinates) return;

    const map = mapInstanceRef.current;
    
    // Smooth transition
    map.flyTo([selectedCenter.coordinates.lat, selectedCenter.coordinates.lng], 15, {
      duration: 1.2
    });

    // Open corresponding marker popup
    const targetMarker = markersMapRef.current.get(selectedCenter.id);
    if (targetMarker) {
      setTimeout(() => {
        targetMarker.openPopup();
      }, 500);
    }
  }, [selectedCenter]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner min-h-[450px]">
      <div 
        ref={mapContainerRef} 
        id="leaflet-active-map"
        className="w-full h-full absolute inset-0 z-0 bg-slate-100"
      />
      
      {/* Visual legends wrapper */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-md border border-slate-100 z-10 space-y-1.5 text-[10px] font-semibold text-slate-600 max-w-[200px]">
        <p className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-bold mb-1">Especialidades</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span>Tecnología / IA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Gastronomía</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Idiomas</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>Arte y Diseño</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span>Oficios y Técnicas</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
          <span>Estética / Belleza</span>
        </div>
      </div>
    </div>
  );
}
