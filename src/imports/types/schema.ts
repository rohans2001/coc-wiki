import { EntityType, ResourceCostType } from '../../types/entity';

/**
 * Standard Centralized Constant Definitions
 */
export const VALID_ENTITY_TYPES: readonly EntityType[] = [
  'troop',
  'hero',
  'spell',
  'defense',
  'building',
  'pet',
  'equipment',
  'siege',
  'resource',
  'mechanic'
] as const;

export const VALID_RESOURCE_TYPES: readonly ResourceCostType[] = [
  'gold',
  'elixir',
  'dark_elixir',
  'builder_gold',
  'builder_elixir',
  'capital_gold',
  'shiny_ore',
  'glowy_ore',
  'starry_ore',
  'gems',
  'free'
] as const;

export const VALID_RELATIONSHIP_TYPES = [
  'related',
  'unlocks',
  'upgraded_by',
  'equipment_for',
  'pet_for',
  'ability',
  'compatible_with',
  'counters',
  'synergizes_with'
] as const;

export type RelationshipType = typeof VALID_RELATIONSHIP_TYPES[number];

export type ImportStatus =
  | 'pending'
  | 'validating'
  | 'preview'
  | 'processing'
  | 'completed'
  | 'completed_with_warnings'
  | 'failed'
  | 'rolled_back';

export type ErrorSeverity = 'error' | 'warning' | 'info';

export type ImportMode = 'merge' | 'replace' | 'sync' | 'preview';

/**
 * Source attribution metadata in import files
 */
export interface ImportSourceMeta {
  name: string;
  url?: string;
  license?: string;
  attribution?: string;
}

/**
 * Flexible Stat definition in import payloads
 */
export interface ImportStatV1 {
  statKey?: string;
  stat_key?: string;
  statValue?: string | number | boolean;
  stat_value?: string | number | boolean;
  unit?: string;
  displayName?: string;
  display_name?: string;
  displayOrder?: number;
  display_order?: number;
}

/**
 * Level definition in import payloads
 */
export interface ImportLevelV1 {
  level: number;
  requiredTownHall?: number;
  required_town_hall?: number;
  upgradeCost?: number | string;
  upgrade_cost?: number | string;
  upgradeResource?: string;
  upgrade_resource?: string;
  upgradeCurrency?: string;
  upgrade_currency?: string;
  upgradeTime?: string;
  upgrade_time?: string;
  upgradeTimeSeconds?: number;
  upgrade_time_seconds?: number;
  hitpoints?: number | string;
  damagePerSecond?: number | string;
  damage_per_second?: number | string;
  damagePerAttack?: number | string;
  damage_per_attack?: number | string;
  damagePerShot?: number | string;
  damage_per_shot?: number | string;
  healingPerSecond?: number | string;
  healing_per_second?: number | string;
  boostPercent?: number | string;
  boost_percent?: number | string;
  durationSeconds?: number | string;
  duration_seconds?: number | string;
  regenerationTimeMinutes?: number | string;
  regeneration_time_minutes?: number | string;
  requiredLaboratoryLevel?: number | string;
  required_laboratory_level?: number | string;
  abilityLevel?: number | string;
  ability_level?: number | string;
  abilityName?: string;
  ability_name?: string;
  stats?: Record<string, string | number> | ImportStatV1[];
}

/**
 * Requirement definition in import payloads
 */
export interface ImportRequirementV1 {
  requirementType?: string;
  requirement_type?: string;
  requirementKey?: string;
  requirement_key?: string;
  requirementValue?: string | number;
  requirement_value?: string | number;
  description?: string;
}

/**
 * Relationship definition in import payloads
 */
export interface ImportRelationshipV1 {
  relatedEntitySlug?: string;
  related_entity_slug?: string;
  relatedEntityId?: string;
  related_entity_id?: string;
  relationshipType: string;
  relationship_type?: string;
  displayOrder?: number;
  display_order?: number;
}

/**
 * Complete Entity representation in standard import file (v1.0)
 */
export interface ImportEntityV1 {
  name: string;
  slug?: string;
  entityType?: string;
  entity_type?: string;
  category?: string;
  subcategory?: string;
  subCategory?: string;
  summary?: string;
  tagline?: string;
  description?: string;
  imageUrl?: string;
  image_url?: string;
  iconUrl?: string;
  icon_url?: string;
  unlockTownHall?: number | string;
  unlock_town_hall?: number | string;
  unlockRequirementText?: string;
  unlock_requirement_text?: string;
  maxLevel?: number | string;
  max_level?: number | string;
  isFeatured?: boolean;
  is_featured?: boolean;
  isActive?: boolean;
  is_active?: boolean;
  trivia?: string[];
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
  synergies?: string[];
  stats?: Record<string, string | number | boolean> | ImportStatV1[];
  levels?: ImportLevelV1[];
  requirements?: ImportRequirementV1[];
  relationships?: ImportRelationshipV1[];
  source?: ImportSourceMeta;
}

