import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, CheckCircle, Clock, CheckCheck, XCircle, Flame, Zap, FileText, User, Globe, PlusCircle } from 'lucide-react';

export const MyRequests = ({ openRequestModal }) => {
  const { requests, updateRequestStatus, currentUser } = useApp();

  const [viewMode, setViewMode] = useState('personal'); // 'personal' | 'all'

  // Filter requests based on user authentication and selected view mode
  const displayedRequests = requests.filter(req => {
    if (viewMode === 'all') return true;

    if (currentUser) {
      // Show requests created by this user OR targeted to this user
      return (
        req.requesterEmail === currentUser.email ||
        req.requesterId === currentUser.id ||
        req.targetDonorId === currentUser.id
      );
    } else {
      // Guest mode: show guest requests
      return req.requesterEmail === 'guest@lifeflow.org' || !req.requesterEmail;
    }
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Approved
          </span>
        );
      case 'Fulfilled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
            <CheckCheck className="w-3.5 h-3.5 shrink-0" /> Fulfilled
          </span>
        );
      case 'Cancelled':
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 shrink-0" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 shrink-0" /> Pending
          </span>
        );
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold uppercase bg-rose-600/30 text-rose-300 border border-rose-500/40 animate-pulse whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Critical
          </span>
        );
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 whitespace-nowrap">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Urgent
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold uppercase bg-slate-800/80 text-slate-300 border border-slate-700 whitespace-nowrap">
            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Normal
          </span>
        );
    }
  };

  const canManageRequest = (req) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    return (
      req.requesterEmail === currentUser.email ||
      req.requesterId === currentUser.id ||
      req.targetDonorId === currentUser.id
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & View Filter Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <ClipboardList className="w-6 h-6 text-rose-400 shrink-0" />
            <span>Emergency Blood Requests</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {currentUser 
              ? `Logged in as ${currentUser.name} (${currentUser.role})`
              : 'Guest Mode — Showing session requests'}
          </p>
        </div>

        {/* Filter View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setViewMode('personal')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'personal'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>My Personal Requests ({requests.filter(r => currentUser ? (r.requesterEmail === currentUser.email || r.requesterId === currentUser.id) : (r.requesterEmail === 'guest@lifeflow.org')).length})</span>
          </button>

          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'all'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>System-Wide Requests ({requests.length})</span>
          </button>
        </div>
      </div>

      {/* Requests Table Container */}
      <div className="glass-panel rounded-3xl border border-slate-800/90 overflow-hidden shadow-2xl">
        {displayedRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 min-w-[900px]">
              <thead className="bg-slate-900/90 text-xs uppercase font-extrabold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4.5 px-6">ID / Patient</th>
                  <th className="py-4.5 px-6">Blood Group</th>
                  <th className="py-4.5 px-6">Units</th>
                  <th className="py-4.5 px-6">Hospital & Location</th>
                  <th className="py-4.5 px-6">Urgency</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {displayedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4.5 px-6">
                      <div className="font-bold text-white text-sm">{req.patientName}</div>
                      <div className="text-xs text-slate-400 mt-0.5 whitespace-nowrap">
                        By: <span className="text-slate-300">{req.requesterName}</span> <span className="text-slate-400">({req.requesterPhone})</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 font-extrabold text-sm border border-rose-500/30 whitespace-nowrap shadow-sm">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 font-bold text-slate-100 whitespace-nowrap">
                      {req.units} Bag(s)
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="font-semibold text-slate-200 text-xs">{req.hospital}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">District: {req.district}</div>
                    </td>
                    <td className="py-4.5 px-6">{getUrgencyBadge(req.urgency)}</td>
                    <td className="py-4.5 px-6">{getStatusBadge(req.status)}</td>
                    <td className="py-4.5 px-6 text-right">
                      {(req.status === 'Pending' || req.status === 'Approved') && canManageRequest(req) ? (
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Fulfilled')}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all shadow-sm"
                          >
                            Mark Fulfilled
                          </button>
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Cancelled')}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic whitespace-nowrap">
                          {req.status === 'Fulfilled' || req.status === 'Cancelled' ? 'Completed' : 'View Only'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <ClipboardList className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">No Personal Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have not submitted any emergency blood requests under your current account yet.
            </p>
            {openRequestModal && (
              <button
                onClick={openRequestModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white crimson-gradient crimson-glow hover:opacity-95 transition-all shadow-lg mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Emergency Request</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
