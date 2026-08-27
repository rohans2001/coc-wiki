import { SiegeEntity } from '../types/entity';

const provenanceDefault = {
  sourceName: 'Clash of Clans Official Siege Workshop Database',
  sourceUrl: 'https://supercell.com/en/games/clashofclans/',
  license: 'Fair Use / Fan Content Policy',
  attribution: 'Supercell Oy & Clash Archive Curated Database',
  retrievedAt: '2026-08-20T00:00:00Z',
  lastVerifiedAt: '2026-08-25T00:00:00Z',
};

export const SIEGES_DATA: SiegeEntity[] = [
  {
    id: 'siege-battle-blimp',
    name: 'Battle Blimp',
    slug: 'battle-blimp',
    category: 'siege',
    housingSpace: 1,
    siegeWorkshopLevelRequired: 2,
    movementSpeed: 18,
    attackSpeed: 1.5,
    range: 0.5,
    targetType: 'Ground',
    damageType: 'Area Splash',
    favoriteTarget: 'Town Hall',
    tagline: 'High-speed airborne dirigible that bypasses ground obstacles to deliver CC reinforcements directly to the Town Hall.',
    description: 'The Battle Blimp flies over ground obstacles directly toward the enemy Town Hall, dropping bombs along its path before crash landing to deploy Clan Castle troops right at the core.',
    unlockTownHall: 12,
    unlockRequirementText: 'Unlocked at Siege Workshop Level 2 (Town Hall 12)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    maxLevel: 4,
    provenance: provenanceDefault,
    trivia: ['The Battle Blimp filled with Super Wizards or Super Archers (Blizzard / Sarch Blimp) is a dominant war meta strategy.'],
    tips: ['Combine with Grand Warden Eternal Tome at launch and Clone + Invisibility Spells upon landing to erase 40% of the enemy base.'],
    upgradeLevels: [
      { level: 1, hitpoints: 3000, damagePerSecond: 100, upgradeCost: 4000000, upgradeCurrency: 'elixir', upgradeTime: '3d', upgradeTimeSeconds: 259200, requiredTownHall: 12 },
      { level: 4, hitpoints: 4500, damagePerSecond: 250, upgradeCost: 14000000, upgradeCurrency: 'elixir', upgradeTime: '10d', upgradeTimeSeconds: 864000, requiredTownHall: 14 }
    ]
  },
  {
    id: 'siege-log-launcher',
    name: 'Log Launcher',
    slug: 'log-launcher',
    category: 'siege',
    housingSpace: 1,
    siegeWorkshopLevelRequired: 5,
    movementSpeed: 5,
    attackSpeed: 2.0,
    range: 20.0,
    targetType: 'Ground',
    damageType: 'Area Splash Line Pierce',
    favoriteTarget: 'Town Hall',
    tagline: 'A heavy ground contraption that hurls rolling spikes of timber, crushing walls and defenses in an open corridor.',
    description: 'The Log Launcher continuously rolls spiked timber logs up to 20 tiles ahead, cracking open multiple layers of walls while marching relentlessly toward the Town Hall.',
    unlockTownHall: 13,
    unlockRequirementText: 'Unlocked at Siege Workshop Level 5 (Town Hall 13)',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    maxLevel: 4,
    provenance: provenanceDefault,
    trivia: ['The Log Launcher loses a small amount of HP automatically over time, even when not taking enemy defense fire.'],
    tips: ['Deploy behind a Golem or Barbarian King to prevent point defenses from prematurely depleting its health.'],
    upgradeLevels: [
      { level: 1, hitpoints: 4000, damagePerSecond: 140, upgradeCost: 7500000, upgradeCurrency: 'elixir', upgradeTime: '5d', upgradeTimeSeconds: 432000, requiredTownHall: 13 },
      { level: 4, hitpoints: 5000, damagePerSecond: 200, upgradeCost: 16500000, upgradeCurrency: 'elixir', upgradeTime: '12d', upgradeTimeSeconds: 1036800, requiredTownHall: 15 }
    ]
  },
  {
    id: 'siege-flame-flinger',
    name: 'Flame Flinger',
    slug: 'flame-flinger',
    category: 'siege',
    housingSpace: 1,
    siegeWorkshopLevelRequired: 6,
    movementSpeed: 6,
    attackSpeed: 4.5,
    range: 11.0,
    targetType: 'Ground',
    damageType: 'Area Splash & Lingering Fire',
    favoriteTarget: 'Defenses',
    tagline: 'A long-range catapult that flings Fire Spirits and burning pools of molten magma over base walls.',
    description: 'With massive 11-tile range exceeding X-Bows and Cannons, the Flame Flinger hurls clusters of Fire Spirits that leave lingering fire pools, melting defense compartments from beyond their attack range.',
    unlockTownHall: 14,
    unlockRequirementText: 'Unlocked at Siege Workshop Level 6 (Town Hall 14)',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    maxLevel: 4,
    provenance: provenanceDefault,
    trivia: ['Has the longest attack range of any mobile siege machine in the game (11.0 tiles).'],
    tips: ['Deploy outside the range of Mortars and X-Bows to dismantle entire defense clusters without taking damage.'],
    upgradeLevels: [
      { level: 1, hitpoints: 2200, damagePerSecond: 125, upgradeCost: 9500000, upgradeCurrency: 'elixir', upgradeTime: '6d', upgradeTimeSeconds: 518400, requiredTownHall: 14 },
      { level: 4, hitpoints: 2900, damagePerSecond: 185, upgradeCost: 17500000, upgradeCurrency: 'elixir', upgradeTime: '12d', upgradeTimeSeconds: 1036800, requiredTownHall: 16 }
    ]
  }
];
