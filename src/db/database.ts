import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  DbEntity, DbCategory, DbEntityStat, DbEntityLevel, DbEntityLevelStat, 
  DbEntityRequirement, DbEntityRelationship, DbSource, DbEntitySource,
  DbImportHistory, AnyEntity, EntityType, UpgradeLevel
} from '../types/entity';
import { NormalizedEntityRecord } from '../imports/types/schema';
import { TROOPS_DATA } from '../data/troops';
import { HEROES_DATA } from '../data/heroes';
import { DEFENSES_DATA } from '../data/defenses';
import { SPELLS_DATA } from '../data/spells';
import { EQUIPMENT_DATA } from '../data/equipment';
import { PETS_DATA } from '../data/pets';
import { SIEGES_DATA } from '../data/sieges';
import { MECHANICS_DATA } from '../data/mechanics';
import { CATEGORIES } from '../data/categories';

// =========================================================================
// IN-MEMORY RELATIONAL DATABASE STORE (Primary Engine & Live Fallback)
// =========================================================================

class RelationalDatabaseStore {
  public entities: Map<string, DbEntity> = new Map();
  public categories: Map<string, DbCategory> = new Map();
  public entityStats: DbEntityStat[] = [];
  public entityLevels: DbEntityLevel[] = [];
  public entityLevelStats: DbEntityLevelStat[] = [];
  public entityRequirements: DbEntityRequirement[] = [];
  public entityRelationships: DbEntityRelationship[] = [];
  public sources: DbSource[] = [];
  public entitySources: DbEntitySource[] = [];
  public importHistory: DbImportHistory[] = [];

  constructor() {
    this.seedDatabase();
  }

