import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Clock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const ActivityLog = () => {
  const { logs } = useApp();

  const getLogIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Info className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-extrabold text-white">System Activity Audit Log</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Real-time Timeline</span>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs">
            <div className="p-1 rounded-lg bg-slate-800 shrink-0 mt-0.5">
              {getLogIcon(log.type)}
            </div>
            <div className="flex-1">
              <p className="text-slate-200 font-medium leading-tight">{log.text}</p>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 inline" /> {log.time}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
