import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, ArrowRight, UserCheck, Shield } from 'lucide-react';
import MockBadge from '../components/common/MockBadge';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('athlete');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === 'coach' ? '/coach' : '/dashboard');
    }, 500);
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
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Fit<span className="text-cyan-400">Lens</span>
          </span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Sign In to Your Workspace
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Access your real-time biomechanical telemetry & analysis history
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#0D121F] border border-white/5 py-8 px-6 sm:px-8 rounded-2xl shadow-xl">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 mb-5">
            <button
              type="button"
              onClick={() => setRole('athlete')}
              className={`py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'athlete'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Athlete
            </button>
            <button
              type="button"
              onClick={() => setRole('coach')}
              className={`py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'coach'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Coach
            </button>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mb-5 p-3 bg-black/30 border border-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                1-Click Demo Fill
              </span>
              <MockBadge variant="pill" text="Mock Auth" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoAthlete}
                className="py-1 px-2 text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 rounded border border-white/5 transition-colors"
              >
                Demo Athlete
              </button>
              <button
                type="button"
                onClick={fillDemoCoach}
                className="py-1 px-2 text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 rounded border border-white/5 transition-colors"
              >
                Demo Coach
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@athletics.org"
                  className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-400">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-slate-400 hover:text-white">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors disabled:opacity-50 mt-5"
            >
              {loading ? (
                <span>Entering Workspace...</span>
              ) : (
                <>
                  <span>Sign In as {role === 'coach' ? 'Coach' : 'Athlete'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