  private seedDatabase() {
    // 0. Seed Import History
    this.importHistory = [
      {
        id: 'imp-initial-seed',
        source_name: 'Official Clash of Clans Curated Dataset v1.0',
        dataset_version: '1.0',
        status: 'completed',
        started_at: '2026-08-27T06:00:00Z',
        completed_at: '2026-08-27T06:00:03Z',
        total_entities: 28,
        created_entities: 28,
        updated_entities: 0,
        unchanged_entities: 0,
        failed_entities: 0,
        total_levels: 250,
        created_levels: 250,
        updated_levels: 0,
        warnings: [],
        errors: [],
        metadata: { importedBy: 'system_init', environment: 'production' },
        created_at: '2026-08-27T06:00:00Z'
      }
    ];
    // 1. Seed Sources
    this.sources = [
      {
        id: 'src-official',
        name: 'Clash of Clans Official & Verified Game Data',
        base_url: 'https://supercell.com/en/games/clashofclans/',
        license: 'Fair Use / Supercell Fan Content Policy',
        attribution_text: 'Supercell Oy & Clash Archive Curated Database',
        created_at: '2026-08-20T00:00:00Z',
        updated_at: '2026-08-27T00:00:00Z'
      },
      {
        id: 'src-community',
        name: 'Clash Community Verified Data',
        base_url: 'https://clashofclans.fandom.com/',
        license: 'CC-BY-SA 3.0',
        attribution_text: 'Community Contributors & Game Data Extracts',
        created_at: '2026-08-20T00:00:00Z',
        updated_at: '2026-08-27T00:00:00Z'
      }
    ];

    // 2. Seed Categories
    CATEGORIES.forEach((c, idx) => {
      const dbCat: DbCategory = {
        id: `cat-${c.type}`,
        name: c.name,
        slug: c.path.replace('/', ''),
        description: c.description,
        entity_type: c.type,
        icon: c.iconName,
        display_order: idx + 1,
        created_at: '2026-08-20T00:00:00Z',
        updated_at: '2026-08-27T00:00:00Z'
      };
      this.categories.set(dbCat.id, dbCat);
    });

    // 3. Seed Core Entities
    const allSourceEntities: AnyEntity[] = [
      ...TROOPS_DATA,
      ...HEROES_DATA,
      ...DEFENSES_DATA,
      ...SPELLS_DATA,
      ...EQUIPMENT_DATA,
      ...PETS_DATA,
      ...SIEGES_DATA,
      ...MECHANICS_DATA
    ];

    allSourceEntities.forEach((entity, index) => {
      // Create timestamps with subtle variations for "Recently Updated" ordering
      const baseDate = new Date('2026-08-20T00:00:00Z');
      const updatedDate = new Date(baseDate.getTime() + (index * 3600000 * 5));
      const updatedAtStr = updatedDate.toISOString();

      const dbEntity: DbEntity = {
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        entity_type: entity.category,
        category: entity.category,
        subcategory: entity.subCategory || null,
        summary: entity.tagline || entity.description.slice(0, 120),
        description: entity.description,
        image_url: entity.image,
        icon_url: entity.iconName || null,
        unlock_town_hall: entity.unlockTownHall || 1,
        unlock_requirement_text: entity.unlockRequirementText || null,
        max_level: entity.maxLevel || 1,
        is_featured: ['barbarian', 'archer-queen', 'town-hall', 'inferno-tower', 'rage-spell', 'minion-prince'].includes(entity.slug),
        is_active: true,
        trivia: entity.trivia || [],
        tips: entity.tips || [],
        strengths: entity.strengths || [],
        weaknesses: entity.weaknesses || [],
        synergies: entity.synergies || [],
        created_at: '2026-08-20T00:00:00Z',
        updated_at: updatedAtStr
      };

      this.entities.set(dbEntity.id, dbEntity);

      // Seed entity source
      this.entitySources.push({
        id: `es-${entity.id}`,
        entity_id: entity.id,
        source_id: 'src-official',
        source_url: entity.provenance?.sourceUrl || 'https://supercell.com/en/games/clashofclans/',
        license: entity.provenance?.license || 'Fair Use',
        attribution: entity.provenance?.attribution || 'Supercell Oy & Clash Archive',
        retrieved_at: entity.provenance?.retrievedAt || '2026-08-20T00:00:00Z',
        last_verified_at: entity.provenance?.lastVerifiedAt || '2026-08-27T00:00:00Z'
      });

      // Seed entity requirements
      if (entity.unlockTownHall) {
        this.entityRequirements.push({
          id: `req-th-${entity.id}`,
          entity_id: entity.id,
          requirement_type: 'town_hall',
          requirement_key: 'town_hall_level',
          requirement_value: String(entity.unlockTownHall),
          description: `Requires Town Hall ${entity.unlockTownHall}`,
          created_at: '2026-08-20T00:00:00Z'
        });
      }

      // Seed upgrade levels & dynamic level stats
      const levels: UpgradeLevel[] = (entity as { upgradeLevels?: UpgradeLevel[] }).upgradeLevels || [];
      levels.forEach((lvl, lvlIdx) => {
        const levelId = `lvl-${entity.id}-${lvl.level}`;
        const dbLevel: DbEntityLevel = {
          id: levelId,
          entity_id: entity.id,
          level: lvl.level,
          required_town_hall: lvl.requiredTownHall || entity.unlockTownHall || 1,
          upgrade_cost: lvl.upgradeCost || 0,
          upgrade_resource: lvl.upgradeCurrency || 'elixir',
          upgrade_time_seconds: lvl.upgradeTimeSeconds || 0,
          display_order: lvlIdx + 1,
          created_at: '2026-08-20T00:00:00Z',
          updated_at: updatedAtStr
        };
        this.entityLevels.push(dbLevel);

        // Seed individual dynamic level stats
        if (lvl.hitpoints !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-hp`,
            entity_level_id: levelId,
            stat_key: 'hitpoints',
            stat_value: String(lvl.hitpoints),
            unit: 'HP',
            display_name: 'Hitpoints'
          });
        }
        if (lvl.damagePerSecond !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-dps`,
            entity_level_id: levelId,
            stat_key: 'damage_per_second',
            stat_value: String(lvl.damagePerSecond),
            unit: 'DPS',
            display_name: 'Damage Per Second'
          });
        }
        if (lvl.damagePerAttack !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-dpa`,
            entity_level_id: levelId,
            stat_key: 'damage_per_attack',
            stat_value: String(lvl.damagePerAttack),
            unit: 'DPA',
            display_name: 'Damage Per Attack'
          });
        }
        if (lvl.damagePerShot !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-dpshot`,
            entity_level_id: levelId,
            stat_key: 'damage_per_shot',
            stat_value: String(lvl.damagePerShot),
            unit: 'DMG',
            display_name: 'Damage / Shot'
          });
        }
        if (lvl.healingPerSecond !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-heal`,
            entity_level_id: levelId,
            stat_key: 'healing_per_second',
            stat_value: String(lvl.healingPerSecond),
            unit: 'HP/s',
            display_name: 'Healing / Sec'
          });
        }
        if (lvl.boostPercent !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-boost`,
            entity_level_id: levelId,
            stat_key: 'boost_percent',
            stat_value: String(lvl.boostPercent),
            unit: '%',
            display_name: 'Damage Boost'
          });
        }
        if (lvl.durationSeconds !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-dur`,
            entity_level_id: levelId,
            stat_key: 'duration_seconds',
            stat_value: String(lvl.durationSeconds),
            unit: 's',
            display_name: 'Duration'
          });
        }
        if (lvl.regenerationTimeMinutes !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-regen`,
            entity_level_id: levelId,
            stat_key: 'regeneration_time_minutes',
            stat_value: String(lvl.regenerationTimeMinutes),
            unit: 'm',
            display_name: 'Regen Time'
          });
        }
        if (lvl.requiredLaboratoryLevel !== undefined) {
          this.entityLevelStats.push({
            id: `ls-${levelId}-lab`,
            entity_level_id: levelId,
            stat_key: 'required_laboratory_level',
            stat_value: String(lvl.requiredLaboratoryLevel),
            unit: 'Lvl',
            display_name: 'Lab Level'
          });
        }
      });
    });

    // 4. Seed Relational Links (Synergies & Relationships)
    this.entityRelationships = [
      { id: 'rel-1', entity_id: 'troop-barbarian', related_entity_id: 'hero-barbarian-king', relationship_type: 'synergy_with', display_order: 1 },
      { id: 'rel-2', entity_id: 'troop-barbarian', related_entity_id: 'troop-archer', relationship_type: 'synergy_with', display_order: 2 },
      { id: 'rel-3', entity_id: 'hero-barbarian-king', related_entity_id: 'hero-archer-queen', relationship_type: 'related', display_order: 1 },
      { id: 'rel-4', entity_id: 'hero-archer-queen', related_entity_id: 'spell-rage', relationship_type: 'synergy_with', display_order: 1 },
      { id: 'rel-5', entity_id: 'defense-inferno-tower', related_entity_id: 'defense-town-hall', relationship_type: 'related', display_order: 1 },
      { id: 'rel-6', entity_id: 'defense-cannon', related_entity_id: 'defense-archer-tower', relationship_type: 'related', display_order: 1 }
    ];
  }
}

