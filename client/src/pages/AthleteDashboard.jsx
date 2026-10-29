import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, TrendingUp, ShieldCheck, 
  ArrowUpRight, ChevronRight, Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_ATHLETE, MOCK_METRICS, MOCK_TRENDS, MOCK_SESSIONS } from '../data/mockData';

export default function AthleteDashboard() {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Athlete Welcome & Quick Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B101D] p-6 rounded-2xl border border-slate-800/80 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold text-base">
              {MOCK_ATHLETE.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{MOCK_ATHLETE.fullName}</h1>
                <MockBadge variant="pill" text="Athlete Profile" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {MOCK_ATHLETE.sportsFocus} &bull; Member since {MOCK_ATHLETE.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Start Workout Analysis</span>
            </Link>
          </div>
        </div>

        {/* Notice on Non-Diagnostic Scope */}
        <div className="bg-[#0B101D] border border-slate-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>All movement indicators are calculated using non-diagnostic sports biomechanics heuristics.</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Ref: ATH-882</span>
        </div>

        {/* KPI Summary Cards Grid - Unified Minimal Dark Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Form Score */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Form Quality</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{MOCK_METRICS.formQualityScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="ml-auto text-xs text-cyan-400 flex items-center font-mono">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {MOCK_METRICS.changeFromLastMonth}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Optimal joint kinematics alignment</p>
          </div>

          {/* Card 2: Risk Indicator */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Heuristic Risk</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{MOCK_METRICS.injuryRiskLevel}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                Heuristic
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Mild knee valgus observed under fatigue</p>
          </div>

          {/* Card 3: Symmetry */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Bilateral Symmetry</span>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{MOCK_METRICS.averageSymmetry}%</span>
              <span className="text-xs text-slate-400">Balanced</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Left vs. right limb force distribution</p>
          </div>

          {/* Card 4: Total Volume */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Training Volume</span>
              <span className="text-xs font-mono text-cyan-400">{MOCK_METRICS.totalReps} Reps</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{MOCK_METRICS.totalSessions}</span>
              <span className="text-xs text-slate-400">Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Avg cadence: {MOCK_METRICS.averageTempo}s per rep</p>
          </div>
        </div>

        {/* Charts & Focus Areas Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recharts Area Trend Chart - Unified Minimal Dark Styling */}
          <div className="lg:col-span-2 bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Performance Trend</span>
                  <MockBadge variant="pill" text="Last 7 Sessions" />
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily kinematics score progression
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Form Score
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span> Symmetry %
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2234" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} domain={[70, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B101D', borderColor: '#1F2937', borderRadius: '0.5rem', fontSize: '11px' }}
                    itemStyle={{ color: '#F1F5F9' }}
                  />
                  <Area type="monotone" dataKey="formScore" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#cyanGradient)" name="Form Score" />
                  <Area type="monotone" dataKey="symmetry" stroke="#64748B" strokeWidth={1.5} fillOpacity={0} name="Symmetry %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Training Focus Card */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Targeted Training Drills</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 font-normal">
                Corrections based on detected knee tracking offsets:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/70">
                  <div className="flex items-center justify-between text-xs font-medium text-white mb-1">
                    <span>Lateral Banded Monster Walks</span>
                    <span className="text-[10px] text-cyan-400 font-mono">3 &times; 15</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Reinforces gluteus medius activation to mitigate knee collapse during ascent.</p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/70">
                  <div className="flex items-center justify-between text-xs font-medium text-white mb-1">
                    <span>Spanish Squats with Pause</span>
                    <span className="text-[10px] text-slate-400 font-mono">3 &times; 8</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Reinforces upright torso mechanics and patellar tendon load tolerance.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                to="/analysis"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 transition-colors border border-slate-800"
              >
                <span>Practice Movement with Live HUD</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Sessions Table */}
        <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Movement Sessions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any session to view complete telemetry and repetition breakdown.</p>
            </div>
            <Link
              to="/history"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Full History <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/40 text-slate-400 border-b border-slate-800/80 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Exercise</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Volume</th>
                  <th className="py-2.5 px-4">Avg Depth</th>
                  <th className="py-2.5 px-4">Form Score</th>
                  <th className="py-2.5 px-4">Heuristic Concern</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {MOCK_SESSIONS.map((ses) => (
                  <tr key={ses.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {ses.exerciseType}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div>{ses.date}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {ses.validReps}/{ses.totalReps} ({ses.duration})
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-300">{ses.avgDepth}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white">{ses.formScore}</span>
                      <span className="text-[10px] text-slate-500"> /100</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800">
                        {ses.concernLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/report/${ses.id}`}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Report <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
