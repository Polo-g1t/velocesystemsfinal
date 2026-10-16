import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', size = 'sm', dot = false }) => {
  let style = 'bg-slate-800/80 text-slate-300 border-slate-700/60';
  let dotColor = 'bg-slate-400';

  const v = (variant || '').toLowerCase().replace(/\s+/g, '_');

  if (['emerald', 'present', 'approved', 'completed', 'low', 'active'].includes(v)) {
    style = 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
    dotColor = 'bg-emerald-400';
  } else if (['amber', 'late', 'pending', 'in_progress', 'medium', 'advisory', 'scheduled'].includes(v)) {
    style = 'bg-amber-950/60 text-amber-300 border-amber-800/60';
    dotColor = 'bg-amber-400';
  } else if (['rose', 'absent', 'rejected', 'urgent', 'high'].includes(v)) {
    style = 'bg-rose-950/60 text-rose-300 border-rose-800/60';
    dotColor = 'bg-rose-400';
  } else if (['indigo', 'system', 'not_started'].includes(v)) {
    style = 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60';
    dotColor = 'bg-indigo-400';
  } else if (['cyan', 'on_leave', 'meeting'].includes(v)) {
    style = 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
    dotColor = 'bg-cyan-400';
  } else if (['purple', 'update', 'reminder'].includes(v)) {
    style = 'bg-purple-950/60 text-purple-300 border-purple-800/60';
    dotColor = 'bg-purple-400';
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-medium',
    lg: 'text-base px-3.5 py-1.5 font-semibold',
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${style} ${sizeClasses} backdrop-blur-sm shadow-xs transition-colors`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />}
      {children}
    </span>
  );
};
