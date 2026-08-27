import React, { useState } from 'react';
import { EntityService } from '../../services/entityService';
import { CalculatorService } from '../../services/calculatorService';
import { ResourceCurrencyBadge } from '../ui/Badge';
import { Calculator, Sparkles, Clock, Coins, CheckCircle, Percent } from 'lucide-react';

export const UpgradeCalculator: React.FC = () => {
  const allEntities = EntityService.getAllEntities().filter(
    (e) => (e as { upgradeLevels?: unknown[] }).upgradeLevels && ((e as { upgradeLevels?: unknown[] }).upgradeLevels?.length || 0) > 1
  );

  const [selectedSlug, setSelectedSlug] = useState<string>('barbarian');
  const [fromLevel, setFromLevel] = useState<number>(1);
  const [toLevel, setToLevel] = useState<number>(12);
  const [goldPassBoost, setGoldPassBoost] = useState<number>(20); // 0, 10, 15, 20

  const selectedEntity = allEntities.find((e) => e.slug === selectedSlug) || allEntities[0];
  const maxAvailableLevel = selectedEntity?.maxLevel || 1;

  const result = CalculatorService.calculateUpgrade(
    selectedEntity,
    fromLevel,
    toLevel,
    goldPassBoost
  );

  const handleEntityChange = (slug: string) => {
    setSelectedSlug(slug);
    const entity = allEntities.find((e) => e.slug === slug);
    if (entity) {
      setFromLevel(1);
      setToLevel(entity.maxLevel);
    }
  };

  return (
    <div className="rounded-3xl border border-stone-800 bg-[#0E121B]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Progression Estimator</span>
        </div>
        <h2 className="text-2xl font-bold font-display text-stone-100 mt-1">
          Upgrade Cost &amp; Time Calculator
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Calculate cumulative resource investment and laboratory / builder time across any level range, with optional Gold Pass discounts.
        </p>
      </div>

      {/* Control Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Select Entity */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
            Target Entity
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => handleEntityChange(e.target.value)}
            aria-label="Select Target Entity"
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
          >
            {allEntities.map((e) => (
              <option key={e.id} value={e.slug}>
                {e.name} (Max L{e.maxLevel})
              </option>
            ))}
          </select>
        </div>

        {/* From Level */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
            Current Level ({fromLevel})
          </label>
          <input
            type="range"
            min={1}
            max={Math.max(1, toLevel - 1)}
            value={fromLevel}
            onChange={(e) => setFromLevel(Number(e.target.value))}
            aria-label="Current Level"
            className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* To Level */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
            Target Level ({toLevel})
          </label>
          <input
            type="range"
            min={Math.min(fromLevel + 1, maxAvailableLevel)}
            max={maxAvailableLevel}
            value={toLevel}
            onChange={(e) => setToLevel(Number(e.target.value))}
            aria-label="Target Level"
            className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Gold Pass Boost */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
            Gold Pass Boost
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[0, 10, 15, 20].map((percent) => (
              <button
                key={percent}
                onClick={() => setGoldPassBoost(percent)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  goldPassBoost === percent
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Cost */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-medium text-amber-400 block">Total Resource Cost</span>
            <span className="text-2xl font-bold font-display text-stone-100 mt-1 block">
              {new Intl.NumberFormat().format(result.totalCost)}
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5 block capitalize">
              Currency: {result.currency.replace('_', ' ')}
            </span>
          </div>
          <Coins className="w-8 h-8 text-amber-400 opacity-80" />
        </div>

        {/* Total Time */}
        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-medium text-purple-400 block">Total Upgrade Time</span>
            <span className="text-2xl font-bold font-display text-stone-100 mt-1 block">
              {result.totalTimeFormatted}
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              Across {result.levelSteps.length} Upgrade Milestones
            </span>
          </div>
          <Clock className="w-8 h-8 text-purple-400 opacity-80" />
        </div>

        {/* Gold Pass Savings */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-medium text-emerald-400 block">Pass Discount Saved</span>
            <span className="text-2xl font-bold font-display text-emerald-300 mt-1 block">
              {goldPassBoost > 0 ? `-${new Intl.NumberFormat().format(result.savedCost)}` : '0'}
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5 block">
              {goldPassBoost}% Builder &amp; Lab Boost Active
            </span>
          </div>
          <Percent className="w-8 h-8 text-emerald-400 opacity-80" />
        </div>
      </div>

      {/* Step by Step Breakdown Table */}
      {result.levelSteps.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
            Step-by-Step Level Progression
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/60">
            <table className="w-full text-left text-sm text-stone-300">
              <thead className="bg-stone-900/80 text-xs uppercase text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="py-3 px-4">Upgrade Step</th>
                  <th className="py-3 px-4">Required TH</th>
                  <th className="py-3 px-4">Discounted Cost</th>
                  <th className="py-3 px-4">Discounted Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono text-xs">
                {result.levelSteps.map((step) => (
                  <tr key={step.to} className="hover:bg-stone-900/40">
                    <td className="py-3 px-4 font-semibold text-stone-200">
                      Level {step.from} &rarr; Level {step.to}
                    </td>
                    <td className="py-3 px-4 text-amber-400">
                      TH {step.thRequired}
                    </td>
                    <td className="py-3 px-4 text-stone-100 font-bold">
                      {new Intl.NumberFormat().format(step.cost)}
                    </td>
                    <td className="py-3 px-4 text-stone-300">
                      {step.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
