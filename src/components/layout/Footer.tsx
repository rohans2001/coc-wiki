import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-800 bg-[#05070B] text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & About */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-900 border border-amber-500/40">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-bold font-display text-stone-100 text-base">
                CLASH <span className="text-gold-gradient">ARCHIVE</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              The modern, high-speed Clash of Clans encyclopedia and tactical knowledge platform.
            </p>
            <div className="text-xs text-amber-400/90 font-medium">
              &ldquo;Everything you need to know about Clash.&rdquo;
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Encyclopedia
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/troops" className="hover:text-amber-400 transition-colors">Troops &amp; Super Troops</Link></li>
              <li><Link to="/heroes" className="hover:text-amber-400 transition-colors">Heroes &amp; Abilities</Link></li>
              <li><Link to="/defenses" className="hover:text-amber-400 transition-colors">Defenses &amp; Town Halls</Link></li>
              <li><Link to="/spells" className="hover:text-amber-400 transition-colors">Elixir &amp; Dark Spells</Link></li>
              <li><Link to="/equipment" className="hover:text-amber-400 transition-colors">Hero Equipment &amp; Ores</Link></li>
              <li><Link to="/pets" className="hover:text-amber-400 transition-colors">Hero Pets</Link></li>
            </ul>
          </div>

          {/* Tools & Planning */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Tools &amp; Progression
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/progression" className="hover:text-amber-400 transition-colors">Town Hall 1-17 Roadmap</Link></li>
              <li><Link to="/compare" className="hover:text-amber-400 transition-colors">Unit Comparison Matrix</Link></li>
              <li><Link to="/calculators" className="hover:text-amber-400 transition-colors">Upgrade Cost Calculator</Link></li>
              <li><Link to="/mechanics" className="hover:text-amber-400 transition-colors">Shield &amp; War Mechanics</Link></li>
              <li><Link to="/siege-machines" className="hover:text-amber-400 transition-colors">Siege Workshop Vehicles</Link></li>
            </ul>
          </div>

          {/* Architecture & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Platform &amp; Data
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/data-sources" className="hover:text-amber-400 transition-colors">Data Ingestion Architecture</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Clash Archive</Link></li>
              <li>
                <a
                  href="https://supercell.com/en/fan-content-policy/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>Supercell Fan Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-center sm:text-left leading-relaxed max-w-2xl">
            Clash Archive is an independent fan-made knowledge resource and is not affiliated with, endorsed, sponsored, or specifically approved by Supercell. Supercell is not responsible for the operation or content of this site.
          </p>
          <div className="shrink-0 flex items-center gap-1 text-stone-400">
            <span>Crafted for Clashers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
