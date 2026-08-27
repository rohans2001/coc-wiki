import { DatabaseAdapter, dbStore } from '../../db/database';
import { DbCategory, EntityType } from '../../types/entity';
import { CATEGORIES } from '../../data/categories';
import { CategoryMeta } from '../../types/search';

export class CategoryService {
  /**
   * Fetch all categories
   */
  static async getAllCategories(): Promise<DbCategory[]> {
    return DatabaseAdapter.getAllCategories();
  }

  /**
   * Get category meta definitions
   */
  static getCategoryMetas(): CategoryMeta[] {
    return CATEGORIES;
  }

  /**
   * Find a category by its slug or type
   */
  static getCategoryByType(type: EntityType): CategoryMeta | undefined {
    return CATEGORIES.find((c) => c.type === type);
  }

  /**
   * Get dynamic item counts for each category from the database
   */
  static getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const entity of dbStore.entities.values()) {
      if (entity.is_active) {
        counts[entity.entity_type] = (counts[entity.entity_type] || 0) + 1;
      }
    }
    return counts;
  }
}
