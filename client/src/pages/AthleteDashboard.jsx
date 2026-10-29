import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, Flame, TrendingUp, AlertTriangle, ShieldCheck, 
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
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Athlete Welcome & Quick Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0D121F] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-lg">
              {MOCK_ATHLETE.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{MOCK_ATHLETE.fullName}</h1>
                <MockBadge variant="pill" text="Demo Athlete" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {MOCK_ATHLETE.sportsFocus} &bull; Member since {MOCK_ATHLETE.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Start Live Workout</span>
            </Link>
          </div>
        </div>

        {/* Minimal Disclaimer Strip */}
        <div className="bg-[#0D121F] border border-white/5 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>Metrics calculated using educational biomechanics rules. Non-diagnostic.</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Telemetry Ref: ATH-882</span>
        </div>

        {/* Minimal KPI Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Form Score */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Form Quality Score</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{MOCK_METRICS.formQualityScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-mono text-slate-300 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 text-cyan-400" />
                {MOCK_METRICS.changeFromLastMonth}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Joint kinematics alignment</p>
          </div>

          {/* Card 2: Risk Indicator */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Heuristic Concern</span>
              <AlertTriangle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-200">{MOCK_METRICS.injuryRiskLevel}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/10 font-mono">
                Heuristic
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Mild knee valgus observed under fatigue</p>
          </div>

          {/* Card 3: Symmetry */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Bilateral Symmetry</span>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{MOCK_METRICS.averageSymmetry}%</span>
              <span className="text-xs text-slate-400">Balanced</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Left vs. right limb force distribution</p>
          </div>

          {/* Card 4: Total Volume */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Total Volume</span>
              <Flame className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{MOCK_METRICS.totalSessions}</span>
              <span className="text-xs text-slate-400">Sessions</span>
              <span className="ml-auto text-xs text-slate-300 font-mono font-bold">
                {MOCK_METRICS.totalReps} Reps
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Avg tempo: {MOCK_METRICS.averageTempo}s per rep</p>
          </div>
        </div>

        {/* Charts & Focus Areas Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recharts Area Trend Chart (2 columns) */}
          <div className="lg:col-span-2 bg-[#0D121F] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Performance & Form Quality Trend</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily kinematics score vs. bilateral limb symmetry
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Form Score
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> Symmetry %
                </span>
              </div>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#161F30" vertical={false} />
                  <XAxis dataKey="date" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} domain={[70, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#080C14', borderColor: '#1E293B', borderRadius: '0.5rem', fontSize: '11px' }}
                    itemStyle={{ color: '#E2E8F0' }}
                  />
                  <Area type="monotone" dataKey="formScore" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#cyanGradient)" name="Form Score" />
                  <Area type="monotone" dataKey="symmetry" stroke="#94A3B8" strokeWidth={1.5} fillOpacity={0} name="Symmetry %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Training Focus Card */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Targeted Training Drills</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Heuristic corrections based on detected knee tracking offsets:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                    <span>Lateral Banded Walks</span>
                    <span className="text-[10px] text-cyan-400 font-mono">3 sets &bull; 15 reps</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Activates gluteus medius to eliminate medial knee collapse during squat ascent.</p>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                    <span>Spanish Squats with Pause</span>
                    <span className="text-[10px] text-slate-300 font-mono">3 sets &bull; 8 reps</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Reinforces upright torso mechanics and patellar tendon load tolerance.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                to="/analysis"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              >
                <span>Open Live Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Sessions Table */}
        <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Biomechanical Sessions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any session to view complete telemetry.</p>
            </div>
            <Link
              to="/history"
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
            >
              Full History <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/30 text-slate-400 border-b border-white/5 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Exercise</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Volume</th>
                  <th className="py-2.5 px-3">Avg Depth</th>
                  <th className="py-2.5 px-3">Form Score</th>
                  <th className="py-2.5 px-3">Heuristic Concern</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_SESSIONS.map((ses) => (
                  <tr key={ses.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {ses.exerciseType}
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {ses.date}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {ses.validReps}/{ses.totalReps} reps ({ses.duration})
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{ses.avgDepth}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      {ses.formScore}<span className="text-[10px] text-slate-500">/100</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {ses.concernLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/report/${ses.id}`}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white font-medium"
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
