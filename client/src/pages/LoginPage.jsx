import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, ArrowRight, UserCheck, Shield, Sparkles } from 'lucide-react';
import MockBadge from '../components/common/MockBadge';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('athlete'); // 'athlete' | 'coach'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login for Phase 3 UI preview
    setTimeout(() => {
      setLoading(false);
      if (role === 'coach') {
        navigate('/coach');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  const fillDemoAthlete = () => {
    setRole('athlete');
    setEmail('alex.rivera@athletics.org');
    setPassword('DemoPass123!');
  };

  const fillDemoCoach = () => {
    setRole('coach');
    setEmail('coach.vance@athletics.org');
    setPassword('CoachPass123!');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Fit<span className="text-cyan-400">Lens</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sign In to Your Workspace
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Access your real-time biomechanical telemetry & analysis history
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-2xl">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setRole('athlete')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'athlete'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Athlete Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('coach')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'coach'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Coach Portal
            </button>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mb-6 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick Demo Autofil
              </span>
              <MockBadge variant="pill" text="Phase 3 Mock Auth" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoAthlete}
                className="py-1.5 px-2 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                Demo Athlete
              </button>
              <button
                type="button"
                onClick={fillDemoCoach}
                className="py-1.5 px-2 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                Demo Coach
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@athletics.org"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-cyan-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50 mt-6"
            >
              {loading ? (
                <span>Entering Workspace...</span>
              ) : (
                <>
                  <span>Sign In as {role === 'coach' ? 'Coach' : 'Athlete'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

