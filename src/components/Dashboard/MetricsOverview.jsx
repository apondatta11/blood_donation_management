import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, AlertTriangle, CheckCircle2, Droplet } from 'lucide-react';

export const MetricsOverview = () => {
  const { donors, requests, inventory } = useApp();

  const totalDonors = donors.length;
  const availableDonors = donors.filter(d => d.availability === 'Available').length;
  const activeRequests = requests.filter(r => r.status === 'Pending').length;
  const fulfilledDonations = requests.filter(r => r.status === 'Fulfilled').length;
  const criticalStock = inventory.filter(i => i.status === 'Critical' || i.status === 'Low Stock').length;

  const metrics = [
    {
      title: 'Total Active Donors',
      value: `${availableDonors} / ${totalDonors}`,
      subtext: `${availableDonors} ready to donate right now`,
      icon: Users,
      color: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30'
    },
    {
      title: 'Active Emergency Requests',
      value: activeRequests,
      subtext: 'Awaiting urgent donor response',
      icon: AlertTriangle,
      color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Fulfilled Donations',
      value: fulfilledDonations,
      subtext: 'Lives saved this session',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Low Stock Alerts',
      value: `${criticalStock} Groups`,
      subtext: 'Requires urgent donor drive',
      icon: Droplet,
      color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className={`glass-card p-5 rounded-2xl border bg-gradient-to-br ${m.color} transition-all duration-300 hover:scale-[1.02]`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{m.title}</span>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">{m.value}</div>
            <p className="text-[11px] text-slate-400 mt-1">{m.subtext}</p>
          </div>
        );
      })}
    </div>
  );
};
