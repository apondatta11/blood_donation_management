import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const AdminApprovalQueue = () => {
  const { requests, updateRequestStatus, currentUser } = useApp();

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const isAdmin = currentUser && currentUser.role === 'Admin';

  // Only render Admin Approval Queue if an Admin is logged in
  if (!isAdmin || pendingRequests.length === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-base font-extrabold text-white">Pending Requests Awaiting Admin Approval</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 whitespace-nowrap">
          {pendingRequests.length} Action Needed
        </span>
      </div>

      <div className="space-y-3">
        {pendingRequests.map((req) => (
          <div key={req.id} className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-extrabold text-xs border border-rose-500/30 whitespace-nowrap">
                  {req.bloodGroup}
                </span>
                <span className="text-sm font-bold text-white">{req.patientName}</span>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">({req.units} Bag)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Hospital: <span className="text-slate-200">{req.hospital}</span> | Contact: <span className="text-slate-200">{req.requesterPhone}</span>
              </p>
              <div className="text-[11px] text-amber-400/90 mt-0.5">Reason: {req.reason}</div>
            </div>

            {isAdmin ? (
              <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
                <button
                  onClick={() => updateRequestStatus(req.id, 'Approved')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all whitespace-nowrap"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Approve & Allocate</span>
                </button>

                <button
                  onClick={() => updateRequestStatus(req.id, 'Rejected')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold glass-card border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all whitespace-nowrap"
                >
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Reject</span>
                </button>
              </div>
            ) : (
              <div className="text-xs text-amber-400/80 font-medium italic whitespace-nowrap">
                (Login as Admin to approve)
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
