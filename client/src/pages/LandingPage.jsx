import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, ShieldCheck, ArrowRight, Eye, BarChart3, 
  Award, AlertTriangle 
} from 'lucide-react';
import MockBadge from '../components/common/MockBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Privacy Guarantee & Non-Diagnostic Banner */}
     

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6 sm:px-8 border-b border-slate-800/60">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Real-Time AI Biomechanical Analytics
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Analyze Athletic Movement. <br />
            <span className="text-cyan-400">
              Mitigate Injury Risk In Real Time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            FitLens computes 33 body keypoints directly inside your browser. Extract joint angles, repetition cadence, and detect dynamic knee valgus or trunk compensation with instant coaching feedback.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-sm"
            >
              <Video className="w-4 h-4" />
              <span>Launch Live Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Athlete Dashboard</span>
            </Link>

            <Link
              to="/coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
            >
              <Award className="w-4 h-4 text-slate-500" />
              <span>Coach Portal</span>
            </Link>
          </div>

         
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Engineered for Precision Biomechanics</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-normal">
            Browser-accelerated computer vision delivering low-latency, privacy-first athletic performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 group hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">33-Keypoint Pose Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              MediaPipe Pose Landmarker processes camera frames directly on your device via WebAssembly. High temporal resolution tracking of shoulders, hips, knees, and ankles.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-900">
              Latency: &lt;30ms &bull; Zero Server Transmission
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 group hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Biomechanical Angle Math</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time trigonometric calculation of knee flexion, hip hinge depth, torso inclination, and eccentric/concentric phase cadence.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-900">
              Squats &bull; Lunges &bull; Jump Landings
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-6 group hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Explainable Risk Indicators</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Heuristic indicators detect dynamic knee valgus collapse, excessive lumbar lean, and asymmetrical landing forces with corrective drill recommendations.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-900">
              Low &bull; Moderate &bull; Elevated Concern Levels
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-10 px-6 sm:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="bg-[#0B101D] border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">Immediate Demonstration</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">
              Experience the movement analysis workflow
            </h3>
            <p className="text-xs text-slate-400">
              Explore the live analysis workspace with the built-in biomechanical simulation engine. No physical webcam required to test.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/analysis"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors text-center w-full sm:w-auto"
            >
              Open Workspace
            </Link>
            <Link
              to="/history"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-center w-full sm:w-auto"
            >
              View Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#06090F] py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">FitLens</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Educational sports performance tool &bull; Not intended for medical diagnostic use
          </p>
          <div className="text-slate-600 font-mono text-[11px]">
            FitLens 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
