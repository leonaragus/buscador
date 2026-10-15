import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Send, Sparkles, ExternalLink, Smartphone } from 'lucide-react';
import { RAICEP_WHATSAPP_MESSAGE, buildRaicepWhatsAppUrl, cleanWhatsAppNumber } from '../utils/whatsappMessage';

interface RaicepMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RaicepMessageModal: React.FC<RaicepMessageModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [testPhone, setTestPhone] = useState('+54911');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(RAICEP_WHATSAPP_MESSAGE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const testUrl = buildRaicepWhatsAppUrl(testPhone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1.5">
                Mensaje Automático RAICEP para WhatsApp
              </h3>
              <p className="text-[11px] text-slate-500">
                Formato con negritas <code className="bg-slate-200/80 px-1 py-0.5 rounded text-[10px] text-slate-700">*palabra*</code> reconocido por WhatsApp
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          
          {/* Quick Explanation */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-950 leading-relaxed">
              <p className="font-bold">Mensaje optimizado para conversión y respuesta inmediata:</p>
              <p className="text-emerald-800 mt-0.5">
                Al hacer clic en el botón de WhatsApp de cualquier centro o instituto, se abrirá la aplicación con este mensaje listo para enviar. Las negritas con asteriscos se visualizan destacadas automáticamente en WhatsApp.
              </p>
            </div>
          </div>

          {/* Visual WhatsApp Bubble Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 text-xs flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                Vista previa del mensaje
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copiar Texto Completo</span>
                  </>
                )}
              </button>
            </div>

            {/* Bubble Container */}
            <div className="bg-[#efeae2] p-3.5 rounded-2xl border border-slate-300/80 shadow-inner">
              <div className="bg-white rounded-xl rounded-tl-none p-3.5 text-slate-800 shadow-sm border border-slate-200 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed text-[11px] font-sans selection:bg-emerald-100">
                {RAICEP_WHATSAPP_MESSAGE}
              </div>
              <div className="text-right mt-1 text-[10px] text-slate-500">
                Formato WhatsApp Oficial • Listo para difusión
              </div>
            </div>
          </div>

          {/* Direct Test Box */}
          <div className="border border-slate-200 bg-slate-50 rounded-xl p-3 space-y-2">
            <span className="font-bold text-slate-700 text-xs block">
              Probar envío a un número de WhatsApp:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="+54911..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-mono focus:outline-hidden focus:border-emerald-500"
              />
              <a
                href={testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba56] text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Abrir WhatsApp</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
            <p className="text-[10px] text-slate-500">
              Formato internacional sugerido: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-mono">+54 9 [código de área sin 0] [número sin 15]</code>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            RAICEP • Red de Convalidación Académica Argentina
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
