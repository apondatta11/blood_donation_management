import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  Boxes, 
  ClipboardList, 
  User, 
  LogIn, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, openAuthModal, openProfileModal, openRequestModal }) => {
  const { currentUser, logoutUser } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'donors', label: 'Find Donors', icon: Search },
    { id: 'inventory', label: 'Blood Inventory', icon: Boxes },
    { id: 'requests', label: 'My Requests', icon: ClipboardList }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl crimson-gradient crimson-glow text-white shadow-lg shrink-0">
              <HeartHandshake className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-400 bg-clip-text text-transparent">
                  LifeFlow
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block whitespace-nowrap">Blood Donation System</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-950/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Actions & Auth Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Emergency Request Button */}
            <button
              onClick={openRequestModal}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-bold text-white crimson-gradient crimson-glow hover:opacity-95 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-4.5 h-4.5 shrink-0" />
              <span className="hidden sm:inline">Emergency Request</span>
            </button>

            {/* Auth / Profile Drawer Toggle */}
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={openProfileModal}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl glass-card hover:border-rose-500/40 transition-all text-slate-200 text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.bloodGroup || 'A+'}
                  </div>
                  <div className="text-left hidden sm:block whitespace-nowrap">
                    <div className="text-xs font-semibold leading-none text-slate-200">{currentUser.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      {currentUser.role === 'Admin' && <ShieldCheck className="w-3 h-3 text-amber-400 inline shrink-0" />}
                      <span>{currentUser.role}</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={logoutUser}
                  title="Logout"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass-card border-slate-700 text-slate-200 hover:border-rose-500/50 hover:text-white transition-all whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Login / Signup</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
