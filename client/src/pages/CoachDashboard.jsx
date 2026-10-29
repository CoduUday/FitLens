import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ChevronRight, Plus 
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
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Coach Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B101D] p-6 rounded-2xl border border-slate-800/80 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold text-base">
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
              onClick={() => alert('Simulated Athlete Assignment: In Phase 9, coaches can invite athletes via email or athlete code.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Athlete</span>
            </button>
          </div>
        </div>

        {/* Assigned Roster Overview */}
        <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-6">
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

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search athlete by name or sport..."
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredAthletes.map((ath) => (
              <div
                key={ath.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-white">{ath.fullName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800">
                      {ath.riskLevel} Concern
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{ath.sport}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Last active: {ath.lastSession}</div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">Form Score:</span>
                    <span className="font-semibold text-white">{ath.formQualityScore} / 100</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    <span className="text-slate-500">Alert:</span> {ath.recentAlert}
                  </div>
                </div>

                <Link
                  to="/report/ses_101"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 transition-colors"
                >
                  <span>Review Latest Session</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Role-Based Privacy Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-500 flex items-center justify-between">
          <span>Coaches only have access to athlete profiles explicitly assigned to their roster.</span>
          <span className="text-[10px] font-mono text-slate-600">RBAC Enforced</span>
        </div>
      </main>
    </div>
  );
}
