export type EntityType = 
  | 'troop'
  | 'hero'
  | 'spell'
  | 'defense'
  | 'building'
  | 'equipment'
  | 'pet'
  | 'siege'
  | 'resource'
  | 'mechanic';

export type SubCategory = 
  | 'elixir_troop'
  | 'dark_elixir_troop'
  | 'super_troop'
  | 'elixir_spell'
  | 'dark_spell'
  | 'defense'
  | 'trap'
  | 'hero_common_equipment'
  | 'hero_epic_equipment'
  | 'hero_equipment'
  | 'hero_pet'
  | 'siege_machine'
  | 'economy'
  | 'resource_building'
  | 'army_building'
  | 'gameplay_rule'
  | (string & {});

export type ResourceCostType = 
  | 'elixir'
  | 'dark_elixir'
  | 'gold'
  | 'builder_gold'
  | 'builder_elixir'
  | 'capital_gold'
  | 'shiny_ore'
  | 'glowy_ore'
  | 'starry_ore'
  | 'gems'
  | 'free'
  | (string & {});

export type TargetType = 
  | 'Ground'
  | 'Air'
  | 'Ground & Air'
  | 'Defenses'
  | 'Resources'
  | 'Heroes'
  | 'Walls'
  | 'Buildings'
  | 'Any'
  | (string & {});

export type DamageType = 
  | 'Single Target'
  | 'Area Splash'
  | 'Chain Lightning'
  | 'Radial Aura'
  | 'Bouncing'
  | 'Passive Buff'
  | 'None'
  | (string & {});

export interface DataProvenance {
  sourceName: string;
  sourceUrl: string;
  license: string;
  attribution: string;
  retrievedAt: string;
  lastVerifiedAt: string;
}

export interface BaseEntity {
  id: string;
  name: string;
  slug: string;
  category: EntityType;
  subCategory?: SubCategory;
  tagline: string;
  description: string;
  unlockTownHall: number;
  unlockRequirementText?: string;
  image: string;
  bannerImage?: string;
  iconName?: string;
  provenance: DataProvenance;
  trivia?: string[];
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
  synergies?: string[];
  maxLevel: number;
}

export interface UpgradeLevel {
  level: number;
  hitpoints?: number;
  damagePerSecond?: number;
  damagePerAttack?: number;
  damagePerShot?: number;
  regenerationTimeMinutes?: number;
  abilityLevel?: number;
  abilityName?: string;
  healingPerSecond?: number;
  boostPercent?: number;
  speedBoost?: number;
  durationSeconds?: number;
  upgradeCost: number;
  upgradeCurrency: ResourceCostType;
  upgradeTime: string;
  upgradeTimeSeconds: number;
  requiredTownHall: number;
  requiredLaboratoryLevel?: number;
  requiredPetHouseLevel?: number;
  requiredBlacksmithLevel?: number;
}

export interface TroopEntity extends BaseEntity {
  category: 'troop';
  housingSpace: number;
  movementSpeed: number;
  attackSpeed: number; // in seconds
  range: number; // in tiles
  targetType: TargetType;
  damageType: DamageType;
  favoriteTarget: string;
  trainingTimeSeconds: number;
  barracksLevelRequired: number;
  upgradeLevels: UpgradeLevel[];
  superTroopVariantId?: string;
}

export interface HeroEntity extends BaseEntity {
  category: 'hero';
  altarSize: string; // e.g. "3x3"
  movementSpeed: number;
  attackSpeed: number;
  range: number;
  targetType: TargetType;
  damageType: DamageType;
  favoriteTarget: string;
  patrolRadius: number;
  altarCost: number;
  altarCurrency: ResourceCostType;
  defaultAbilityName: string;
  defaultAbilityDescription: string;
  compatibleEquipmentSlugs?: string[];
  compatiblePetSlugs?: string[];
  upgradeLevels: UpgradeLevel[];
}

export interface SpellEntity extends BaseEntity {
  category: 'spell';
  housingSpace: number;
  radius: number; // tiles
  durationSeconds?: number;
  numberOfStrikes?: number;
  spellFactoryLevelRequired: number;
  targetType: TargetType;
  effectType: string;
  brewingTimeSeconds: number;
  upgradeLevels: UpgradeLevel[];
}

export interface DefenseEntity extends BaseEntity {
  category: 'defense';
  size: string; // e.g. "3x3"
  range: string | number; // e.g. "9 tiles" or "7-14 tiles (Mortar)"
  attackSpeed: number;
  targetType: TargetType;
  damageType: DamageType;
  favoriteTarget: string;
  burstCount?: number;
  modes?: string[]; // e.g. ["Single-Target", "Multi-Target"]
  isSignatureDefense?: boolean;
  upgradeLevels: UpgradeLevel[];
}

