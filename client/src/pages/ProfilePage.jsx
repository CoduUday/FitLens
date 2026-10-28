import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Shield, Activity, Save, LogOut, CheckCircle2, 
  AlertTriangle, Sparkles, Plus, Trash2 
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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20">
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile.fullName}</h1>
                <MockBadge variant="pill" text="Athlete Settings" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs p-4 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Profile settings saved successfully (Simulated).</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Athletic Biometrics & Sport Focus</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Primary Sport / Discipline</label>
              <input
                type="text"
                value={profile.sportsFocus}
                onChange={(e) => setProfile({ ...profile, sportsFocus: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={profile.heightCm}
                onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={profile.weightKg}
                onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Prior Injury History (Context for Heuristics)</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Noting past injuries helps the system personalize joint mobility warnings and unilateral asymmetry tracking.
            </p>

            <div className="space-y-3">
              {profile.priorInjuries.map((injury, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{injury.bodyPart}</span> ({injury.year})
                    <p className="text-slate-400 mt-0.5">{injury.notes}</p>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 font-mono">
                    Monitored
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Athlete Settings</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