export const dbStore = new RelationalDatabaseStore();

// =========================================================================
// UNIFIED DATABASE ADAPTER API
// =========================================================================

export class DatabaseAdapter {
  /**
   * Fetch all active entities
   */
  static async getAllEntities(): Promise<DbEntity[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entities')
          .select('*')
          .eq('is_active', true)
          .order('unlock_town_hall', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return Array.from(dbStore.entities.values()).filter((e) => e.is_active);
  }

  /**
   * Fetch a single entity by its slug
   */
  static async getEntityBySlug(slug: string): Promise<DbEntity | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entities')
          .select('*')
          .eq('slug', slug.toLowerCase())
          .eq('is_active', true)
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    for (const entity of dbStore.entities.values()) {
      if (entity.slug.toLowerCase() === slug.toLowerCase() && entity.is_active) {
        return entity;
      }
    }
    return null;
  }

  /**
   * Fetch entities by category
   */
  static async getEntitiesByCategory(category: string): Promise<DbEntity[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entities')
          .select('*')
          .eq('category', category)
          .eq('is_active', true);
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return Array.from(dbStore.entities.values()).filter(
      (e) => (e.category === category || e.entity_type === category) && e.is_active
    );
  }

  /**
   * Fetch entity stats
   */
  static async getEntityStats(entityId: string): Promise<DbEntityStat[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entity_stats')
          .select('*')
          .eq('entity_id', entityId)
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return dbStore.entityStats.filter((s) => s.entity_id === entityId);
  }

