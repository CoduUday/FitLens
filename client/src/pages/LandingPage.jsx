import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, ShieldCheck, Zap, ArrowRight, Eye, ChevronRight, BarChart3, 
  Award, Play, Lock, AlertTriangle 
} from 'lucide-react';
import MockBadge from '../components/common/MockBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Privacy Guarantee & Non-Diagnostic Banner */}
      <div className="bg-slate-900 border-b border-cyan-900/40 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-200">100% On-Device Video Processing:</strong> Raw video never leaves your browser.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300/80">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Sports training support system — Not a medical diagnostic device.</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6 sm:px-8 border-b border-slate-800/80">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-700/60 text-cyan-300 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Phase 3 Functional UI Prototype &bull; Real-time AI Sports Analytics
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Perfect Your Form. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Prevent Sports Injuries Before They Happen.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            FitLens estimates 33 body keypoints in real time directly inside your browser. Extract joint angles, repetition tempo, and detect dynamic knee valgus or trunk compensation with instant coaching feedback.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Video className="w-4 h-4" />
              <span>Launch Live Analysis Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/90 hover:bg-slate-750 text-white border border-slate-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Explore Athlete Dashboard</span>
            </Link>

            <Link
              to="/coach"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Coach Portal</span>
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <MockBadge text="Prototype Preview with Realistic Biomechanical Simulation Data" />
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Engineered for High-Performance Athletics</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Combining browser-accelerated computer vision with sports science heuristics for accessible, non-diagnostic training telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">33-Keypoint Pose Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              MediaPipe Pose Landmarker processes camera frames directly on your device via WebAssembly. High temporal resolution tracking of shoulders, hips, knees, and ankles.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/90 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              Latency: &lt;30ms &bull; Zero Server Transmission
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-5">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Biomechanical Angle Math</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time trigonometric calculation of knee flexion, hip hinge depth, torso inclination, and eccentric/concentric phase cadence.
            </p>
            <div className="text-[11px] font-mono text-emerald-400/90 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              Squats &bull; Lunges &bull; Jump Landings
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explainable Risk Indicators</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Heuristic indicators detect dynamic knee valgus collapse, excessive lumbar lean, and asymmetrical landing forces with corrective drill recommendations.
            </p>
            <div className="text-[11px] font-mono text-amber-400/90 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              Low &bull; Moderate &bull; Elevated Concern Levels
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulation Preview CTA */}
      <section className="py-12 px-6 sm:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-800/50 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">Immediate Demonstration</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
              Ready to test movement analysis?
            </h3>
            <p className="text-sm text-slate-400">
              Explore the interactive Live Analysis workspace with the built-in biomechanical simulation engine. No webcam required to preview all metrics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/analysis"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-center transition-colors shadow-lg shadow-cyan-400/20"
            >
              Open Live Workspace
            </Link>
            <Link
              to="/history"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 text-center border border-slate-700 transition-colors"
            >
              View Sample Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-400">FitLens Biomechanics</span>
          </div>
          <p>
            Educational sports performance tool. Not intended for clinical or medical diagnostic use.
          </p>
          <div className="text-slate-600">
            Phase 3 Interactive Prototype &bull; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

