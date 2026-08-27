import {
  ImportDocumentV1,
  ImportEntityV1,
  ImportLevelV1,
  ImportSourceMeta,
  NormalizedEntityRecord
} from '../types/schema';
import { EntityType, ResourceCostType, SubCategory } from '../../types/entity';

export class DataNormalizer {
  /**
   * Normalize an entire import document into a standardized structure
   */
  static normalizeDocument(doc: ImportDocumentV1): {
    version: string;
    source: ImportSourceMeta;
    exportedAt: string;
    entities: NormalizedEntityRecord[];
  } {
    const source: ImportSourceMeta = {
      name: (doc.source?.name || 'Verified Import Dataset').trim(),
      url: doc.source?.url?.trim() || 'https://supercell.com/en/games/clashofclans/',
      license: doc.source?.license?.trim() || 'Fair Use / Supercell Fan Content Policy',
      attribution: doc.source?.attribution?.trim() || 'Clash Archive Verified Pipeline'
    };

    const exportedAt = doc.exportedAt || doc.exported_at || new Date().toISOString();

    const entities = (doc.entities || []).map((entity) =>
      this.normalizeEntity(entity, source)
    );

    return {
      version: doc.version || '1.0',
      source,
      exportedAt,
      entities
    };
  }

  /**
   * Normalize a single entity
   */
  static normalizeEntity(
    raw: ImportEntityV1,
    defaultSource?: ImportSourceMeta
  ): NormalizedEntityRecord {
    const name = (raw.name || '').trim();
    const entityType = this.normalizeEntityType(raw.entityType || raw.entity_type);
    const slug = (raw.slug || this.slugify(name)).trim().toLowerCase();
    const category = (raw.category || entityType).trim().toLowerCase();
    const subcategory = this.normalizeSubcategory(raw.subcategory || raw.subCategory);

    const unlockTownHall = Math.max(
      1,
      Math.min(17, Number(raw.unlockTownHall ?? raw.unlock_town_hall ?? 1) || 1)
    );

    const levels = (raw.levels || []).map((lvl) => this.normalizeLevel(lvl, unlockTownHall));
    const calculatedMaxLevel = levels.length > 0
      ? Math.max(...levels.map((l) => l.level))
      : Number(raw.maxLevel ?? raw.max_level ?? 1) || 1;

    const maxLevel = Math.max(1, calculatedMaxLevel);

    const stats = this.normalizeStats(raw.stats);

    const requirements = (raw.requirements || []).map((req, idx) => ({
      requirement_type: (req.requirementType || req.requirement_type || 'town_hall').trim().toLowerCase(),
      requirement_key: (req.requirementKey || req.requirement_key || `req_${idx + 1}`).trim().toLowerCase(),
      requirement_value: String(req.requirementValue ?? req.requirement_value ?? '').trim(),
      description: req.description ? req.description.trim() : null
    }));

    const relationships = (raw.relationships || []).map((rel, idx) => {
      const targetSlug = (
        rel.relatedEntitySlug ||
        rel.related_entity_slug ||
        rel.relatedEntityId ||
        rel.related_entity_id ||
        ''
      ).trim().toLowerCase();

      const relationshipType = (
        rel.relationshipType ||
        rel.relationship_type ||
        'related'
      ).trim().toLowerCase();

      return {
        related_entity_slug: targetSlug,
        relationship_type: relationshipType,
        display_order: Number(rel.displayOrder ?? rel.display_order ?? idx + 1)
      };
    });

    const source: ImportSourceMeta | undefined = raw.source
      ? {
          name: (raw.source.name || defaultSource?.name || 'Verified Source').trim(),
          url: raw.source.url?.trim() || defaultSource?.url,
          license: raw.source.license?.trim() || defaultSource?.license,
          attribution: raw.source.attribution?.trim() || defaultSource?.attribution
        }
      : defaultSource;

    return {
      id: `${entityType}-${slug}`,
      name,
      slug,
      entity_type: entityType,
      category,
      subcategory,
      summary: (raw.summary || raw.tagline || '').trim(),
      description: (raw.description || '').trim(),
      image_url: raw.imageUrl || raw.image_url || null,
      icon_url: raw.iconUrl || raw.icon_url || null,
      unlock_town_hall: unlockTownHall,
      unlock_requirement_text: (raw.unlockRequirementText || raw.unlock_requirement_text || '').trim() || null,
      max_level: maxLevel,
      is_featured: Boolean(raw.isFeatured ?? raw.is_featured ?? false),
      is_active: Boolean(raw.isActive ?? raw.is_active ?? true),
      trivia: this.deduplicateStringArray(raw.trivia),
      tips: this.deduplicateStringArray(raw.tips),
      strengths: this.deduplicateStringArray(raw.strengths),
      weaknesses: this.deduplicateStringArray(raw.weaknesses),
      synergies: this.deduplicateStringArray(raw.synergies),
      stats,
      levels,
      requirements,
      relationships,
      source
    };
  }

