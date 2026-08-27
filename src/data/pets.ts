import { PetEntity } from '../types/entity';

const provenanceDefault = {
  sourceName: 'Clash of Clans Official Pet House Database',
  sourceUrl: 'https://supercell.com/en/games/clashofclans/',
  license: 'Fair Use / Fan Content Policy',
  attribution: 'Supercell Oy & Clash Archive Curated Database',
  retrievedAt: '2026-08-20T00:00:00Z',
  lastVerifiedAt: '2026-08-25T00:00:00Z',
};

export const PETS_DATA: PetEntity[] = [
  {
    id: 'pet-unicorn',
    name: 'Unicorn',
    slug: 'unicorn',
    category: 'pet',
    petHouseLevelRequired: 4,
    favoriteTarget: 'Hero',
    damageType: 'None',
    targetType: 'Ground',
    movementSpeed: 16,
    attackSpeed: 1.0,
    range: 2.5,
    specialSkillName: 'Personal Healer',
    specialSkillDescription: 'Continuously heals its paired Hero, functioning as a dedicated high-potency mobile Healer that cannot be targeted by Air Defenses or Seeking Air Mines.',
    tagline: 'A mythical horned companion that acts as a dedicated personal healer to its paired hero.',
    description: 'The Unicorn follows her assigned Hero like a guardian angel, continuously restoring health. Because she is a ground unit, she is completely immune to Air Defenses and Seeking Air Mines.',
    unlockTownHall: 14,
    unlockRequirementText: 'Unlocked at Pet House Level 4 (Town Hall 14)',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80',
    maxLevel: 10,
    provenance: provenanceDefault,
    trivia: ['The Unicorn is universally paired with the Archer Queen for solo Queen Walk support.'],
    tips: ['Equip on Archer Queen to keep her at full HP even when healers switch targets or take anti-air fire.'],
    upgradeLevels: [
      { level: 1, hitpoints: 1400, healingPerSecond: 50, upgradeCost: 140000, upgradeCurrency: 'dark_elixir', upgradeTime: '3d', upgradeTimeSeconds: 259200, requiredTownHall: 14 },
      { level: 10, hitpoints: 2150, healingPerSecond: 75, upgradeCost: 240000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 15 }
    ]
  },
  {
    id: 'pet-spirit-fox',
    name: 'Spirit Fox',
    slug: 'spirit-fox',
    category: 'pet',
    petHouseLevelRequired: 9,
    favoriteTarget: 'Hero\'s Target',
    damageType: 'Single Target',
    targetType: 'Ground',
    movementSpeed: 24,
    attackSpeed: 1.0,
    range: 1.5,
    specialSkillName: 'Spirit Cloak',
    specialSkillDescription: 'Periodically turns both itself and its assigned Hero invisible for 4 seconds in combat, breaking all incoming defense targeting locks.',
    tagline: 'An ethereal fox that grants periodic stealth cloaking to its hero.',
    description: 'The Spirit Fox glides silently beside its hero, periodically shrouding both of them in spiritual mist that renders them completely invisible to defenses.',
    unlockTownHall: 16,
    unlockRequirementText: 'Unlocked at Pet House Level 9 (Town Hall 16)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    maxLevel: 10,
    provenance: provenanceDefault,
    trivia: ['The Spirit Fox completely breaks Single-Target Inferno and Monolith lock-on beams every time the cloaking triggers.'],
    tips: ['Pair with the Royal Champion or Barbarian King to survive prolonged exposure to intense core crossfire.'],
    upgradeLevels: [
      { level: 1, hitpoints: 2200, damagePerSecond: 160, durationSeconds: 4.0, upgradeCost: 220000, upgradeCurrency: 'dark_elixir', upgradeTime: '6d', upgradeTimeSeconds: 518400, requiredTownHall: 16 },
      { level: 10, hitpoints: 2900, damagePerSecond: 232, durationSeconds: 4.5, upgradeCost: 310000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 16 }
    ]
  },
  {
    id: 'pet-phoenix',
    name: 'Phoenix',
    slug: 'phoenix',
    category: 'pet',
    petHouseLevelRequired: 8,
    favoriteTarget: 'Hero',
    damageType: 'Single Target',
    targetType: 'Air',
    movementSpeed: 16,
    attackSpeed: 1.2,
    range: 2.0,
    specialSkillName: 'From the Ashes',
    specialSkillDescription: 'When the paired Hero takes lethal damage, Phoenix hatches from her egg, resurrecting the Hero with temporary total invincibility.',
    tagline: 'A legendary bird that resurrects fallen heroes with temporary invulnerability.',
    description: 'Travels as an egg until her Hero is about to perish, then bursts into flames to grant the Hero up to 8 seconds of invincible bonus life to finish key defenses.',
    unlockTownHall: 15,
    unlockRequirementText: 'Unlocked at Pet House Level 8 (Town Hall 15)',
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=600&q=80',
    maxLevel: 10,
    provenance: provenanceDefault,
    trivia: ['Guarantees that your Hero can extract maximum value and destroy the Town Hall or Eagle even under fatal focus fire.'],
    tips: ['Standard pairing for Barbarian King with Giant Gauntlet.'],
    upgradeLevels: [
      { level: 1, hitpoints: 3000, damagePerSecond: 170, durationSeconds: 6.0, upgradeCost: 200000, upgradeCurrency: 'dark_elixir', upgradeTime: '5d', upgradeTimeSeconds: 432000, requiredTownHall: 15 },
      { level: 10, hitpoints: 4000, damagePerSecond: 250, durationSeconds: 8.0, upgradeCost: 290000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 15 }
    ]
  }
];
