import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Database, GitFork, ArrowDown, CheckCircle, ShieldCheck, FileCode, Server, Layers } from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Data Architecture & Sources' }
  ];

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#141A28] via-[#0E131E] to-[#07090E] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="gold" size="sm">
            <Database className="w-3.5 h-3.5" /> Technical Architecture
          </Badge>
          <span className="text-xs text-stone-400 font-mono">Data Pipeline &amp; Provenance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-100">
          Data Architecture &amp; Ingestion Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          How Clash Archive structures, validates, and manages game statistics from verified sources to guarantee speed, consistency, and accuracy.
        </p>
      </div>

      {/* 1. Visual Pipeline Flowchart */}
      <div className="mt-10 p-6 sm:p-10 rounded-3xl border border-stone-800 bg-[#0E131E]/90 shadow-2xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display text-stone-100">
            Planned Automated Ingestion Pipeline
          </h2>
          <p className="text-xs text-stone-400">
            A resilient multi-stage pipeline ensuring strict schema integrity and automated regression checks.
          </p>
        </div>

        {/* Vertical Pipeline Steps */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">1. Approved Data Sources</h4>
                <p className="text-xs text-stone-400">Official Supercell game archives, verified community datasets, and API endpoints.</p>
              </div>
            </div>
            <Badge variant="gold" size="sm">Input</Badge>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-stone-600" /></div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-800 text-stone-300">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">2. Fetcher &amp; Importer</h4>
                <p className="text-xs text-stone-400">Scheduled batch workers fetch latest patch tables and balance updates.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-stone-500">Automated</span>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-stone-600" /></div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-800 text-purple-400">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">3. Parser &amp; Normalizer</h4>
                <p className="text-xs text-stone-400">Maps raw game values into universal TypeScript models (`BaseEntity`, `UpgradeLevel`).</p>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-400">Transform</span>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-stone-600" /></div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">4. Schema Validation &amp; Auditing</h4>
                <p className="text-xs text-stone-400">Zod schema validator checks required fields, non-null DPS, and upgrade curve consistency.</p>
              </div>
            </div>
            <Badge variant="emerald" size="sm">Valid</Badge>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-stone-600" /></div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-stone-800 text-blue-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">5. PostgreSQL Database &amp; Edge API</h4>
                <p className="text-xs text-stone-400">Stores structured records with full provenance metadata and provides cached REST/GraphQL endpoints.</p>
              </div>
            </div>
            <span className="text-xs font-mono text-blue-400">Storage</span>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-stone-600" /></div>

          {/* Step 6 */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">6. Clash Archive Frontend</h4>
                <p className="text-xs text-amber-200/90">Instant client rendering, command palette search, and interactive upgrade calculators.</p>
              </div>
            </div>
            <Badge variant="gold" size="sm">Live</Badge>
          </div>
        </div>
      </div>

      {/* 2. Metadata & Provenance Specification */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border border-stone-800 bg-stone-900/40 space-y-4">
          <h3 className="text-lg font-bold font-display text-stone-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-amber-400" />
            <span>Structured Provenance Metadata</span>
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Every record imported and displayed within Clash Archive includes immutable provenance attributes:
          </p>
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 space-y-1">
            <div><span className="text-amber-400">sourceName</span>: string;</div>
            <div><span className="text-amber-400">sourceUrl</span>: string;</div>
            <div><span className="text-amber-400">license</span>: string;</div>
            <div><span className="text-amber-400">attribution</span>: string;</div>
            <div><span className="text-amber-400">retrievedAt</span>: ISO8601;</div>
            <div><span className="text-amber-400">lastVerifiedAt</span>: ISO8601;</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-stone-800 bg-stone-900/40 space-y-4">
          <h3 className="text-lg font-bold font-display text-stone-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Responsible Data Policies</span>
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Clash Archive adheres strictly to ethical data ingestion guidelines:
          </p>
          <ul className="space-y-2 text-xs text-stone-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">&check;</span>
              <span>No bypass of access controls or automated scraping against terms of service.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">&check;</span>
              <span>Full compliance with the Supercell Fan Content Policy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">&check;</span>
              <span>Open data schemas accessible for community tooling and companion developers.</span>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
};
