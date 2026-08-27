import {
  ImportDocumentV1,
  ImportExecutionOptions,
  ImportExecutionResult,
  DbImportHistory
} from '../types/schema';
import { SchemaValidator } from '../validators/schemaValidator';
import { DataNormalizer } from '../normalizers/dataNormalizer';
import { DatabaseAdapter, dbStore } from '../../db/database';

export class ImportExecutionService {
  /**
   * Execute full import workflow into database
   */
  static async executeImport(
    rawDoc: unknown,
    options: ImportExecutionOptions = {}
  ): Promise<ImportExecutionResult> {
    const startTime = new Date();
    const startedAtIso = startTime.toISOString();
    const historyId = `imp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // 1. Validation
    const validation = SchemaValidator.validateDocument(rawDoc);

    const doc = rawDoc as Partial<ImportDocumentV1>;
    const sourceName = doc.source?.name || 'Verified Dataset';
    const version = doc.version || '1.0';

    // If critical validation failure and skipValidationErrors is false
    if (!validation.isValid && !options.skipValidationErrors && validation.validEntities === 0) {
      const completedAt = new Date().toISOString();
      const failedResult: ImportExecutionResult = {
        importHistoryId: historyId,
        status: 'failed',
        startedAt: startedAtIso,
        completedAt,
        durationMs: Date.now() - startTime.getTime(),
        totalEntities: validation.totalEntities,
        createdEntities: 0,
        updatedEntities: 0,
        unchangedEntities: 0,
        failedEntities: validation.invalidEntities,
        totalLevels: 0,
        createdLevels: 0,
        updatedLevels: 0,
        importedEntitySlugs: [],
        errors: validation.errors,
        warnings: validation.warnings,
        metadata: {
          mode: options.mode || 'merge',
          importBy: options.importBy || 'admin'
        }
      };

      // Record failure audit
      await DatabaseAdapter.recordImportHistory({
        id: historyId,
        source_name: sourceName,
        dataset_version: version,
        status: 'failed',
        started_at: startedAtIso,
        completed_at: completedAt,
        total_entities: validation.totalEntities,
        created_entities: 0,
        updated_entities: 0,
        unchanged_entities: 0,
        failed_entities: validation.invalidEntities,
        total_levels: 0,
        created_levels: 0,
        updated_levels: 0,
        warnings: validation.warnings,
        errors: validation.errors,
        metadata: failedResult.metadata || {},
        created_at: startedAtIso
      });

      return failedResult;
    }

    // 2. Normalization
    const normalizedDoc = DataNormalizer.normalizeDocument(doc as ImportDocumentV1);

    let createdEntities = 0;
    let updatedEntities = 0;
    let unchangedEntities = 0;
    let failedEntities = 0;
    let totalLevels = 0;
    let createdLevels = 0;
    let updatedLevels = 0;
    const importedSlugs: string[] = [];

    // 3. Upsert execution
    for (let i = 0; i < normalizedDoc.entities.length; i++) {
      const entity = normalizedDoc.entities[i];

      const entityErrors = validation.errors.filter(
        (e) => e.entityIndex === i || e.entity === entity.name || e.entity === entity.slug
      );

      if (entityErrors.length > 0) {
        failedEntities++;
        continue;
      }

      totalLevels += entity.levels.length;

      // Perform upsert
      const upsertResult = await DatabaseAdapter.upsertFullEntity(entity);

      if (upsertResult.isNew) {
        createdEntities++;
      } else if (upsertResult.updatedLevels > 0 || upsertResult.createdLevels > 0) {
        updatedEntities++;
      } else {
        unchangedEntities++;
      }

      createdLevels += upsertResult.createdLevels;
      updatedLevels += upsertResult.updatedLevels;
      importedSlugs.push(entity.slug);
    }

    const completedAt = new Date().toISOString();
    const durationMs = Date.now() - startTime.getTime();
    const finalStatus =
      validation.errors.length > 0
        ? 'completed_with_warnings'
        : validation.warnings.length > 0
        ? 'completed_with_warnings'
        : 'completed';

    const executionResult: ImportExecutionResult = {
      importHistoryId: historyId,
      status: finalStatus,
      startedAt: startedAtIso,
      completedAt,
      durationMs,
      totalEntities: normalizedDoc.entities.length,
      createdEntities,
      updatedEntities,
      unchangedEntities,
      failedEntities,
      totalLevels,
      createdLevels,
      updatedLevels,
      importedEntitySlugs: importedSlugs,
      errors: validation.errors,
      warnings: validation.warnings,
      metadata: {
        mode: options.mode || 'merge',
        importBy: options.importBy || 'admin'
      }
    };

    // 4. Save Audit Record in Import History
    const historyRecord: DbImportHistory = {
      id: historyId,
      source_name: sourceName,
      dataset_version: version,
      status: finalStatus,
      started_at: startedAtIso,
      completed_at: completedAt,
      total_entities: normalizedDoc.entities.length,
      created_entities: createdEntities,
      updated_entities: updatedEntities,
      unchanged_entities: unchangedEntities,
      failed_entities: failedEntities,
      total_levels: totalLevels,
      created_levels: createdLevels,
      updated_levels: updatedLevels,
      warnings: validation.warnings,
      errors: validation.errors,
      metadata: executionResult.metadata || {},
      created_at: startedAtIso
    };

    await DatabaseAdapter.recordImportHistory(historyRecord);

    return executionResult;
  }
}
