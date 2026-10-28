import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, Printer, ShieldCheck, AlertTriangle, 
  CheckCircle2, Sparkles, Activity, Clock, Calendar, User, TrendingDown 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine 
} from 'recharts';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_REPORT_DETAILS } from '../data/mockData';

export default function SessionReportPage() {
  const { id } = useParams();
  const report = MOCK_REPORT_DETAILS; // In Phase 8, query by id

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Session History</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Summary</span>
            </button>
            <button
              onClick={() => alert('Simulated CSV export: Full telemetry rows prepared for download.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Report Overview Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Biomechanical Telemetry Audit &bull; {report.sessionId}
              </span>
              <MockBadge variant="pill" text="Simulated Telemetry" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {report.exerciseType} Performance & Injury-Risk Report
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                Athlete: <strong className="text-slate-200">{report.athlete}</strong>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {report.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Duration: {report.durationFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Heuristic Risk</div>
              <div className="text-sm font-bold text-amber-400">{report.summary.overallRisk}</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Form Score</div>
              <div className="text-xl font-black text-emerald-400">{report.summary.formQualityScore}/100</div>
            </div>
          </div>
        </div>

        {/* Executive Metrics KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Volume</span>
            <div className="text-2xl font-black text-white mt-1">
              {report.summary.validReps} <span className="text-xs text-slate-400 font-normal">/ {report.summary.totalReps} Reps</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">2 shallow reps flagged</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Avg Depth Angle</span>
            <div className="text-2xl font-black text-cyan-300 mt-1">
              {report.summary.avgKneeFlexion}°
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Target parallel: 85°-90°</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Trunk Lean</span>
            <div className="text-2xl font-black text-white mt-1">
              {report.summary.avgTrunkLean}°
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Neutral thoracic posture</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Symmetry</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {report.summary.bilateralSymmetry}%
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Even bilateral limb loading</p>
          </div>
        </div>

        {/* Repetition-by-Repetition Depth Chart (Recharts) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Repetition Depth Curve (Knee Flexion in Degrees)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target squat parallel depth is indicated by the reference line at 90°.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Min Knee Angle
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Optimal Zone (≤90°)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.repAnalysis} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="rep" stroke="#6B7280" fontSize={11} tickLine={false} tickFormatter={(val) => `R${val}`} />
                <YAxis stroke="#6B7280" fontSize={11} domain={[70, 110]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F2937', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: '#F1F5F9' }}
                  formatter={(value) => [`${value}°`, 'Min Knee Flexion']}
                  labelFormatter={(label) => `Repetition #${label}`}
                />
                <ReferenceLine y={90} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Parallel (90°)', fill: '#10B981', fontSize: 10, position: 'top' }} />
                <Bar 
                  dataKey="depth" 
                  fill="#00F0FF" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detected Biomechanical Flags & Safety Analysis */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Biomechanical Observations & Risk Factors</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {report.detectedBiomechanicalFlags.map((flag) => (
              <div
                key={flag.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{flag.title}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${flag.badgeColor}`}>
                    {flag.severity} Concern
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Observed At:</strong> {flag.occurrences}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {flag.observation}
                </p>

                <div className="text-xs text-emerald-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
                  <strong className="text-emerald-300 block mb-1">Targeted Corrective Drill:</strong>
                  {flag.educationalCorrection}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Review & Notes */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Coach Review & Feedback ({report.coachAssigned})</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-sans">
            "{report.coachingNotes}"
          </p>
        </div>

        {/* Disclaimer Footer */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-500 text-center">
          <ShieldCheck className="w-4 h-4 text-slate-400 inline mr-1 -mt-0.5" />
          FitLens provides heuristic athletic movement feedback. It is not intended to diagnose medical conditions or clinically clear athletes for physical activity.
        </div>
      </main>
    </div>
  );
}
