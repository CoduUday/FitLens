import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, Printer, ShieldCheck, AlertTriangle, 
  User, Calendar, Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine 
} from 'recharts';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_REPORT_DETAILS } from '../data/mockData';

export default function SessionReportPage() {
  const { id } = useParams();
  const report = MOCK_REPORT_DETAILS;

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Session History</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => alert('Simulated CSV export ready.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Report Overview Banner */}
        <div className="bg-[#0D121F] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                Telemetry Audit &bull; {report.sessionId}
              </span>
              <MockBadge variant="pill" text="Simulated Telemetry" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {report.exerciseType} Performance & Injury-Risk Report
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
              <span className="text-slate-300">Athlete: {report.athlete}</span>
              <span>&bull;</span>
              <span>{report.date}</span>
              <span>&bull;</span>
              <span>Duration: {report.durationFormatted}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/40 p-3.5 rounded-xl border border-white/5">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500">Heuristic Risk</div>
              <div className="text-xs font-mono font-bold text-slate-200">{report.summary.overallRisk}</div>
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500">Form Score</div>
              <div className="text-lg font-bold text-white">{report.summary.formQualityScore}<span className="text-xs text-slate-500 font-normal">/100</span></div>
            </div>
          </div>
        </div>

        {/* Executive Metrics KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0D121F] border border-white/5 p-4 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Volume</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.validReps} <span className="text-xs text-slate-500 font-normal">/ {report.summary.totalReps} Reps</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">2 shallow reps flagged</p>
          </div>

          <div className="bg-[#0D121F] border border-white/5 p-4 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Avg Depth Angle</span>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              {report.summary.avgKneeFlexion}°
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Target parallel: 85°-90°</p>
          </div>

          <div className="bg-[#0D121F] border border-white/5 p-4 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Trunk Lean</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.avgTrunkLean}°
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Neutral thoracic posture</p>
          </div>

          <div className="bg-[#0D121F] border border-white/5 p-4 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Symmetry</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.bilateralSymmetry}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Even bilateral limb loading</p>
          </div>
        </div>

        {/* Repetition-by-Repetition Depth Chart (Recharts) */}
        <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Repetition Depth Curve (Knee Flexion Angle)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target squat parallel depth indicated by reference line at 90°.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Min Knee Angle
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 border-b border-dashed border-slate-400"></span> 90° Parallel Target
              </span>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.repAnalysis} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#161F30" vertical={false} />
                <XAxis dataKey="rep" stroke="#475569" fontSize={11} tickLine={false} tickFormatter={(val) => `R${val}`} />
                <YAxis stroke="#475569" fontSize={11} domain={[70, 110]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#080C14', borderColor: '#1E293B', borderRadius: '0.5rem', fontSize: '11px' }}
                  itemStyle={{ color: '#E2E8F0' }}
                  formatter={(value) => [`${value}°`, 'Min Knee Flexion']}
                  labelFormatter={(label) => `Repetition #${label}`}
                />
                <ReferenceLine y={90} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: 'Parallel (90°)', fill: '#94A3B8', fontSize: 10, position: 'top' }} />
                <Bar 
                  dataKey="depth" 
                  fill="#00E5FF" 
                  radius={[3, 3, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detected Biomechanical Flags */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-400" />
            <span>Biomechanical Observations & Risk Factors</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.detectedBiomechanicalFlags.map((flag) => (
              <div
                key={flag.id}
                className="bg-[#0D121F] border border-white/5 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{flag.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                    {flag.severity} Concern
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Observed:</strong> {flag.occurrences}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                  {flag.observation}
                </p>

                <div className="text-xs text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <strong className="text-white block mb-0.5">Targeted Drill:</strong>
                  {flag.educationalCorrection}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Review & Notes */}
        <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Coach Review ({report.coachAssigned})</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
            "{report.coachingNotes}"
          </p>
        </div>

        {/* Disclaimer Footer */}
        <div className="p-3.5 rounded-xl bg-[#0D121F] border border-white/5 text-[11px] text-slate-500 text-center font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 inline mr-1 -mt-0.5" />
          Heuristic athletic movement feedback &bull; Non-diagnostic
        </div>
      </main>
    </div>
  );
}
