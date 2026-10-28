import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, Flame, TrendingUp, AlertTriangle, ShieldCheck, 
  ArrowUpRight, Calendar, Clock, ChevronRight, Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_ATHLETE, MOCK_METRICS, MOCK_TRENDS, MOCK_SESSIONS } from '../data/mockData';

export default function AthleteDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Athlete Welcome & Quick Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              {MOCK_ATHLETE.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{MOCK_ATHLETE.fullName}</h1>
                <MockBadge variant="pill" text="Demo Athlete Profile" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {MOCK_ATHLETE.sportsFocus} &bull; Member since {MOCK_ATHLETE.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Video className="w-4 h-4" />
              <span>Start Live Workout Analysis</span>
            </Link>
          </div>
        </div>

        {/* Notice on Non-Diagnostic Scope */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>All metrics below are calculated using non-diagnostic sports biomechanics heuristics.</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Telemetry Ref: ATH-882</span>
        </div>

        {/* KPI Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Form Score */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Form Quality Score</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{MOCK_METRICS.formQualityScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-medium text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {MOCK_METRICS.changeFromLastMonth}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Optimal joint kinematics alignment</p>
          </div>

          {/* Card 2: Risk Indicator */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Current Risk Level</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">{MOCK_METRICS.injuryRiskLevel}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800 font-mono">
                Heuristic
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Mild knee valgus observed under fatigue</p>
          </div>

          {/* Card 3: Symmetry */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Bilateral Symmetry</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{MOCK_METRICS.averageSymmetry}%</span>
              <span className="text-xs text-emerald-400">Balanced</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Left vs. right limb force distribution</p>
          </div>

          {/* Card 4: Total Volume */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Training Volume</span>
              <Flame className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{MOCK_METRICS.totalSessions}</span>
              <span className="text-xs text-slate-400">Sessions</span>
              <span className="ml-auto text-xs text-slate-300 font-mono font-bold">
                {MOCK_METRICS.totalReps} Reps
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Avg tempo: {MOCK_METRICS.averageTempo}s per repetition</p>
          </div>
        </div>

        {/* Charts & Focus Areas Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recharts Area Trend Chart (2 columns) */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Performance & Form Quality Trend</span>
                  <MockBadge variant="pill" text="Last 7 Sessions" />
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily kinematics score vs. bilateral limb symmetry
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Form Score
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Symmetry %
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={11} tickLine={false} />
                  <YAxis stroke="#6B7280" fontSize={11} domain={[70, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F2937', borderRadius: '0.75rem', fontSize: '12px' }}
                    itemStyle={{ color: '#F1F5F9' }}
                  />
                  <Area type="monotone" dataKey="formScore" stroke="#00F0FF" strokeWidth={2.5} fillOpacity={1} fill="url(#cyanGradient)" name="Form Score" />
                  <Area type="monotone" dataKey="symmetry" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#emeraldGradient)" name="Symmetry %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Training Focus Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Targeted Training Drills</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Heuristic corrections based on detected knee tracking offsets:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                    <span>Lateral Banded Monster Walks</span>
                    <span className="text-[10px] text-cyan-400 font-mono">3 sets &bull; 15 reps</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Activates gluteus medius to eliminate medial knee collapse during squat ascent.</p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                    <span>Spanish Squats with Pause</span>
                    <span className="text-[10px] text-emerald-400 font-mono">3 sets &bull; 8 reps</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Reinforces upright torso mechanics and patellar tendon load tolerance.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                to="/analysis"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors border border-slate-700"
              >
                <span>Practice Movement with Live HUD</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Sessions Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Recent Biomechanical Sessions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any session to view complete angle graphs and breakdown.</p>
            </div>
            <Link
              to="/history"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View Full History <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Exercise</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Volume</th>
                  <th className="py-3 px-4">Avg Depth</th>
                  <th className="py-3 px-4">Form Score</th>
                  <th className="py-3 px-4">Heuristic Concern</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {MOCK_SESSIONS.map((ses) => (
                  <tr key={ses.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {ses.exerciseType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{ses.date}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{ses.time}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {ses.validReps} / {ses.totalReps} reps ({ses.duration})
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300">{ses.avgDepth}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white">{ses.formScore}</span>
                      <span className="text-[10px] text-slate-500"> /100</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${ses.concernBadgeColor}`}>
                        {ses.concernLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
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
