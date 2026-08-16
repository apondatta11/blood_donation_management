import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Common/Navbar';
import { Toast } from './components/Common/Toast';
import { AuthModal } from './components/Auth/AuthModal';
import { ProfileModal } from './components/Auth/ProfileModal';
import { DonorDirectory } from './components/Donor/DonorDirectory';
import { EmergencyRequestModal } from './components/Donor/EmergencyRequestModal';
import { MyRequests } from './components/Donor/MyRequests';
import { MetricsOverview } from './components/Dashboard/MetricsOverview';
import { InventoryMatrix } from './components/Dashboard/InventoryMatrix';
import { AdminApprovalQueue } from './components/Dashboard/AdminApprovalQueue';
import { ActivityLog } from './components/Dashboard/ActivityLog';
import { Heart, PlusCircle, Search, ShieldCheck, Sparkles } from 'lucide-react';

function MainContent({ activeTab, openRequestModal, openAuthModal }) {
  const { currentUser } = useApp();

  switch (activeTab) {
    case 'donors':
      return <DonorDirectory onRequestDonor={openRequestModal} />;

    case 'inventory':
      return (
        <div className="space-y-6 animate-fade-in">
          <InventoryMatrix />
          <AdminApprovalQueue />
        </div>
      );

    case 'requests':
      return <MyRequests openRequestModal={() => openRequestModal(null)} />;

    case 'dashboard':
    default:
      return (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          
          {/* Welcome Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MVP</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Life-Saving Blood Donation Network
                </h1>
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  Real-time donor matchmaking, emergency request broadcast, and central blood bank inventory management.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => openRequestModal()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white crimson-gradient crimson-glow shadow-xl hover:opacity-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Request</span>
                </button>

                {!currentUser && (
                  <button
                    onClick={openAuthModal}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold glass-card text-slate-200 hover:border-rose-500/40 hover:text-white transition-all"
                  >
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <MetricsOverview />

          {/* Admin Approval Queue */}
          <AdminApprovalQueue />

          {/* Main Grid: Inventory & Activity Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InventoryMatrix />
            </div>
            <div>
              <ActivityLog />
            </div>
          </div>

        </div>
      );
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedDonorForReq, setSelectedDonorForReq] = useState(null);

  const handleOpenRequestForDonor = (donor = null) => {
    setSelectedDonorForReq(donor);
    setIsRequestOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthOpen(true)}
        openProfileModal={() => setIsProfileOpen(true)}
        openRequestModal={() => handleOpenRequestForDonor(null)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <MainContent
          activeTab={activeTab}
          openRequestModal={handleOpenRequestForDonor}
          openAuthModal={() => setIsAuthOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="font-semibold text-slate-400">LifeFlow System</span>
          </div>
          <div>Blood Donation Management System</div>
        </div>
      </footer>

      {/* Global Modals & Toasts */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <EmergencyRequestModal
        isOpen={isRequestOpen}
        onClose={() => {
          setIsRequestOpen(false);
          setSelectedDonorForReq(null);
        }}
        targetDonor={selectedDonorForReq}
      />
      <Toast />

    </div>
  );
}

export default App;
