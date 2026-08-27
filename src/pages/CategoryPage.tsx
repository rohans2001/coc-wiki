import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { EntityService } from '../services/entityService';
import { CATEGORIES } from '../data/categories';
import { EntityCard } from '../components/cards/EntityCard';
import { EntityType, TroopEntity, HeroEntity, DefenseEntity } from '../types/entity';
import { SortField, SortDirection } from '../types/search';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface CategoryPageProps {
  categoryType: EntityType;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryType }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [townHallFilter, setTownHallFilter] = useState<string>('all');
  const [targetTypeFilter, setTargetTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortField>('unlockTownHall');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categoryMeta = CATEGORIES.find((c) => c.type === categoryType) || CATEGORIES[0];

  const entities = useMemo(() => {
    return EntityService.getEntitiesByCategory(categoryType, {
      searchQuery,
      townHallLevel: townHallFilter === 'all' ? 'all' : Number(townHallFilter),
      targetType: targetTypeFilter === 'all' ? 'all' : targetTypeFilter,
      sortBy,
      sortDirection
    });
  }, [categoryType, searchQuery, townHallFilter, targetTypeFilter, sortBy, sortDirection]);

  const breadcrumbs = [
    { label: categoryMeta.pluralName, path: categoryMeta.path }
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setTownHallFilter('all');
    setTargetTypeFilter('all');
    setSortBy('unlockTownHall');
    setSortDirection('asc');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || townHallFilter !== 'all' || targetTypeFilter !== 'all';

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* 1. Category Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#141926] via-[#0E121C] to-[#07090E] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="gold" size="sm">
                Category Directory
              </Badge>
              <span className="text-xs text-stone-400 font-mono">
                {entities.length} {entities.length === 1 ? 'Entry' : 'Entries'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-100 mt-2">
              {categoryMeta.pluralName}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
              {categoryMeta.description}
            </p>
          </div>

          {/* Quick Town Hall Fast Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
            <span className="text-xs text-stone-400 mr-1 hidden lg:inline">Quick TH:</span>
            {['all', '7', '9', '11', '13', '15', '17'].map((th) => (
              <button
                key={th}
                onClick={() => setTownHallFilter(th)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  townHallFilter === th
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {th === 'all' ? 'All TH' : `TH ${th}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Search & Multi-Filter Control Bar */}
      <div className="mt-8 space-y-4">
        <div className="p-4 rounded-2xl bg-[#0C1019]/90 border border-stone-800/80 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Live Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter ${categoryMeta.pluralName.toLowerCase()} by name...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-900/90 border border-stone-700/60 text-stone-100 placeholder:text-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters & Sorting Dropdowns */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto text-xs">
            {/* Target Type Filter */}
            {(categoryType === 'troop' || categoryType === 'hero' || categoryType === 'defense') && (
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400 hidden sm:inline">Target:</span>
                <select
                  value={targetTypeFilter}
                  onChange={(e) => setTargetTypeFilter(e.target.value)}
                  aria-label="Target Type"
                  className="bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Targets</option>
                  <option value="Ground">Ground</option>
                  <option value="Air">Air</option>
                  <option value="Ground & Air">Ground &amp; Air</option>
                  <option value="Defenses">Defenses Only</option>
                </select>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortField)}
                aria-label="Sort By"
                className="bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="unlockTownHall">Unlock Town Hall</option>
                <option value="name">Name (Alphabetical)</option>
                <option value="maxLevel">Max Level</option>
                {categoryType === 'troop' && <option value="housingSpace">Housing Space</option>}
              </select>

              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-amber-400 transition-colors"
                title={`Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            {/* Grid / Table Toggle */}
            <div className="flex items-center rounded-xl bg-stone-900 border border-stone-700 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-medium">Active filters:</span>
            {searchQuery && (
              <Badge variant="gold" size="sm">
                Query: &quot;{searchQuery}&quot;
              </Badge>
            )}
            {townHallFilter !== 'all' && (
              <Badge variant="neutral" size="sm">
                Town Hall &le; {townHallFilter}
              </Badge>
            )}
            {targetTypeFilter !== 'all' && (
              <Badge variant="emerald" size="sm">
                Target: {targetTypeFilter}
              </Badge>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-amber-400 hover:underline font-semibold ml-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* 3. Entity Content: Grid vs Table View */}
      <div className="mt-8">
        {entities.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-stone-900/30 border border-stone-800 space-y-3">
            <p className="text-lg font-bold text-stone-300">No {categoryMeta.pluralName.toLowerCase()} match your filters</p>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Try adjusting your search keywords, Town Hall unlock level, or target preferences.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-amber-400 border border-stone-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {entities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} featured={entity.slug === 'barbarian'} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/60 shadow-xl">
            <table className="w-full text-left text-sm text-stone-300">
              <thead className="bg-stone-900/90 text-xs font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="py-3.5 px-4">Entity</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Unlock TH</th>
                  <th className="py-3.5 px-4">Max Level</th>
                  <th className="py-3.5 px-4">Details</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono text-xs">
                {entities.map((entity) => {
                  const getRoute = (cat: string) => {
                    if (cat === 'defense' || cat === 'building') return 'defenses';
                    if (cat === 'hero') return 'heroes';
                    if (cat === 'siege') return 'siege-machines';
                    return `${cat}s`;
                  };
                  return (
                    <tr key={entity.id} className="hover:bg-stone-900/40 transition-colors font-sans">
                      <td className="py-3.5 px-4 font-bold text-stone-100">
                        {entity.name}
                      </td>
                      <td className="py-3.5 px-4 capitalize text-stone-400">
                        {entity.category}
                      </td>
                      <td className="py-3.5 px-4 text-amber-400 font-mono">
                        TH {entity.unlockTownHall}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-purple-300">
                        Level {entity.maxLevel}
                      </td>
                      <td className="py-3.5 px-4 text-stone-400 text-xs truncate max-w-xs font-sans">
                        {entity.tagline || entity.description}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/${getRoute(entity.category)}/${entity.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                        >
                          View Stats &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
