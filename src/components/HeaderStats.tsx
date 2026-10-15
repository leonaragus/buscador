import React from "react";
import { BookOpen, Award, CheckCircle2, MessageSquareCode } from "lucide-react";
import { Center } from "../data/initialCenters";

interface HeaderStatsProps {
  centers: Center[];
}

export default function HeaderStats({ centers }: HeaderStatsProps) {
  const totalCenters = centers.length;
  const certifiedCount = centers.filter(c => c?.certification === 'Oficial').length;
  const totalCourses = centers.reduce((sum, c) => sum + (Array.isArray(c?.courses) ? c.courses.length : 0), 0);
  
  // Calculate top specialty
  const specialtyCounts = centers.reduce((acc, c) => {
    if (c?.specialty) {
      acc[c.specialty] = (acc[c.specialty] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  let topSpecialty = "Ninguna";
  let maxCount = 0;
  Object.entries(specialtyCounts).forEach(([spec, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topSpecialty = spec;
    }
  });

  const percentCertified = totalCenters > 0 ? Math.round((certifiedCount / totalCenters) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <div 
        id="stat-box-total"
        className="bg-white rounded-lg p-3 border border-slate-200 flex items-center space-x-3 transition-colors hover:border-slate-350"
      >
        <div className="p-2.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Centros en Padrón</p>
          <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{totalCenters}</h3>
          <p className="text-[10px] text-slate-500 font-medium">Directorio Verificado</p>
        </div>
      </div>

      <div 
        id="stat-box-certified"
        className="bg-white rounded-lg p-3 border border-slate-200 flex items-center space-x-3 transition-colors hover:border-slate-350"
      >
        <div className="p-2.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg">
          <Award className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Acreditación Oficial</p>
          <div className="flex items-baseline space-x-1.5 leading-tight">
            <h3 className="text-xl font-extrabold text-slate-900">{certifiedCount}</h3>
            <span className="text-[10px] font-bold text-amber-700">({percentCertified}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden border border-slate-200">
            <div 
              className="bg-amber-500 h-full rounded-full" 
              style={{ width: `${percentCertified}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div 
        id="stat-box-courses"
        className="bg-white rounded-lg p-3 border border-slate-200 flex items-center space-x-3 transition-colors hover:border-slate-350"
      >
        <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Cursos Activos</p>
          <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{totalCourses}</h3>
          <p className="text-[10px] text-slate-500 font-medium font-mono">Salida laboral directa</p>
        </div>
      </div>

      <div 
        id="stat-box-specialty"
        className="bg-white rounded-lg p-3 border border-slate-200 flex items-center space-x-3 transition-colors hover:border-slate-350"
      >
        <div className="p-2.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg">
          <MessageSquareCode className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Especialidad Líder</p>
          <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-[150px] leading-tight">{topSpecialty}</h3>
          <p className="text-[10px] text-purple-700 font-semibold">{maxCount} sedes activas</p>
        </div>
      </div>
    </div>
  );
}
