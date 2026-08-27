import {
  ImportDocumentV1,
  ImportPreviewReport,
  EntityChangeDiff,
  FieldDiff,
  ValidationError
} from '../types/schema';
import { SchemaValidator } from '../validators/schemaValidator';
import { DataNormalizer } from '../normalizers/dataNormalizer';
import { dbStore } from '../../db/database';
import { DbEntity, DbEntityLevel } from '../../types/entity';

export class PreviewService {
  /**
   * Generate a dry-run preview report comparing incoming dataset against database
   */
  static generatePreview(rawDoc: unknown): ImportPreviewReport {
    const startTime = new Date().toISOString();

    // 1. Validate
    const validation = SchemaValidator.validateDocument(rawDoc);

    const doc = rawDoc as Partial<ImportDocumentV1>;
    const source = {
      name: doc.source?.name || 'Verified Dataset',
      url: doc.source?.url,
      license: doc.source?.license,
      attribution: doc.source?.attribution
    };

    if (!doc.entities || !Array.isArray(doc.entities)) {
      return {
        version: doc.version || '1.0',
        source,
        totalEntities: 0,
        newEntities: 0,
        updatedEntities: 0,
        unchangedEntities: 0,
        invalidEntities: 0,
        totalLevels: 0,
        levelsToCreate: 0,
        levelsToUpdate: 0,
        levelsUnchanged: 0,
        entityDiffs: [],
        errors: validation.errors,
        warnings: validation.warnings,
        generatedAt: startTime
      };
    }

    // 2. Normalize
    const normalizedDoc = DataNormalizer.normalizeDocument(doc as ImportDocumentV1);

    const entityDiffs: EntityChangeDiff[] = [];
    let newCount = 0;
    let updatedCount = 0;
    let unchangedCount = 0;
    let invalidCount = 0;
    let totalLevelsCount = 0;
    let levelsToCreateCount = 0;
    let levelsToUpdateCount = 0;
    let levelsUnchangedCount = 0;

    // 3. Compare each entity against database
    normalizedDoc.entities.forEach((entity, idx) => {
      const entityValidationErrors = validation.errors.filter(
        (e) => e.entityIndex === idx || e.entity === entity.name || e.entity === entity.slug
      );
      const entityValidationWarnings = validation.warnings.filter(
        (w) => w.entityIndex === idx || w.entity === entity.name || w.entity === entity.slug
      );

      // If entity has critical validation errors, mark as invalid
      if (entityValidationErrors.length > 0) {
        invalidCount++;
        entityDiffs.push({
          entitySlug: entity.slug,
          entityName: entity.name,
          entityType: entity.entity_type,
          status: 'invalid',
          fieldDiffs: [],
          levelsToCreate: 0,
          levelsToUpdate: 0,
          levelsUnchanged: 0,
          errors: entityValidationErrors,
          warnings: entityValidationWarnings
        });
        return;
      }

      // Check if entity exists in database store
      const existingEntity: DbEntity | undefined = dbStore.entities.get(entity.id) ||
        Array.from(dbStore.entities.values()).find(
          (e) => e.slug.toLowerCase() === entity.slug.toLowerCase() && e.entity_type === entity.entity_type
        );

      const fieldDiffs: FieldDiff[] = [];
      let entityLevelsToCreate = 0;
      let entityLevelsToUpdate = 0;
      let entityLevelsUnchanged = 0;

      if (!existingEntity) {
        // NEW ENTITY
        newCount++;
        entityLevelsToCreate = entity.levels.length;
        totalLevelsCount += entity.levels.length;
        levelsToCreateCount += entity.levels.length;

        fieldDiffs.push({
          field: 'status',
          oldValue: null,
          newValue: 'New Entity Created'
        });

        entityDiffs.push({
          entitySlug: entity.slug,
          entityName: entity.name,
          entityType: entity.entity_type,
          status: 'new',
          fieldDiffs,
          levelsToCreate: entityLevelsToCreate,
          levelsToUpdate: 0,
          levelsUnchanged: 0,
          errors: [],
          warnings: entityValidationWarnings
        });
      } else {
        // EXISTING ENTITY -> Check for field-level diffs
        if (existingEntity.name !== entity.name) {
          fieldDiffs.push({ field: 'name', oldValue: existingEntity.name, newValue: entity.name });
        }
        if (existingEntity.unlock_town_hall !== entity.unlock_town_hall) {
          fieldDiffs.push({ field: 'unlock_town_hall', oldValue: existingEntity.unlock_town_hall, newValue: entity.unlock_town_hall });
        }
        if (existingEntity.max_level !== entity.max_level) {
          fieldDiffs.push({ field: 'max_level', oldValue: existingEntity.max_level, newValue: entity.max_level });
        }
        if (existingEntity.summary !== entity.summary && entity.summary) {
          fieldDiffs.push({ field: 'summary', oldValue: existingEntity.summary, newValue: entity.summary });
        }
        if (existingEntity.description !== entity.description && entity.description) {
          fieldDiffs.push({ field: 'description', oldValue: (existingEntity.description || '').slice(0, 50) + '...', newValue: entity.description.slice(0, 50) + '...' });
        }

        // Compare levels
        const existingLevels: DbEntityLevel[] = dbStore.entityLevels.filter(
          (l) => l.entity_id === existingEntity.id
        );

        entity.levels.forEach((inLvl) => {
          totalLevelsCount++;
          const matchLevel = existingLevels.find((el) => el.level === inLvl.level);
          if (!matchLevel) {
            entityLevelsToCreate++;
            levelsToCreateCount++;
            fieldDiffs.push({
              field: `level[${inLvl.level}]`,
              oldValue: null,
              newValue: `New Level ${inLvl.level} (TH${inLvl.required_town_hall})`
            });
          } else {
            const levelCostDiff = matchLevel.upgrade_cost !== inLvl.upgrade_cost;
            const levelThDiff = matchLevel.required_town_hall !== inLvl.required_town_hall;
            const levelTimeDiff = matchLevel.upgrade_time_seconds !== inLvl.upgrade_time_seconds;

            if (levelCostDiff || levelThDiff || levelTimeDiff) {
              entityLevelsToUpdate++;
              levelsToUpdateCount++;
              fieldDiffs.push({
                field: `level[${inLvl.level}] stats`,
                oldValue: `Cost: ${matchLevel.upgrade_cost}, TH: ${matchLevel.required_town_hall}`,
                newValue: `Cost: ${inLvl.upgrade_cost}, TH: ${inLvl.required_town_hall}`
              });
            } else {
              entityLevelsUnchanged++;
              levelsUnchangedCount++;
            }
          }
        });

        const isUpdated = fieldDiffs.length > 0;
        if (isUpdated) {
          updatedCount++;
        } else {
          unchangedCount++;
        }

        entityDiffs.push({
          entitySlug: entity.slug,
          entityName: entity.name,
          entityType: entity.entity_type,
          status: isUpdated ? 'updated' : 'unchanged',
          fieldDiffs,
          levelsToCreate: entityLevelsToCreate,
          levelsToUpdate: entityLevelsToUpdate,
          levelsUnchanged: entityLevelsUnchanged,
          errors: [],
          warnings: entityValidationWarnings
        });
      }
    });

    return {
      version: normalizedDoc.version,
      source: normalizedDoc.source,
      totalEntities: normalizedDoc.entities.length,
      newEntities: newCount,
      updatedEntities: updatedCount,
      unchangedEntities: unchangedCount,
      invalidEntities: invalidCount,
      totalLevels: totalLevelsCount,
      levelsToCreate: levelsToCreateCount,
      levelsToUpdate: levelsToUpdateCount,
      levelsUnchanged: levelsUnchangedCount,
      entityDiffs,
      errors: validation.errors,
      warnings: validation.warnings,
      generatedAt: startTime
    };
  }
}