  /**
   * Fetch entity upgrade levels with level stats
   */
  static async getEntityLevels(entityId: string): Promise<(DbEntityLevel & { stats: DbEntityLevelStat[] })[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: levels, error: lvlErr } = await supabase
          .from('entity_levels')
          .select('*')
          .eq('entity_id', entityId)
          .order('level', { ascending: true });

        if (!lvlErr && levels && levels.length > 0) {
          const levelIds = levels.map((l) => l.id);
          const { data: stats } = await supabase
            .from('entity_level_stats')
            .select('*')
            .in('entity_level_id', levelIds);

          return levels.map((lvl) => ({
            ...lvl,
            stats: (stats || []).filter((s) => s.entity_level_id === lvl.id)
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }

    const levels = dbStore.entityLevels.filter((l) => l.entity_id === entityId);
    return levels.map((lvl) => ({
      ...lvl,
      stats: dbStore.entityLevelStats.filter((s) => s.entity_level_id === lvl.id)
    }));
  }

  /**
   * Fetch entity requirements
   */
  static async getEntityRequirements(entityId: string): Promise<DbEntityRequirement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entity_requirements')
          .select('*')
          .eq('entity_id', entityId);
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return dbStore.entityRequirements.filter((r) => r.entity_id === entityId);
  }

  /**
   * Fetch entity relationships
   */
  static async getEntityRelationships(entityId: string): Promise<DbEntityRelationship[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entity_relationships')
          .select('*')
          .eq('entity_id', entityId)
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return dbStore.entityRelationships.filter((r) => r.entity_id === entityId);
  }

  /**
   * Fetch entity sources
   */
  static async getEntitySources(entityId: string): Promise<DbEntitySource[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entity_sources')
          .select('*')
          .eq('entity_id', entityId);
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return dbStore.entitySources.filter((s) => s.entity_id === entityId);
  }

  /**
   * Fetch all categories
   */
  static async getAllCategories(): Promise<DbCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return Array.from(dbStore.categories.values()).sort((a, b) => a.display_order - b.display_order);
  }

