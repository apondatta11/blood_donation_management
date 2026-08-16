import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, Building2, User, Phone, Droplet, FileText } from 'lucide-react';

export const EmergencyRequestModal = ({ isOpen, onClose, targetDonor }) => {
  const { addBloodRequest, currentUser } = useApp();

  const [patientName, setPatientName] = useState('');
  const [requesterName, setRequesterName] = useState(currentUser ? currentUser.name : '');
  const [requesterPhone, setRequesterPhone] = useState(currentUser ? currentUser.phone : '');
  const [bloodGroup, setBloodGroup] = useState(targetDonor ? targetDonor.bloodGroup : 'O+');
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState('Rajshahi Medical College Hospital (RMCH)');
  const [district, setDistrict] = useState(targetDonor ? targetDonor.district : 'Rajshahi');
  const [urgency, setUrgency] = useState('Critical');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !requesterName || !requesterPhone || !hospital) {
      alert('Please fill in all required fields');
      return;
    }

    addBloodRequest({
      patientName,
      requesterName,
      requesterPhone,
      requesterEmail: currentUser ? currentUser.email : 'guest@lifeflow.org',
      requesterId: currentUser ? currentUser.id : null,
      bloodGroup,
      units: parseInt(units),
      hospital,
      district,
      urgency,
      reason: reason || 'Emergency medical requirement',
      targetDonorId: targetDonor ? targetDonor.id : null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Emergency Blood Request</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {targetDonor ? `Directly requesting donor ${targetDonor.name}` : 'Broadcast urgent request to available donors'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Khandakar Rahim"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name (Requester)</label>
              <input
                type="text"
                required
                placeholder="e.g. Ayesha Rahim"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Requester Phone</label>
              <input
                type="tel"
                required
                placeholder="+880 1700-000000"
                value={requesterPhone}
                onChange={(e) => setRequesterPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group Needed</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900 font-bold text-rose-400"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Units (Bags) Needed</label>
              <input
                type="number"
                min="1"
                max="10"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
              >
                <option value="Critical">🔥 Critical (Immediate)</option>
                <option value="Urgent">⚡ Urgent (Within 12 Hours)</option>
                <option value="Normal">📋 Normal (Planned Surgery)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hospital / Clinic Name & Address</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajshahi Medical College Hospital (RMCH), Ward 4"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
              >
                {['Rajshahi', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Medical Reason (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Surgery / Dengue"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl crimson-gradient crimson-glow text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all mt-3"
          >
            Submit Emergency Request
          </button>
        </form>

      </div>
    </div>
  );
};
