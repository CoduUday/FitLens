import React from 'react';

export default function MockBadge({ text = 'Demo Mode', variant = 'subtle' }) {
  if (variant === 'pill') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide bg-white/5 text-slate-400 border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        {text}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
      <span>{text}</span>
    </div>
  );
}
