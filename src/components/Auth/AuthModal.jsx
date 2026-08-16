import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Phone, MapPin, Droplet, UserCheck, Shield } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, registerUser } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState('O+');
  const [regDistrict, setRegDistrict] = useState('Rajshahi');
  const [regRole, setRegRole] = useState('Donor');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = loginUser(loginEmail, loginPassword);
    if (res.success) {
      onClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regPhone) {
      alert('Please fill in all required fields');
      return;
    }

    registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      phone: regPhone,
      bloodGroup: regBloodGroup,
      district: regDistrict,
      role: regRole,
      availability: regRole === 'Donor' ? 'Available' : 'Unavailable'
    });
    onClose();
  };

  const setDemoAdmin = () => {
    setLoginEmail('admin@lifeflow.org');
    setLoginPassword('admin123');
  };

  const setDemoDonor = () => {
    setLoginEmail('tanvir.ruet@gmail.com');
    setLoginPassword('donor123');
  };

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

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl crimson-gradient crimson-glow text-white mb-3">
            <Droplet className="w-6 h-6 fill-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {isLoginTab ? 'Welcome to LifeFlow' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLoginTab ? 'Sign in to manage blood requests & donations' : 'Join our community of life-saving donors'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isLoginTab ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isLoginTab ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLoginTab ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl crimson-gradient crimson-glow text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all mt-2"
            >
              Sign In
            </button>

            {/* Quick Demo Fill Buttons */}
            <div className="pt-3 border-t border-slate-800/80">
              <p className="text-[11px] text-center text-slate-400 mb-2">Quick Demo One-Click Login:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={setDemoAdmin}
                  className="flex-1 py-1.5 px-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20"
                >
                  ⚡ Admin Account
                </button>
                <button
                  type="button"
                  onClick={setDemoDonor}
                  className="flex-1 py-1.5 px-2 bg-rose-500/10 border border-rose-500/30 rounded-lg text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20"
                >
                  ⚡ Donor Account
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Dr. Tanvir Rahman"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@mail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1700-000000"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                <select
                  value={regBloodGroup}
                  onChange={(e) => setRegBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">District</label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
                >
                  {['Rajshahi', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
                >
                  <option value="Donor">Blood Donor</option>
                  <option value="Recipient">Blood Recipient</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl crimson-gradient crimson-glow text-white text-sm font-bold shadow-lg hover:opacity-95 transition-all mt-2"
            >
              Complete Registration
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
