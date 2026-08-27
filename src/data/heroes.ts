import { HeroEntity } from '../types/entity';

const provenanceDefault = {
  sourceName: 'Supercell Clash of Clans Official Lore & Stats',
  sourceUrl: 'https://supercell.com/en/games/clashofclans/',
  license: 'Fair Use / Fan Content Policy',
  attribution: 'Supercell Oy & Clash Archive Curated Database',
  retrievedAt: '2026-08-20T00:00:00Z',
  lastVerifiedAt: '2026-08-25T00:00:00Z',
};

export const HEROES_DATA: HeroEntity[] = [
  {
    id: 'hero-barbarian-king',
    name: 'Barbarian King',
    slug: 'barbarian-king',
    category: 'hero',
    tagline: 'The undisputed monarch of the village who crushes defenses with his colossal blade.',
    description: 'The Barbarian King is the toughest and strongest warrior in the kingdom. His sheer size, towering health pool, and fierce Iron Fist leadership make him the ultimate frontline vanguard.',
    unlockTownHall: 7,
    unlockRequirementText: 'Unlocked at Town Hall 7 (Cost: 10,000 Dark Elixir)',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    altarSize: '3x3',
    movementSpeed: 16,
    attackSpeed: 1.2,
    range: 1.25,
    targetType: 'Ground',
    damageType: 'Single Target',
    favoriteTarget: 'None',
    patrolRadius: 9,
    altarCost: 10000,
    altarCurrency: 'dark_elixir',
    defaultAbilityName: 'Iron Fist & Giant Gauntlet',
    defaultAbilityDescription: 'Restores a massive burst of health, grants temporary invulnerability or area earthquake damage, and summons raging Barbarians.',
    compatibleEquipmentSlugs: ['giant-gauntlet', 'barbarian-puppet', 'rage-vial', 'spiky-ball'],
    compatiblePetSlugs: ['mighty-yak', 'phoenix', 'spirit-fox'],
    maxLevel: 95,
    provenance: provenanceDefault,
    trivia: [
      'The Barbarian King was the very first Hero added to Clash of Clans in January 2013.',
      'Unlike regular troops, Heroes do not die in combat; they enter a regenerative recovery sleep.',
      'Equipping the Epic Giant Gauntlet makes the King grow gigantic, crushing compartments with area splash quake attacks.'
    ],
    tips: [
      'Use the King on the outer perimeter to carve out one side of the funnel, ensuring the main army marches straight into the core.',
      'Trigger his ability when taking heavy point-defense fire to maximize the health recovery portion of the ability.'
    ],
    strengths: ['Gigantic hitpoint pool for tanking', 'Synergizes with Giant Gauntlet for massive area splash damage'],
    weaknesses: ['Vulnerable to Single-Target Inferno Towers and Headhunters'],
    synergies: ['Archer Queen', 'Giant Gauntlet', 'Phoenix Pet', 'Healers'],
    upgradeLevels: [
      { level: 1, hitpoints: 1700, damagePerSecond: 120, damagePerAttack: 144, regenerationTimeMinutes: 10, upgradeCost: 10000, upgradeCurrency: 'dark_elixir', upgradeTime: 'None', upgradeTimeSeconds: 0, requiredTownHall: 7 },
      { level: 10, hitpoints: 2364, damagePerSecond: 161, damagePerAttack: 193, regenerationTimeMinutes: 14, upgradeCost: 35000, upgradeCurrency: 'dark_elixir', upgradeTime: '1d', upgradeTimeSeconds: 86400, requiredTownHall: 8 },
      { level: 30, hitpoints: 4421, damagePerSecond: 284, damagePerAttack: 341, regenerationTimeMinutes: 24, upgradeCost: 110000, upgradeCurrency: 'dark_elixir', upgradeTime: '3d 12h', upgradeTimeSeconds: 302400, requiredTownHall: 9 },
      { level: 50, hitpoints: 6200, damagePerSecond: 432, damagePerAttack: 518, regenerationTimeMinutes: 34, upgradeCost: 190000, upgradeCurrency: 'dark_elixir', upgradeTime: '5d', upgradeTimeSeconds: 432000, requiredTownHall: 11 },
      { level: 95, hitpoints: 12850, damagePerSecond: 742, damagePerAttack: 890, regenerationTimeMinutes: 44, upgradeCost: 360000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 16 }
    ]
  },
  {
    id: 'hero-archer-queen',
    name: 'Archer Queen',
    slug: 'archer-queen',
    category: 'hero',
    tagline: 'The lethal sharpshooter who commands the battlefield with pinpoint precision.',
    description: 'An eagle-eyed marksman who wields a modified modified heavy X-Bow. With her unmatched range, high DPS, and stealth capabilities, the Archer Queen is the centerpiece of Queen Charge attacks.',
    unlockTownHall: 9,
    unlockRequirementText: 'Unlocked at Town Hall 9 (Cost: 20,000 Dark Elixir)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    altarSize: '3x3',
    movementSpeed: 24,
    attackSpeed: 0.75,
    range: 5.0,
    targetType: 'Ground & Air',
    damageType: 'Single Target',
    favoriteTarget: 'None',
    patrolRadius: 10,
    altarCost: 20000,
    altarCurrency: 'dark_elixir',
    defaultAbilityName: 'Royal Cloak & Invisibility Vial',
    defaultAbilityDescription: 'Cloaks the Queen in total invisibility, preventing defenses from targeting her while dramatically boosting shot damage and summoning Archers.',
    compatibleEquipmentSlugs: ['invisibility-vial', 'frozen-arrow', 'giant-arrow', 'healer-puppet'],
    compatiblePetSlugs: ['unicorn', 'spirit-fox', 'electro-owl'],
    maxLevel: 95,
    provenance: provenanceDefault,
    trivia: [
      'The Archer Queen is the most used hero in competitive Clash of Clans history due to the Queen Walk/Charge strategy.',
      'Her range of 5.0 tiles allows her to snipe many core defenses over two layers of walls.'
    ],
    tips: [
      'Deploy 4-5 Healers behind her (Queen Charge) with Rage Spells to take down enemy Clan Castles, Eagle Artillery, and Town Halls safely.',
      'Use Wall Breakers or Super Wall Breakers to guide her into specific high-value defense compartments.'
    ],
    strengths: ['Huge 5.0 tile attack range', 'Attacks both air and ground targets with rapid 0.75s fire rate', 'Invisibility survivability'],
    weaknesses: ['Fragile HP compared to the Barbarian King; rapid burst defenses can catch her off guard'],
    synergies: ['Healer', 'Rage Spell', 'Unicorn Pet', 'Frozen Arrow'],
    upgradeLevels: [
      { level: 1, hitpoints: 725, damagePerSecond: 160, damagePerAttack: 120, regenerationTimeMinutes: 10, upgradeCost: 20000, upgradeCurrency: 'dark_elixir', upgradeTime: 'None', upgradeTimeSeconds: 0, requiredTownHall: 9 },
      { level: 30, hitpoints: 1530, damagePerSecond: 410, damagePerAttack: 307, regenerationTimeMinutes: 24, upgradeCost: 115000, upgradeCurrency: 'dark_elixir', upgradeTime: '3d 12h', upgradeTimeSeconds: 302400, requiredTownHall: 9 },
      { level: 65, hitpoints: 3040, damagePerSecond: 720, damagePerAttack: 540, regenerationTimeMinutes: 38, upgradeCost: 240000, upgradeCurrency: 'dark_elixir', upgradeTime: '6d', upgradeTimeSeconds: 518400, requiredTownHall: 12 },
      { level: 95, hitpoints: 4465, damagePerSecond: 1040, damagePerAttack: 780, regenerationTimeMinutes: 44, upgradeCost: 360000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 16 }
    ]
  },
  {
    id: 'hero-grand-warden',
    name: 'Grand Warden',
    slug: 'grand-warden',
    category: 'hero',
    tagline: 'A scholarly battle-mage whose life aura protects troops from lethal devastation.',
    description: 'The Grand Warden is a veteran tactician who surveys battles from ground or air. His Life Aura grants bonus hitpoints to nearby friendly troops, and his Eternal Tome renders armies completely invulnerable.',
    unlockTownHall: 11,
    unlockRequirementText: 'Unlocked at Town Hall 11 (Cost: 2,500,000 Elixir)',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80',
    altarSize: '3x3',
    movementSpeed: 16,
    attackSpeed: 1.8,
    range: 7.0,
    targetType: 'Ground & Air',
    damageType: 'Single Target',
    favoriteTarget: 'Troops (Follows army concentration)',
    patrolRadius: 10,
    altarCost: 2500000,
    altarCurrency: 'elixir',
    defaultAbilityName: 'Eternal Tome & Life Aura',
    defaultAbilityDescription: 'Grants temporary 100% invulnerability to all friendly units within his aura radius, negating Giga Bomb and Eagle Artillery blasts.',
    compatibleEquipmentSlugs: ['eternal-tome', 'healing-tome', 'rage-gem', 'fireball'],
    compatiblePetSlugs: ['electro-owl', 'phoenix', 'spirit-fox'],
    maxLevel: 70,
    provenance: provenanceDefault,
    trivia: [
      'The Grand Warden upgrades using regular Elixir rather than Dark Elixir.',
      'He can toggle between Ground and Air mode prior to battle to fly over walls alongside air armies.'
    ],
    tips: [
      'Time his Eternal Tome right when your core army trips the Town Hall Giga Bomb or enters heavy poison clouds.',
      'Equip Healing Tome to restore massive HP while units are protected inside the Eternal Tome invulnerability window.'
    ],
    strengths: ['Passive Life Aura increases max HP of all adjacent units', 'Eternal Tome grants 100% damage immunity', 'Massive 7.0 tile range'],
    weaknesses: ['Lower individual DPS; relies on army proximity'],
    synergies: ['Balloons', 'Root Riders', 'Electro Dragons', 'Eternal Tome'],
    upgradeLevels: [
      { level: 1, hitpoints: 1000, damagePerSecond: 50, damagePerAttack: 90, regenerationTimeMinutes: 10, upgradeCost: 2500000, upgradeCurrency: 'elixir', upgradeTime: 'None', upgradeTimeSeconds: 0, requiredTownHall: 11 },
      { level: 20, hitpoints: 1750, damagePerSecond: 153, damagePerAttack: 275, regenerationTimeMinutes: 20, upgradeCost: 8000000, upgradeCurrency: 'elixir', upgradeTime: '3d', upgradeTimeSeconds: 259200, requiredTownHall: 11 },
      { level: 50, hitpoints: 2440, damagePerSecond: 285, damagePerAttack: 513, regenerationTimeMinutes: 34, upgradeCost: 15000000, upgradeCurrency: 'elixir', upgradeTime: '6d', upgradeTimeSeconds: 518400, requiredTownHall: 13 },
      { level: 70, hitpoints: 3120, damagePerSecond: 384, damagePerAttack: 691, regenerationTimeMinutes: 44, upgradeCost: 21000000, upgradeCurrency: 'elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 16 }
    ]
  },
  {
    id: 'hero-royal-champion',
    name: 'Royal Champion',
    slug: 'royal-champion',
    category: 'hero',
    tagline: 'A fierce gladiator armed with a seeking shield that hurls over walls to hunt defenses.',
    description: 'The Royal Champion bypasses ordinary buildings to hunt down enemy defenses directly. Her enchanted Seeking Shield ricochets across the base, striking multiple defensive structures in one throw.',
    unlockTownHall: 13,
    unlockRequirementText: 'Unlocked at Town Hall 13 (Cost: 120,000 Dark Elixir)',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    altarSize: '3x3',
    movementSpeed: 24,
    attackSpeed: 1.0,
    range: 3.0,
    targetType: 'Ground & Air',
    damageType: 'Single Target',
    favoriteTarget: 'Defenses',
    patrolRadius: 9,
    altarCost: 120000,
    altarCurrency: 'dark_elixir',
    defaultAbilityName: 'Seeking Shield & Royal Gem',
    defaultAbilityDescription: 'Hurls her shield across the battlefield, bouncing between up to 4 enemy defenses for massive direct burst damage while restoring health.',
    compatibleEquipmentSlugs: ['seeking-shield', 'royal-gem', 'rocket-spear', 'haste-vial'],
    compatiblePetSlugs: ['diggy', 'spirit-fox', 'l-a-s-s-i'],
    maxLevel: 45,
    provenance: provenanceDefault,
    trivia: [
      'The Royal Champion hops directly over walls without requiring Wall Breakers or Jump Spells.',
      'She is the only Hero whose favorite target is Defenses.'
    ],
    tips: [
      'Pair her with the Diggy pet to stun key defenses (like Single-Target Infernos or Monoliths) each time she attacks a new target.',
      'Deploy her on the back-end flank of an attack to clean up remaining Archer Towers, Cannons, and Air Defenses.'
    ],
    strengths: ['Hops over walls naturally', 'Directly targets defensive structures', 'Seeking shield eliminates backend defenses'],
    weaknesses: ['Will jump ahead of main army into heavy defense crossfire if not supported'],
    synergies: ['Diggy Pet', 'Haste Vial', 'Rocket Spear', 'Skeleton Spell'],
    upgradeLevels: [
      { level: 1, hitpoints: 3000, damagePerSecond: 430, damagePerAttack: 430, regenerationTimeMinutes: 10, upgradeCost: 120000, upgradeCurrency: 'dark_elixir', upgradeTime: 'None', upgradeTimeSeconds: 0, requiredTownHall: 13 },
      { level: 25, hitpoints: 3840, damagePerSecond: 574, damagePerAttack: 574, regenerationTimeMinutes: 26, upgradeCost: 230000, upgradeCurrency: 'dark_elixir', upgradeTime: '5d', upgradeTimeSeconds: 432000, requiredTownHall: 13 },
      { level: 45, hitpoints: 4620, damagePerSecond: 710, damagePerAttack: 710, regenerationTimeMinutes: 44, upgradeCost: 370000, upgradeCurrency: 'dark_elixir', upgradeTime: '8d', upgradeTimeSeconds: 691200, requiredTownHall: 16 }
    ]
  },
  {
    id: 'hero-minion-prince',
    name: 'Minion Prince',
    slug: 'minion-prince',
    category: 'hero',
    tagline: 'The winged aristocrat who reigns from the shadows with acidic spit and aerial superiority.',
    description: 'Crowned in the dark caverns of the realm, the Minion Prince is an aerial hero who rains caustic Dark Elixir spit upon ground and air targets with swift agility.',
    unlockTownHall: 17,
    unlockRequirementText: 'Unlocked at Town Hall 17 (Cost: 350,000 Dark Elixir)',
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=600&q=80',
    altarSize: '3x3',
    movementSpeed: 28,
    attackSpeed: 0.8,
    range: 4.5,
    targetType: 'Ground & Air',
    damageType: 'Single Target',
    favoriteTarget: 'None',
    patrolRadius: 10,
    altarCost: 350000,
    altarCurrency: 'dark_elixir',
    defaultAbilityName: 'Corrosive Swarm',
    defaultAbilityDescription: 'Spits a heavy corrosive acid cloud that melts defense armor and spawns a swarm of royal shadow minions.',
    compatibleEquipmentSlugs: ['corrosive-orb', 'shadow-wings'],
    compatiblePetSlugs: ['spirit-fox', 'phoenix'],
    maxLevel: 20,
    provenance: provenanceDefault,
    trivia: [
      'The Minion Prince was introduced with the Town Hall 17 update as the 5th official Hero in Clash of Clans.',
      'He is permanently airborne, making him immune to Cannons, Mortars, and ground traps.'
    ],
    tips: ['Use his aerial mobility to snipe corner defenses or escort LavaLoon pushes deep into the TH17 Giga Inferno core.'],
    strengths: ['Immune to all ground hazards and walls', 'Rapid attack rate and high aerial mobility'],
    weaknesses: ['Targeted by Seeking Air Mines and Air Defenses'],
    synergies: ['Lava Hound', 'Balloon', 'Grand Warden Air Mode'],
    upgradeLevels: [
      { level: 1, hitpoints: 3400, damagePerSecond: 480, damagePerAttack: 384, regenerationTimeMinutes: 10, upgradeCost: 350000, upgradeCurrency: 'dark_elixir', upgradeTime: 'None', upgradeTimeSeconds: 0, requiredTownHall: 17 },
      { level: 10, hitpoints: 4100, damagePerSecond: 590, damagePerAttack: 472, regenerationTimeMinutes: 20, upgradeCost: 380000, upgradeCurrency: 'dark_elixir', upgradeTime: '7d', upgradeTimeSeconds: 604800, requiredTownHall: 17 },
      { level: 20, hitpoints: 4900, damagePerSecond: 720, damagePerAttack: 576, regenerationTimeMinutes: 44, upgradeCost: 420000, upgradeCurrency: 'dark_elixir', upgradeTime: '9d', upgradeTimeSeconds: 777600, requiredTownHall: 17 }
    ]
  }
];
