import { AnyEntity, EntityType } from './entity';

export interface SearchResult {
  entity: AnyEntity;
  category: EntityType;
  matchScore: number;
  snippet?: string;
}

export interface CategoryMeta {
  type: EntityType;
  name: string;
  pluralName: string;
  path: string;
  description: string;
  iconName: string;
  itemCount: number;
  featuredColor: string;
  badgeClass: string;
}

export type SortField = 'name' | 'unlockTownHall' | 'maxLevel' | 'housingSpace' | 'dps' | 'hitpoints';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  searchQuery: string;
  townHallLevel: number | 'all';
  subCategory: string | 'all';
  targetType: string | 'all';
  damageType: string | 'all';
  sortBy: SortField;
  sortDirection: SortDirection;
}