  /**
   * Normalize an individual upgrade level
   */
  static normalizeLevel(
    lvl: ImportLevelV1,
    entityDefaultTh: number
  ) {
    const levelNum = Math.max(1, Number(lvl.level) || 1);
    const requiredTh = Math.max(
      1,
      Math.min(17, Number(lvl.requiredTownHall ?? lvl.required_town_hall ?? entityDefaultTh) || entityDefaultTh)
    );

    const upgradeCost = Math.max(0, Number(lvl.upgradeCost ?? lvl.upgrade_cost ?? 0) || 0);
    const upgradeResource = this.normalizeResource(
      lvl.upgradeResource || lvl.upgrade_resource || lvl.upgradeCurrency || lvl.upgrade_currency
    );

    const timeSecs = Math.max(
      0,
      Number(lvl.upgradeTimeSeconds ?? lvl.upgrade_time_seconds ?? this.parseTimeStringToSeconds(lvl.upgradeTime || lvl.upgrade_time)) || 0
    );

    const formattedTime = (lvl.upgradeTime || lvl.upgrade_time || this.formatSecondsToTimeString(timeSecs)).trim();

    const hp = lvl.hitpoints !== undefined && lvl.hitpoints !== null ? Number(lvl.hitpoints) : undefined;
    const dps = (lvl.damagePerSecond ?? lvl.damage_per_second) !== undefined && (lvl.damagePerSecond ?? lvl.damage_per_second) !== null
      ? Number(lvl.damagePerSecond ?? lvl.damage_per_second)
      : undefined;
    const dpa = (lvl.damagePerAttack ?? lvl.damage_per_attack) !== undefined && (lvl.damagePerAttack ?? lvl.damage_per_attack) !== null
      ? Number(lvl.damagePerAttack ?? lvl.damage_per_attack)
      : undefined;
    const damagePerShot = (lvl.damagePerShot ?? lvl.damage_per_shot) !== undefined
      ? Number(lvl.damagePerShot ?? lvl.damage_per_shot)
      : undefined;
    const healingPerSecond = (lvl.healingPerSecond ?? lvl.healing_per_second) !== undefined
      ? Number(lvl.healingPerSecond ?? lvl.healing_per_second)
      : undefined;
    const boostPercent = (lvl.boostPercent ?? lvl.boost_percent) !== undefined
      ? Number(lvl.boostPercent ?? lvl.boost_percent)
      : undefined;
    const durationSeconds = (lvl.durationSeconds ?? lvl.duration_seconds) !== undefined
      ? Number(lvl.durationSeconds ?? lvl.duration_seconds)
      : undefined;
    const regenTime = (lvl.regenerationTimeMinutes ?? lvl.regeneration_time_minutes) !== undefined
      ? Number(lvl.regenerationTimeMinutes ?? lvl.regeneration_time_minutes)
      : undefined;
    const labLevel = (lvl.requiredLaboratoryLevel ?? lvl.required_laboratory_level) !== undefined
      ? Number(lvl.requiredLaboratoryLevel ?? lvl.required_laboratory_level)
      : undefined;
    const abilityLevel = (lvl.abilityLevel ?? lvl.ability_level) !== undefined
      ? Number(lvl.abilityLevel ?? lvl.ability_level)
      : undefined;
    const abilityName = (lvl.abilityName || lvl.ability_name || '').trim() || undefined;

    // Build level stats array
    const levelStats: { stat_key: string; stat_value: string; unit: string | null; display_name: string }[] = [];
    if (hp !== undefined) levelStats.push({ stat_key: 'hitpoints', stat_value: String(hp), unit: 'HP', display_name: 'Hitpoints' });
    if (dps !== undefined) levelStats.push({ stat_key: 'damage_per_second', stat_value: String(dps), unit: 'DPS', display_name: 'Damage Per Second' });
    if (dpa !== undefined) levelStats.push({ stat_key: 'damage_per_attack', stat_value: String(dpa), unit: 'DPA', display_name: 'Damage Per Attack' });
    if (damagePerShot !== undefined) levelStats.push({ stat_key: 'damage_per_shot', stat_value: String(damagePerShot), unit: 'Dmg', display_name: 'Damage Per Shot' });
    if (healingPerSecond !== undefined) levelStats.push({ stat_key: 'healing_per_second', stat_value: String(healingPerSecond), unit: 'HPS', display_name: 'Healing Per Second' });
    if (boostPercent !== undefined) levelStats.push({ stat_key: 'boost_percent', stat_value: String(boostPercent), unit: '%', display_name: 'Damage Boost' });
    if (durationSeconds !== undefined) levelStats.push({ stat_key: 'duration_seconds', stat_value: String(durationSeconds), unit: 's', display_name: 'Duration' });
    if (regenTime !== undefined) levelStats.push({ stat_key: 'regeneration_time_minutes', stat_value: String(regenTime), unit: 'm', display_name: 'Regeneration Time' });
    if (labLevel !== undefined) levelStats.push({ stat_key: 'required_laboratory_level', stat_value: String(labLevel), unit: 'Lvl', display_name: 'Required Lab Level' });
    if (abilityLevel !== undefined) levelStats.push({ stat_key: 'ability_level', stat_value: String(abilityLevel), unit: 'Lvl', display_name: 'Ability Level' });

    return {
      level: levelNum,
      required_town_hall: requiredTh,
      upgrade_cost: upgradeCost,
      upgrade_resource: upgradeResource,
      upgrade_time_seconds: timeSecs,
      upgrade_time_formatted: formattedTime,
      hitpoints: hp,
      damage_per_second: dps,
      damage_per_attack: dpa,
      damage_per_shot: damagePerShot,
      healing_per_second: healingPerSecond,
      boost_percent: boostPercent,
      duration_seconds: durationSeconds,
      regeneration_time_minutes: regenTime,
      required_laboratory_level: labLevel,
      ability_level: abilityLevel,
      ability_name: abilityName,
      stats: levelStats
    };
  }

