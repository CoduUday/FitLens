import React from 'react';

export default function MockBadge({ text = 'Simulated / Demo Data', variant = 'subtle' }) {
  if (variant === 'pill') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        {text}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <span>{text}</span>
    </div>
  );
}
