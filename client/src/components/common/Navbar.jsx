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
    <header className="border-b border-slate-800/80 bg-[#080C14]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
            <Activity className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Fit<span className="text-cyan-400">Lens</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono -mt-1">Sports Biomechanics AI</span>
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
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-slate-900 text-cyan-400 border border-slate-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Profile Section */}
        <div className="flex items-center space-x-3">
          <MockBadge variant="pill" text="Mock Data" />

          <Link
            to="/profile"
            className={`p-2 rounded-lg transition-colors border ${
              isActive('/profile')
                ? 'bg-slate-900 text-cyan-400 border-slate-700'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Athlete Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
