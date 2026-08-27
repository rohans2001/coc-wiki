-- Clash Archive Relational Database Schema
-- Migration: 20260827000001_import_history_schema.sql
-- Description: Import history table and RLS policies for tracking bulk imports and data ingestion audits.

---------------------------------------------------------
-- IMPORT HISTORY TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS import_history (
  id TEXT PRIMARY KEY,
  source_name TEXT NOT NULL,
  dataset_version TEXT DEFAULT '1.0',
  status TEXT NOT NULL CHECK (status IN ('pending', 'validating', 'preview', 'processing', 'completed', 'completed_with_warnings', 'failed', 'rolled_back')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  total_entities INTEGER DEFAULT 0,
  created_entities INTEGER DEFAULT 0,
  updated_entities INTEGER DEFAULT 0,
  unchanged_entities INTEGER DEFAULT 0,
  failed_entities INTEGER DEFAULT 0,
  total_levels INTEGER DEFAULT 0,
  created_levels INTEGER DEFAULT 0,
  updated_levels INTEGER DEFAULT 0,
  warnings JSONB DEFAULT '[]'::jsonb,
  errors JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_import_history_status ON import_history(status);
CREATE INDEX IF NOT EXISTS idx_import_history_started_at ON import_history(started_at DESC);

---------------------------------------------------------
-- RLS POLICIES FOR IMPORT HISTORY
---------------------------------------------------------
ALTER TABLE import_history ENABLE ROW LEVEL SECURITY;

-- Public can view high-level import logs
CREATE POLICY "Public can view import history" ON import_history FOR SELECT USING (true);

-- Only authenticated users or service_role can insert/update import history
CREATE POLICY "Admins can insert import history" ON import_history FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can update import history" ON import_history FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can delete import history" ON import_history FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
