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
      if (role === 'coach') {
        navigate('/coach');
      } else {
        navigate('/dashboard');
      }
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
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Fit<span className="text-cyan-400">Lens</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Sign In to FitLens
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Access your biomechanical telemetry & analysis history
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#0B101D] border border-slate-800/80 py-7 px-6 sm:px-8 shadow-sm rounded-2xl">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setRole('athlete')}
              className={`py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'athlete'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Athlete
            </button>
            <button
              type="button"
              onClick={() => setRole('coach')}
              className={`py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                role === 'coach'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Coach
            </button>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mb-6 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400">Quick Demo Autofill</span>
              <MockBadge variant="pill" text="Demo Auth" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoAthlete}
                className="py-1.5 px-2 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
              >
                Demo Athlete
              </button>
              <button
                type="button"
                onClick={fillDemoCoach}
                className="py-1.5 px-2 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
              >
                Demo Coach
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">
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
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs text-slate-400">
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
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors disabled:opacity-50 mt-6"
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

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
