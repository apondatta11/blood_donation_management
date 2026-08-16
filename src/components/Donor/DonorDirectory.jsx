import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DonorCard } from './DonorCard';
import { Search, Filter, Users, Sparkles } from 'lucide-react';

export const DonorDirectory = ({ onRequestDonor }) => {
  const { donors } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [availableOnly, setAvailableOnly] = useState(false);

  const bloodGroups = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const districts = ['ALL', 'Rajshahi', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  // Filter logic
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = searchQuery === '' || 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery) ||
      donor.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBlood = selectedBloodGroup === 'ALL' || donor.bloodGroup === selectedBloodGroup;
    const matchesDistrict = selectedDistrict === 'ALL' || donor.district === selectedDistrict;
    const matchesAvailability = !availableOnly || donor.availability === 'Available';

    return matchesSearch && matchesBlood && matchesDistrict && matchesAvailability;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-rose-600/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Donors Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Find Volunteer Donors</h1>
          <p className="text-slate-400 text-sm mt-1">
            Search verified blood donors by blood type and location across Bangladesh.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        
        {/* Search Input & District Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search donor name, phone number, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

<div className="relative">
  <select
    value={selectedDistrict}
    onChange={(e) => setSelectedDistrict(e.target.value)}
    className="w-full px-4 py-2.5 pr-10 rounded-xl glass-input text-sm bg-slate-900 text-slate-200 appearance-none"
  >
    <option value="ALL">All Districts in Bangladesh</option>

    {districts
      .filter((d) => d !== 'ALL')
      .map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      ))}
  </select>

  {/* Custom arrow */}
  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-200">
    ▼
  </span>
</div>
        </div>

        {/* Blood Group Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Blood:
            </span>
            {bloodGroups.map(bg => (
              <button
                key={bg}
                onClick={() => setSelectedBloodGroup(bg)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                  selectedBloodGroup === bg
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                    : 'glass-card border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Availability Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 bg-slate-900 border-slate-700 focus:ring-rose-500"
            />
            <span>Show Available Only</span>
          </label>
        </div>

      </div>

      {/* Donors Grid */}
      {filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} onRequestClick={onRequestDonor} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No Donors Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No donors match your search criteria. Try adjusting your blood group filter or district selection.
          </p>
        </div>
      )}

    </div>
  );
};
