import React from 'react';
import { ShieldCheck, ExternalLink, Calendar, Scale } from 'lucide-react';
import { DataProvenance } from '../../types/entity';

interface SourceAttributionProps {
  provenance?: DataProvenance;
  lastUpdated?: string;
  className?: string;
}

export const SourceAttribution: React.FC<SourceAttributionProps> = ({
  provenance,
  lastUpdated,
  className = ''
}) => {
  const sourceName = provenance?.sourceName || 'Clash of Clans Official Verified Dataset';
  const sourceUrl = provenance?.sourceUrl || 'https://supercell.com/en/games/clashofclans/';
  const license = provenance?.license || 'Fair Use / Supercell Fan Content Policy';
  const attribution = provenance?.attribution || 'Supercell Oy & Clash Archive Database';
  const verifiedDate = provenance?.lastVerifiedAt || lastUpdated || '2026-08-27';

  const formattedDate = new Date(verifiedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <section
      className={`rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-950/90 via-[#0A0D15] to-stone-950/90 p-4 sm:p-5 text-xs text-stone-400 font-sans shadow-lg ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-stone-200 block text-xs">
              Verified Data Provenance
            </span>
            <span className="text-[11px] text-stone-400">
              {sourceName}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1 text-stone-400">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Verified: {formattedDate}</span>
          </div>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700/60 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Supercell Official</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-stone-400">
        <div className="flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>License: <strong className="text-stone-300 font-normal">{license}</strong></span>
        </div>
        <div className="italic text-[10px] text-stone-400">
          {attribution}
        </div>
      </div>
    </section>
  );
};
