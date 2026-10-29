import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Video, ShieldCheck, ArrowRight, Eye, BarChart3, 
  Award, AlertTriangle, ChevronDown, Sparkles, Cpu, Layers 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';

export default function LandingPage() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Smooth progress refs (lerp target vs current displayed progress)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isSeekingRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Initialize video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;

    const onLoaded = () => {
      setVideoDuration(video.duration || 0);
      setIsVideoLoaded(true);
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) {
      onLoaded();
    }

    // When a seek completes, check if target has moved ahead and update immediately
    const onSeeked = () => {
      isSeekingRef.current = false;
      if (video.duration) {
        const targetTime = currentProgressRef.current * video.duration;
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.03) {
          isSeekingRef.current = true;
          video.currentTime = Math.min(Math.max(targetTime, 0), video.duration);
        }
      }
    };

    video.addEventListener('seeked', onSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  // Track scroll position through the tall interactive container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // High-performance smooth rAF scrub loop with easing & seek-lock protection
  useEffect(() => {
    let animId;

    const scrubLoop = () => {
      const video = videoRef.current;

      // Smoothly interpolate current progress towards target scroll progress
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diffProgress = target - current;

      if (Math.abs(diffProgress) > 0.0005) {
        // Smooth easing factor for fluid cinematic scrubbing
        currentProgressRef.current += diffProgress * 0.18;
        setScrollProgress(currentProgressRef.current);

        if (video && video.duration && !isNaN(video.duration) && video.readyState >= 2) {
          const targetTime = currentProgressRef.current * video.duration;
          const timeDiff = targetTime - video.currentTime;

          // Only seek if previous seek has completed to eliminate browser frame drop/stutter
          if (!isSeekingRef.current && Math.abs(timeDiff) > 0.02) {
            isSeekingRef.current = true;
            video.currentTime = Math.min(Math.max(targetTime, 0), video.duration);
          }
        }
      }

      animId = requestAnimationFrame(scrubLoop);
    };

    animId = requestAnimationFrame(scrubLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      {/* Non-Diagnostic Privacy Notice Header */}
      <div className="border-b border-white/10 bg-[#0D121F]/90 backdrop-blur-md px-4 py-2 text-xs relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              <strong className="text-slate-200">On-Device Processing:</strong> Video stays in local browser memory.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>Sports training support tool — Not for medical diagnosis.</span>
          </div>
        </div>
      </div>

      {/* 
        Interactive Scroll-Driven Video Section:
        Height is 350vh for extended, smooth scrub control.
      */}
      <div ref={containerRef} className="relative h-[350vh]">
        {/* Sticky Fullscreen Video Layer */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          
          {/* Background Video: Highly Visible, Vibrant & Fluid */}
          <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
            <video
              ref={videoRef}
              src="/videos/court-motion.mp4"
              playsInline
              muted
              preload="auto"
              className="w-full h-full object-cover scale-[1.02] filter brightness-110 contrast-105 transition-opacity duration-500"
              style={{ opacity: isVideoLoaded ? 0.88 : 0.2 }}
            />
          </div>

          {/* Soft Top & Bottom Vignettes to preserve navbar & bottom footer legibility without darkening the center */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#080C14]/90 via-[#080C14]/40 to-transparent -z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080C14] via-[#080C14]/60 to-transparent -z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[#080C14]/20 -z-10 pointer-events-none" />

          {/* Top Floating Status Pill */}
          <div className="pt-6 px-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080C14]/80 border border-white/15 text-slate-200 text-xs font-mono backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Interactive Court Playback
            </div>

            <div className="hidden sm:inline-flex items-center gap-3 px-3.5 py-1 rounded-full bg-[#080C14]/80 border border-white/15 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-lg">
              <span>Time: {(scrollProgress * (videoDuration || 1)).toFixed(2)}s</span>
              <span>&bull;</span>
              <span className="text-cyan-400 font-bold">{Math.round(scrollProgress * 100)}% Scrolled</span>
            </div>
          </div>

          {/* Dynamic Narrative Scenes with Frosted Glass Panels */}
          <div className="flex-1 flex items-center justify-center px-6 relative z-10">
            {/* Scene 1: Initial Hero (0% - 28%) */}
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-500 transform ${
                scrollProgress < 0.28
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="bg-[#080C14]/75 border border-white/15 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-mono mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Browser AI &bull; 33 Keypoint Detection
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
                  Real-Time Movement Intelligence. <br />
                  <span className="text-slate-300 font-medium">Prevent Training Overuse & Injury Risk.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
                  FitLens extracts 33 body landmarks directly inside your browser. Analyze joint angles, tempo, and detect dynamic knee valgus with instant feedback.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/analysis"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-xl shadow-cyan-400/30"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Live Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-slate-300" />
                    <span>Athlete Dashboard</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Scene 2: 33-Keypoint Pose Tracking (28% - 62%) */}
            <div
              className={`max-w-3xl mx-auto transition-all duration-500 transform ${
                scrollProgress >= 0.28 && scrollProgress < 0.62
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="bg-[#080C14]/80 border border-white/15 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Phase 01 // Computer Vision Topology</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  33-Keypoint Neural Mesh in 60 FPS
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  As athletes move across the court, MediaPipe Pose Landmarker processes high-speed frames in local WebAssembly memory. Shoulders, hips, knees, and ankles are continuously localized with sub-millimeter precision.
                </p>

                <div className="grid grid-cols-3 gap-3 text-left">
                  <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Inference</span>
                    <div className="text-base font-bold text-white mt-0.5">&lt; 30ms</div>
                    <span className="text-[10px] text-slate-300">Zero lag tracking</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Privacy</span>
                    <div className="text-base font-bold text-cyan-300 mt-0.5">100% Local</div>
                    <span className="text-[10px] text-slate-300">No cloud upload</span>
                  </div>
                  <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Topology</span>
                    <div className="text-base font-bold text-white mt-0.5">33 Joints</div>
                    <span className="text-[10px] text-slate-300">Full 3D vectors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene 3: Heuristic Joint Angle Engine (62% - 88%) */}
            <div
              className={`max-w-3xl mx-auto transition-all duration-500 transform ${
                scrollProgress >= 0.62 && scrollProgress < 0.88
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="bg-[#080C14]/80 border border-white/15 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Phase 02 // Biomechanical Vector Trigonometry</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Explainable Heuristic Risk Indicators
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  Trigonometric dot-product algorithms monitor knee flexion depth, trunk forward lean, and lateral asymmetry. When medial knee collapse (dynamic valgus) occurs, the system triggers actionable coaching cues.
                </p>

                <div className="p-4 bg-black/60 border border-white/15 rounded-2xl flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <div>
                      <div className="text-white font-semibold">Dynamic Knee Valgus Indicator</div>
                      <div className="text-slate-300 text-[11px]">Medial deviation &gt; 3.5° relative to ankle baseline</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/10 border border-white/15 text-slate-200 text-[11px]">
                    Moderate Concern
                  </span>
                </div>
              </div>
            </div>

            {/* Scene 4: Ready to Launch CTA (88% - 100%) */}
            <div
              className={`max-w-2xl mx-auto text-center transition-all duration-500 transform ${
                scrollProgress >= 0.88
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="bg-[#080C14]/85 border border-white/15 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Workout Ready
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                  Enter the Live Analysis Workspace
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-6">
                  Jump straight into real-time exercise detection. Test with your webcam or explore the interactive 60 FPS simulation demo.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/analysis"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20"
                  >
                    Open Live Workspace
                  </Link>
                  <Link
                    to="/coach"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-xs bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors"
                  >
                    Coach Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Scroll Progress HUD */}
          <div className="pb-6 px-6 max-w-7xl mx-auto w-full flex items-center justify-between text-xs z-10 pointer-events-none">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px] bg-[#080C14]/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Scroll to advance court animation</span>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="flex items-center gap-3 bg-[#080C14]/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
              <div className="w-32 sm:w-44 bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-75 shadow-sm shadow-cyan-400"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-bold hidden sm:inline">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Deep Dive Grid */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full border-t border-white/5 relative z-20 bg-[#080C14]">
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

      {/* Workspace Quick Launch Banner */}
      <section className="py-10 px-6 sm:px-8 max-w-7xl mx-auto w-full mb-10 relative z-20 bg-[#080C14]">
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
      <footer className="mt-auto border-t border-white/5 bg-[#080C14] py-6 px-6 text-center text-xs text-slate-500 relative z-20">
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
