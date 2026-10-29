import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Square, Camera, AlertTriangle, ShieldCheck, 
  Volume2, VolumeX, Sparkles, CheckCircle2 
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
          setRepPhase('Standing');
          setCurrentKneeAngle(175 - Math.round(cycle * 2));
          setTrunkLeanAngle(15 + Math.round(cycle * 0.5));
          setValgusStatus('Optimal');
        } else if (cycle < 20) {
          setRepPhase('Descending');
          const progress = (cycle - 10) / 10;
          setCurrentKneeAngle(Math.round(155 - progress * 68)); // down to 87°
          setTrunkLeanAngle(Math.round(20 + progress * 8));
          setValgusStatus('Optimal');
        } else if (cycle < 25) {
          setRepPhase('Inflection / Depth');
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
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-5">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0D121F] border border-white/5 p-3.5 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Exercise:</span>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="bg-black/50 border border-white/10 text-white text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="Squat">Barbell / Bodyweight Squat</option>
                <option value="Lunge">Forward Split Lunge</option>
                <option value="Jump">Countermovement Jump & Landing</option>
              </select>
            </div>

            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

            {/* Video Input Mode Toggle */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setSourceMode('demo')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  sourceMode === 'demo'
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demo Simulation
              </button>
              <button
                onClick={() => setSourceMode('webcam')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  sourceMode === 'webcam'
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Webcam (Phase 5)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute audio feedback' : 'Unmute audio feedback'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Session Actions */}
            {!isSessionActive ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Session</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  onClick={handleStop}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop & Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Phase 3 Mock Notice */}
        <div className="flex items-center justify-between bg-[#0D121F] border border-white/5 px-4 py-2 rounded-xl text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Simulation Mode &bull; Real-time kinematics simulation</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden md:inline">60 FPS Render Loop</span>
        </div>

        {/* Main Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
          {/* Left: Video / Skeleton Canvas Viewport (2 cols) */}
          <div className="lg:col-span-2 bg-[#05080F] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col justify-between min-h-[460px]">
            {/* Viewport Header Bar */}
            <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-[#05080F]/90 to-transparent">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isSessionActive && !isPaused ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
                <span className="text-xs font-mono font-medium text-white uppercase tracking-wider">
                  {isSessionActive ? (isPaused ? 'Paused' : 'Active Analysis') : 'Standby'}
                </span>
                <span className="text-[11px] text-slate-500 font-mono ml-2">
                  {formatTime(sessionSeconds)}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                  Confidence: {isSessionActive ? '98.6%' : '100%'}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                  60 FPS
                </span>
              </div>
            </div>

            {/* Center: Skeleton Wireframe Graphics */}
            <div className="flex-1 flex items-center justify-center relative p-6">
              <div className="relative w-60 h-88 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 bg-white/[0.02]">
                <svg className="w-full h-full text-slate-300" viewBox="0 0 100 150">
                  {/* Head */}
                  <circle cx="50" cy="20" r="7" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Spine */}
                  <line x1="50" y1="27" x2="50" y2="70" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Shoulders */}
                  <line x1="32" y1="36" x2="68" y2="36" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Arms */}
                  <line x1="32" y1="36" x2="22" y2="58" stroke="#FFFFFF" strokeWidth="1.2" />
                  <line x1="68" y1="36" x2="78" y2="58" stroke="#FFFFFF" strokeWidth="1.2" />
                  {/* Pelvis / Hips */}
                  <line x1="38" y1="70" x2="62" y2="70" stroke="#FFFFFF" strokeWidth="2" />
                  {/* Left Leg */}
                  <line x1="38" y1="70" x2="35" y2={repPhase === 'Inflection / Depth' ? '98' : '105'} stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="35" y1={repPhase === 'Inflection / Depth' ? '98' : '105'} x2="32" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Right Leg */}
                  <line 
                    x1="62" 
                    y1="70" 
                    x2={valgusStatus.includes('Cave') ? '55' : '65'} 
                    y2={repPhase === 'Inflection / Depth' ? '98' : '105'} 
                    stroke={valgusStatus.includes('Cave') ? '#00E5FF' : '#FFFFFF'} 
                    strokeWidth="2" 
                  />
                  <line x1={valgusStatus.includes('Cave') ? '55' : '65'} y1={repPhase === 'Inflection / Depth' ? '98' : '105'} x2="68" y2="135" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Joint Landmark Highlight Dots */}
                  <circle cx="50" cy="20" r="2" fill="#00E5FF" />
                  <circle cx="38" cy="70" r="2.5" fill="#00E5FF" />
                  <circle cx="62" cy="70" r="2.5" fill="#00E5FF" />
                  <circle cx="35" cy={repPhase === 'Inflection / Depth' ? '98' : '105'} r="2.5" fill="#00E5FF" />
                  <circle cx={valgusStatus.includes('Cave') ? '55' : '65'} cy={repPhase === 'Inflection / Depth' ? '98' : '105'} r="3" fill="#00E5FF" />
                  <circle cx="32" cy="135" r="2.5" fill="#FFFFFF" />
                  <circle cx="68" cy="135" r="2.5" fill="#FFFFFF" />
                </svg>

                {/* Real-time Angle Tag floating over knee */}
                <div className="absolute bottom-14 right-3 bg-[#080C14] border border-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-cyan-300">
                  {currentKneeAngle}°
                </div>
              </div>

              {!isSessionActive && (
                <div className="absolute inset-0 bg-[#05080F]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <Camera className="w-10 h-10 text-slate-400 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">Live Biomechanics Workspace</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-4">
                    Click <strong>"Start Session"</strong> to begin simulated movement tracking and joint angle monitoring.
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-5 py-2 rounded-xl text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
                  >
                    Start Session
                  </button>
                </div>
              )}
            </div>

            {/* Viewport Footer HUD */}
            <div className="p-3.5 z-10 bg-gradient-to-t from-[#05080F]/90 to-transparent flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Phase:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-200 font-mono text-[11px] border border-white/5">
                  {repPhase}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero server video upload</span>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Biomechanics & Risk HUD (1 col) */}
          <div className="space-y-4 flex flex-col">
            {/* Rep Counter Card */}
            <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider">Completed Reps</span>
                <span className="text-xs font-mono text-slate-400">{exercise}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-bold text-white">{repCount}</span>
                <span className="text-xs font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  Tempo: 2.3s
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-1 mt-3 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(repCount * 10, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Joint Angles HUD */}
            <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5 space-y-4">
              <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Kinematics Metrics</h4>

              {/* Knee Angle */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-400">Knee Depth</span>
                  <span className="text-white font-bold">{currentKneeAngle}°</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-100"
                    style={{ width: `${Math.min((currentKneeAngle / 180) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>90° Parallel</span>
                  <span>180° Standing</span>
                </div>
              </div>

              {/* Trunk Inclination */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-400">Trunk Lean</span>
                  <span className="text-white font-bold">{trunkLeanAngle}°</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-slate-300 h-full transition-all duration-100"
                    style={{ width: `${Math.min((trunkLeanAngle / 60) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0° Upright</span>
                  <span>&gt;45° Excessive</span>
                </div>
              </div>
            </div>

            {/* Risk Indicator Card */}
            <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Heuristic Status
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                  {valgusStatus.includes('Cave') ? 'Moderate Concern' : 'Normal Form'}
                </span>
              </div>

              {valgusStatus.includes('Cave') ? (
                <div>
                  <div className="text-xs font-bold text-white mb-1">
                    Medial Knee Displacement
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Minor inward knee cave observed on ascent. Keep knees tracking over second toe.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-300 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Knee tracking and balance aligned with targets.</span>
                </div>
              )}
            </div>

            {/* Quick Session Finish Button */}
            {isSessionActive && (
              <button
                onClick={handleStop}
                className="w-full py-2.5 rounded-xl text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors mt-auto"
              >
                Complete & Generate Report
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
