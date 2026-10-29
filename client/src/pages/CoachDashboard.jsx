import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Shield, ChevronRight, Plus 
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
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Coach Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-lg">
              MV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{coachData.coach.fullName}</h1>
                <MockBadge variant="pill" text="Coach Portal" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {coachData.coach.title} &bull; {coachData.coach.team}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Simulated Athlete Assignment.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign Athlete</span>
            </button>
          </div>
        </div>

        {/* Assigned Roster Overview */}
        <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Assigned Athletes ({filteredAthletes.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review movement form quality and flagged injury-risk indicators across your roster.
              </p>
            </div>

            <div className="relative w-full sm:w-60">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search athlete..."
                className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredAthletes.map((ath) => (
              <div
                key={ath.id}
                className="bg-black/30 border border-white/5 rounded-xl p-4.5 hover:border-white/15 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-white">{ath.fullName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                      {ath.riskLevel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{ath.sport}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">Last active: {ath.lastSession}</div>
                </div>

                <div className="bg-[#0D121F] p-3 rounded-lg border border-white/5 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">Form Score:</span>
                    <span className="font-bold text-white">{ath.formQualityScore} / 100</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Alert: {ath.recentAlert}
                  </div>
                </div>

                <Link
                  to="/report/ses_101"
                  className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                >
                  <span>Review Latest Session</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Privacy Notice */}
        <div className="p-3.5 rounded-xl bg-[#0D121F] border border-white/5 text-xs text-slate-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>Coaches only access assigned athletes on their roster.</span>
          </div>
          <span className="text-[10px] text-slate-600">RBAC Enforced</span>
        </div>
      </main>
    </div>
  );
}
