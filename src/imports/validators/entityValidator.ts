import { RawEntityImport, ValidationError, ValidationResult } from '../types';
import { EntityType } from '../../types/entity';

const VALID_ENTITY_TYPES: EntityType[] = [
  'troop',
  'hero',
  'spell',
  'defense',
  'building',
  'equipment',
  'pet',
  'siege',
  'resource',
  'mechanic'
];

export class EntityValidator {
  /**
   * Validate a raw entity import and its sub-structures
   */
  static validate(raw: RawEntityImport, existingSlugs: Set<string> = new Set()): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    // 1. Entity Name Validation
    if (!raw.name || typeof raw.name !== 'string' || raw.name.trim() === '') {
      errors.push({ field: 'name', message: 'Entity name is required and cannot be empty.' });
    }

    // 2. Entity Type Validation
    const type = (raw.entity_type || raw.category || '').toLowerCase();
    if (!type) {
      errors.push({ field: 'entity_type', message: 'Entity type is required.' });
    } else if (!VALID_ENTITY_TYPES.includes(type as EntityType)) {
      errors.push({
        field: 'entity_type',
        message: `Invalid entity type "${type}". Allowed types: ${VALID_ENTITY_TYPES.join(', ')}.`,
        value: type
      });
    }

    // 3. Slug & Duplicate Check
    const slug = (raw.slug || raw.name || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    if (!slug) {
      errors.push({ field: 'slug', message: 'Entity slug could not be generated.' });
    } else if (existingSlugs.has(slug)) {
      errors.push({
        field: 'slug',
        message: `Duplicate slug "${slug}". An entity with this slug already exists.`,
        value: slug
      });
    }

    // 4. Town Hall Requirement Validation
    if (raw.unlock_town_hall !== undefined) {
      const th = Number(raw.unlock_town_hall);
      if (isNaN(th) || th < 1 || th > 17 || !Number.isInteger(th)) {
        errors.push({
          field: 'unlock_town_hall',
          message: `Invalid Town Hall unlock level "${raw.unlock_town_hall}". Must be an integer between 1 and 17.`,
          value: raw.unlock_town_hall
        });
      }
    }

    // 5. Upgrade Levels Validation
    if (raw.levels && Array.isArray(raw.levels)) {
      const seenLevels = new Set<number>();
      raw.levels.forEach((lvl, idx) => {
        if (typeof lvl.level !== 'number' || lvl.level < 1 || !Number.isInteger(lvl.level)) {
          errors.push({
            field: `levels[${idx}].level`,
            message: `Invalid level number "${lvl.level}". Must be a positive integer.`,
            value: lvl.level
          });
        } else if (seenLevels.has(lvl.level)) {
          errors.push({
            field: `levels[${idx}].level`,
            message: `Duplicate upgrade level "${lvl.level}" found in level array.`,
            value: lvl.level
          });
        } else {
          seenLevels.add(lvl.level);
        }

        if (lvl.required_town_hall !== undefined) {
          const reqTh = Number(lvl.required_town_hall);
          if (isNaN(reqTh) || reqTh < 1 || reqTh > 17) {
            errors.push({
              field: `levels[${idx}].required_town_hall`,
              message: `Invalid Town Hall requirement "${lvl.required_town_hall}" at level ${lvl.level}. Must be 1-17.`,
              value: lvl.required_town_hall
            });
          }
        }

        if (lvl.upgrade_cost !== undefined && lvl.upgrade_cost < 0) {
          errors.push({
            field: `levels[${idx}].upgrade_cost`,
            message: `Upgrade cost cannot be negative at level ${lvl.level}.`,
            value: lvl.upgrade_cost
          });
        }

        if (lvl.upgrade_time_seconds !== undefined && lvl.upgrade_time_seconds < 0) {
          errors.push({
            field: `levels[${idx}].upgrade_time_seconds`,
            message: `Upgrade time cannot be negative at level ${lvl.level}.`,
            value: lvl.upgrade_time_seconds
          });
        }
      });
    }

    // 6. Warnings for missing recommended fields
    if (!raw.description) {
      warnings.push('Description is missing; fallback summary will be used.');
    }
    if (!raw.image_url) {
      warnings.push('image_url is missing; default placeholder visual will be displayed.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}
