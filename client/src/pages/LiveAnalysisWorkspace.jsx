import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Square, Camera, AlertTriangle, ShieldCheck, 
  ChevronRight, Volume2, VolumeX, CheckCircle2 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';

export default function LiveAnalysisWorkspace() {
  const navigate = useNavigate();

  // Session State
  const [exercise, setExercise] = useState('Squat');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sourceMode, setSourceMode] = useState('demo');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Simulated Biomechanical Telemetry
  const [repCount, setRepCount] = useState(0);
  const [currentKneeAngle, setCurrentKneeAngle] = useState(175);
  const [trunkLeanAngle, setTrunkLeanAngle] = useState(18);
  const [valgusStatus, setValgusStatus] = useState('Optimal');
  const [repPhase, setRepPhase] = useState('Standing');

  // Timer & Simulated Rep Loop
  useEffect(() => {
    let timer = null;
    let biomechanicsLoop = null;

    if (isSessionActive && !isPaused) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);

      let cycle = 0;
      biomechanicsLoop = setInterval(() => {
        cycle = (cycle + 1) % 40;

        if (cycle < 10) {
          setRepPhase('Standing');
          setCurrentKneeAngle(175 - Math.round(cycle * 2));
          setTrunkLeanAngle(15 + Math.round(cycle * 0.5));
          setValgusStatus('Optimal');
        } else if (cycle < 20) {
          setRepPhase('Descending');
          const progress = (cycle - 10) / 10;
          setCurrentKneeAngle(Math.round(155 - progress * 68));
          setTrunkLeanAngle(Math.round(20 + progress * 8));
          setValgusStatus('Optimal');
        } else if (cycle < 25) {
          setRepPhase('Inflection');
          setCurrentKneeAngle(87);
          setTrunkLeanAngle(28);
          setValgusStatus(cycle % 2 === 0 ? 'Optimal' : 'Mild Inward Cave');
        } else {
          setRepPhase('Ascending');
          const progress = (cycle - 25) / 15;
          setCurrentKneeAngle(Math.round(87 + progress * 88));
          setTrunkLeanAngle(Math.round(28 - progress * 10));

          if (cycle === 39) {
            setRepCount((prev) => prev + 1);
          }
        }
      }, 100);
    }

    return () => {
      clearInterval(timer);
      clearInterval(biomechanicsLoop);
    };
  }, [isSessionActive, isPaused]);

  const handleStart = () => {
    setIsSessionActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsSessionActive(false);
    navigate('/report/ses_101');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Exercise:</span>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-white text-xs font-medium rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="Squat">Barbell / Bodyweight Squat</option>
                <option value="Lunge">Forward Split Lunge</option>
                <option value="Jump">Countermovement Jump & Landing</option>
              </select>
            </div>

            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

            {/* Video Input Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSourceMode('demo')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sourceMode === 'demo'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demo Simulation
              </button>
              <button
                onClick={() => setSourceMode('webcam')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sourceMode === 'webcam'
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Webcam (Phase 5)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Session Actions */}
            {!isSessionActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Session</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-700 transition-colors"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop & Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Minimal Dark Notice */}
        <div className="flex items-center justify-between bg-[#0B101D] border border-slate-800/80 px-4 py-2 rounded-xl text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>
              Simulated telemetry active. Demonstrating biomechanics HUD ahead of Phase 5 camera pipeline.
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-500 hidden md:inline">60 FPS Simulation</span>
        </div>

        {/* Main Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Left: Video / Skeleton Canvas Viewport (2 cols) */}
          <div className="lg:col-span-2 bg-[#06090F] border border-slate-800/80 rounded-2xl overflow-hidden relative flex flex-col justify-between shadow-sm min-h-[460px]">
            {/* Viewport Header Bar */}
            <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-[#06090F]/90 to-transparent">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isSessionActive && !isPaused ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></span>
                <span className="text-xs font-mono font-medium text-white uppercase tracking-wider">
                  {isSessionActive ? (isPaused ? 'Paused' : 'Active Analysis') : 'Standby'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono ml-2">
                  {formatTime(sessionSeconds)}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  Confidence: {isSessionActive ? '98.6%' : '100%'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                  60 FPS
                </span>
              </div>
            </div>

            {/* Center: Visual Representation / Skeleton Wireframe */}
            <div className="flex-1 flex items-center justify-center relative p-6">
              <div className="relative w-64 h-96 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 bg-slate-900/20">
                {/* SVG Skeleton Simulation - Clean Monochrome Line Work */}
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 150">
                  {/* Head */}
                  <circle cx="50" cy="20" r="8" fill="none" stroke="#64748B" strokeWidth="1.5" />
                  {/* Spine */}
                  <line x1="50" y1="28" x2="50" y2="70" stroke="#64748B" strokeWidth="1.5" />
                  {/* Shoulders */}
                  <line x1="30" y1="36" x2="70" y2="36" stroke="#64748B" strokeWidth="1.5" />
                  {/* Arms */}
                  <line x1="30" y1="36" x2="20" y2="60" stroke="#475569" strokeWidth="1.5" />
                  <line x1="70" y1="36" x2="80" y2="60" stroke="#475569" strokeWidth="1.5" />
                  {/* Pelvis / Hips */}
                  <line x1="38" y1="70" x2="62" y2="70" stroke="#64748B" strokeWidth="2" />
                  {/* Left Leg */}
                  <line x1="38" y1="70" x2="35" y2={repPhase === 'Inflection' ? '98' : '105'} stroke="#00F0FF" strokeWidth="2" />
                  <line x1="35" y1={repPhase === 'Inflection' ? '98' : '105'} x2="32" y2="135" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* Right Leg */}
                  <line 
                    x1="62" 
                    y1="70" 
                    x2={valgusStatus.includes('Cave') ? '55' : '65'} 
                    y2={repPhase === 'Inflection' ? '98' : '105'} 
                    stroke="#00F0FF" 
                    strokeWidth="2" 
                  />
                  <line x1={valgusStatus.includes('Cave') ? '55' : '65'} y1={repPhase === 'Inflection' ? '98' : '105'} x2="68" y2="135" stroke="#00F0FF" strokeWidth="1.5" />

                  {/* Joint Nodes */}
                  <circle cx="50" cy="20" r="2" fill="#94A3B8" />
                  <circle cx="38" cy="70" r="2.5" fill="#94A3B8" />
                  <circle cx="62" cy="70" r="2.5" fill="#94A3B8" />
                  <circle cx="35" cy={repPhase === 'Inflection' ? '98' : '105'} r="3" fill="#00F0FF" />
                  <circle cx={valgusStatus.includes('Cave') ? '55' : '65'} cy={repPhase === 'Inflection' ? '98' : '105'} r="3" fill="#00F0FF" />
                  <circle cx="32" cy="135" r="2.5" fill="#94A3B8" />
                  <circle cx="68" cy="135" r="2.5" fill="#94A3B8" />
                </svg>

                {/* Floating Angle Tag */}
                <div className="absolute bottom-16 right-4 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300">
                  {currentKneeAngle}°
                </div>
              </div>

              {!isSessionActive && (
                <div className="absolute inset-0 bg-[#06090F]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <Camera className="w-10 h-10 text-cyan-400 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">Live Movement Workspace</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-5">
                    Click <strong>"Start Session"</strong> to activate real-time cadence and angle computation.
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
                  >
                    Start Analysis
                  </button>
                </div>
              )}
            </div>

            {/* Viewport Footer HUD */}
            <div className="p-4 z-10 bg-gradient-to-t from-[#06090F]/90 to-transparent flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Phase:</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[11px] border border-slate-800">
                  {repPhase}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>On-device processing &bull; Zero frame transmission</span>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Biomechanics & Risk HUD */}
          <div className="space-y-4 flex flex-col">
            {/* Rep Counter Card */}
            <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed Reps</span>
                <span className="text-xs font-mono text-cyan-400">{exercise}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-5xl font-black text-white">{repCount}</span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  2.3s / rep
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1 mt-3 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(repCount * 10, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Joint Angles HUD */}
            <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Joint Angles</h4>

              {/* Knee Angle */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Knee Flexion (Depth)</span>
                  <span className="font-mono font-bold text-cyan-300">{currentKneeAngle}°</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-100"
                    style={{ width: `${Math.min((currentKneeAngle / 180) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Parallel (90°)</span>
                  <span>Standing (180°)</span>
                </div>
              </div>

              {/* Trunk Inclination */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Trunk Lean</span>
                  <span className="font-mono font-bold text-slate-300">{trunkLeanAngle}°</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-slate-600 transition-all duration-100"
                    style={{ width: `${Math.min((trunkLeanAngle / 60) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Upright (0°)</span>
                  <span>Warning (&gt;45°)</span>
                </div>
              </div>
            </div>

            {/* Real-Time Risk Indicator Card */}
            <div className="bg-[#0B101D] border border-slate-800/80 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Heuristic Alert
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                  {valgusStatus.includes('Cave') ? 'Moderate Concern' : 'Normal Form'}
                </span>
              </div>

              {valgusStatus.includes('Cave') ? (
                <div>
                  <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Dynamic Knee Valgus Alert</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Medial knee collapse observed on ascent. Cue knees outward over second toe.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Knee tracking and balance aligned with targets.</span>
                </div>
              )}
            </div>

            {/* Quick Session Finish Button */}
            {isSessionActive && (
              <button
                onClick={handleStop}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors mt-auto"
              >
                Complete Workout & View Report
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
