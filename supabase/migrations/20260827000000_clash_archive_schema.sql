-- Clash Archive Relational Database Schema
-- Migration: 20260827000000_clash_archive_schema.sql
-- Description: Core schema for Clash of Clans encyclopedia entities, categories, stats, levels, requirements, relationships, and sources with RLS.

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------
-- 1. CATEGORIES TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  entity_type TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_entity_type ON categories(entity_type);

---------------------------------------------------------
-- 2. CORE ENTITIES TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  entity_type TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  summary TEXT,
  description TEXT,
  image_url TEXT,
  icon_url TEXT,
  unlock_town_hall INTEGER DEFAULT 1,
  unlock_requirement_text TEXT,
  max_level INTEGER DEFAULT 1,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  trivia JSONB DEFAULT '[]'::jsonb,
  tips JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  synergies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entities_slug ON entities(slug);
CREATE INDEX IF NOT EXISTS idx_entities_entity_type ON entities(entity_type);
CREATE INDEX IF NOT EXISTS idx_entities_category ON entities(category);
CREATE INDEX IF NOT EXISTS idx_entities_unlock_th ON entities(unlock_town_hall);
CREATE INDEX IF NOT EXISTS idx_entities_is_active ON entities(is_active);
CREATE INDEX IF NOT EXISTS idx_entities_is_featured ON entities(is_featured);
CREATE INDEX IF NOT EXISTS idx_entities_updated_at ON entities(updated_at DESC);

---------------------------------------------------------
-- 3. ENTITY STATS TABLE (Flexible EAV stats)
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entity_stats (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  stat_key TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  unit TEXT,
  display_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entity_stats_entity_id ON entity_stats(entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_stats_stat_key ON entity_stats(stat_key);

---------------------------------------------------------
-- 4. UPGRADE LEVELS TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entity_levels (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  level INTEGER NOT NULL,
  required_town_hall INTEGER NOT NULL,
  upgrade_cost BIGINT DEFAULT 0,
  upgrade_resource TEXT DEFAULT 'elixir',
  upgrade_time_seconds BIGINT DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_entity_level UNIQUE (entity_id, level)
);

CREATE INDEX IF NOT EXISTS idx_entity_levels_entity_id ON entity_levels(entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_levels_level ON entity_levels(level);
CREATE INDEX IF NOT EXISTS idx_entity_levels_th ON entity_levels(required_town_hall);

---------------------------------------------------------
-- 5. UPGRADE LEVEL STATS TABLE (Dynamic Level Stats)
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entity_level_stats (
  id TEXT PRIMARY KEY,
  entity_level_id TEXT NOT NULL REFERENCES entity_levels(id) ON DELETE CASCADE,
  stat_key TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  unit TEXT,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entity_level_stats_level_id ON entity_level_stats(entity_level_id);
CREATE INDEX IF NOT EXISTS idx_entity_level_stats_key ON entity_level_stats(stat_key);

---------------------------------------------------------
-- 6. REQUIREMENTS TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entity_requirements (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  requirement_type TEXT NOT NULL,
  requirement_key TEXT NOT NULL,
  requirement_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entity_requirements_entity_id ON entity_requirements(entity_id);

---------------------------------------------------------
-- 7. RELATIONSHIPS TABLE
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS entity_relationships (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  related_entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_entity_relationship UNIQUE (entity_id, related_entity_id, relationship_type)
);

CREATE INDEX IF NOT EXISTS idx_entity_relationships_entity_id ON entity_relationships(entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_relationships_related_id ON entity_relationships(related_entity_id);

---------------------------------------------------------
-- 8. SOURCES & ATTRIBUTION TABLES
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_url TEXT,
  license TEXT,
  attribution_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entity_sources (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  source_id TEXT REFERENCES sources(id) ON DELETE SET NULL,
  source_url TEXT,
  license TEXT,
  attribution TEXT,
  retrieved_at TIMESTAMPTZ DEFAULT NOW(),
  last_verified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entity_sources_entity_id ON entity_sources(entity_id);

---------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
---------------------------------------------------------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_level_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_sources ENABLE ROW LEVEL SECURITY;

-- Public read-only policies
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view active entities" ON entities FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view entity stats" ON entity_stats FOR SELECT USING (true);
CREATE POLICY "Public can view entity levels" ON entity_levels FOR SELECT USING (true);
CREATE POLICY "Public can view entity level stats" ON entity_level_stats FOR SELECT USING (true);
CREATE POLICY "Public can view entity requirements" ON entity_requirements FOR SELECT USING (true);
CREATE POLICY "Public can view entity relationships" ON entity_relationships FOR SELECT USING (true);
CREATE POLICY "Public can view sources" ON sources FOR SELECT USING (true);
CREATE POLICY "Public can view entity sources" ON entity_sources FOR SELECT USING (true);

-- Admin write policies (restricted to service_role or authenticated admin)
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admins can insert entities" ON entities FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can update entities" ON entities FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can delete entities" ON entities FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admins can manage entity stats" ON entity_stats FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage entity levels" ON entity_levels FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage level stats" ON entity_level_stats FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage requirements" ON entity_requirements FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage relationships" ON entity_relationships FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage sources" ON sources FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admins can manage entity sources" ON entity_sources FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
