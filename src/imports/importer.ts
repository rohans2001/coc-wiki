import { JsonParser } from './parsers/jsonParser';
import { EntityNormalizer } from './normalizers/entityNormalizer';
import { EntityValidator } from './validators/entityValidator';
import { ImportReport } from './types';
import { DatabaseAdapter, dbStore } from '../db/database';

export class EntityImporter {
  /**
   * Run full import pipeline from raw JSON input into database
   */
  static async importEntities(jsonInput: string | unknown): Promise<ImportReport> {
    const startTime = performance.now();
    const report: ImportReport = {
      totalReceived: 0,
      totalParsed: 0,
      totalValid: 0,
      totalRejected: 0,
      importedEntityIds: [],
      errors: [],
      durationMs: 0
    };

    // 1. PARSE
    const parseResult = JsonParser.parse(jsonInput);
    if (!parseResult.success) {
      report.errors.push({
        entityIndex: 0,
        errors: [{ field: 'json', message: parseResult.error || 'Parsing error' }]
      });
      report.durationMs = Math.round(performance.now() - startTime);
      return report;
    }

    const rawList = parseResult.data;
    report.totalReceived = rawList.length;
    report.totalParsed = rawList.length;

    // Collect all existing slugs in the database
    const existingSlugs = new Set<string>();
    for (const entity of dbStore.entities.values()) {
      existingSlugs.add(entity.slug.toLowerCase());
    }

    // 2. VALIDATE & NORMALIZE & INGEST
    for (let i = 0; i < rawList.length; i++) {
      const raw = rawList[i];
      const validation = EntityValidator.validate(raw, existingSlugs);

      if (!validation.isValid) {
        report.totalRejected++;
        report.errors.push({
          entityIndex: i,
          entityName: raw.name || `Record #${i + 1}`,
          errors: validation.errors
        });
        continue;
      }

      // 3. NORMALIZE
      const normalized = EntityNormalizer.normalize(raw);

      // Track newly added slug to prevent duplicate within the same batch
      existingSlugs.add(normalized.entity.slug.toLowerCase());

      // 4. DATABASE IMPORT
      await DatabaseAdapter.upsertEntity(normalized.entity);
      report.importedEntityIds.push(normalized.entity.id);
      report.totalValid++;
    }

    report.durationMs = Math.round(performance.now() - startTime);
    return report;
  }
}
