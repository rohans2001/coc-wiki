import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Shield, Sparkles, Zap, Heart, CheckCircle, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'About Clash Archive' }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#141A28] via-[#0E131E] to-[#07090E] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm">
            <Shield className="w-3.5 h-3.5" /> Project Vision
          </Badge>
          <span className="text-xs text-stone-400 font-mono">Independent Fan Knowledge Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-100">
          About Clash Archive
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Everything you need to know about Clash of Clans, crafted with modern web technologies, ultra-fast search, and deep structured game data.
        </p>
      </div>

      {/* Main Story & Values */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-stone-300 text-sm leading-relaxed">
          <div className="p-6 rounded-3xl border border-stone-800 bg-stone-900/40 space-y-4">
            <h2 className="text-xl font-bold font-display text-stone-100">
              Why Clash Archive Exists
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Traditional gaming wikis have grown sluggish, ad-bloated, and visually cluttered. Finding basic stats like level upgrade costs, hero equipment scaling, or Town Hall unlock requirements often meant wading through slow page loads and intrusive banner scripts.
            </p>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              <strong>Clash Archive</strong> was designed from scratch to be the ultimate companion experience: an original, dark obsidian gaming interface that loads instantaneously, highlights exact statistical curves, and empowers clashers to plan attacks with precision.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-stone-800 bg-stone-900/40 space-y-4">
            <h2 className="text-xl font-bold font-display text-stone-100">
              Core Principles
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">Blistering Speed</h4>
                  <p className="text-xs text-stone-400">Zero unnecessary bloat. Client-side caching and indexed search deliver stats in milliseconds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">Structured Data First</h4>
                  <p className="text-xs text-stone-400">Every stat is typed and validated, enabling dynamic comparison tools and progression calculators.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">Modern Gaming Aesthetic</h4>
                  <p className="text-xs text-stone-400">Dark obsidian stone, warm gold trims, and smooth micro-animations inspired by the Clash universe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Disclaimer & Policy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-stone-800 bg-stone-950/80 shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Legal &amp; Fan Policy Compliance
            </span>
            <h3 className="text-lg font-bold font-display text-stone-100">
              Supercell Fan Content Disclaimer
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              This material is unofficial and is not endorsed by Supercell. For more information see Supercell&apos;s Fan Content Policy:
            </p>
            <a
              href="https://supercell.com/en/fan-content-policy/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-amber-300 transition-colors"
            >
              <span>Read Supercell Fan Content Policy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 leading-relaxed">
              Clash of Clans and its respective logos and game art are trademarks of Supercell Oy.
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