/**
 * Full Standard Versioned Import Document (v1.0)
 */
export interface ImportDocumentV1 {
  version: string;
  source: ImportSourceMeta;
  exportedAt?: string;
  exported_at?: string;
  entities: ImportEntityV1[];
  metadata?: Record<string, unknown>;
}

/**
 * Normalized internal entity format ready for DB ingestion
 */
export interface NormalizedEntityRecord {
  id: string;
  name: string;
  slug: string;
  entity_type: EntityType;
  category: string;
  subcategory: string | null;
  summary: string;
  description: string;
  image_url: string | null;
  icon_url: string | null;
  unlock_town_hall: number;
  unlock_requirement_text: string | null;
  max_level: number;
  is_featured: boolean;
  is_active: boolean;
  trivia: string[];
  tips: string[];
  strengths: string[];
  weaknesses: string[];
  synergies: string[];
  stats: {
    stat_key: string;
    stat_value: string;
    unit: string | null;
    display_name: string;
    display_order: number;
  }[];
  levels: {
    level: number;
    required_town_hall: number;
    upgrade_cost: number;
    upgrade_resource: ResourceCostType;
    upgrade_time_seconds: number;
    upgrade_time_formatted: string;
    hitpoints?: number;
    damage_per_second?: number;
    damage_per_attack?: number;
    damage_per_shot?: number;
    healing_per_second?: number;
    boost_percent?: number;
    duration_seconds?: number;
    regeneration_time_minutes?: number;
    required_laboratory_level?: number;
    ability_level?: number;
    ability_name?: string;
    stats: {
      stat_key: string;
      stat_value: string;
      unit: string | null;
      display_name: string;
    }[];
  }[];
  requirements: {
    requirement_type: string;
    requirement_key: string;
    requirement_value: string;
    description: string | null;
  }[];
  relationships: {
    related_entity_slug: string;
    relationship_type: string;
    display_order: number;
  }[];
  source?: ImportSourceMeta;
}

/**
 * Validation error / warning structure
 */
export interface ValidationError {
  entity?: string;
  entityIndex?: number;
  field: string;
  error: string;
  message?: string;
  severity: ErrorSeverity;
  suggestedFix?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  totalEntities: number;
  validEntities: number;
  invalidEntities: number;
}

/**
 * Change detection field diff
 */
export interface FieldDiff {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

/**
 * Change diff for a single entity
 */
export interface EntityChangeDiff {
  entitySlug: string;
  entityName: string;
  entityType: string;
  status: 'new' | 'updated' | 'unchanged' | 'invalid';
  fieldDiffs: FieldDiff[];
  levelsToCreate: number;
  levelsToUpdate: number;
  levelsUnchanged: number;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Change detection preview report
 */
export interface ImportPreviewReport {
  version: string;
  source: ImportSourceMeta;
  totalEntities: number;
  newEntities: number;
  updatedEntities: number;
  unchangedEntities: number;
  invalidEntities: number;
  totalLevels: number;
  levelsToCreate: number;
  levelsToUpdate: number;
  levelsUnchanged: number;
  entityDiffs: EntityChangeDiff[];
  errors: ValidationError[];
  warnings: ValidationError[];
  generatedAt: string;
}

/**
 * Import execution options
 */
export interface ImportExecutionOptions {
  mode?: ImportMode; // default: 'merge'
  dryRun?: boolean;
  skipValidationErrors?: boolean;
  importBy?: string;
}

/**
 * Import execution final summary report
 */
export interface ImportExecutionResult {
  importHistoryId: string;
  status: ImportStatus;
  startedAt: string;
  completedAt: string;
  durationMs: number;
  totalEntities: number;
  createdEntities: number;
  updatedEntities: number;
  unchangedEntities: number;
  failedEntities: number;
  totalLevels: number;
  createdLevels: number;
  updatedLevels: number;
  importedEntitySlugs: string[];
  errors: ValidationError[];
  warnings: ValidationError[];
  metadata?: Record<string, unknown>;
}

/**
 * Stored database import history record
 */
export interface DbImportHistory {
  id: string;
  source_name: string;
  dataset_version: string;
  status: ImportStatus;
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
  warnings: ValidationError[];
  errors: ValidationError[];
  metadata: Record<string, unknown>;
  created_at: string;
}
