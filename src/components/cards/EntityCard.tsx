import React from 'react';
import { Link } from 'react-router-dom';
import { AnyEntity, TroopEntity, HeroEntity, SpellEntity, DefenseEntity } from '../../types/entity';
import { Shield, Zap, Sparkles, ChevronRight, Users, Crown } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface EntityCardProps {
  entity: AnyEntity;
  featured?: boolean;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity, featured = false }) => {
  const getCategoryRoute = (category: string) => {
    if (category === 'defense' || category === 'building') return 'defenses';
    if (category === 'siege') return 'siege-machines';
    return `${category}s`;
  };

  const routePath = `/${getCategoryRoute(entity.category)}/${entity.slug}`;

  // Extract quick stats depending on entity category
  const troop = entity.category === 'troop' ? (entity as TroopEntity) : null;
  const hero = entity.category === 'hero' ? (entity as HeroEntity) : null;
  const spell = entity.category === 'spell' ? (entity as SpellEntity) : null;
  const defense = entity.category === 'defense' ? (entity as DefenseEntity) : null;

  const topLevel = entity.maxLevel ? (entity as { upgradeLevels?: { hitpoints?: number; damagePerSecond?: number }[] }).upgradeLevels?.slice(-1)[0] : null;

  return (
    <Link
      to={routePath}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 stone-card ${
        featured
          ? 'border-amber-500/40 bg-gradient-to-b from-[#161C28] to-[#0D111A] shadow-xl shadow-amber-500/5'
          : 'border-white/10 hover:border-amber-500/40 hover:shadow-xl hover:shadow-black/50'
      }`}
    >
      {/* Top Banner & Image Area */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-b from-stone-800/80 to-stone-950/90 p-4">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <Badge variant="gold" size="sm">
            TH {entity.unlockTownHall}+
          </Badge>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 capitalize">
            {entity.category}
          </span>
        </div>

        {/* Unit Art Preview / Placeholder Canvas with Fallback */}
        <div className="absolute inset-0 flex items-center justify-center pt-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-stone-900 to-stone-800 border border-stone-700/50 shadow-inner group-hover:scale-105 transition-transform duration-300">
            {entity.category === 'troop' && <Users className="w-12 h-12 text-amber-400/80" />}
            {entity.category === 'hero' && <Crown className="w-12 h-12 text-purple-400/80" />}
            {entity.category === 'defense' && <Shield className="w-12 h-12 text-blue-400/80" />}
            {entity.category === 'spell' && <Sparkles className="w-12 h-12 text-pink-400/80" />}
            {entity.category !== 'troop' && entity.category !== 'hero' && entity.category !== 'defense' && entity.category !== 'spell' && (
              <Zap className="w-12 h-12 text-amber-400/80" />
            )}
            
            {/* Max Level Pill */}
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-stone-950/90 border border-amber-500/40 text-[11px] font-bold text-amber-300 tracking-wider">
              MAX LVL {entity.maxLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-stone-950/40">
        <div>
          <h3 className="text-lg font-bold font-display text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
            <span>{entity.name}</span>
            <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {entity.tagline || entity.description}
          </p>
        </div>

        {/* Dynamic Quick Stat Badges */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 grid grid-cols-2 gap-2 text-xs">
          {troop && (
            <>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Space</span>
                <span className="font-semibold text-stone-200">{troop.housingSpace} Slots</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Targets</span>
                <span className="font-semibold text-stone-200 truncate">{troop.targetType}</span>
              </div>
            </>
          )}

          {hero && (
            <>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Max Levels</span>
                <span className="font-semibold text-purple-300">{hero.maxLevel} Lvls</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Range</span>
                <span className="font-semibold text-stone-200">{hero.range} Tiles</span>
              </div>
            </>
          )}

          {defense && (
            <>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Range</span>
                <span className="font-semibold text-blue-300 truncate">{defense.range}</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Max HP</span>
                <span className="font-semibold text-stone-200">{topLevel?.hitpoints ? `${topLevel.hitpoints}` : 'Varies'}</span>
              </div>
            </>
          )}

          {spell && (
            <>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Radius</span>
                <span className="font-semibold text-pink-300">{spell.radius} Tiles</span>
              </div>
              <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                <span className="text-stone-400 block text-[10px] uppercase">Space</span>
                <span className="font-semibold text-stone-200">{spell.housingSpace} Slots</span>
              </div>
            </>
          )}

          {!troop && !hero && !defense && !spell && (
            <div className="col-span-2 bg-stone-900/60 p-2 rounded-lg border border-stone-800 flex items-center justify-between">
              <span className="text-stone-400 text-[10px] uppercase">Unlock TH</span>
              <span className="font-semibold text-amber-300">TH {entity.unlockTownHall}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
