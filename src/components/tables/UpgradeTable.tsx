import React from 'react';
import { UpgradeLevel } from '../../types/entity';
import { ResourceCurrencyBadge } from '../ui/Badge';
import { Clock, Shield, Zap, Sparkles, Building, Layers, Activity } from 'lucide-react';

interface UpgradeTableProps {
  levels: UpgradeLevel[];
  selectedLevel?: number;
  onSelectLevel?: (level: number) => void;
  entityName: string;
}

export const UpgradeTable: React.FC<UpgradeTableProps> = ({
  levels,
  selectedLevel,
  onSelectLevel,
  entityName
}) => {
  if (!levels || levels.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-stone-900/40 border border-stone-800 text-center text-stone-400">
        No upgrade statistics available for this entity.
      </div>
    );
  }

  // Ensure deterministic sorting by level
  const sortedLevels = [...levels].sort((a, b) => a.level - b.level);

  // Dynamic column detection based on available attributes
  const hasHp = sortedLevels.some((l) => l.hitpoints !== undefined && l.hitpoints > 0);
  const hasDps = sortedLevels.some((l) => l.damagePerSecond !== undefined && l.damagePerSecond > 0);
  const hasDpa = sortedLevels.some((l) => l.damagePerAttack !== undefined && l.damagePerAttack > 0);
  const hasDamagePerShot = sortedLevels.some((l) => l.damagePerShot !== undefined && l.damagePerShot > 0);
  const hasRegen = sortedLevels.some((l) => l.regenerationTimeMinutes !== undefined);
  const hasHealing = sortedLevels.some((l) => l.healingPerSecond !== undefined);
  const hasDuration = sortedLevels.some((l) => l.durationSeconds !== undefined);
  const hasBoost = sortedLevels.some((l) => l.boostPercent !== undefined);
  const hasLab = sortedLevels.some((l) => l.requiredLaboratoryLevel !== undefined);
  const hasAbility = sortedLevels.some((l) => l.abilityLevel !== undefined || l.abilityName !== undefined);

  return (
    <div className="w-full space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/60 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-300">
            <thead className="bg-stone-900/90 text-xs font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-800">
              <tr>
                <th scope="col" className="py-3.5 px-4 text-center">Level</th>
                {hasHp && (
                  <th scope="col" className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" /> Hitpoints
                    </span>
                  </th>
                )}
                {hasDps && (
                  <th scope="col" className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> DPS
                    </span>
                  </th>
                )}
                {hasDpa && (
                  <th scope="col" className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" /> DPA
                    </span>
                  </th>
                )}
                {hasDamagePerShot && (
                  <th scope="col" className="py-3.5 px-4">Damage / Shot</th>
                )}
                {hasHealing && (
                  <th scope="col" className="py-3.5 px-4">Healing / Sec</th>
                )}
                {hasBoost && (
                  <th scope="col" className="py-3.5 px-4">Damage Boost</th>
                )}
                {hasDuration && (
                  <th scope="col" className="py-3.5 px-4">Duration</th>
                )}
                {hasRegen && (
                  <th scope="col" className="py-3.5 px-4">Regen Time</th>
                )}
                {hasAbility && (
                  <th scope="col" className="py-3.5 px-4">Ability</th>
                )}
                <th scope="col" className="py-3.5 px-4">Upgrade Cost</th>
                <th scope="col" className="py-3.5 px-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> Upgrade Time
                  </span>
                </th>
                <th scope="col" className="py-3.5 px-4">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" /> Required TH
                  </span>
                </th>
                {hasLab && (
                  <th scope="col" className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-400" /> Lab Level
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-sans">
              {sortedLevels.map((lvl) => {
                const isSelected = selectedLevel === lvl.level;
                return (
                  <tr
                    key={lvl.level}
                    onClick={() => onSelectLevel && onSelectLevel(lvl.level)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/15 text-stone-100 font-medium'
                        : 'hover:bg-stone-900/50'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/40'
                            : 'bg-stone-800 text-stone-300 border border-stone-700/60'
                        }`}
                      >
                        {lvl.level}
                      </span>
                    </td>

                    {hasHp && (
                      <td className="py-3.5 px-4 font-mono font-medium text-emerald-300">
                        {lvl.hitpoints ? new Intl.NumberFormat().format(lvl.hitpoints) : '—'}
                      </td>
                    )}

                    {hasDps && (
                      <td className="py-3.5 px-4 font-mono font-medium text-amber-300">
                        {lvl.damagePerSecond ? new Intl.NumberFormat().format(lvl.damagePerSecond) : '—'}
                      </td>
                    )}

                    {hasDpa && (
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {lvl.damagePerAttack ? new Intl.NumberFormat().format(lvl.damagePerAttack) : '—'}
                      </td>
                    )}

                    {hasDamagePerShot && (
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {lvl.damagePerShot ? new Intl.NumberFormat().format(lvl.damagePerShot) : '—'}
                      </td>
                    )}

                    {hasHealing && (
                      <td className="py-3.5 px-4 font-mono text-pink-300">
                        {lvl.healingPerSecond ? `+${lvl.healingPerSecond}/s` : '—'}
                      </td>
                    )}

                    {hasBoost && (
                      <td className="py-3.5 px-4 font-mono text-amber-300">
                        {lvl.boostPercent ? `+${lvl.boostPercent}%` : '—'}
                      </td>
                    )}

                    {hasDuration && (
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {lvl.durationSeconds ? `${lvl.durationSeconds}s` : '—'}
                      </td>
                    )}

                    {hasRegen && (
                      <td className="py-3.5 px-4 font-mono text-stone-300">
                        {lvl.regenerationTimeMinutes ? `${lvl.regenerationTimeMinutes}m` : '—'}
                      </td>
                    )}

                    {hasAbility && (
                      <td className="py-3.5 px-4 font-mono text-purple-300 text-xs">
                        {lvl.abilityLevel ? `Lvl ${lvl.abilityLevel}` : (lvl.abilityName || '—')}
                      </td>
                    )}

                    <td className="py-3.5 px-4 font-mono">
                      {lvl.upgradeCost === 0 ? (
                        <span className="text-stone-500 text-xs italic">Initial / Free</span>
                      ) : (
                        <ResourceCurrencyBadge
                          currency={lvl.upgradeCurrency}
                          amount={new Intl.NumberFormat().format(lvl.upgradeCost)}
                        />
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-300 text-xs">
                      {lvl.upgradeTime || 'Instant'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700/80 text-xs font-semibold text-amber-400">
                        TH {lvl.requiredTownHall}
                      </span>
                    </td>

                    {hasLab && (
                      <td className="py-3.5 px-4 text-xs font-mono text-purple-300">
                        {lvl.requiredLaboratoryLevel !== undefined && lvl.requiredLaboratoryLevel > 0
                          ? `Lab ${lvl.requiredLaboratoryLevel}`
                          : '—'}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile & Tablet Card List View */}
      <div className="block lg:hidden space-y-3">
        {sortedLevels.map((lvl) => {
          const isSelected = selectedLevel === lvl.level;
          return (
            <div
              key={lvl.level}
              onClick={() => onSelectLevel && onSelectLevel(lvl.level)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500/50 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                  : 'border-stone-800 bg-stone-950/60 hover:bg-stone-900/40'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
                    L{lvl.level}
                  </span>
                  <span className="font-bold text-stone-100">{entityName} Level {lvl.level}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-amber-400 font-semibold">
                  TH {lvl.requiredTownHall}
                </span>
              </div>

              {/* Mobile Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                {lvl.hitpoints !== undefined && (
                  <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px] uppercase">Hitpoints</span>
                    <span className="font-mono font-bold text-emerald-300">{new Intl.NumberFormat().format(lvl.hitpoints)}</span>
                  </div>
                )}
                {lvl.damagePerSecond !== undefined && (
                  <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px] uppercase">DPS</span>
                    <span className="font-mono font-bold text-amber-300">{lvl.damagePerSecond}</span>
                  </div>
                )}
                {lvl.damagePerAttack !== undefined && (
                  <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px] uppercase">Damage / Attack</span>
                    <span className="font-mono font-bold text-stone-200">{lvl.damagePerAttack}</span>
                  </div>
                )}
                {lvl.durationSeconds !== undefined && (
                  <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                    <span className="text-stone-400 block text-[10px] uppercase">Duration</span>
                    <span className="font-mono font-bold text-stone-200">{lvl.durationSeconds}s</span>
                  </div>
                )}
                <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 block text-[10px] uppercase">Upgrade Time</span>
                  <span className="font-mono text-stone-200">{lvl.upgradeTime || 'Instant'}</span>
                </div>
                <div className="bg-stone-900/70 p-2 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 block text-[10px] uppercase">Cost</span>
                  <span className="font-mono text-amber-300">
                    {lvl.upgradeCost === 0 ? 'Free' : new Intl.NumberFormat().format(lvl.upgradeCost)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
