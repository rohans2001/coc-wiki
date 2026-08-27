import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Shield, ChevronDown, Sparkles, Crown, Users, Hammer, Footprints, Truck, Coins, BookOpen, Scale, Calculator, Info, Database } from 'lucide-react';
import { SearchModal } from '../ui/SearchModal';

export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, [location.pathname]);

  // Global Keyboard shortcut: Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Troops', path: '/troops' },
    { name: 'Heroes', path: '/heroes' },
    { name: 'Defenses', path: '/defenses' },
    { name: 'Spells', path: '/spells' },
    { name: 'Equipment', path: '/equipment' },
  ];

  const moreLinks = [
    { name: 'Town Hall Progression', path: '/progression', icon: <Crown className="w-4 h-4 text-amber-400" /> },
    { name: 'Hero Pets', path: '/pets', icon: <Footprints className="w-4 h-4 text-teal-400" /> },
    { name: 'Siege Machines', path: '/siege-machines', icon: <Truck className="w-4 h-4 text-orange-400" /> },
    { name: 'Resources & Ores', path: '/resources', icon: <Coins className="w-4 h-4 text-yellow-400" /> },
    { name: 'Game Mechanics', path: '/mechanics', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { name: 'Unit Comparison Tool', path: '/compare', icon: <Scale className="w-4 h-4 text-emerald-400" /> },
    { name: 'Upgrade Calculator', path: '/calculators', icon: <Calculator className="w-4 h-4 text-purple-400" /> },
    { name: 'Data Architecture & Sources', path: '/data-sources', icon: <Info className="w-4 h-4 text-blue-400" /> },
    { name: 'About Clash Archive', path: '/about', icon: <Shield className="w-4 h-4 text-stone-400" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-[#07090E]/90 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2638] to-[#0D121D] border border-amber-500/40 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all">
                <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping opacity-75" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black font-display tracking-tight text-stone-100 flex items-center gap-1">
                  CLASH <span className="text-gold-gradient">ARCHIVE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 -mt-1 hidden sm:block">
                  Knowledge Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* More Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-800/50 transition-all"
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0F1420] border border-stone-700/80 shadow-2xl p-2 z-50 animate-fadeIn divide-y divide-stone-800/60">
                    <div className="space-y-1 pb-1.5">
                      {moreLinks.slice(0, 5).map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-300 hover:bg-stone-800/70 transition-colors"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-1 pt-1.5">
                      {moreLinks.slice(5).map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-200 hover:text-amber-300 hover:bg-stone-800/70 transition-colors"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action: Search Trigger & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/40 text-stone-300 hover:text-stone-100 transition-all text-xs sm:text-sm shadow-inner"
              >
                <Search className="w-4 h-4 text-amber-400/90" />
                <span className="hidden md:inline">Quick Search...</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-950 rounded border border-stone-800">
                  Ctrl+K
                </kbd>
              </button>

              {/* Mobile Drawer Trigger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-800 bg-[#0A0D15]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Quick Search inside Mobile Nav */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-300"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" /> Search encyclopedia...
              </span>
              <span className="text-xs text-amber-400 font-mono">Cmd+K</span>
            </button>

            {/* Core Category Nav */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-3 block mb-1">
                Main Categories
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* More Features Nav */}
            <div className="space-y-1 pt-2 border-t border-stone-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-3 block mb-1">
                Tools &amp; Progression
              </span>
              {moreLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-300 hover:bg-stone-900"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
