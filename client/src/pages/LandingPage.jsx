import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, ShieldCheck, ArrowRight, Eye, BarChart3, 
  Award, AlertTriangle, Sparkles, Cpu, Layers 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      {/* Non-Diagnostic Privacy Notice Header */}
      <div className="border-b border-white/5 bg-[#0D121F] px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-200">On-Device Processing:</strong> Video feeds stay strictly in local browser memory.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>Sports training support tool — Not for medical diagnosis.</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6 sm:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Browser AI &bull; 33 Keypoint Detection
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Real-Time Movement Intelligence. <br />
            <span className="text-slate-400 font-medium">Prevent Training Overuse & Injury Risk.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            FitLens estimates 33 body keypoints in real time inside your browser. Extract joint angles, repetition tempo, and detect dynamic knee valgus or trunk deviations with instant feedback.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20"
            >
              <Video className="w-4 h-4" />
              <span>Launch Live Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Athlete Dashboard</span>
            </Link>

            <Link
              to="/coach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              <Award className="w-4 h-4 text-slate-400" />
              <span>Coach Portal</span>
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <MockBadge text="Prototype Preview &bull; Realistic Biomechanical Simulation" />
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Grid */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Biomechanical Movement Analysis</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Combining browser-accelerated pose estimation with sports science heuristics for accessible training telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 hover:border-white/15 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">33-Keypoint Pose Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              MediaPipe Pose Landmarker processes camera frames directly on your device via WebAssembly. High temporal tracking of hips, knees, and ankles.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
              Sub-30ms Latency &bull; Zero Video Upload
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 hover:border-white/15 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Joint Angle Trigonometry</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Real-time calculation of knee flexion depth, hip hinge mechanics, torso forward lean, and eccentric/concentric phase tempo.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
              Squats &bull; Lunges &bull; Jumps
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 hover:border-white/15 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Heuristic Risk Indicators</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Explainable rules detect dynamic knee valgus collapse, excessive lumbar lean, and asymmetrical landing forces with corrective cues.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
              Low &bull; Moderate &bull; Elevated Concern
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Overview Card */}
      <section className="py-8 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
            <Cpu className="w-4 h-4" />
            <span>Architecture & Privacy Specification</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Client-Side AI Pipeline</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
            FitLens runs entire computer vision inference in browser memory using WebAssembly & WebGL acceleration. No raw camera frames, biometric video, or microphone audio leave the user's computer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Input Stream</span>
              <div className="text-sm font-semibold text-white mt-1">Webcam / Synthetic Video</div>
              <p className="text-[11px] text-slate-500 mt-1">60 FPS in-memory canvas buffer</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Detection Engine</span>
              <div className="text-sm font-semibold text-cyan-300 mt-1">MediaPipe Pose Landmarker</div>
              <p className="text-[11px] text-slate-500 mt-1">33 3D normalized coordinates</p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Analytics Output</span>
              <div className="text-sm font-semibold text-white mt-1">Kinematic Telemetry</div>
              <p className="text-[11px] text-slate-500 mt-1">Rep count, joint angles & risk flags</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Quick Launch Banner */}
      <section className="py-10 px-6 sm:px-8 max-w-7xl mx-auto w-full mb-10">
        <div className="bg-[#0D121F] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Live Demonstration
            </span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">
              Ready to analyze your movement form?
            </h3>
            <p className="text-xs text-slate-400">
              The live workspace runs entirely on your machine. Test with pre-configured exercise simulations or connect your camera.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/analysis"
              className="px-5 py-2.5 rounded-xl font-medium text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-center transition-colors"
            >
              Open Workspace
            </Link>
            <Link
              to="/history"
              className="px-5 py-2.5 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-slate-300 text-center border border-white/10 transition-colors"
            >
              Sample Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#080C14] py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-300">FitLens Biomechanics</span>
          </div>
          <p className="text-slate-500">
            Educational sports performance tool &bull; Non-diagnostic
          </p>
          <div className="text-slate-600 font-mono text-[11px]">
            &copy; 2026 FitLens
          </div>
        </div>
      </footer>
    </div>
  );
}
