import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-rose-400" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-emerald-500/30 bg-emerald-950/40 text-emerald-100';
      case 'error': return 'border-rose-500/30 bg-rose-950/40 text-rose-100';
      case 'alert': return 'border-amber-500/30 bg-amber-950/40 text-amber-100';
      default: return 'border-cyan-500/30 bg-slate-900/90 text-slate-100';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${getBorderColor()}`}>
        {getIcon()}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
