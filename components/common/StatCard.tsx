import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'indigo' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'indigo',
  onClick,
}) => {
  const accentStyles = {
    indigo: {
      bg: 'bg-indigo-950/40 border-indigo-800/40 text-indigo-400',
      glow: 'hover:border-indigo-600/50 hover:shadow-indigo-950/40',
      iconBg: 'bg-indigo-600/20 text-indigo-400',
    },
    cyan: {
      bg: 'bg-cyan-950/40 border-cyan-800/40 text-cyan-400',
      glow: 'hover:border-cyan-600/50 hover:shadow-cyan-950/40',
      iconBg: 'bg-cyan-600/20 text-cyan-400',
    },
    emerald: {
      bg: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400',
      glow: 'hover:border-emerald-600/50 hover:shadow-emerald-950/40',
      iconBg: 'bg-emerald-600/20 text-emerald-400',
    },
    amber: {
      bg: 'bg-amber-950/40 border-amber-800/40 text-amber-400',
      glow: 'hover:border-amber-600/50 hover:shadow-amber-950/40',
      iconBg: 'bg-amber-600/20 text-amber-400',
    },
    rose: {
      bg: 'bg-rose-950/40 border-rose-800/40 text-rose-400',
      glow: 'hover:border-rose-600/50 hover:shadow-rose-950/40',
      iconBg: 'bg-rose-600/20 text-rose-400',
    },
    purple: {
      bg: 'bg-purple-950/40 border-purple-800/40 text-purple-400',
      glow: 'hover:border-purple-600/50 hover:shadow-purple-950/40',
      iconBg: 'bg-purple-600/20 text-purple-400',
    },
  }[accentColor];

  return (
    <div
      onClick={onClick}
      className={`glass-card bg-[#22262E] p-5 rounded-2xl border border-slate-700/60 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${accentStyles.glow} relative overflow-hidden group`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-white mt-1.5">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs font-medium mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${accentStyles.iconBg} border border-white/5 transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
