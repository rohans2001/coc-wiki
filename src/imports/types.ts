import { EntityType, SubCategory, ResourceCostType } from '../types/entity';

export interface RawEntityImport {
  id?: string;
  name: string;
  slug?: string;
  entity_type: string;
  category?: string;
  subcategory?: string;
  summary?: string;
  tagline?: string;
  description?: string;
  image_url?: string;
  icon_url?: string;
  unlock_town_hall?: number | string;
  unlock_requirement_text?: string;
  max_level?: number | string;
  is_featured?: boolean;
  is_active?: boolean;
  trivia?: string[];
  tips?: string[];
  strengths?: string[];
  weaknesses?: string[];
  synergies?: string[];
  stats?: {
    stat_key: string;
    stat_value: string | number;
    unit?: string;
    display_name: string;
    display_order?: number;
  }[];
  levels?: {
    level: number;
    required_town_hall: number;
    upgrade_cost?: number;
    upgrade_resource?: string;
    upgrade_time_seconds?: number;
    stats?: {
      stat_key: string;
      stat_value: string | number;
      unit?: string;
      display_name: string;
    }[];
  }[];
  requirements?: {
    requirement_type: string;
    requirement_key: string;
    requirement_value: string;
    description?: string;
  }[];
  relationships?: {
    related_entity_id: string;
    relationship_type: string;
    display_order?: number;
  }[];
  sources?: {
    source_id?: string;
    source_url?: string;
    license?: string;
    attribution?: string;
  }[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

export interface ImportReport {
  totalReceived: number;
  totalParsed: number;
  totalValid: number;
  totalRejected: number;
  importedEntityIds: string[];
  errors: { entityIndex: number; entityName?: string; errors: ValidationError[] }[];
  durationMs: number;
}
