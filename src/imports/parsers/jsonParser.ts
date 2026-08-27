import { RawEntityImport } from '../types';

export class JsonParser {
  /**
   * Parse raw JSON string or object into RawEntityImport array
   */
  static parse(input: string | unknown): { success: boolean; data: RawEntityImport[]; error?: string } {
    try {
      let raw: unknown;
      if (typeof input === 'string') {
        raw = JSON.parse(input);
      } else {
        raw = input;
      }

      if (!raw) {
        return { success: false, data: [], error: 'Input data is empty or invalid.' };
      }

      const list: RawEntityImport[] = Array.isArray(raw) ? raw : [raw as RawEntityImport];
      return { success: true, data: list };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'JSON Parsing failed';
      return { success: false, data: [], error: message };
    }
  }
}
