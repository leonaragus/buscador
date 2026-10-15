import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg animate-pulse">
      <WifiOff className="w-4 h-4" />
      <span>Modo sin conexión — Mostrando los 3.200+ centros guardados en tu dispositivo</span>
    </div>
  );
};
