import { RawEntityImport } from '../types';
import { DbEntity, EntityType, SubCategory } from '../../types/entity';

export class EntityNormalizer {
  /**
   * Helper to slugify a string
   */
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Normalize a raw import object into a clean structured DbEntity
   */
  static normalize(raw: RawEntityImport): {
    entity: DbEntity;
    stats?: RawEntityImport['stats'];
    levels?: RawEntityImport['levels'];
    requirements?: RawEntityImport['requirements'];
    relationships?: RawEntityImport['relationships'];
    sources?: RawEntityImport['sources'];
  } {
    const slug = raw.slug ? this.slugify(raw.slug) : this.slugify(raw.name);
    const entityType = (raw.entity_type || raw.category || 'troop').toLowerCase() as EntityType;
    const id = raw.id || `${entityType}-${slug}`;

    const unlockTh = Number(raw.unlock_town_hall) || 1;
    const maxLvl = Number(raw.max_level) || (raw.levels ? raw.levels.length : 1);

    const now = new Date().toISOString();

    const entity: DbEntity = {
      id,
      name: raw.name.trim(),
      slug,
      entity_type: entityType,
      category: entityType,
      subcategory: (raw.subcategory as SubCategory) || null,
      summary: raw.summary || raw.tagline || raw.description?.slice(0, 120) || null,
      description: raw.description?.trim() || null,
      image_url: raw.image_url || null,
      icon_url: raw.icon_url || null,
      unlock_town_hall: unlockTh,
      unlock_requirement_text: raw.unlock_requirement_text || `Unlocked at Town Hall ${unlockTh}`,
      max_level: maxLvl,
      is_featured: Boolean(raw.is_featured),
      is_active: raw.is_active !== undefined ? Boolean(raw.is_active) : true,
      trivia: Array.isArray(raw.trivia) ? raw.trivia : [],
      tips: Array.isArray(raw.tips) ? raw.tips : [],
      strengths: Array.isArray(raw.strengths) ? raw.strengths : [],
      weaknesses: Array.isArray(raw.weaknesses) ? raw.weaknesses : [],
      synergies: Array.isArray(raw.synergies) ? raw.synergies : [],
      created_at: now,
      updated_at: now
    };

    return {
      entity,
      stats: raw.stats,
      levels: raw.levels,
      requirements: raw.requirements,
      relationships: raw.relationships,
      sources: raw.sources
    };
  }
}
