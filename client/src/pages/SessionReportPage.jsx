import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, Printer, ShieldCheck, 
  Clock, Calendar, User 
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
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to History</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => alert('Simulated CSV export: Telemetry rows ready.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Report Overview Banner */}
        <div className="bg-[#0B101D] border border-slate-800/80 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Biomechanical Audit &bull; {report.sessionId}
              </span>
              <MockBadge variant="pill" text="Session Report" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {report.exerciseType} Performance & Injury-Risk Assessment
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Athlete: <strong className="text-slate-200 font-normal">{report.athlete}</strong>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {report.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {report.durationFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500">Heuristic Risk</div>
              <div className="text-sm font-semibold text-white">{report.summary.overallRisk}</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500">Form Score</div>
              <div className="text-xl font-bold text-cyan-400">{report.summary.formQualityScore}<span className="text-xs text-slate-500">/100</span></div>
            </div>
          </div>
        </div>

        {/* Executive Metrics KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Volume</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.validReps} <span className="text-xs text-slate-400 font-normal">/ {report.summary.totalReps} Reps</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">2 shallow reps flagged</p>
          </div>

          <div className="bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Avg Depth Angle</span>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              {report.summary.avgKneeFlexion}°
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Target parallel: 85°-90°</p>
          </div>

          <div className="bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Trunk Lean</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.avgTrunkLean}°
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Neutral thoracic posture</p>
          </div>

          <div className="bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Symmetry</span>
            <div className="text-2xl font-bold text-white mt-1">
              {report.summary.bilateralSymmetry}%
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Even bilateral limb loading</p>
          </div>
        </div>

        {/* Repetition Depth Chart */}
        <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Repetition Depth Curve (Knee Flexion)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target squat parallel depth indicated by line at 90°.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Min Knee Angle
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Parallel (90°)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.repAnalysis} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2234" vertical={false} />
                <XAxis dataKey="rep" stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `R${val}`} />
                <YAxis stroke="#64748B" fontSize={11} domain={[70, 110]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B101D', borderColor: '#1F2937', borderRadius: '0.5rem', fontSize: '11px' }}
                  itemStyle={{ color: '#F1F5F9' }}
                  formatter={(value) => [`${value}°`, 'Min Knee Flexion']}
                  labelFormatter={(label) => `Repetition #${label}`}
                />
                <ReferenceLine y={90} stroke="#64748B" strokeDasharray="4 4" label={{ value: 'Parallel (90°)', fill: '#64748B', fontSize: 10, position: 'top' }} />
                <Bar 
                  dataKey="depth" 
                  fill="#00F0FF" 
                  radius={[3, 3, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detected Biomechanical Flags */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
            Biomechanical Observations & Risk Factors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.detectedBiomechanicalFlags.map((flag) => (
              <div
                key={flag.id}
                className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">{flag.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                    {flag.severity} Concern
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Observed At:</strong> {flag.occurrences}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  {flag.observation}
                </p>

                <div className="text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                  <strong className="text-cyan-400 block mb-0.5">Targeted Drill:</strong>
                  {flag.educationalCorrection}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Review & Notes */}
        <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Coach Feedback ({report.coachAssigned})
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 font-sans">
            "{report.coachingNotes}"
          </p>
        </div>

        {/* Disclaimer Footer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500 inline mr-1 -mt-0.5" />
          FitLens provides heuristic athletic movement feedback &bull; Not intended to clinically diagnose conditions or clear athletes for activity.
        </div>
      </main>
    </div>
  );
}
