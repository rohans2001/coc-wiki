import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { ImportService } from '../../services/imports/importService';
import {
  ImportPreviewReport,
  ImportExecutionResult,
  DbImportHistory,
  EntityChangeDiff
} from '../../imports/types/schema';
import {
  UploadCloud, FileCode, CheckCircle2, AlertTriangle, XCircle, ArrowRight,
  Database, RefreshCw, Layers, History, Shield, Play, Eye, FileText,
  Clock, Sparkles, ChevronRight, HelpCircle, ExternalLink, Lock, Unlock, KeyRound, LogOut
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Import sample dataset directly as default fallback
import sampleDataset from '../../data/sample_import_dataset.json';

export const AdminImportPage: React.FC = () => {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('clash_admin_authenticated') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Portal State
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'history'>('editor');
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(sampleDataset, null, 2));
  const [previewReport, setPreviewReport] = useState<ImportPreviewReport | null>(null);
  const [executionResult, setExecutionResult] = useState<ImportExecutionResult | null>(null);
  const [historyList, setHistoryList] = useState<DbImportHistory[]>([]);
  const [selectedDiff, setSelectedDiff] = useState<EntityChangeDiff | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');

  // Load history on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated]);

  const loadHistory = async () => {
    const list = await ImportService.getHistory();
    setHistoryList(list);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctSecret = import.meta.env.VITE_ADMIN_SECRET || 'clash_admin_2026';
    if (passkeyInput.trim() === correctSecret) {
      sessionStorage.setItem('clash_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      loadHistory();
    } else {
      setAuthError('Invalid Admin Passkey. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('clash_admin_authenticated');
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setJsonInput(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    setJsonInput(JSON.stringify(sampleDataset, null, 2));
  };

  const handleValidateAndPreview = () => {
    setIsProcessing(true);
    try {
      const parsed = JSON.parse(jsonInput);
      const preview = ImportService.preview(parsed);
      setPreviewReport(preview);
      if (preview.entityDiffs.length > 0) {
        setSelectedDiff(preview.entityDiffs[0]);
      }
      setActiveTab('preview');
    } catch (err: any) {
      alert(`Invalid JSON Syntax: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!previewReport) return;
    setIsProcessing(true);
    try {
      const parsed = JSON.parse(jsonInput);
      const result = await ImportService.execute(parsed, {
        mode: importMode,
        skipValidationErrors: true
      });
      setExecutionResult(result);
      await loadHistory();

      if (result.status === 'completed' || result.status === 'completed_with_warnings') {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      alert(`Import Execution Failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================================================================
  // 1. LOCKED AUTHENTICATION SCREEN (If Not Logged In)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <PageContainer>
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md p-8 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-2xl space-y-6 text-center">
            {/* Glowing Lock Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-400 mb-2">
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Protected Admin Gate</span>
              </div>
              <h1 className="text-2xl font-black font-display text-stone-100">
                Clash Archive Admin Access
              </h1>
              <p className="text-xs text-stone-400 mt-1">
                Enter your Admin Secret Key to access the Data Ingestion Engine and Audit Logs.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                  Admin Passkey
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5" />
                  <input
                    type="password"
                    value={passkeyInput}
                    onChange={(e) => {
                      setPasskeyInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter admin secret key..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all font-mono"
                  />
                </div>
                {authError && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Ingestion Portal</span>
              </button>
            </form>

            <div className="pt-2 text-[11px] text-stone-500 font-mono">
              Configured via <code className="text-stone-400">VITE_ADMIN_SECRET</code> in .env
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // =========================================================================
  // 2. UNLOCKED ADMIN MANAGEMENT PORTAL
  // =========================================================================
  return (
    <PageContainer>
      {/* 1. Header Banner with Sign Out */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#141928] via-[#0E121E] to-[#07090E] p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <Shield className="w-4 h-4" />
              <span>Admin Management Portal • Authenticated</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-stone-100 mt-1">
              Data Ingestion &amp; Content Engine
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1.5 max-w-2xl">
              Validate, normalize, preview, and ingest structured Clash of Clans datasets into the PostgreSQL database.
            </p>
          </div>

          {/* Quick Mode Indicator & Sign Out */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 p-1.5 bg-stone-900/90 rounded-2xl border border-stone-800">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'editor'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>1. Ingestion Editor</span>
              </button>
              <button
                onClick={() => {
                  if (previewReport) setActiveTab('preview');
                  else handleValidateAndPreview();
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'preview'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>2. Diff &amp; Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'history'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>3. Audit Logs</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              title="Lock Admin Session"
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-red-500/10 border border-stone-800 hover:border-red-500/40 text-stone-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. TAB CONTENT: EDITOR */}
      {activeTab === 'editor' && (
        <section className="mt-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls & File Upload (1 Col) */}
            <div className="space-y-6">
              {/* File Dropzone Card */}
              <div className="p-6 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-stone-200 font-bold text-sm">
                  <UploadCloud className="w-4 h-4 text-amber-400" />
                  <span>Upload JSON Dataset</span>
                </div>
                <label className="border-2 border-dashed border-stone-700/80 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-stone-950/40 group">
                  <UploadCloud className="w-8 h-8 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  <span className="text-xs font-semibold text-stone-300 mt-2 block">
                    Choose a JSON file or drag &amp; drop
                  </span>
                  <span className="text-[11px] text-stone-500 mt-1 block font-mono">
                    *.json format up to 10MB
                  </span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Sample Loader & Pipeline Info Card */}
              <div className="p-6 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-stone-200 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Quick Test Tools</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Load a verified dataset containing standard Troops, Heroes, Spells, and Defenses with full upgrade curves.
                </p>
                <button
                  onClick={handleLoadSample}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Load Sample Dataset</span>
                </button>
              </div>

              {/* Ingestion Mode */}
              <div className="p-6 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl space-y-3">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Ingestion Mode
                </span>
                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-800 bg-stone-900/50 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'merge'}
                      onChange={() => setImportMode('merge')}
                      className="mt-0.5 accent-amber-500"
                    />
                    <div>
                      <span className="font-bold text-stone-200 text-xs block">Merge (Recommended)</span>
                      <span className="text-[11px] text-stone-400 block">
                        Preserves unchanged fields and safely updates modified statistics.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-stone-800 bg-stone-900/50 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="mt-0.5 accent-amber-500"
                    />
                    <div>
                      <span className="font-bold text-stone-200 text-xs block">Full Replace</span>
                      <span className="text-[11px] text-stone-400 block">
                        Overwrites all entity data and replaces existing level curves completely.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right JSON Editor (2 Cols) */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2 text-stone-200 font-bold text-sm">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Structured JSON Editor (v1.0 Standard)</span>
                </div>
                <button
                  onClick={() => setJsonInput('')}
                  className="text-xs text-stone-400 hover:text-red-400 transition-colors"
                >
                  Clear Editor
                </button>
              </div>

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste JSON import document here..."
                rows={22}
                className="w-full p-4 rounded-2xl bg-stone-950/90 border border-stone-800/80 font-mono text-xs text-amber-200/90 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 resize-y leading-relaxed"
                spellCheck={false}
              />

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Validated by Multi-Stage Schema &amp; Normalizer</span>
                </div>

                <button
                  onClick={handleValidateAndPreview}
                  disabled={isProcessing || !jsonInput.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>Validate &amp; Preview Changes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. TAB CONTENT: DIFF & PREVIEW */}
      {activeTab === 'preview' && previewReport && (
        <section className="mt-8 space-y-6">
          {/* Metrics Summary Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-xs uppercase font-semibold text-emerald-400 block">New Entities</span>
              <span className="text-2xl font-black font-display text-emerald-300 mt-1 block">
                +{previewReport.newEntities}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="text-xs uppercase font-semibold text-amber-400 block">Updated Entities</span>
              <span className="text-2xl font-black font-display text-amber-300 mt-1 block">
                ~{previewReport.updatedEntities}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
              <span className="text-xs uppercase font-semibold text-stone-400 block">Unchanged</span>
              <span className="text-2xl font-black font-display text-stone-300 mt-1 block">
                {previewReport.unchangedEntities}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center">
              <span className="text-xs uppercase font-semibold text-purple-400 block">Levels to Sync</span>
              <span className="text-2xl font-black font-display text-purple-300 mt-1 block">
                {previewReport.totalLevels}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
              <span className="text-xs uppercase font-semibold text-red-400 block">Invalid Errors</span>
              <span className="text-2xl font-black font-display text-red-300 mt-1 block">
                {previewReport.invalidEntities}
              </span>
            </div>
          </div>

          {/* Validation Errors Box (if any) */}
          {previewReport.errors.length > 0 && (
            <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Validation Errors ({previewReport.errors.length})</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {previewReport.errors.map((err, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-red-500/20 text-xs flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-red-300 font-bold">{err.field}:</span>{' '}
                      <span className="text-stone-300">{err.error}</span>
                      {err.suggestedFix && (
                        <span className="block text-[11px] text-amber-400 mt-0.5">
                          Tip: {err.suggestedFix}
                        </span>
                      )}
                    </div>
                    {err.entity && (
                      <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-400 font-mono">
                        {err.entity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Execution Banner */}
          <div className="p-6 rounded-3xl border border-stone-800 bg-gradient-to-r from-[#141926] via-[#0E121E] to-[#121624] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-100 text-base">
                Ready to Ingest {previewReport.totalEntities} Entities?
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Target database: <strong className="text-amber-300">Supabase PostgreSQL &amp; Local Relational Store</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('editor')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-300 transition-colors"
              >
                Back to Editor
              </button>
              <button
                onClick={handleExecuteImport}
                disabled={isProcessing || previewReport.invalidEntities === previewReport.totalEntities}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Confirm &amp; Execute Import</span>
              </button>
            </div>
          </div>

          {/* Execution Result Success Display */}
          {executionResult && (
            <div className="p-6 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Import Completed Successfully in {executionResult.durationMs}ms!</span>
                </div>
                <span className="font-mono text-xs text-stone-400">
                  ID: {executionResult.importHistoryId}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone-300">Updated Entities:</span>
                {executionResult.importedEntitySlugs.map((slug) => (
                  <Link
                    key={slug}
                    to={`/troops/${slug}`}
                    className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700/80 text-amber-300 hover:text-amber-200 transition-colors font-mono"
                  >
                    {slug} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Entity Diff Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Entity Diff List (5 Cols) */}
            <div className="lg:col-span-5 p-5 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs font-bold text-stone-300 uppercase">
                <span>Entities to Ingest ({previewReport.entityDiffs.length})</span>
                <span>Status</span>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                {previewReport.entityDiffs.map((diff) => {
                  const isSelected = selectedDiff?.entitySlug === diff.entitySlug;
                  return (
                    <div
                      key={diff.entitySlug}
                      onClick={() => setSelectedDiff(diff)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/5'
                          : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-900/50'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-stone-100 text-sm block">
                          {diff.entityName}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {diff.entityType} &bull; {diff.entitySlug}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          diff.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : diff.status === 'updated'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : diff.status === 'invalid'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {diff.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Diff Details Panel (7 Cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-xl space-y-4">
              {selectedDiff ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <h4 className="font-bold text-stone-100 text-lg font-display">
                        {selectedDiff.entityName}
                      </h4>
                      <span className="text-xs text-stone-400 font-mono">
                        Slug: {selectedDiff.entitySlug} &bull; Levels: {selectedDiff.levelsToCreate + selectedDiff.levelsToUpdate + selectedDiff.levelsUnchanged}
                      </span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-amber-400 font-bold uppercase">
                      {selectedDiff.status}
                    </span>
                  </div>

                  {/* Field Diffs Table */}
                  {selectedDiff.fieldDiffs.length > 0 ? (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                        Detected Field Modifications
                      </span>
                      <div className="divide-y divide-stone-800/60 border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/70 font-mono text-xs">
                        {selectedDiff.fieldDiffs.map((fd, idx) => (
                          <div key={idx} className="p-3 grid grid-cols-3 gap-2 items-center">
                            <span className="text-amber-400 font-bold">{fd.field}</span>
                            <span className="text-stone-500 line-through truncate">{String(fd.oldValue ?? 'None')}</span>
                            <span className="text-emerald-300 font-semibold truncate">{String(fd.newValue ?? '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-stone-500 text-xs rounded-2xl bg-stone-950/40 border border-stone-800">
                      No field differences detected. Entity matches existing database structure.
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center text-stone-500 text-xs">
                  Select an entity on the left to inspect detailed changes.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. TAB CONTENT: AUDIT HISTORY */}
      {activeTab === 'history' && (
        <section className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-stone-100">
              Historical Ingestion Audit Logs
            </h2>
            <button
              onClick={loadHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh History</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-2xl">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-900/90 font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="py-4 px-5">Source &amp; Dataset</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-center">Entities</th>
                  <th className="py-4 px-5 text-center">Levels</th>
                  <th className="py-4 px-5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono">
                {historyList.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-900/40 transition-colors">
                    <td className="py-4 px-5 font-sans">
                      <span className="font-bold text-stone-100 block">{item.source_name}</span>
                      <span className="text-[11px] text-stone-400 font-mono">v{item.dataset_version} &bull; ID: {item.id}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : item.status === 'completed_with_warnings'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {item.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === 'completed_with_warnings' && <AlertTriangle className="w-3 h-3" />}
                        {item.status === 'failed' && <XCircle className="w-3 h-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-emerald-400 font-bold">+{item.created_entities}</span>{' '}
                      <span className="text-stone-500">/</span>{' '}
                      <span className="text-amber-400 font-bold">~{item.updated_entities}</span>
                    </td>
                    <td className="py-4 px-5 text-center text-purple-300 font-bold">
                      {item.total_levels}
                    </td>
                    <td className="py-4 px-5 text-stone-400 text-[11px]">
                      {new Date(item.started_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </PageContainer>
  );
};
