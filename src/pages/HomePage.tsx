import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { CategoryCard } from '../components/cards/CategoryCard';
import { EntityCard } from '../components/cards/EntityCard';
import { EntityService } from '../services/entityService';
import { CategoryService } from '../services/categories/categoryService';
import { SearchService } from '../services/searchService';
import { 
  Search, Sparkles, Shield, Crown, Zap, ArrowRight, Activity, 
  Flame, ChevronRight, Scale, Layers, Clock, Calendar, CheckCircle2 
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const platformStats = EntityService.getPlatformStats();
  const { featuredTroops, featuredHeroes } = EntityService.getFeaturedEntities();
  const recentlyUpdated = EntityService.getRecentlyUpdatedEntities(4);
  const popularSearches = SearchService.getPopularSearches();
  const categoryCounts = CategoryService.getCategoryCounts();
  const categories = CategoryService.getCategoryMetas().map((cat) => ({
    ...cat,
    itemCount: categoryCounts[cat.type] || cat.itemCount
  }));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/troops?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getRouteCategory = (cat: string) => {
    if (cat === 'defense' || cat === 'building') return 'defenses';
    if (cat === 'siege') return 'siege-machines';
    return `${cat}s`;
  };

  return (
    <PageContainer>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#111622] via-[#0D1017] to-[#07090E] p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background Atmosphere Accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Database-Driven • Updated for Town Hall 17</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-stone-100 leading-[1.1]">
            The Ultimate <span className="text-gold-gradient">Clash</span> Knowledge Base
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Explore structured, high-speed statistics for every troop, hero, defense, spell, and equipment in Clash of Clans. Level-by-level stats, upgrade costs, and tactical synergies.
          </p>

          {/* Prominent Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-amber-400/80" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Barbarian, Archer Queen, Inferno Tower, TH17..."
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-stone-100 placeholder:text-stone-500 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-2xl transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Quick Searches */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
            <span className="font-semibold text-stone-400 mr-1">Popular:</span>
            {popularSearches.slice(0, 6).map((item) => (
              <Link
                key={item.slug}
                to={`/${item.category}/${item.slug}`}
                className="px-2.5 py-1 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. QUICK PLATFORM STATISTICS (Dynamic) */}
      <section className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/40 border border-stone-800/80 text-center">
          <span className="text-xs uppercase font-medium text-stone-400 block">Total Entities</span>
          <span className="text-2xl sm:text-3xl font-black font-display text-amber-400 mt-1 block">
            {platformStats.totalEntities}+
          </span>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Indexed across {categories.length} categories</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/40 border border-stone-800/80 text-center">
          <span className="text-xs uppercase font-medium text-stone-400 block">Heroes &amp; Troops</span>
          <span className="text-2xl sm:text-3xl font-black font-display text-purple-400 mt-1 block">
            {platformStats.totalHeroes + platformStats.totalTroops}
          </span>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Full upgrade curves</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/40 border border-stone-800/80 text-center">
          <span className="text-xs uppercase font-medium text-stone-400 block">Defenses &amp; Spells</span>
          <span className="text-2xl sm:text-3xl font-black font-display text-blue-400 mt-1 block">
            {platformStats.totalDefenses + platformStats.totalSpells}
          </span>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Giga weapons &amp; stats</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/40 border border-stone-800/80 text-center">
          <span className="text-xs uppercase font-medium text-stone-400 block">Max Town Hall</span>
          <span className="text-2xl sm:text-3xl font-black font-display text-emerald-400 mt-1 block">
            TH {platformStats.maxTownHall}
          </span>
          <span className="text-[11px] text-stone-400 mt-0.5 block">Complete TH1-17 unlocks</span>
        </div>
      </section>

      {/* 3. BROWSE CATEGORIES (Dynamic Counts) */}
      <section className="mt-16 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-100 mt-1">
              Browse Clash Encyclopedia
            </h2>
          </div>
          <span className="text-xs text-stone-400 hidden sm:block">
            Structured data across all game aspects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.type} category={category} />
          ))}
        </div>
      </section>

      {/* 4. RECENTLY UPDATED SECTION (NEW & Dynamic) */}
      {recentlyUpdated.length > 0 && (
        <section className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                <Clock className="w-4 h-4" />
                <span>Live Database Feed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-100 mt-1">
                Recently Updated Entities
              </h2>
            </div>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Automatically synced with latest game patches
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyUpdated.map((item) => (
              <Link
                key={item.id}
                to={`/${getRouteCategory(item.category)}/${item.slug}`}
                className="p-5 rounded-2xl bg-[#0E131E]/90 border border-stone-800/90 hover:border-amber-500/40 hover:bg-[#131826] transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      TH {item.unlockTownHall}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-100 group-hover:text-amber-300 transition-colors text-base font-display">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. FEATURED TROOPS SPOTLIGHT */}
      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <Flame className="w-4 h-4" />
              <span>Troop Roster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-100 mt-1">
              Featured Troops
            </h2>
          </div>
          <Link
            to="/troops"
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Troops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredTroops.map((troop) => (
            <EntityCard key={troop.id} entity={troop} featured={troop.slug === 'barbarian'} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED HEROES */}
      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs tracking-wider uppercase">
              <Crown className="w-4 h-4" />
              <span>Royal Commanders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-100 mt-1">
              Featured Heroes
            </h2>
          </div>
          <Link
            to="/heroes"
            className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View All Heroes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredHeroes.map((hero) => (
            <EntityCard key={hero.id} entity={hero} featured={hero.slug === 'archer-queen'} />
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE TOOLS TEASER BANNER */}
      <section className="mt-16 rounded-3xl border border-stone-800 bg-gradient-to-r from-[#151C2C] via-[#0E131E] to-[#121624] p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="emerald" size="md">
              <Scale className="w-3.5 h-3.5" /> Unit vs Unit Comparison
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-100">
              Compare Units, DPS, and Upgrade Investment Side-by-Side
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Wondering if Barbarians or Archers deliver higher DPS per housing space? Want to evaluate how Inferno Tower single-mode scales against hero HP? Use our real-time comparison engine.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/compare"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                Launch Comparison Tool
              </Link>
              <Link
                to="/calculators"
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                Upgrade Calculator
              </Link>
            </div>
          </div>

          {/* Quick visual preview card */}
          <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-stone-400">
              <span>Metric</span>
              <span className="text-amber-400">Barbarian L12</span>
              <span className="text-purple-400">Archer L12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Damage / Sec</span>
              <span className="font-bold text-amber-300">70 DPS</span>
              <span className="font-bold text-purple-300">64 DPS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Hitpoints</span>
              <span className="font-bold text-amber-300">260 HP</span>
              <span className="font-bold text-purple-300">102 HP</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Range</span>
              <span className="text-stone-300">0.4 tiles (Melee)</span>
              <span className="text-stone-300">3.5 tiles (Ranged)</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-800">
              <span className="text-stone-400">Target Type</span>
              <span className="text-stone-300">Ground</span>
              <span className="text-stone-300">Ground &amp; Air</span>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
