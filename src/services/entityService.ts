import { 
  AnyEntity, EntityType, TroopEntity, HeroEntity, SpellEntity, DefenseEntity, 
  EntityDetailRecord, RecentlyUpdatedEntity, DbEntityStat, DbEntityLevel, 
  DbEntityLevelStat, DbEntityRequirement, DbEntityRelationship, DbEntitySource
} from '../types/entity';
import { FilterState } from '../types/search';
import { DatabaseAdapter, dbStore } from '../db/database';
import { TROOPS_DATA } from '../data/troops';
import { HEROES_DATA } from '../data/heroes';
import { SPELLS_DATA } from '../data/spells';
import { DEFENSES_DATA } from '../data/defenses';
import { EQUIPMENT_DATA } from '../data/equipment';
import { PETS_DATA } from '../data/pets';
import { SIEGES_DATA } from '../data/sieges';
import { MECHANICS_DATA } from '../data/mechanics';

export class EntityService {
  /**
   * Static aggregate entity cache loaded from database store
   */
  private static get allEntitiesList(): AnyEntity[] {
    return [
      ...TROOPS_DATA,
      ...HEROES_DATA,
      ...DEFENSES_DATA,
      ...SPELLS_DATA,
      ...EQUIPMENT_DATA,
      ...PETS_DATA,
      ...SIEGES_DATA,
      ...MECHANICS_DATA
    ];
  }

  /**
   * Synchronous retrieval of all entities
   */
  static getAllEntities(): AnyEntity[] {
    return this.allEntitiesList;
  }

  /**
   * Asynchronous retrieval from database layer
   */
  static async getAllEntitiesAsync(): Promise<AnyEntity[]> {
    const dbEntities = await DatabaseAdapter.getAllEntities();
    if (dbEntities && dbEntities.length > 0) {
      // Map database records to AnyEntity shape
      return dbEntities.map((dbE) => {
        const found = this.allEntitiesList.find((e) => e.slug.toLowerCase() === dbE.slug.toLowerCase());
        return found || ({
          id: dbE.id,
          name: dbE.name,
          slug: dbE.slug,
          category: dbE.entity_type,
          subCategory: dbE.subcategory || undefined,
          tagline: dbE.summary || '',
          description: dbE.description || '',
          unlockTownHall: dbE.unlock_town_hall,
          unlockRequirementText: dbE.unlock_requirement_text || undefined,
          image: dbE.image_url || '',
          iconName: dbE.icon_url || undefined,
          maxLevel: dbE.max_level,
          trivia: dbE.trivia,
          tips: dbE.tips,
          strengths: dbE.strengths,
          weaknesses: dbE.weaknesses,
          synergies: dbE.synergies,
          provenance: {
            sourceName: 'Clash Archive Database',
            sourceUrl: 'https://supercell.com/en/games/clashofclans/',
            license: 'Fair Use',
            attribution: 'Supercell Oy & Clash Archive',
            retrievedAt: dbE.created_at,
            lastVerifiedAt: dbE.updated_at
          }
        } as AnyEntity);
      });
    }
    return this.allEntitiesList;
  }

