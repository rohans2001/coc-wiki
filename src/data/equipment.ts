import { EquipmentEntity } from '../types/entity';

const provenanceDefault = {
  sourceName: 'Clash of Clans Official Blacksmith & Equipment Database',
  sourceUrl: 'https://supercell.com/en/games/clashofclans/',
  license: 'Fair Use / Fan Content Policy',
  attribution: 'Supercell Oy & Clash Archive Curated Database',
  retrievedAt: '2026-08-20T00:00:00Z',
  lastVerifiedAt: '2026-08-25T00:00:00Z',
};

export const EQUIPMENT_DATA: EquipmentEntity[] = [
  {
    id: 'equip-giant-gauntlet',
    name: 'Giant Gauntlet',
    slug: 'giant-gauntlet',
    category: 'equipment',
    heroSlug: 'barbarian-king',
    rarity: 'Epic',
    equipmentType: 'Active',
    blacksmithLevelRequired: 1,
    tagline: 'Transforms the Barbarian King into a towering giant who deals devastating area damage and takes reduced damage.',
    description: 'Upon activation, the Barbarian King grows to colossal size, his attacks smash the ground creating area shockwaves that damage all adjacent buildings and walls, and he becomes nearly impervious to damage.',
    unlockTownHall: 8,
    unlockRequirementText: 'Unlocked via Blacksmith / Special Event (Town Hall 8)',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    abilityDescription: 'Grows gigantic for up to 17 seconds, reduces incoming damage by 50%, and deals area splash damage with every hit.',
    heroBoosts: [
      { stat: 'Damage Reduction', description: 'Up to 50% damage resistance during ability' },
      { stat: 'Area Damage', description: 'Every melee swing damages all buildings within 2.5 tiles' },
      { stat: 'Passive HP Recovery', description: '+2,400 Max HP boost & passive regeneration' }
    ],
    maxLevel: 27,
    provenance: provenanceDefault,
    trivia: ['Giant Gauntlet was the first Epic Equipment ever introduced in Clash of Clans.'],
    tips: ['Combine with Rage Vial or Spiky Ball for base-clearing offensive power.'],
    upgradeLevels: [
      { level: 1, durationSeconds: 12, damagePerSecond: 25, upgradeCost: 120, upgradeCurrency: 'shiny_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 8 },
      { level: 18, durationSeconds: 15, damagePerSecond: 180, upgradeCost: 600, upgradeCurrency: 'glowy_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 12 },
      { level: 27, durationSeconds: 17, damagePerSecond: 310, upgradeCost: 150, upgradeCurrency: 'starry_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 16 }
    ]
  },
  {
    id: 'equip-frozen-arrow',
    name: 'Frozen Arrow',
    slug: 'frozen-arrow',
    category: 'equipment',
    heroSlug: 'archer-queen',
    rarity: 'Epic',
    equipmentType: 'Passive',
    blacksmithLevelRequired: 6,
    tagline: 'Infuses Queen\'s arrows with glacial ice that slows target defense attack rate by up to 75%.',
    description: 'Enchants all basic attacks with ice. Defenses, heroes, and buildings targeted by the Archer Queen have their attack speed and movement severely crippled, making Queen Charges virtually unkillable.',
    unlockTownHall: 12,
    unlockRequirementText: 'Unlocked at Blacksmith Level 6 (Town Hall 12)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    abilityDescription: 'Slows down target attack speed by up to 75% on every basic attack and boosts passive DPS.',
    heroBoosts: [
      { stat: 'Attack Slowdown', description: 'Cripples defense fire rate by 75% for 3 seconds per shot' },
      { stat: 'Passive DPS Boost', description: 'Adds up to +185 flat DPS to the Archer Queen' }
    ],
    maxLevel: 27,
    provenance: provenanceDefault,
    trivia: ['Completely neutralizes Single-Target Inferno Towers when the Queen engages them.'],
    tips: ['Pair with Invisibility Vial or Healer Puppet for unstoppable Queen Charge pathing.'],
    upgradeLevels: [
      { level: 1, speedBoost: -35, upgradeCost: 120, upgradeCurrency: 'shiny_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 12 },
      { level: 18, speedBoost: -65, upgradeCost: 600, upgradeCurrency: 'glowy_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 14 },
      { level: 27, speedBoost: -75, upgradeCost: 150, upgradeCurrency: 'starry_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 16 }
    ]
  },
  {
    id: 'equip-eternal-tome',
    name: 'Eternal Tome',
    slug: 'eternal-tome',
    category: 'equipment',
    heroSlug: 'grand-warden',
    rarity: 'Common',
    equipmentType: 'Active',
    blacksmithLevelRequired: 1,
    tagline: 'Grants complete damage invulnerability to all nearby friendly troops within the Warden\'s aura.',
    description: 'When triggered, the Grand Warden and all allied troops inside his Life Aura become 100% immune to all damage for up to 9.5 seconds.',
    unlockTownHall: 11,
    unlockRequirementText: 'Default Grand Warden Equipment (Town Hall 11)',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80',
    abilityDescription: 'Grants 100% invulnerability to all troops in aura for up to 9.5s.',
    heroBoosts: [
      { stat: 'Invulnerability Duration', description: 'Up to 9.5 seconds of total immunity' },
      { stat: 'Passive HP Increase', description: '+350 Hitpoints for Grand Warden' }
    ],
    maxLevel: 18,
    provenance: provenanceDefault,
    trivia: ['Arguably the most crucial ability in competitive 3-star war attacks.'],
    tips: ['Time it right as the main army enters the Town Hall Giga Bomb or hits heavy Monolith/Scattershot crossfire.'],
    upgradeLevels: [
      { level: 1, durationSeconds: 4.0, upgradeCost: 120, upgradeCurrency: 'shiny_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 11 },
      { level: 9, durationSeconds: 7.0, upgradeCost: 400, upgradeCurrency: 'glowy_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 12 },
      { level: 18, durationSeconds: 9.5, upgradeCost: 600, upgradeCurrency: 'glowy_ore', upgradeTime: 'Instant', upgradeTimeSeconds: 0, requiredTownHall: 16 }
    ]
  }
];
