import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Video, History, Users, User, LogIn } from 'lucide-react';
import MockBadge from './MockBadge';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analysis', label: 'Live Analysis', icon: Video },
    { to: '/history', label: 'Session History', icon: History },
    { to: '/coach', label: 'Coach Portal', icon: Users },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b border-white/5 bg-[#080C14]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo - Minimalist & Sleek */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Fit<span className="text-cyan-400">Lens</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Profile Section */}
        <div className="flex items-center space-x-3">
          <MockBadge variant="pill" text="Demo Mode" />

          <Link
            to="/profile"
            className={`p-1.5 rounded-lg transition-colors border ${
              isActive('/profile')
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
            }`}
            title="Athlete Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
