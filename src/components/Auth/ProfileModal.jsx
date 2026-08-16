import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Phone, Mail, MapPin, Droplet, ShieldCheck, Activity, ToggleLeft, ToggleRight } from 'lucide-react';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, toggleDonorAvailability } = useApp();

  if (!isOpen || !currentUser) return null;

  const isAvailable = currentUser.availability === 'Available';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl crimson-gradient text-white font-extrabold text-2xl shadow-xl border border-rose-400/30">
            {currentUser.bloodGroup || 'O+'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
              {currentUser.role === 'Admin' && (
                <ShieldCheck className="w-5 h-5 text-amber-400 inline" title="Admin User" />
              )}
            </div>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Role: {currentUser.role}
            </span>
          </div>
        </div>

        {/* Donor Availability Control (If Donor) */}
        {currentUser.role === 'Donor' && (
          <div className="p-4 rounded-2xl glass-card border-rose-500/20 mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Donor Availability</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Current Status: {' '}
                <span className={`font-bold ${isAvailable ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {currentUser.availability}
                </span>
              </div>
            </div>

            <button
              onClick={toggleDonorAvailability}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isAvailable
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              {isAvailable ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              <span>Toggle Status</span>
            </button>
          </div>
        )}

        {/* Details List */}
        <div className="space-y-3 glass-card p-4 rounded-2xl mb-6">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <Phone className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-semibold text-slate-400">Phone:</span>
            <span>{currentUser.phone || '+880 1711-000000'}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-semibold text-slate-400">District:</span>
            <span>{currentUser.district || 'Rajshahi'}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <Activity className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-semibold text-slate-400">Total Donations:</span>
            <span>{currentUser.totalDonations || 0} Times</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <Droplet className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-semibold text-slate-400">Last Donated:</span>
            <span>{currentUser.lastDonated || 'Never'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
        >
          Close Profile
        </button>

      </div>
    </div>
  );
};
