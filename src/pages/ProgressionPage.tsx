import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { ProgressionService } from '../services/progressionService';
import { Badge } from '../components/ui/Badge';
import { Crown, Shield, Sparkles, Building, ChevronRight, Layers, ArrowRight } from 'lucide-react';

export const ProgressionPage: React.FC = () => {
  const townHalls = ProgressionService.getAllTownHalls();
  const [selectedThLevel, setSelectedThLevel] = useState<number>(17);

  const selectedTh = townHalls.find((th) => th.level === selectedThLevel) || townHalls[townHalls.length - 1];

  const breadcrumbs = [
    { label: 'Town Hall Progression', path: '/progression' },
    { label: `Town Hall ${selectedThLevel}` }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#161C2C] via-[#0E131E] to-[#07090E] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm">
            <Crown className="w-3.5 h-3.5" /> Progression Matrix
          </Badge>
          <span className="text-xs text-stone-400 font-mono">Town Hall 1 &rarr; Town Hall 17</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-100">
          Town Hall Progression &amp; Unlocks
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Track building unlocks, hero level caps, laboratory limits, and defense milestones for every Town Hall level in Clash of Clans.
        </p>
      </div>

      {/* 2. Town Hall Selector Buttons */}
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {townHalls.map((th) => (
            <button
              key={th.level}
              onClick={() => setSelectedThLevel(th.level)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-display border transition-all ${
                selectedThLevel === th.level
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
            >
              TH {th.level}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Selected Town Hall Showcase */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Summary Card (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#151C2C] to-[#0B0E14] shadow-2xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Town Hall Level {selectedTh.level}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-stone-100 mt-1">
              {selectedTh.name}
            </h2>
            <p className="text-xs text-amber-300/90 font-medium mt-0.5">
              Theme: {selectedTh.theme}
            </p>
            <p className="mt-3 text-xs text-stone-400 leading-relaxed">
              {selectedTh.strategyFocus}
            </p>
          </div>

          {/* Key Milestones Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Signature Defense</span>
              <span className="font-bold text-amber-300 mt-0.5 block truncate">{selectedTh.signatureDefense}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Max Lab Level</span>
              <span className="font-bold text-purple-300 mt-0.5 block">
                {selectedTh.maxLaboratoryLevel > 0 ? `Level ${selectedTh.maxLaboratoryLevel}` : 'None'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Gold / Elixir Cap</span>
              <span className="font-mono text-stone-200 mt-0.5 block">{selectedTh.goldStorageCap}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Dark Elixir Cap</span>
              <span className="font-mono text-purple-300 mt-0.5 block">{selectedTh.darkElixirStorageCap}</span>
            </div>
          </div>

          {/* Hero Caps */}
          {Object.keys(selectedTh.maxHeroLevels).length > 0 && (
            <div className="pt-4 border-t border-stone-800/80 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                Hero Level Caps at TH {selectedTh.level}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {selectedTh.maxHeroLevels.barbarianKing && (
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex justify-between">
                    <span className="text-stone-400">King</span>
                    <span className="text-amber-400 font-bold">Lvl {selectedTh.maxHeroLevels.barbarianKing}</span>
                  </div>
                )}
                {selectedTh.maxHeroLevels.archerQueen && (
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex justify-between">
                    <span className="text-stone-400">Queen</span>
                    <span className="text-purple-400 font-bold">Lvl {selectedTh.maxHeroLevels.archerQueen}</span>
                  </div>
                )}
                {selectedTh.maxHeroLevels.grandWarden && (
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex justify-between">
                    <span className="text-stone-400">Warden</span>
                    <span className="text-blue-400 font-bold">Lvl {selectedTh.maxHeroLevels.grandWarden}</span>
                  </div>
                )}
                {selectedTh.maxHeroLevels.royalChampion && (
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex justify-between">
                    <span className="text-stone-400">Champion</span>
                    <span className="text-emerald-400 font-bold">Lvl {selectedTh.maxHeroLevels.royalChampion}</span>
                  </div>
                )}
                {selectedTh.maxHeroLevels.minionPrince && (
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex justify-between">
                    <span className="text-stone-400">Minion Prince</span>
                    <span className="text-cyan-400 font-bold">Lvl {selectedTh.maxHeroLevels.minionPrince}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Unlocks List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-stone-100">
              New Content &amp; Unlocks at TH {selectedTh.level}
            </h3>
            <span className="text-xs text-stone-400">{selectedTh.keyUnlocks.length} Unlocked Items</span>
          </div>

          <div className="space-y-3">
            {selectedTh.keyUnlocks.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex items-center justify-between hover:border-amber-500/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-100">{item.name}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">{item.description}</p>
                </div>

                <Link
                  to={`/${item.category.toLowerCase()}s/${item.slug}`}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-amber-500/20 text-stone-400 hover:text-amber-300 transition-colors ml-4 shrink-0"
                  title={`View ${item.name} details`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
