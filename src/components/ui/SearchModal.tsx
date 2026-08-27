import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft, Sparkles, Shield, Crown, Users, Hammer, Footprints, Truck, BookOpen, Loader2 } from 'lucide-react';
import { SearchService } from '../../services/searchService';
import { SearchResult } from '../../types/search';
import { EntityType } from '../../types/entity';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const popularSearches = SearchService.getPopularSearches();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(() => {
      const searchResults = SearchService.search(query);
      setResults(searchResults);
      setSelectedIndex(0);
      setIsSearching(false);
    }, 120);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSelect = (category: EntityType, slug: string) => {
    const routeCategory =
      category === 'defense' || category === 'building'
        ? 'defenses'
        : category === 'hero'
        ? 'heroes'
        : category === 'siege'
        ? 'siege-machines'
        : `${category}s`;
    navigate(`/${routeCategory}/${slug}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        const item = results[selectedIndex];
        handleSelect(item.category, item.entity.slug);
      }
    }
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category: EntityType) => {
    switch (category) {
      case 'troop': return <Users className="w-4 h-4 text-amber-400" />;
      case 'hero': return <Crown className="w-4 h-4 text-purple-400" />;
      case 'defense': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'spell': return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'equipment': return <Hammer className="w-4 h-4 text-emerald-400" />;
      case 'pet': return <Footprints className="w-4 h-4 text-teal-400" />;
      case 'siege': return <Truck className="w-4 h-4 text-orange-400" />;
      default: return <BookOpen className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog */}
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0F131C] border border-stone-700/60 shadow-2xl shadow-black/90 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-stone-800 bg-stone-900/40">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-amber-400 mr-3 shrink-0 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-amber-400/80 mr-3 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search troops, heroes, defenses, spells, equipment..."
            className="w-full bg-transparent text-stone-100 placeholder:text-stone-500 text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs text-stone-400 bg-stone-800 border border-stone-700 rounded font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Content Body */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-stone-800/40">
          {query.trim() === '' ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => {
                      navigate(`/${item.category}/${item.slug}`);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700/50 text-sm text-stone-200 hover:text-amber-300 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 opacity-60" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 px-2 flex items-center justify-between">
                <span>Results ({results.length})</span>
                <span className="text-[10px] text-stone-500 font-mono">Ranked by Match Quality</span>
              </div>
              {results.map((result, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={result.entity.id}
                    onClick={() => handleSelect(result.category, result.entity.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border border-amber-500/40 text-amber-200'
                        : 'hover:bg-stone-800/60 text-stone-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-stone-800/90 border border-stone-700/50">
                        {getCategoryIcon(result.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-100 truncate">
                            {result.entity.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700/40 capitalize shrink-0">
                            {result.category}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 truncate mt-0.5">
                          {result.entity.tagline || result.entity.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-2 shrink-0">
                      <span className="text-xs text-stone-400 font-mono">
                        TH {result.entity.unlockTownHall}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-amber-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : !isSearching ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <p className="text-base font-medium text-stone-300">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-500">Try searching for &quot;Barbarian&quot;, &quot;Queen&quot;, &quot;Inferno&quot;, &quot;TH17&quot;, or &quot;Rage&quot;</p>
            </div>
          ) : null}
        </div>

        {/* Modal Footer Key Hints */}
        <div className="px-4 py-2.5 bg-stone-950/60 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700">↓</kbd>
              <span className="font-sans">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700">↵</kbd>
              <span className="font-sans">Select</span>
            </span>
          </div>
          <span>Database Search Ready</span>
        </div>
      </div>
    </div>
  );
};
