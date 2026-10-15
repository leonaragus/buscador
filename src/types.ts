export type SpecialtyType = 
  | 'Tecnología' 
  | 'Gastronomía' 
  | 'Idiomas' 
  | 'Arte y Diseño' 
  | 'Oficios y Técnica' 
  | 'Estética y Bienestar';

export interface Center {
  id: string;
  name: string;
  specialty: SpecialtyType;
  type: string;
  modality: 'Presencial' | 'Online' | 'Híbrido';
  certification: 'Oficial' | 'Propia' | 'Sin Certificación';
  courses: string[];
  whatsapp: string;
  address: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nationalCertification?: 'Sí' | 'No';
  provinceId?: string; // e.g. "caba", "buenos-aires", "cordoba", etc.
  contacted?: boolean;
}
