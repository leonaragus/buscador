import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle, X, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already running as an installed PWA on the home screen
  if (isInstalled) {
    return (
      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Modo App Activo</span>
      </span>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Instalar EduNoFormal en tu teléfono como aplicación"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs hover:shadow transition-all cursor-pointer active:scale-95 shrink-0"
      >
        <Smartphone className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Descargar App al Celular</span>
        <span className="sm:hidden">Instalar App</span>
      </button>

      {/* Guidance Modal for iOS Safari and other browsers */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">Instalar en tu Celular</h3>
                  <p className="text-[11px] text-slate-500">EduNoFormal como Web App</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              {isIOS ? (
                <>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Para tener la app en tu iPhone o iPad y acceder directamente a los WhatsApps con un toque:
                  </p>
                  <ol className="space-y-2.5 text-slate-700 font-medium">
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                      <span>Tocá el botón <strong>Compartir</strong> <Share className="w-3.5 h-3.5 inline mx-0.5 text-indigo-600" /> en la barra inferior de Safari.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                      <span>Deslizá hacia abajo y seleccioná <strong>"Agregar a inicio"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-indigo-600" />.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                      <span>¡Listo! Abrila como una aplicación nativa desde tu pantalla de inicio.</span>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Podés instalar EduNoFormal en tu teléfono Android o computadora:
                  </p>
                  <ol className="space-y-2 text-slate-700 font-medium">
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                      <span>En <strong>Chrome o navegador móvil</strong>, tocá el menú de los <strong>3 puntos (⋮)</strong> en la esquina superior.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                      <span>Tocá <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                      <span>Aparecerá el ícono de la app en tu teléfono con acceso inmediato a los más de 3.200 WhatsApps.</span>
                    </li>
                  </ol>
                </>
              )}
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