export interface EquipmentEntity extends BaseEntity {
  category: 'equipment';
  heroSlug: string;
  rarity: 'Common' | 'Epic';
  equipmentType: 'Active' | 'Passive';
  blacksmithLevelRequired: number;
  abilityDescription: string;
  heroBoosts: {
    stat: string;
    description: string;
  }[];
  upgradeLevels: UpgradeLevel[];
}

export interface PetEntity extends BaseEntity {
  category: 'pet';
  petHouseLevelRequired: number;
  favoriteTarget: string;
  damageType: DamageType;
  targetType: TargetType;
  movementSpeed: number;
  attackSpeed: number;
  range: number;
  specialSkillName: string;
  specialSkillDescription: string;
  upgradeLevels: UpgradeLevel[];
}

export interface SiegeEntity extends BaseEntity {
  category: 'siege';
  housingSpace: number; // usually 1
  siegeWorkshopLevelRequired: number;
  movementSpeed: number;
  attackSpeed: number;
  range: number;
  targetType: TargetType;
  damageType: DamageType;
  favoriteTarget: string;
  lifetimeSeconds?: number;
  upgradeLevels: UpgradeLevel[];
}

export interface GameMechanicEntity extends BaseEntity {
  category: 'mechanic';
  topic: string;
  summary: string;
  rules: { title: string; explanation: string }[];
  formulas?: { name: string; formula: string; example: string }[];
}

export type AnyEntity = 
  | TroopEntity 
  | HeroEntity 
  | SpellEntity 
  | DefenseEntity 
  | EquipmentEntity 
  | PetEntity 
  | SiegeEntity 
  | GameMechanicEntity 
  | BaseEntity;

// ==========================================
// RELATIONAL DATABASE SCHEMA INTERFACES
// ==========================================

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  entity_type: EntityType;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbEntity {
  id: string;
  name: string;
  slug: string;
  entity_type: EntityType;
  category: string;
  subcategory: SubCategory | null;
  summary: string | null;
  description: string | null;
  image_url: string | null;
  icon_url: string | null;
  unlock_town_hall: number;
  unlock_requirement_text: string | null;
  max_level: number;
  is_featured: boolean;
  is_active: boolean;
  trivia?: string[];
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
  synergies?: string[];
  created_at: string;
  updated_at: string;
}

export interface DbEntityStat {
  id: string;
  entity_id: string;
  stat_key: string;
  stat_value: string;
  unit: string | null;
  display_name: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbEntityLevel {
  id: string;
  entity_id: string;
  level: number;
  required_town_hall: number;
  upgrade_cost: number;
  upgrade_resource: ResourceCostType;
  upgrade_time_seconds: number;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbEntityLevelStat {
  id: string;
  entity_level_id: string;
  stat_key: string;
  stat_value: string;
  unit: string | null;
  display_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbEntityRequirement {
  id: string;
  entity_id: string;
  requirement_type: string;
  requirement_key: string;
  requirement_value: string;
  description: string | null;
  created_at?: string;
}

export interface DbEntityRelationship {
  id: string;
  entity_id: string;
  related_entity_id: string;
  relationship_type: 'related' | 'unlocks' | 'upgraded_by' | 'evolved_from' | 'compatible_with' | 'ability' | 'equipment_for' | 'pet_for' | 'synergy_with' | 'counters' | string;
  display_order: number;
  created_at?: string;
}

export interface DbSource {
  id: string;
  name: string;
  base_url: string | null;
  license: string | null;
  attribution_text: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbEntitySource {
  id: string;
  entity_id: string;
  source_id: string | null;
  source_url: string | null;
  license: string | null;
  attribution: string | null;
  retrieved_at: string;
  last_verified_at: string;
}

export interface EntityDetailRecord extends BaseEntity {
  dbStats?: DbEntityStat[];
  dbLevels?: (DbEntityLevel & { stats: DbEntityLevelStat[] })[];
  requirements?: DbEntityRequirement[];
  relationships?: (DbEntityRelationship & { relatedEntity?: AnyEntity })[];
  sources?: (DbEntitySource & { sourceMeta?: DbSource })[];
  updatedAt?: string;
  createdAt?: string;
}

export interface RecentlyUpdatedEntity {
  id: string;
  name: string;
  slug: string;
  category: EntityType;
  summary: string;
  image: string;
  updatedAt: string;
  unlockTownHall: number;
}

export interface DbImportHistory {
  id: string;
  source_name: string;
  dataset_version: string;
  status: 'pending' | 'validating' | 'preview' | 'processing' | 'completed' | 'completed_with_warnings' | 'failed' | 'rolled_back';
  started_at: string;
  completed_at: string | null;
  total_entities: number;
  created_entities: number;
  updated_entities: number;
  unchanged_entities: number;
  failed_entities: number;
  total_levels: number;
  created_levels: number;
  updated_levels: number;
  warnings: any[];
  errors: any[];
  metadata: Record<string, unknown>;
  created_at: string;
}