  /**
   * Normalize flexible key-value stats
   */
  static normalizeStats(rawStats: unknown): {
    stat_key: string;
    stat_value: string;
    unit: string | null;
    display_name: string;
    display_order: number;
  }[] {
    if (!rawStats) return [];

    // If stats is an object map: { housingSpace: 1, movementSpeed: 16 }
    if (typeof rawStats === 'object' && !Array.isArray(rawStats)) {
      return Object.entries(rawStats as Record<string, unknown>).map(([key, val], idx) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        return {
          stat_key: snakeKey,
          stat_value: String(val ?? ''),
          unit: null,
          display_name: displayName,
          display_order: idx + 1
        };
      });
    }

    // If stats is an array of stat objects
    if (Array.isArray(rawStats)) {
      return rawStats.map((item, idx) => ({
        stat_key: (item.statKey || item.stat_key || `stat_${idx + 1}`).trim().toLowerCase(),
        stat_value: String(item.statValue ?? item.stat_value ?? '').trim(),
        unit: item.unit ? item.unit.trim() : null,
        display_name: (item.displayName || item.display_name || item.statKey || item.stat_key || '').trim(),
        display_order: Number(item.displayOrder ?? item.display_order ?? idx + 1)
      }));
    }

    return [];
  }

  /**
   * Slugify helper
   */
  static slugify(str: string): string {
    return (str || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  /**
   * Normalize entity types
   */
  static normalizeEntityType(rawType: unknown): EntityType {
    const str = String(rawType || 'troop').toLowerCase().trim();
    if (str.includes('troop')) return 'troop';
    if (str.includes('hero') && !str.includes('equipment')) return 'hero';
    if (str.includes('spell')) return 'spell';
    if (str.includes('defense')) return 'defense';
    if (str.includes('building')) return 'defense';
    if (str.includes('pet')) return 'pet';
    if (str.includes('equipment')) return 'equipment';
    if (str.includes('siege')) return 'siege';
    if (str.includes('resource')) return 'resource';
    if (str.includes('mechanic')) return 'mechanic';
    return 'troop';
  }

  /**
   * Normalize subcategories
   */
  static normalizeSubcategory(rawSub: unknown): SubCategory | null {
    if (!rawSub) return null;
    const str = String(rawSub).toLowerCase().trim().replace(/[\s-]+/g, '_');
    if (str.includes('dark_elixir')) return 'dark_elixir_troop';
    if (str.includes('super_troop') || str.includes('super')) return 'super_troop';
    if (str.includes('elixir_troop') || str.includes('elixir')) return 'elixir_troop';
    if (str.includes('equipment')) return 'hero_equipment';
    if (str.includes('trap')) return 'trap';
    if (str.includes('resource')) return 'resource_building';
    return str as SubCategory;
  }

  /**
   * Normalize resource names
   */
  static normalizeResource(rawRes: unknown): ResourceCostType {
    if (!rawRes) return 'elixir';
    const str = String(rawRes).toLowerCase().trim().replace(/[\s-]+/g, '_');
    if (str.includes('dark') || str === 'de') return 'dark_elixir';
    if (str.includes('builder_gold')) return 'builder_gold';
    if (str.includes('builder_elixir')) return 'builder_elixir';
    if (str.includes('capital')) return 'capital_gold';
    if (str.includes('shiny')) return 'shiny_ore';
    if (str.includes('glowy')) return 'glowy_ore';
    if (str.includes('starry')) return 'starry_ore';
    if (str.includes('gem')) return 'gems';
    if (str.includes('free') || str === '0' || str === 'none') return 'free';
    if (str.includes('gold')) return 'gold';
    if (str.includes('elixir')) return 'elixir';
    return 'elixir';
  }

  /**
   * Parse readable duration into seconds
   */
  static parseTimeStringToSeconds(timeStr?: string): number {
    if (!timeStr) return 0;
    const clean = timeStr.toLowerCase().trim();
    if (clean === 'none' || clean === 'instant' || clean === '0' || clean === '0s') return 0;

    let totalSeconds = 0;
    const daysMatch = clean.match(/(\d+)\s*d/);
    const hoursMatch = clean.match(/(\d+)\s*h/);
    const minsMatch = clean.match(/(\d+)\s*m/);
    const secsMatch = clean.match(/(\d+)\s*s/);

    if (daysMatch) totalSeconds += parseInt(daysMatch[1], 10) * 86400;
    if (hoursMatch) totalSeconds += parseInt(hoursMatch[1], 10) * 3600;
    if (minsMatch) totalSeconds += parseInt(minsMatch[1], 10) * 60;
    if (secsMatch) totalSeconds += parseInt(secsMatch[1], 10);

    return totalSeconds;
  }

  /**
   * Format seconds to human-readable string
   */
  static formatSecondsToTimeString(seconds: number): string {
    if (!seconds || seconds <= 0) return 'Instant';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0 && days === 0) parts.push(`${mins}m`);

    return parts.length > 0 ? parts.join(' ') : `${seconds}s`;
  }

  /**
   * Helper to deduplicate array of strings
   */
  private static deduplicateStringArray(arr?: unknown[]): string[] {
    if (!arr || !Array.isArray(arr)) return [];
    const set = new Set<string>();
    for (const item of arr) {
      if (typeof item === 'string' && item.trim()) {
        set.add(item.trim());
      }
    }
    return Array.from(set);
  }
}
