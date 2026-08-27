import React from 'react';
import { clsx } from 'clsx';
import { ResourceCostType } from '../../types/entity';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'elixir' | 'dark-elixir' | 'ore' | 'neutral' | 'emerald' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  icon
}) => {
  const variantStyles = {
    gold: 'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    elixir: 'bg-pink-500/10 text-pink-300 border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.1)]',
    'dark-elixir': 'bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(139,92,246,0.1)]',
    ore: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    amber: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    neutral: 'bg-stone-800/80 text-stone-300 border-stone-700/60'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg gap-2 font-semibold'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export const ResourceCurrencyBadge: React.FC<{ currency: ResourceCostType; amount?: number | string }> = ({
  currency,
  amount
}) => {
  const getBadgeConfig = () => {
    switch (currency) {
      case 'elixir':
        return { variant: 'elixir' as const, label: 'Elixir', symbol: '💧' };
      case 'dark_elixir':
        return { variant: 'dark-elixir' as const, label: 'Dark Elixir', symbol: '🧪' };
      case 'gold':
        return { variant: 'gold' as const, label: 'Gold', symbol: '🪙' };
      case 'shiny_ore':
        return { variant: 'ore' as const, label: 'Shiny Ore', symbol: '🔷' };
      case 'glowy_ore':
        return { variant: 'ore' as const, label: 'Glowy Ore', symbol: '🟣' };
      case 'starry_ore':
        return { variant: 'ore' as const, label: 'Starry Ore', symbol: '⭐' };
      default:
        return { variant: 'neutral' as const, label: 'Free', symbol: '✨' };
    }
  };

  const config = getBadgeConfig();

  return (
    <Badge variant={config.variant} size="sm">
      <span className="mr-1">{config.symbol}</span>
      {amount !== undefined && amount !== null && <span className="font-mono mr-1">{amount}</span>}
      {config.label}
    </Badge>
  );
};
