import React from 'react';
import { clsx } from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  variant?: 'gold' | 'elixir' | 'dark-elixir' | 'emerald' | 'blue' | 'neutral';
  highlight?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon,
  variant = 'neutral',
  highlight = false,
  className
}) => {
  const borderVariants = {
    gold: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
    elixir: 'border-pink-500/20 bg-pink-500/5 text-pink-300',
    'dark-elixir': 'border-purple-500/20 bg-purple-500/5 text-purple-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-300',
    neutral: 'border-white/10 bg-stone-900/60 text-stone-300'
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xl border p-3.5 sm:p-4 transition-all duration-200',
        borderVariants[variant],
        highlight && 'ring-1 ring-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">{label}</span>
        {icon && <span className="opacity-80 text-sm">{icon}</span>}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-stone-100">{value}</span>
        {subValue && <span className="text-xs text-stone-400 font-normal">{subValue}</span>}
      </div>
    </div>
  );
};
