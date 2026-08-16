import React from 'react';
import { useApp } from '../../context/AppContext';
import { Boxes, Plus, Minus, AlertCircle, ShieldCheck, Flame, Zap, Check } from 'lucide-react';

export const InventoryMatrix = () => {
  const { inventory, updateInventoryCount, currentUser } = useApp();

  const isAdmin = currentUser && currentUser.role === 'Admin';

  const getStockBadge = (status) => {
    switch (status) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 whitespace-nowrap">
            <Flame className="w-3 h-3 text-rose-400 shrink-0" /> Critical
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
            <Zap className="w-3 h-3 text-amber-400 shrink-0" /> Low Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
            <Check className="w-3 h-3 text-emerald-400 shrink-0" /> Sufficient
          </span>
        );
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-extrabold text-white">Central Blood Bank Reserve Matrix</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Live unit count per blood group in reserve storage</p>
        </div>

        {isAdmin && (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Controls Active</span>
          </span>
        )}
      </div>

      {/* 8 Blood Group Matrix Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {inventory.map((item) => {
          const percentage = Math.min(100, Math.round((item.units / 25) * 100));

          return (
            <div key={item.bloodGroup} className="glass-card p-4 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
              
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl crimson-gradient text-white font-extrabold text-base flex items-center justify-center shadow-md">
                  {item.bloodGroup}
                </div>
                {getStockBadge(item.status)}
              </div>

              <div className="mb-3">
                <div className="text-2xl font-extrabold text-white">{item.units} <span className="text-xs font-semibold text-slate-400">Bags</span></div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'Critical' ? 'bg-rose-600' : item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Admin Unit Adjustment Controls */}
              {isAdmin ? (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-semibold">Adjust Stock:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateInventoryCount(item.bloodGroup, -1)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 transition-colors"
                      title="Deduct 1 bag"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => updateInventoryCount(item.bloodGroup, 1)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-300 transition-colors"
                      title="Add 1 bag"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 italic pt-1 text-right">Target Capacity: 25 Bags</div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
