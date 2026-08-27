import React, { useState } from 'react';
import { EntityService } from '../../services/entityService';
import { AnyEntity, TroopEntity, HeroEntity, DefenseEntity } from '../../types/entity';
import { StatCard } from '../ui/StatCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Shield, Zap, Sparkles, Scale, ArrowRightLeft } from 'lucide-react';

export const UnitCompare: React.FC = () => {
  const allEntities = EntityService.getAllEntities();
  
  // Default to Barbarian vs Archer
  const [entityAId, setEntityAId] = useState<string>('troop-barbarian');
  const [entityBId, setEntityBId] = useState<string>('troop-archer');

  const entityA = allEntities.find((e) => e.id === entityAId) || allEntities[0];
  const entityB = allEntities.find((e) => e.id === entityBId) || allEntities[1];

  const swapEntities = () => {
    const temp = entityAId;
    setEntityAId(entityBId);
    setEntityBId(temp);
  };

  const getStats = (entity: AnyEntity) => {
    const levels = (entity as { upgradeLevels?: { hitpoints?: number; damagePerSecond?: number }[] }).upgradeLevels || [];
    const maxLvl = levels[levels.length - 1] || {};
    const minLvl = levels[0] || {};
    return {
      minHp: minLvl.hitpoints || 0,
      maxHp: maxLvl.hitpoints || 0,
      minDps: minLvl.damagePerSecond || 0,
      maxDps: maxLvl.damagePerSecond || 0,
      housingSpace: (entity as TroopEntity).housingSpace || 0,
      speed: (entity as TroopEntity | HeroEntity).movementSpeed || 0,
      range: (entity as TroopEntity | HeroEntity | DefenseEntity).range || 0,
      targetType: (entity as TroopEntity | HeroEntity | DefenseEntity).targetType || 'Any'
    };
  };

  const statsA = getStats(entityA);
  const statsB = getStats(entityB);

  return (
    <div className="rounded-3xl border border-stone-800 bg-[#0F1420]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Scale className="w-4 h-4" />
            <span>Interactive Comparison</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-stone-100 mt-1">
            Compare Game Units &amp; Stats
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Select any two units, heroes, or defenses to evaluate DPS, hitpoints, housing space, and combat metrics.
          </p>
        </div>

        <button
          onClick={swapEntities}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-xs font-semibold text-stone-300 hover:text-amber-300 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Swap Sides</span>
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selector A */}
        <div className="space-y-3 p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400">
            Select Unit #1
          </label>
          <select
            value={entityAId}
            onChange={(e) => setEntityAId(e.target.value)}
            aria-label="Select Unit 1"
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
          >
            {allEntities.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.category})
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between pt-2 text-xs text-stone-400">
            <span>Category: <strong className="text-stone-200 capitalize">{entityA.category}</strong></span>
            <span>Unlock: <strong className="text-amber-400">TH {entityA.unlockTownHall}</strong></span>
          </div>
        </div>

        {/* Selector B */}
        <div className="space-y-3 p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-purple-400">
            Select Unit #2
          </label>
          <select
            value={entityBId}
            onChange={(e) => setEntityBId(e.target.value)}
            aria-label="Select Unit 2"
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-purple-500"
          >
            {allEntities.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.category})
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between pt-2 text-xs text-stone-400">
            <span>Category: <strong className="text-stone-200 capitalize">{entityB.category}</strong></span>
            <span>Unlock: <strong className="text-purple-400">TH {entityB.unlockTownHall}</strong></span>
          </div>
        </div>
      </div>

      {/* Side by Side Comparative Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unit A Cards */}
        <div className="space-y-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-amber-300">{entityA.name}</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Max Lvl {entityA.maxLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <StatCard label="Max HP" value={statsA.maxHp ? new Intl.NumberFormat().format(statsA.maxHp) : 'N/A'} icon={<Shield className="w-4 h-4 text-emerald-400" />} />
            <StatCard label="Max DPS" value={statsA.maxDps || 'N/A'} icon={<Zap className="w-4 h-4 text-amber-400" />} />
            <StatCard label="Speed" value={statsA.speed || 'N/A'} />
            <StatCard label="Housing" value={statsA.housingSpace ? `${statsA.housingSpace} Slots` : 'N/A'} />
          </div>

          {statsA.maxHp > 0 && (
            <ProgressBar label="Max HP Capacity" value={statsA.maxHp} max={Math.max(statsA.maxHp, statsB.maxHp, 10000)} variant="emerald" />
          )}
          {statsA.maxDps > 0 && (
            <ProgressBar label="Max Damage Per Sec" value={statsA.maxDps} max={Math.max(statsA.maxDps, statsB.maxDps, 1500)} variant="gold" />
          )}
        </div>

        {/* Unit B Cards */}
        <div className="space-y-4 p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-purple-300">{entityB.name}</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Max Lvl {entityB.maxLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <StatCard label="Max HP" value={statsB.maxHp ? new Intl.NumberFormat().format(statsB.maxHp) : 'N/A'} icon={<Shield className="w-4 h-4 text-emerald-400" />} />
            <StatCard label="Max DPS" value={statsB.maxDps || 'N/A'} icon={<Zap className="w-4 h-4 text-amber-400" />} />
            <StatCard label="Speed" value={statsB.speed || 'N/A'} />
            <StatCard label="Housing" value={statsB.housingSpace ? `${statsB.housingSpace} Slots` : 'N/A'} />
          </div>

          {statsB.maxHp > 0 && (
            <ProgressBar label="Max HP Capacity" value={statsB.maxHp} max={Math.max(statsA.maxHp, statsB.maxHp, 10000)} variant="emerald" />
          )}
          {statsB.maxDps > 0 && (
            <ProgressBar label="Max Damage Per Sec" value={statsB.maxDps} max={Math.max(statsA.maxDps, statsB.maxDps, 1500)} variant="dark-elixir" />
          )}
        </div>
      </div>
    </div>
  );
};
