import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Save, LogOut, CheckCircle2, AlertTriangle 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_ATHLETE } from '../data/mockData';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(MOCK_ATHLETE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xl">
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{profile.fullName}</h1>
                <MockBadge variant="pill" text="Settings" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="bg-[#0D121F] border border-white/10 text-slate-200 text-xs p-3 rounded-xl flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Profile settings saved.</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave} className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Athletic Biometrics & Sport Focus</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Primary Sport / Discipline</label>
              <input
                type="text"
                value={profile.sportsFocus}
                onChange={(e) => setProfile({ ...profile, sportsFocus: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Height (cm)</label>
              <input
                type="number"
                value={profile.heightCm}
                onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={profile.weightKg}
                onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-5">
            <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
              <span>Prior Injury History</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Context for personalized joint mobility warnings and asymmetry tracking.
            </p>

            <div className="space-y-2">
              {profile.priorInjuries.map((injury, idx) => (
                <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{injury.bodyPart}</span> ({injury.year})
                    <p className="text-slate-400 mt-0.5">{injury.notes}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
                    Monitored
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-white/5">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