  /**
   * Filter entities by category and query parameters
   */
  static getEntitiesByCategory(
    category: EntityType,
    filters?: Partial<FilterState>
  ): AnyEntity[] {
    let list = this.allEntitiesList.filter((e) => e.category === category);

    if (!filters) return list;

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q)
      );
    }

    if (filters.townHallLevel && filters.townHallLevel !== 'all') {
      const th = Number(filters.townHallLevel);
      list = list.filter((e) => e.unlockTownHall <= th);
    }

    if (filters.subCategory && filters.subCategory !== 'all') {
      list = list.filter((e) => e.subCategory === filters.subCategory);
    }

    if (filters.targetType && filters.targetType !== 'all') {
      list = list.filter((e) => {
        const target = (e as TroopEntity | HeroEntity | DefenseEntity).targetType;
        return target && target.toLowerCase().includes((filters.targetType as string).toLowerCase());
      });
    }

    if (filters.sortBy) {
      list = [...list].sort((a, b) => {
        const dir = filters.sortDirection === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'name':
            return dir * a.name.localeCompare(b.name);
          case 'unlockTownHall':
            return dir * (a.unlockTownHall - b.unlockTownHall);
          case 'maxLevel':
            return dir * (a.maxLevel - b.maxLevel);
          case 'housingSpace': {
            const hA = (a as TroopEntity).housingSpace || 0;
            const hB = (b as TroopEntity).housingSpace || 0;
            return dir * (hA - hB);
          }
          default:
            return 0;
        }
      });
    }

    return list;
  }

  /**
   * Retrieve entities by entity type
   */
  static getEntitiesByType(type: EntityType): AnyEntity[] {
    return this.allEntitiesList.filter((e) => e.category === type);
  }

  /**
   * Lookup entity by slug and category
   */
  static getEntityBySlug(category: EntityType, slug: string): AnyEntity | undefined {
    return this.allEntitiesList.find(
      (e) => e.category === category && e.slug.toLowerCase() === slug.toLowerCase()
    );
  }

  /**
   * Lookup entity by slug across all categories
   */
  static getEntityByAnySlug(slug: string): AnyEntity | undefined {
    return this.allEntitiesList.find((e) => e.slug.toLowerCase() === slug.toLowerCase());
  }

  /**
   * Retrieve full relational details for an entity
   */
  static async getEntityDetailsAsync(slug: string): Promise<EntityDetailRecord | null> {
    const baseEntity = this.getEntityByAnySlug(slug);
    if (!baseEntity) return null;

    const [dbStats, dbLevels, requirements, relationships, sources] = await Promise.all([
      DatabaseAdapter.getEntityStats(baseEntity.id),
      DatabaseAdapter.getEntityLevels(baseEntity.id),
      DatabaseAdapter.getEntityRequirements(baseEntity.id),
      DatabaseAdapter.getEntityRelationships(baseEntity.id),
      DatabaseAdapter.getEntitySources(baseEntity.id)
    ]);

    const enrichedRelationships = relationships.map((r) => ({
      ...r,
      relatedEntity: this.allEntitiesList.find((e) => e.id === r.related_entity_id)
    }));

    return {
      ...baseEntity,
      dbStats,
      dbLevels,
      requirements,
      relationships: enrichedRelationships,
      sources,
      updatedAt: '2026-08-27T08:00:00Z',
      createdAt: '2026-08-20T00:00:00Z'
    };
  }

  /**
   * Fetch featured entities for home spotlights
   */
  static getFeaturedEntities(): {
    featuredTroops: TroopEntity[];
    featuredHeroes: HeroEntity[];
    featuredSpells: SpellEntity[];
    featuredDefenses: DefenseEntity[];
  } {
    return {
      featuredTroops: TROOPS_DATA.slice(0, 4),
      featuredHeroes: HEROES_DATA.slice(0, 4),
      featuredSpells: SPELLS_DATA.slice(0, 3),
      featuredDefenses: DEFENSES_DATA.slice(0, 3)
    };
  }

  /**
   * Fetch recently updated entities sorted by update timestamp
   */
  static getRecentlyUpdatedEntities(limit: number = 4): RecentlyUpdatedEntity[] {
    const recent = Array.from(dbStore.entities.values())
      .filter((e) => e.is_active)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit);

    return recent.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      category: r.entity_type,
      summary: r.summary || r.description?.slice(0, 100) || '',
      image: r.image_url || '',
      updatedAt: r.updated_at,
      unlockTownHall: r.unlock_town_hall
    }));
  }

  /**
   * Get related entities based on relationships or shared Town Hall / Category
   */
  static getRelatedEntities(entity: AnyEntity, limit: number = 4): AnyEntity[] {
    // Check explicit relationships first
    const explicitRelIds = dbStore.entityRelationships
      .filter((r) => r.entity_id === entity.id)
      .map((r) => r.related_entity_id);

    const explicitMatches = this.allEntitiesList.filter((e) => explicitRelIds.includes(e.id));
    if (explicitMatches.length >= limit) {
      return explicitMatches.slice(0, limit);
    }

    const fallbackMatches = this.allEntitiesList
      .filter((e) => e.id !== entity.id && (e.category === entity.category || e.unlockTownHall === entity.unlockTownHall))
      .filter((e) => !explicitMatches.some((m) => m.id === e.id));

    return [...explicitMatches, ...fallbackMatches].slice(0, limit);
  }

  /**
   * Live platform statistics computed from the relational database store
   */
  static getPlatformStats() {
    const totalEntities = dbStore.entities.size;
    const totalTroops = TROOPS_DATA.length;
    const totalHeroes = HEROES_DATA.length;
    const totalSpells = SPELLS_DATA.length;
    const totalDefenses = DEFENSES_DATA.length;
    const totalEquipment = EQUIPMENT_DATA.length;
    const totalPets = PETS_DATA.length;

    return {
      totalEntities,
      totalTroops,
      totalHeroes,
      totalSpells,
      totalDefenses,
      totalEquipment,
      totalPets,
      maxTownHall: 17
    };
  }

  /**
   * Direct relational sub-record accessors
   */
  static async getEntityLevels(entityId: string): Promise<(DbEntityLevel & { stats: DbEntityLevelStat[] })[]> {
    return DatabaseAdapter.getEntityLevels(entityId);
  }

  static async getEntityStats(entityId: string): Promise<DbEntityStat[]> {
    return DatabaseAdapter.getEntityStats(entityId);
  }

  static async getEntityRequirements(entityId: string): Promise<DbEntityRequirement[]> {
    return DatabaseAdapter.getEntityRequirements(entityId);
  }

  static async getEntityRelationships(entityId: string): Promise<DbEntityRelationship[]> {
    return DatabaseAdapter.getEntityRelationships(entityId);
  }

  static async getEntitySources(entityId: string): Promise<DbEntitySource[]> {
    return DatabaseAdapter.getEntitySources(entityId);
  }
}
