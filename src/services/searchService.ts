import { SearchResult } from '../types/search';
import { EntityService } from './entityService';

export class SearchService {
  /**
   * Search across entities with intelligent scoring and type awareness
   */
  static search(query: string): SearchResult[] {
    if (!query || !query.trim()) return [];

    const q = query.toLowerCase().trim();
    const entities = EntityService.getAllEntities();

    const results: SearchResult[] = [];

    for (const entity of entities) {
      let score = 0;
      const name = entity.name.toLowerCase();
      const desc = (entity.description || '').toLowerCase();
      const tagline = (entity.tagline || '').toLowerCase();
      const category = (entity.category || '').toLowerCase();

      // Exact name match
      if (name === q) {
        score += 120;
      } else if (name.startsWith(q)) {
        score += 80;
      } else if (name.includes(q)) {
        score += 50;
      }

      // Category / Type match
      if (category === q || category.startsWith(q)) {
        score += 40;
      } else if (category.includes(q)) {
        score += 20;
      }

      // Tagline match
      if (tagline.includes(q)) {
        score += 25;
      }

      // Description match
      if (desc.includes(q)) {
        score += 15;
      }

      // Town hall query match e.g. "th17", "th 17", "town hall 17"
      if (
        (q.includes('th') || q.includes('town hall')) &&
        entity.unlockTownHall &&
        q.includes(String(entity.unlockTownHall))
      ) {
        score += 35;
      }

      if (score > 0) {
        results.push({
          entity,
          category: entity.category,
          matchScore: score,
          snippet: entity.tagline || entity.description.slice(0, 100)
        });
      }
    }

    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Popular curated quick searches
   */
  static getPopularSearches(): { name: string; slug: string; category: string }[] {
    return [
      { name: 'Barbarian', slug: 'barbarian', category: 'troops' },
      { name: 'Archer Queen', slug: 'archer-queen', category: 'heroes' },
      { name: 'Inferno Tower', slug: 'inferno-tower', category: 'defenses' },
      { name: 'Rage Spell', slug: 'rage-spell', category: 'spells' },
      { name: 'Town Hall 17', slug: 'town-hall', category: 'defenses' },
      { name: 'Minion Prince', slug: 'minion-prince', category: 'heroes' },
      { name: 'Giant Gauntlet', slug: 'giant-gauntlet', category: 'equipment' },
      { name: 'Root Rider', slug: 'root-rider', category: 'troops' }
    ];
  }
}
