import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  variant?: 'gold' | 'elixir' | 'dark-elixir' | 'emerald' | 'crimson';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  max,
  unit = '',
  variant = 'gold',
  showPercentage = false
}) => {
  const percent = Math.min(100, Math.max(0, (value / (max || 1)) * 100));

  const barStyles = {
    gold: 'from-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]',
    elixir: 'from-pink-500 to-rose-400 shadow-[0_0_10px_rgba(236,72,153,0.4)]',
    'dark-elixir': 'from-purple-500 to-indigo-400 shadow-[0_0_10px_rgba(139,92,246,0.4)]',
    emerald: 'from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]',
    crimson: 'from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-stone-300 font-medium">{label}</span>
        <span className="font-mono text-stone-200 font-semibold">
          {new Intl.NumberFormat().format(value)}{unit}
          {showPercentage && <span className="text-stone-400 ml-1">({Math.round(percent)}%)</span>}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800/90 p-0.5 border border-stone-700/40">
        <div
          className={clsx('h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out', barStyles[variant])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