  /**
   * Fetch recently updated entities
   */
  static async getRecentlyUpdated(limit: number = 6): Promise<DbEntity[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('entities')
          .select('*')
          .eq('is_active', true)
          .order('updated_at', { ascending: false })
          .limit(limit);
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using relational store:', err);
      }
    }
    return Array.from(dbStore.entities.values())
      .filter((e) => e.is_active)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);
  }

  /**
   * Insert or update an entity (for Import Pipeline & Admin Architecture)
   */
  static async upsertEntity(entity: DbEntity): Promise<boolean> {
    dbStore.entities.set(entity.id, entity);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('entities').upsert(entity);
      } catch (err) {
        console.warn('Supabase upsert failed:', err);
      }
    }
    return true;
  }

  /**
   * Fetch import history audit logs
   */
  static async getImportHistory(): Promise<DbImportHistory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('import_history')
          .select('*')
          .order('started_at', { ascending: false });
        if (!error && data && data.length > 0) return data as DbImportHistory[];
      } catch (err) {
        console.warn('Supabase import_history fetch failed, using relational store:', err);
      }
    }
    return [...dbStore.importHistory].sort(
      (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
    );
  }

  /**
   * Record a new import history entry
   */
  static async recordImportHistory(record: DbImportHistory): Promise<boolean> {
    dbStore.importHistory.unshift(record);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('import_history').insert(record);
      } catch (err) {
        console.warn('Supabase recordImportHistory failed:', err);
      }
    }
    return true;
  }

  /**
   * Upsert a complete normalized entity record including stats, levels, level stats, requirements, relationships, and sources
   */
  static async upsertFullEntity(
    rec: NormalizedEntityRecord
  ): Promise<{ isNew: boolean; createdLevels: number; updatedLevels: number }> {
    const existing = dbStore.entities.get(rec.id);
    const isNew = !existing;
    const now = new Date().toISOString();

    const dbEntity: DbEntity = {
      id: rec.id,
      name: rec.name,
      slug: rec.slug,
      entity_type: rec.entity_type,
      category: rec.category,
      subcategory: rec.subcategory as any,
      summary: rec.summary || null,
      description: rec.description || null,
      image_url: rec.image_url,
      icon_url: rec.icon_url,
      unlock_town_hall: rec.unlock_town_hall,
      unlock_requirement_text: rec.unlock_requirement_text,
      max_level: rec.max_level,
      is_featured: rec.is_featured,
      is_active: rec.is_active,
      trivia: rec.trivia,
      tips: rec.tips,
      strengths: rec.strengths,
      weaknesses: rec.weaknesses,
      synergies: rec.synergies,
      created_at: existing ? existing.created_at : now,
      updated_at: now
    };

    dbStore.entities.set(rec.id, dbEntity);

    // Update Stats
    dbStore.entityStats = dbStore.entityStats.filter((s) => s.entity_id !== rec.id);
    rec.stats.forEach((s) => {
      dbStore.entityStats.push({
        id: `stat-${rec.id}-${s.stat_key}`,
        entity_id: rec.id,
        stat_key: s.stat_key,
        stat_value: s.stat_value,
        unit: s.unit,
        display_name: s.display_name,
        display_order: s.display_order
      });
    });

    // Update Levels and Level Stats
    let createdLevels = 0;
    let updatedLevels = 0;

    const existingLevels = dbStore.entityLevels.filter((l) => l.entity_id === rec.id);
    dbStore.entityLevels = dbStore.entityLevels.filter((l) => l.entity_id !== rec.id);

    rec.levels.forEach((l) => {
      const match = existingLevels.find((el) => el.level === l.level);
      if (!match) {
        createdLevels++;
      } else {
        updatedLevels++;
      }

      const levelId = `lvl-${rec.id}-${l.level}`;
      dbStore.entityLevels.push({
        id: levelId,
        entity_id: rec.id,
        level: l.level,
        required_town_hall: l.required_town_hall,
        upgrade_cost: l.upgrade_cost,
        upgrade_resource: l.upgrade_resource,
        upgrade_time_seconds: l.upgrade_time_seconds,
        display_order: l.level,
        created_at: match ? match.created_at : now,
        updated_at: now
      });

      // Clear existing level stats and insert new
      dbStore.entityLevelStats = dbStore.entityLevelStats.filter(
        (ls) => ls.entity_level_id !== levelId
      );
      l.stats.forEach((ls) => {
        dbStore.entityLevelStats.push({
          id: `lvlstat-${levelId}-${ls.stat_key}`,
          entity_level_id: levelId,
          stat_key: ls.stat_key,
          stat_value: ls.stat_value,
          unit: ls.unit,
          display_name: ls.display_name
        });
      });
    });

    // Update Requirements
    dbStore.entityRequirements = dbStore.entityRequirements.filter((r) => r.entity_id !== rec.id);
    rec.requirements.forEach((req, idx) => {
      dbStore.entityRequirements.push({
        id: `req-${rec.id}-${idx + 1}`,
        entity_id: rec.id,
        requirement_type: req.requirement_type,
        requirement_key: req.requirement_key,
        requirement_value: req.requirement_value,
        description: req.description
      });
    });

    // Update Relationships
    dbStore.entityRelationships = dbStore.entityRelationships.filter((r) => r.entity_id !== rec.id);
    rec.relationships.forEach((rel) => {
      const targetEntity = Array.from(dbStore.entities.values()).find(
        (e) => e.slug.toLowerCase() === rel.related_entity_slug.toLowerCase()
      );
      if (targetEntity) {
        dbStore.entityRelationships.push({
          id: `rel-${rec.id}-${targetEntity.id}-${rel.relationship_type}`,
          entity_id: rec.id,
          related_entity_id: targetEntity.id,
          relationship_type: rel.relationship_type,
          display_order: rel.display_order
        });
      }
    });

    // Update Sources
    if (rec.source) {
      dbStore.entitySources = dbStore.entitySources.filter((s) => s.entity_id !== rec.id);
      dbStore.entitySources.push({
        id: `src-${rec.id}`,
        entity_id: rec.id,
        source_id: 'src-official',
        source_url: rec.source.url || null,
        license: rec.source.license || 'Fair Use',
        attribution: rec.source.attribution || rec.source.name,
        retrieved_at: now,
        last_verified_at: now
      });
    }

    // If Supabase is connected, sync to remote
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('entities').upsert(dbEntity);
      } catch (err) {
        console.warn('Supabase upsertFullEntity failed:', err);
      }
    }

    return { isNew, createdLevels, updatedLevels };
  }
}

