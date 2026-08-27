import {
  ImportDocumentV1,
  ImportPreviewReport,
  ImportExecutionOptions,
  ImportExecutionResult,
  ValidationResult,
  DbImportHistory
} from '../../imports/types/schema';
import { SchemaValidator } from '../../imports/validators/schemaValidator';
import { DataNormalizer } from '../../imports/normalizers/dataNormalizer';
import { PreviewService } from '../../imports/services/previewService';
import { ImportExecutionService } from '../../imports/services/importExecutionService';
import { DatabaseAdapter } from '../../db/database';

export class ImportService {
  /**
   * Validate a raw import JSON document
   */
  static validate(rawDoc: unknown): ValidationResult {
    return SchemaValidator.validateDocument(rawDoc);
  }

  /**
   * Normalize an import document
   */
  static normalize(doc: ImportDocumentV1) {
    return DataNormalizer.normalizeDocument(doc);
  }

  /**
   * Generate dry-run preview report comparing incoming dataset against database
   */
  static preview(rawDoc: unknown): ImportPreviewReport {
    return PreviewService.generatePreview(rawDoc);
  }

  /**
   * Execute import into database
   */
  static async execute(
    rawDoc: unknown,
    options?: ImportExecutionOptions
  ): Promise<ImportExecutionResult> {
    return ImportExecutionService.executeImport(rawDoc, options);
  }

  /**
   * Fetch all past import audit history logs
   */
  static async getHistory(): Promise<DbImportHistory[]> {
    return DatabaseAdapter.getImportHistory();
  }
}
