import {
  ImportDocumentV1,
  ImportEntityV1,
  ImportLevelV1,
  ImportRequirementV1,
  ImportRelationshipV1,
  ValidationError,
  ValidationResult,
  VALID_ENTITY_TYPES,
  VALID_RESOURCE_TYPES,
  VALID_RELATIONSHIP_TYPES
} from '../types/schema';

export class SchemaValidator {
  /**
   * Validate entire import document across all stages
   */
  static validateDocument(doc: unknown): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Stage 1: Document Structure
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
      errors.push({
        field: 'root',
        error: 'Invalid JSON payload: Root must be an object containing "version", "source", and "entities".',
        severity: 'error',
        suggestedFix: 'Wrap entities in standard v1.0 schema: { version: "1.0", source: { name: "..." }, entities: [...] }'
      });
      return {
        isValid: false,
        errors,
        warnings,
        totalEntities: 0,
        validEntities: 0,
        invalidEntities: 0
      };
    }

    const payload = doc as Partial<ImportDocumentV1>;

    // Version Check
    if (!payload.version || typeof payload.version !== 'string') {
      errors.push({
        field: 'version',
        error: 'Missing or invalid schema version.',
        severity: 'error',
        suggestedFix: 'Specify "version": "1.0"'
      });
    }

    // Source Check
    if (!payload.source || typeof payload.source !== 'object' || !payload.source.name) {
      warnings.push({
        field: 'source',
        error: 'Source attribution name is missing or incomplete.',
        severity: 'warning',
        suggestedFix: 'Add source: { name: "Clash of Clans Official", license: "Fair Use" }'
      });
    }

    // Entities Array Check
    if (!payload.entities || !Array.isArray(payload.entities)) {
      errors.push({
        field: 'entities',
        error: '"entities" must be an array of entity objects.',
        severity: 'error',
        suggestedFix: 'Provide an array: "entities": [...]'
      });
      return {
        isValid: false,
        errors,
        warnings,
        totalEntities: 0,
        validEntities: 0,
        invalidEntities: 0
      };
    }

    if (payload.entities.length === 0) {
      warnings.push({
        field: 'entities',
        error: '"entities" array is empty. No records to import.',
        severity: 'warning',
        suggestedFix: 'Include at least one entity object in the entities array.'
      });
    }

    const seenBatchSlugs = new Set<string>();
    let validCount = 0;
    let invalidCount = 0;

    // Stage 2: Validate each Entity
    payload.entities.forEach((entity, index) => {
      const entityResult = this.validateEntity(entity, index, seenBatchSlugs);
      if (entityResult.errors.length > 0) {
        invalidCount++;
        errors.push(...entityResult.errors);
      } else {
        validCount++;
      }
      if (entityResult.warnings.length > 0) {
        warnings.push(...entityResult.warnings);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      totalEntities: payload.entities.length,
      validEntities: validCount,
      invalidEntities: invalidCount
    };
  }

  /**
   * Validate a single entity object
   */
  static validateEntity(
    entity: unknown,
    index: number,
    seenBatchSlugs: Set<string>
  ): { errors: ValidationError[]; warnings: ValidationError[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    if (!entity || typeof entity !== 'object') {
      errors.push({
        entityIndex: index,
        field: `entities[${index}]`,
        error: `Entity at index ${index} is not a valid JSON object.`,
        severity: 'error'
      });
      return { errors, warnings };
    }

    const raw = entity as Partial<ImportEntityV1>;
    const entityName = (raw.name || '').trim();
    const entitySlug = (raw.slug || this.generateSlug(entityName)).trim().toLowerCase();
    const entityType = ((raw.entityType || raw.entity_type || 'troop') as string).trim().toLowerCase();

    // 1. Name validation
    if (!entityName) {
      errors.push({
        entity: `Entity #${index + 1}`,
        entityIndex: index,
        field: `entities[${index}].name`,
        error: 'Entity name is required and cannot be empty.',
        severity: 'error',
        suggestedFix: 'Provide a name (e.g. "Barbarian", "Archer Queen")'
      });
    }

    // 2. Slug validation
    if (!entitySlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entitySlug)) {
      errors.push({
        entity: entityName || `Entity #${index + 1}`,
        entityIndex: index,
        field: `entities[${index}].slug`,
        error: `Invalid slug format "${entitySlug}". Slugs must be URL-safe lowercase alphanumeric characters separated by single hyphens.`,
        severity: 'error',
        suggestedFix: `Use slug "${this.generateSlug(entityName)}"`
      });
    }

    // Duplicate detection within the batch
    if (entitySlug) {
      if (seenBatchSlugs.has(entitySlug)) {
        errors.push({
          entity: entityName || entitySlug,
          entityIndex: index,
          field: `entities[${index}].slug`,
          error: `Duplicate entity slug "${entitySlug}" found in the same import dataset.`,
          severity: 'error',
          suggestedFix: 'Ensure every entity in the import batch has a unique slug.'
        });
      } else {
        seenBatchSlugs.add(entitySlug);
      }
    }

    // 3. Entity Type validation
    if (!VALID_ENTITY_TYPES.includes(entityType as any)) {
      errors.push({
        entity: entityName || entitySlug,
        entityIndex: index,
        field: `entities[${index}].entityType`,
        error: `Invalid entity type "${entityType}".`,
        severity: 'error',
        suggestedFix: `Allowed types: ${VALID_ENTITY_TYPES.join(', ')}`
      });
    }

    // 4. Town Hall constraints
    const unlockTh = Number(raw.unlockTownHall ?? raw.unlock_town_hall ?? 1);
    if (isNaN(unlockTh) || unlockTh < 1 || unlockTh > 17 || !Number.isInteger(unlockTh)) {
      errors.push({
        entity: entityName || entitySlug,
        entityIndex: index,
        field: `entities[${index}].unlockTownHall`,
        error: `Unlock Town Hall (${unlockTh}) must be an integer between 1 and 17.`,
        severity: 'error',
        suggestedFix: 'Set unlockTownHall to an integer between 1 and 17.'
      });
    }

    // 5. Max level constraints
    const maxLevel = Number(raw.maxLevel ?? raw.max_level ?? 1);
    if (isNaN(maxLevel) || maxLevel < 1 || !Number.isInteger(maxLevel)) {
      errors.push({
        entity: entityName || entitySlug,
        entityIndex: index,
        field: `entities[${index}].maxLevel`,
        error: `Max Level must be a positive integer >= 1.`,
        severity: 'error'
      });
    }

    // 6. Levels validation
    if (raw.levels && Array.isArray(raw.levels)) {
      const seenLevels = new Set<number>();

      raw.levels.forEach((lvl, lIdx) => {
        const levelNum = Number(lvl.level);
        if (isNaN(levelNum) || levelNum < 1 || !Number.isInteger(levelNum)) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].level`,
            error: `Level value must be a positive integer >= 1 (got "${lvl.level}").`,
            severity: 'error'
          });
        } else if (seenLevels.has(levelNum)) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].level`,
            error: `Duplicate level ${levelNum} defined for entity "${entityName}".`,
            severity: 'error',
            suggestedFix: 'Remove duplicate level entries.'
          });
        } else {
          seenLevels.add(levelNum);
        }

        // Required Town Hall for this level
        const lvlTh = Number(lvl.requiredTownHall ?? lvl.required_town_hall ?? unlockTh);
        if (isNaN(lvlTh) || lvlTh < 1 || lvlTh > 17) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].requiredTownHall`,
            error: `Level ${levelNum} required Town Hall (${lvlTh}) must be between 1 and 17.`,
            severity: 'error'
          });
        }

        // Cost & Time values
        const cost = Number(lvl.upgradeCost ?? lvl.upgrade_cost ?? 0);
        if (!isNaN(cost) && cost < 0) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].upgradeCost`,
            error: `Level ${levelNum} upgrade cost cannot be negative.`,
            severity: 'error'
          });
        }

        const timeSecs = Number(lvl.upgradeTimeSeconds ?? lvl.upgrade_time_seconds ?? 0);
        if (!isNaN(timeSecs) && timeSecs < 0) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].upgradeTimeSeconds`,
            error: `Level ${levelNum} upgrade time seconds cannot be negative.`,
            severity: 'error'
          });
        }

        // Check level stats numeric integrity
        const hp = lvl.hitpoints !== undefined ? Number(lvl.hitpoints) : undefined;
        if (hp !== undefined && (isNaN(hp) || hp < 0)) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].hitpoints`,
            error: `Level ${levelNum} hitpoints must be a non-negative number.`,
            severity: 'error'
          });
        }

        const dps = lvl.damagePerSecond !== undefined ? Number(lvl.damagePerSecond) : undefined;
        if (dps !== undefined && (isNaN(dps) || dps < 0)) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].levels[${lIdx}].damagePerSecond`,
            error: `Level ${levelNum} DPS must be a non-negative number.`,
            severity: 'error'
          });
        }
      });
    }

    // 7. Relationships validation
    if (raw.relationships && Array.isArray(raw.relationships)) {
      raw.relationships.forEach((rel, rIdx) => {
        const targetSlug = (rel.relatedEntitySlug || rel.related_entity_slug || rel.relatedEntityId || '').trim().toLowerCase();
        if (!targetSlug) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].relationships[${rIdx}].relatedEntitySlug`,
            error: 'Relationship target slug or entity ID is required.',
            severity: 'error'
          });
        } else if (targetSlug === entitySlug) {
          errors.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].relationships[${rIdx}]`,
            error: `Self-referencing relationship: "${entitySlug}" cannot target itself.`,
            severity: 'error'
          });
        }

        const relType = (rel.relationshipType || rel.relationship_type || '').trim().toLowerCase();
        if (!relType) {
          warnings.push({
            entity: entityName || entitySlug,
            entityIndex: index,
            field: `entities[${index}].relationships[${rIdx}].relationshipType`,
            error: 'Relationship type is missing. Defaulting to "related".',
            severity: 'warning'
          });
        }
      });
    }

    return { errors, warnings };
  }

  private static generateSlug(name: string): string {
    return (name || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
