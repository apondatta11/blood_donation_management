import React from 'react';
import { Phone, MapPin, Calendar, Heart, Send } from 'lucide-react';

export const DonorCard = ({ donor, onRequestClick }) => {
  const isAvailable = donor.availability === 'Available';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-950/20 group relative overflow-hidden">
      
      {/* Top Banner Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isAvailable ? 'bg-emerald-500' : 'bg-slate-700'}`} />

      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Blood Group Badge */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl crimson-gradient crimson-glow text-white font-extrabold text-xl shadow-lg border border-rose-400/30 group-hover:scale-105 transition-transform">
          {donor.bloodGroup}
        </div>

        {/* Status Pill */}
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
          isAvailable
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-slate-800 text-slate-400 border border-slate-700'
        }`}>
          {donor.availability}
        </span>
      </div>

      {/* Donor Info */}
      <h3 className="text-base font-bold text-slate-100 group-hover:text-rose-400 transition-colors">
        {donor.name}
      </h3>
      <p className="text-xs text-slate-400 mb-3">{donor.address || donor.district}</p>

      {/* Details Grid */}
      <div className="space-y-2 border-t border-slate-800/80 pt-3 mb-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-slate-400">Location:</span>
          <span className="font-medium text-slate-200">{donor.district}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-slate-400">Contact:</span>
          <span className="font-medium text-slate-200">{donor.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-slate-400">Last Donated:</span>
          <span className="font-medium text-slate-200">{donor.lastDonated || 'Never'}</span>
        </div>
      </div>

      {/* Request Action Button */}
      <button
        onClick={() => onRequestClick(donor)}
        disabled={!isAvailable}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
          isAvailable
            ? 'bg-rose-600/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600 hover:text-white shadow-md'
            : 'bg-slate-800/40 text-slate-500 cursor-not-allowed border border-slate-800'
        }`}
      >
        <Send className="w-3.5 h-3.5" />
        <span>{isAvailable ? 'Request Direct Donation' : 'Currently Unavailable'}</span>
      </button>

    </div>
  );
};
