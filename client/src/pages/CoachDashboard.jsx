import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Shield, Activity, ChevronRight, Search, Plus, 
  AlertTriangle, CheckCircle2, ArrowUpRight, Sparkles 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_COACH_DATA } from '../data/mockData';

export default function CoachDashboard() {
  const [coachData] = useState(MOCK_COACH_DATA);
  const [search, setSearch] = useState('');

  const filteredAthletes = coachData.athletes.filter((ath) =>
    ath.fullName.toLowerCase().includes(search.toLowerCase()) ||
    ath.sport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Coach Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
              MV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{coachData.coach.fullName}</h1>
                <MockBadge variant="pill" text="Coach Portal" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {coachData.coach.title} &bull; {coachData.coach.team}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Simulated Athlete Assignment: In Phase 9, coaches can invite athletes via email or athlete code.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-lg shadow-emerald-400/20"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Athlete</span>
            </button>
          </div>
        </div>

        {/* Assigned Roster Overview */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Assigned Athletes ({filteredAthletes.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review movement form quality and flagged injury-risk indicators across your roster.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search athlete by name or sport..."
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredAthletes.map((ath) => (
              <div
                key={ath.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{ath.fullName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ath.riskBadge}`}>
                      {ath.riskLevel} Concern
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{ath.sport}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">Last active: {ath.lastSession}</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">Form Score:</span>
                    <span className="font-bold text-emerald-400">{ath.formQualityScore} / 100</span>
                  </div>
                  <div className="text-[11px] text-amber-300/90 font-medium mt-1">
                    Alert: {ath.recentAlert}
                  </div>
                </div>

                <Link
                  to="/report/ses_101"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
                >
                  <span>Review Latest Session</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Role-Based Privacy Notice */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Coaches only have access to athlete profiles explicitly assigned to their roster.</span>
          </div>
          <span className="text-[10px] font-mono text-slate-600">RBAC Enforced</span>
        </div>
      </main>
    </div>
  );
}
