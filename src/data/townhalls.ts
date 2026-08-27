import { TownHallInfo } from '../types/progression';

export const TOWNHALLS_DATA: TownHallInfo[] = [
  {
    level: 1,
    name: 'Town Hall 1',
    slug: 'th-1',
    theme: 'Basic Timber & Stone Settlement',
    signatureDefense: 'Cannon Level 1',
    maxLaboratoryLevel: 0,
    maxHeroLevels: {},
    goldStorageCap: '2,500',
    elixirStorageCap: '2,500',
    darkElixirStorageCap: '0',
    strategyFocus: 'Tutorial settlement and basic resource generation.',
    keyUnlocks: [
      { id: 'u-1', name: 'Barbarian', category: 'Troop', slug: 'barbarian', description: 'Basic melee troop' },
      { id: 'u-2', name: 'Cannon', category: 'Defense', slug: 'cannon', description: 'Single-target ground defense' }
    ]
  },
  {
    level: 2,
    name: 'Town Hall 2',
    slug: 'th-2',
    theme: 'Reinforced Timber Post',
    signatureDefense: 'Archer Tower',
    maxLaboratoryLevel: 0,
    maxHeroLevels: {},
    goldStorageCap: '7,000',
    elixirStorageCap: '7,000',
    darkElixirStorageCap: '0',
    strategyFocus: 'Perimeter defense and unlocking Archers and Giants.',
    keyUnlocks: [
      { id: 'u-3', name: 'Archer', category: 'Troop', slug: 'archer', description: 'First ranged attacker' },
      { id: 'u-4', name: 'Giant', category: 'Troop', slug: 'giant', description: 'First high-HP defense-targeting tank' },
      { id: 'u-5', name: 'Archer Tower', category: 'Defense', slug: 'archer-tower', description: 'Air and ground defense' }
    ]
  },
  {
    level: 3,
    name: 'Town Hall 3',
    slug: 'th-3',
    theme: 'Stone Foundation Outpost',
    signatureDefense: 'Mortar Level 1',
    maxLaboratoryLevel: 1,
    maxHeroLevels: {},
    goldStorageCap: '100,000',
    elixirStorageCap: '100,000',
    darkElixirStorageCap: '0',
    strategyFocus: 'Unlocks the Laboratory for upgrading units and the Clan Castle for clan participation.',
    keyUnlocks: [
      { id: 'u-6', name: 'Wall Breaker', category: 'Troop', slug: 'wall-breaker', description: 'Demolishes enemy walls' },
      { id: 'u-7', name: 'Mortar', category: 'Defense', slug: 'mortar', description: 'Long-range ground splash' },
      { id: 'u-8', name: 'Clan Castle', category: 'Building', slug: 'clan-castle', description: 'Enables Clan membership & donations' }
    ]
  },
  {
    level: 7,
    name: 'Town Hall 7',
    slug: 'th-7',
    theme: 'Cobblestone Castle with Dark Elixir Altar',
    signatureDefense: 'Hidden Tesla & Air Defense L5',
    maxLaboratoryLevel: 5,
    maxHeroLevels: { barbarianKing: 5 },
    goldStorageCap: '4,000,000',
    elixirStorageCap: '4,000,000',
    darkElixirStorageCap: '20,000',
    strategyFocus: 'First introduction of Dark Elixir and the immortal Barbarian King.',
    keyUnlocks: [
      { id: 'u-9', name: 'Barbarian King', category: 'Hero', slug: 'barbarian-king', description: 'First unlockable Hero' },
      { id: 'u-10', name: 'Dragon', category: 'Troop', slug: 'dragon', description: 'High-flying fiery leviathan' },
      { id: 'u-11', name: 'Rage Spell', category: 'Spell', slug: 'rage-spell', description: 'Massive attack boost aura' }
    ]
  },
  {
    level: 8,
    name: 'Town Hall 8',
    slug: 'th-8',
    theme: 'Iron-Plated Obsidian Fort with Skulls',
    signatureDefense: 'Bomb Tower & Dark Spell Factory',
    maxLaboratoryLevel: 6,
    maxHeroLevels: { barbarianKing: 10 },
    goldStorageCap: '6,000,000',
    elixirStorageCap: '6,000,000',
    darkElixirStorageCap: '45,000',
    strategyFocus: 'Unlocks the Blacksmith and Epic Hero Equipment (Giant Gauntlet).',
    keyUnlocks: [
      { id: 'u-12', name: 'P.E.K.K.A', category: 'Troop', slug: 'pekka', description: 'Armored heavy knight' },
      { id: 'u-13', name: 'Poison Spell', category: 'Spell', slug: 'poison-spell', description: 'Counter defending CC troops' },
      { id: 'u-14', name: 'Blacksmith', category: 'Building', slug: 'blacksmith', description: 'Craft & upgrade Hero Equipment' }
    ]
  },
  {
    level: 9,
    name: 'Town Hall 9',
    slug: 'th-9',
    theme: 'Gothic Castle of Shadow and Obsidian Walls',
    signatureDefense: 'X-Bow Level 3',
    maxLaboratoryLevel: 7,
    maxHeroLevels: { barbarianKing: 30, archerQueen: 30 },
    goldStorageCap: '8,000,000',
    elixirStorageCap: '8,000,000',
    darkElixirStorageCap: '190,000',
    strategyFocus: 'The legendary golden era of Queen Charge and LavaLoon strategies.',
    keyUnlocks: [
      { id: 'u-15', name: 'Archer Queen', category: 'Hero', slug: 'archer-queen', description: 'Lethal ranged Hero' },
      { id: 'u-16', name: 'X-Bow', category: 'Defense', slug: 'x-bow', description: 'Rapid-firing heavy crossbow' },
      { id: 'u-17', name: 'Jump Spell & Freeze Spell', category: 'Spell', slug: 'freeze-spell', description: 'Tactical spell mastery' }
    ]
  },
  {
    level: 10,
    name: 'Town Hall 10',
    slug: 'th-10',
    theme: 'Molten Magma Fortress & Fiery Battlements',
    signatureDefense: 'Inferno Tower',
    maxLaboratoryLevel: 8,
    maxHeroLevels: { barbarianKing: 40, archerQueen: 40 },
    goldStorageCap: '10,000,000',
    elixirStorageCap: '10,000,000',
    darkElixirStorageCap: '240,000',
    strategyFocus: 'Single-Target & Multi-Target Inferno Towers alter attack dynamics completely.',
    keyUnlocks: [
      { id: 'u-18', name: 'Inferno Tower', category: 'Defense', slug: 'inferno-tower', description: 'Melts tanks and swarms' },
      { id: 'u-19', name: 'Miner & Bowler', category: 'Troop', slug: 'bowler', description: 'Tunneling & bouncing destruction' }
    ]
  },
  {
    level: 11,
    name: 'Town Hall 11',
    slug: 'th-11',
    theme: 'Imperial Marble, Gold Filigree & Eagle Apex',
    signatureDefense: 'Eagle Artillery',
    maxLaboratoryLevel: 9,
    maxHeroLevels: { barbarianKing: 50, archerQueen: 50, grandWarden: 20 },
    goldStorageCap: '12,000,000',
    elixirStorageCap: '12,000,000',
    darkElixirStorageCap: '290,000',
    strategyFocus: 'Grand Warden unlocks complete damage invulnerability via Eternal Tome.',
    keyUnlocks: [
      { id: 'u-20', name: 'Grand Warden', category: 'Hero', slug: 'grand-warden', description: 'Life Aura & Eternal Tome support' },
      { id: 'u-21', name: 'Eagle Artillery', category: 'Defense', slug: 'eagle-artillery', description: 'Base-wide artillery barrage' },
      { id: 'u-22', name: 'Electro Dragon', category: 'Troop', slug: 'electro-dragon', description: 'Chain lightning sky terror' }
    ]
  },
  {
    level: 12,
    name: 'Town Hall 12',
    slug: 'th-12',
    theme: 'Giga Electric Blue & Mechanical Cogworks',
    signatureDefense: 'Giga Tesla (Defending Town Hall)',
    maxLaboratoryLevel: 10,
    maxHeroLevels: { barbarianKing: 65, archerQueen: 65, grandWarden: 40 },
    goldStorageCap: '14,000,000',
    elixirStorageCap: '14,000,000',
    darkElixirStorageCap: '350,000',
    strategyFocus: 'The Town Hall weaponizes itself for the first time and unlocks Siege Machines.',
    keyUnlocks: [
      { id: 'u-23', name: 'Siege Workshop', category: 'Building', slug: 'siege-workshop', description: 'Build Battle Blimps & Wall Wreckers' },
      { id: 'u-24', name: 'Yeti', category: 'Troop', slug: 'yeti', description: 'Summons Yetimites when damaged' }
    ]
  },
  {
    level: 13,
    name: 'Town Hall 13',
    slug: 'th-13',
    theme: 'Glacial Blue Ice and Frost-Bound Fortress',
    signatureDefense: 'Scattershot & Giga Inferno',
    maxLaboratoryLevel: 11,
    maxHeroLevels: { barbarianKing: 75, archerQueen: 75, grandWarden: 50, royalChampion: 25 },
    goldStorageCap: '18,000,000',
    elixirStorageCap: '18,000,000',
    darkElixirStorageCap: '400,000',
    strategyFocus: 'Royal Champion unlocks defense hunting; Scattershots annihilate ground clusters.',
    keyUnlocks: [
      { id: 'u-25', name: 'Royal Champion', category: 'Hero', slug: 'royal-champion', description: 'Defense-targeting jumping gladiator' },
      { id: 'u-26', name: 'Scattershot', category: 'Defense', slug: 'scattershot', description: 'Heavy projectile rock burst' },
      { id: 'u-27', name: 'Dragon Rider', category: 'Troop', slug: 'dragon-rider', description: 'Air defense-targeting cyborg' }
    ]
  },
  {
    level: 14,
    name: 'Town Hall 14',
    slug: 'th-14',
    theme: 'Ancient Jungle Aztec Temple & Golden Runes',
    signatureDefense: 'Giga Poison Bomb & Pet House',
    maxLaboratoryLevel: 12,
    maxHeroLevels: { barbarianKing: 80, archerQueen: 80, grandWarden: 55, royalChampion: 30 },
    goldStorageCap: '20,000,000',
    elixirStorageCap: '20,000,000',
    darkElixirStorageCap: '450,000',
    strategyFocus: 'Pet House unlocks companions: Unicorn, L.A.S.S.I, Mighty Yak, and Electro Owl.',
    keyUnlocks: [
      { id: 'u-28', name: 'Pet House', category: 'Building', slug: 'pet-house', description: 'Train and assign Hero Pets' },
      { id: 'u-29', name: 'Unicorn', category: 'Pet', slug: 'unicorn', description: 'Dedicated personal hero healer' },
      { id: 'u-30', name: 'Flame Flinger', category: 'Siege', slug: 'flame-flinger', description: 'Long-range catapult' }
    ]
  },
  {
    level: 15,
    name: 'Town Hall 15',
    slug: 'th-15',
    theme: 'Cosmic Eclipse, Arcane Runes & Starry Void',
    signatureDefense: 'Monolith & Spell Towers',
    maxLaboratoryLevel: 13,
    maxHeroLevels: { barbarianKing: 90, archerQueen: 90, grandWarden: 65, royalChampion: 40 },
    goldStorageCap: '22,000,000',
    elixirStorageCap: '22,000,000',
    darkElixirStorageCap: '500,000',
    strategyFocus: 'Monolith melts heavy tanks, Spell Towers cast Rage/Invisibility/Poison on defense.',
    keyUnlocks: [
      { id: 'u-31', name: 'Monolith', category: 'Defense', slug: 'monolith', description: '% max HP dark elixir obelisk' },
      { id: 'u-32', name: 'Spell Tower', category: 'Defense', slug: 'spell-tower', description: 'Defensive Rage/Invis/Poison spells' },
      { id: 'u-33', name: 'Root Rider', category: 'Troop', slug: 'root-rider', description: 'Wall-crushing enchanted mount' }
    ]
  },
  {
    level: 16,
    name: 'Town Hall 16',
    slug: 'th-16',
    theme: 'Nature\'s Wrath, Red Terracotta & Gold Spires',
    signatureDefense: 'Merged Defenses (Ricochet Cannon & Multi-Archer Tower)',
    maxLaboratoryLevel: 14,
    maxHeroLevels: { barbarianKing: 95, archerQueen: 95, grandWarden: 70, royalChampion: 45 },
    goldStorageCap: '24,000,000',
    elixirStorageCap: '24,000,000',
    darkElixirStorageCap: '550,000',
    strategyFocus: 'Defense fusion merges 2 buildings into single ultra-high-potency towers.',
    keyUnlocks: [
      { id: 'u-34', name: 'Ricochet Cannon', category: 'Defense', slug: 'ricochet-cannon', description: 'Bouncing kinetic shells' },
      { id: 'u-35', name: 'Multi-Archer Tower', category: 'Defense', slug: 'multi-archer-tower', description: 'Simultaneous 3-arrow barrage' },
      { id: 'u-36', name: 'Spirit Fox', category: 'Pet', slug: 'spirit-fox', description: 'Periodic stealth cloak pet' }
    ]
  },
  {
    level: 17,
    name: 'Town Hall 17',
    slug: 'th-17',
    theme: 'Ethereal Celestial Citadel & Nebula Spires',
    signatureDefense: 'Giga Inferno Nebula & Minion Prince Hero',
    maxLaboratoryLevel: 15,
    maxHeroLevels: { barbarianKing: 100, archerQueen: 100, grandWarden: 75, royalChampion: 50, minionPrince: 20 },
    goldStorageCap: '26,000,000',
    elixirStorageCap: '26,000,000',
    darkElixirStorageCap: '600,000',
    strategyFocus: 'The highest pinnacle of Clash warfare, introducing the 5th Hero Minion Prince and Max Level 10 Inferno Towers.',
    keyUnlocks: [
      { id: 'u-37', name: 'Minion Prince', category: 'Hero', slug: 'minion-prince', description: '5th Hero: Caustic aerial commander' },
      { id: 'u-38', name: 'Giga Inferno Nebula', category: 'Defense', slug: 'town-hall', description: 'Maximum potency defensive core' }
    ]
  }
];
