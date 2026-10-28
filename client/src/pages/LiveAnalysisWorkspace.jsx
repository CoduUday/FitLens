import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Square, Camera, AlertTriangle, ShieldCheck, RefreshCw, 
  Sparkles, CheckCircle2, ChevronRight, Activity, Eye, Zap, Volume2, VolumeX 
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
  const [sourceMode, setSourceMode] = useState('demo'); // 'demo' | 'webcam'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Simulated Biomechanical Telemetry
  const [repCount, setRepCount] = useState(0);
  const [currentKneeAngle, setCurrentKneeAngle] = useState(175);
  const [trunkLeanAngle, setTrunkLeanAngle] = useState(18);
  const [valgusStatus, setValgusStatus] = useState('Optimal');
  const [repPhase, setRepPhase] = useState('Standing'); // 'Standing' | 'Descending' | 'Inflection' | 'Ascending'

  // Timer & Simulated Rep Loop
  useEffect(() => {
    let timer = null;
    let biomechanicsLoop = null;

    if (isSessionActive && !isPaused) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);

      // Biomechanical simulation oscillation
      let cycle = 0;
      biomechanicsLoop = setInterval(() => {
        cycle = (cycle + 1) % 40; // 4 second full rep cycle

        if (cycle < 10) {
          // Standing phase
          setRepPhase('Standing');
          setCurrentKneeAngle(175 - Math.round(cycle * 2));
          setTrunkLeanAngle(15 + Math.round(cycle * 0.5));
          setValgusStatus('Optimal');
        } else if (cycle < 20) {
          // Descending phase
          setRepPhase('Descending');
          const progress = (cycle - 10) / 10;
          setCurrentKneeAngle(Math.round(155 - progress * 68)); // down to 87°
          setTrunkLeanAngle(Math.round(20 + progress * 8));
          setValgusStatus('Optimal');
        } else if (cycle < 25) {
          // Bottom / Inflection phase
          setRepPhase('Inflection / Depth');
          setCurrentKneeAngle(87);
          setTrunkLeanAngle(28);
          // Simulate slight knee cave on later reps
          setValgusStatus(cycle % 2 === 0 ? 'Optimal' : 'Mild Inward Cave');
        } else {
          // Ascending phase
          setRepPhase('Ascending');
          const progress = (cycle - 25) / 15;
          setCurrentKneeAngle(Math.round(87 + progress * 88));
          setTrunkLeanAngle(Math.round(28 - progress * 10));

          // When completing rep
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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Exercise:</span>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="Squat">Barbell / Bodyweight Squat</option>
                <option value="Lunge">Forward Split Lunge</option>
                <option value="Jump">Countermovement Jump & Landing</option>
              </select>
            </div>

            <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

            {/* Video Input Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSourceMode('demo')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sourceMode === 'demo'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demo Mode (Simulated)
              </button>
              <button
                onClick={() => setSourceMode('webcam')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  sourceMode === 'webcam'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Webcam (Phase 5)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute audio feedback' : 'Unmute audio feedback'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Session Actions */}
            {!isSessionActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Session</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-800/60 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors shadow-lg shadow-rose-900/20"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop & View Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Phase 3 Mock Notice Pill */}
        <div className="flex items-center justify-between bg-amber-950/30 border border-amber-800/50 px-4 py-2 rounded-xl text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Phase 3 Interactive Simulation:</strong> Live angles and reps below are actively simulated to demonstrate the complete UI workflow before Phase 5 MediaPipe integration.
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400 hidden md:inline">Simulated 60 FPS Engine</span>
        </div>

        {/* Main Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Left: Video / Skeleton Canvas Viewport (2 cols) */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden relative flex flex-col justify-between shadow-2xl min-h-[480px]">
            {/* Viewport Header Bar */}
            <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-slate-950/90 to-transparent">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isSessionActive && !isPaused ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {isSessionActive ? (isPaused ? 'Session Paused' : 'Analyzing Live Form') : 'Camera Standby'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono ml-2">
                  Duration: {formatTime(sessionSeconds)}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-cyan-400">
                  Confidence: {isSessionActive ? '98.6%' : '100%'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-400">
                  60 FPS
                </span>
              </div>
            </div>

            {/* Center: Visual Representation / Skeleton Wireframe */}
            <div className="flex-1 flex items-center justify-center relative p-6">
              {/* Simulated Skeleton Wireframe Graphics */}
              <div className="relative w-64 h-96 border border-dashed border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center p-4 bg-slate-900/30">
                {/* SVG Skeleton Simulation */}
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 150">
                  {/* Head */}
                  <circle cx="50" cy="20" r="8" fill="none" stroke="#00F0FF" strokeWidth="2" />
                  {/* Spine */}
                  <line x1="50" y1="28" x2="50" y2="70" stroke="#00F0FF" strokeWidth="2" />
                  {/* Shoulders */}
                  <line x1="30" y1="36" x2="70" y2="36" stroke="#00F0FF" strokeWidth="2" />
                  {/* Arms */}
                  <line x1="30" y1="36" x2="20" y2="60" stroke="#00F0FF" strokeWidth="1.5" />
                  <line x1="70" y1="36" x2="80" y2="60" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* Pelvis / Hips */}
                  <line x1="38" y1="70" x2="62" y2="70" stroke="#00F0FF" strokeWidth="2.5" />
                  {/* Left Leg */}
                  <line x1="38" y1="70" x2="35" y2={repPhase === 'Inflection / Depth' ? '98' : '105'} stroke="#00F0FF" strokeWidth="2.5" />
                  <line x1="35" y1={repPhase === 'Inflection / Depth' ? '98' : '105'} x2="32" y2="135" stroke="#00F0FF" strokeWidth="2" />
                  {/* Right Leg */}
                  <line 
                    x1="62" 
                    y1="70" 
                    x2={valgusStatus.includes('Cave') ? '54' : '65'} 
                    y2={repPhase === 'Inflection / Depth' ? '98' : '105'} 
                    stroke={valgusStatus.includes('Cave') ? '#F59E0B' : '#00F0FF'} 
                    strokeWidth="2.5" 
                  />
                  <line x1={valgusStatus.includes('Cave') ? '54' : '65'} y1={repPhase === 'Inflection / Depth' ? '98' : '105'} x2="68" y2="135" stroke="#00F0FF" strokeWidth="2" />

                  {/* Joint Landmark Highlight Dots */}
                  <circle cx="50" cy="20" r="2.5" fill="#10B981" />
                  <circle cx="38" cy="70" r="3" fill="#10B981" />
                  <circle cx="62" cy="70" r="3" fill="#10B981" />
                  <circle cx="35" cy={repPhase === 'Inflection / Depth' ? '98' : '105'} r="3.5" fill="#00F0FF" />
                  <circle cx={valgusStatus.includes('Cave') ? '54' : '65'} cy={repPhase === 'Inflection / Depth' ? '98' : '105'} r="4" fill={valgusStatus.includes('Cave') ? '#F59E0B' : '#00F0FF'} />
                  <circle cx="32" cy="135" r="3" fill="#10B981" />
                  <circle cx="68" cy="135" r="3" fill="#10B981" />
                </svg>

                {/* Real-time Angle Tag floating over knee */}
                <div className="absolute bottom-16 right-4 bg-slate-900/90 border border-cyan-500/50 px-2 py-1 rounded text-[11px] font-mono text-cyan-300 shadow-md">
                  Knee: {currentKneeAngle}°
                </div>
              </div>

              {!isSessionActive && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <Camera className="w-12 h-12 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Interactive Biomechanics Workspace</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-5">
                    Click <strong>"Start Session"</strong> above to trigger the simulated repetition loop, angle calculations, and dynamic safety alerts.
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20"
                  >
                    Start Simulated Session
                  </button>
                </div>
              )}
            </div>

            {/* Viewport Footer HUD */}
            <div className="p-4 z-10 bg-gradient-to-t from-slate-950/90 to-transparent flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Phase:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-semibold border border-cyan-800 text-[11px]">
                  {repPhase}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero video transmitted &bull; Frame buffer cleared immediately</span>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Biomechanics & Risk HUD (1 col) */}
          <div className="space-y-5 flex flex-col">
            {/* Rep Counter Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Completed Reps</span>
                <span className="text-xs font-mono text-cyan-400">{exercise}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-5xl font-black text-white">{repCount}</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
                  Cadence: 2.3s
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 mt-3 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(repCount * 10, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Joint Angles HUD */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Joint Angles</h4>

              {/* Knee Angle */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Knee Flexion (Depth)</span>
                  <span className="font-mono font-bold text-cyan-300">{currentKneeAngle}°</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-100 ${
                      currentKneeAngle < 95 ? 'bg-emerald-400' : 'bg-cyan-400'
                    }`}
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
                  <span className="text-slate-300">Trunk Forward Lean</span>
                  <span className="font-mono font-bold text-slate-200">{trunkLeanAngle}°</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-teal-400 h-full transition-all duration-100"
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
            <div className={`p-5 rounded-2xl border shadow-xl transition-all ${
              valgusStatus.includes('Cave') 
                ? 'bg-amber-950/40 border-amber-800/80' 
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Heuristic Safety Alert
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  valgusStatus.includes('Cave')
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {valgusStatus.includes('Cave') ? 'Moderate Concern' : 'Normal Form'}
                </span>
              </div>

              {valgusStatus.includes('Cave') ? (
                <div>
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Dynamic Knee Valgus Alert</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Medial knee cave detected on ascending drive. Focus on pushing knees outward in line with second toe.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Knee tracking and bilateral balance aligned with targets.</span>
                </div>
              )}
            </div>

            {/* Quick Session Finish Button */}
            {isSessionActive && (
              <button
                onClick={handleStop}
                className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-400/20 mt-auto"
              >
                Complete Workout & Generate Report
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
