import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function MockBadge({ text = 'Simulated / Demo Data', variant = 'subtle' }) {
  if (variant === 'pill') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
        <Sparkles className="w-3 h-3 text-amber-400" />
        {text}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg">
      <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
