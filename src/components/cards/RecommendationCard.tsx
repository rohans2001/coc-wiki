import React from 'react';
import { Link } from 'react-router-dom';
import { AnyEntity } from '../../types/entity';
import { Shield, Sparkles, Users, Crown, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  entity: AnyEntity;
  relationshipLabel?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  entity,
  relationshipLabel
}) => {
  const getCategoryRoute = (category: string) => {
    if (category === 'defense' || category === 'building') return 'defenses';
    if (category === 'siege') return 'siege-machines';
    return `${category}s`;
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'troop': return <Users className="w-4 h-4 text-amber-400" />;
      case 'hero': return <Crown className="w-4 h-4 text-purple-400" />;
      case 'defense': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'spell': return <Sparkles className="w-4 h-4 text-pink-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <Link
      to={`/${getCategoryRoute(entity.category)}/${entity.slug}`}
      className="group flex items-center justify-between p-3.5 rounded-xl bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 shrink-0">
          {getIcon(entity.category)}
        </div>
        <div className="min-w-0">
          {relationshipLabel && (
            <span className="text-[10px] uppercase font-semibold text-amber-400/90 tracking-wider block">
              {relationshipLabel}
            </span>
          )}
          <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors truncate">
            {entity.name}
          </h4>
          <p className="text-xs text-stone-400 truncate mt-0.5">
            Town Hall {entity.unlockTownHall}+ &bull; Max Lvl {entity.maxLevel}
          </p>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
    </Link>
  );
};
