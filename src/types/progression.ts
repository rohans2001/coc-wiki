export interface UnlockItem {
  id: string;
  name: string;
  category: string;
  slug: string;
  icon?: string;
  badge?: string;
  description: string;
}

export interface TownHallInfo {
  level: number;
  name: string;
  slug: string;
  theme: string;
  gigaWeaponName?: string;
  gigaWeaponMaxLevel?: number;
  maxHeroLevels: {
    barbarianKing?: number;
    archerQueen?: number;
    grandWarden?: number;
    royalChampion?: number;
    minionPrince?: number;
  };
  signatureDefense: string;
  keyUnlocks: UnlockItem[];
  maxLaboratoryLevel: number;
  maxPetHouseLevel?: number;
  maxBlacksmithLevel?: number;
  goldStorageCap: string;
  elixirStorageCap: string;
  darkElixirStorageCap: string;
  strategyFocus: string;
}
