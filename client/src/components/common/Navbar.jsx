import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Video, History, Users, User, LogIn } from 'lucide-react';
import MockBadge from './MockBadge';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analysis', label: 'Live Analysis', icon: Video, badge: 'Demo' },
    { to: '/history', label: 'Session History', icon: History },
    { to: '/coach', label: 'Coach Portal', icon: Users },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              Fit<span className="text-cyan-400">Lens</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono -mt-1">Sports Biomechanics AI</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Profile Section */}
        <div className="flex items-center space-x-3">
          <MockBadge variant="pill" text="Phase 3 Mock Mode" />

          <Link
            to="/profile"
            className={`p-2 rounded-lg transition-colors border ${
              isActive('/profile')
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700'
            }`}
            title="Athlete Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm shadow-cyan-500/20"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

