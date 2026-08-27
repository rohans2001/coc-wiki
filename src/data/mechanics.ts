import { GameMechanicEntity } from '../types/entity';

const provenanceDefault = {
  sourceName: 'Supercell Clash of Clans Verified Game Rules & Math System',
  sourceUrl: 'https://supercell.com/en/games/clashofclans/',
  license: 'Fair Use / Fan Content Policy',
  attribution: 'Supercell Oy & Clash Archive Curated Database',
  retrievedAt: '2026-08-20T00:00:00Z',
  lastVerifiedAt: '2026-08-25T00:00:00Z',
};

export const MECHANICS_DATA: GameMechanicEntity[] = [
  {
    id: 'mech-shield-guard',
    name: 'Shield and Guard System',
    slug: 'shield-and-guard',
    category: 'mechanic',
    topic: 'Village Defense & Matchmaking Protection',
    summary: 'The mathematical rules governing when shields are awarded after an attack, how guard prevents revenge strikes, and how attacking consumes shield time.',
    tagline: 'Understand the exact damage thresholds and army requirements that activate defensive shields and village guards.',
    description: 'When an enemy attacks your village, a Shield is awarded only if specific destruction percentage and army deployment thresholds are met. While shielded, other players cannot match against your village.',
    unlockTownHall: 1,
    maxLevel: 1,
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80',
    provenance: provenanceDefault,
    rules: [
      {
        title: '30% Destruction Threshold',
        explanation: 'A 12-hour Shield is granted if the attacker inflicts at least 30% destruction and uses at least 33% of their total army capacity.'
      },
      {
        title: '60% Destruction Threshold',
        explanation: 'A 14-hour Shield is granted if the attacker achieves at least 60% base destruction.'
      },
      {
        title: '90% Destruction Threshold',
        explanation: 'A maximum 16-hour Shield is granted if destruction exceeds 90%.'
      },
      {
        title: 'Attacking Through Shields',
        explanation: 'Attacking while under a Shield does not remove the entire shield; it deducts 3 hours on the first attack, 4 on the second, 5 on the third, etc.'
      }
    ],
    formulas: [
      {
        name: 'Shield Time Deduction',
        formula: 'Deduction = 3h + (Attacks_In_Current_Shield * 1h)',
        example: 'Your 2nd attack while under the same shield reduces your remaining shield duration by 4 hours.'
      }
    ]
  },
  {
    id: 'mech-war-weight',
    name: 'War Weight & Matchmaking',
    slug: 'war-weight',
    category: 'mechanic',
    topic: 'Clan Wars & CWL Roster Balance',
    summary: 'How defensive structures, hero levels, offense upgrades, and walls calculate your hidden War Weight in Clan Wars.',
    tagline: 'Demystifying the algorithm behind Clan War matchmaking and base ranking.',
    description: 'Every building, hero level, troop upgrade, and defense contributes a hidden value known as War Weight. High-impact defenses like the Eagle Artillery, Monolith, and Giga Infernos carry the heaviest matchmaking weight.',
    unlockTownHall: 1,
    maxLevel: 1,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    provenance: provenanceDefault,
    rules: [
      {
        title: 'Offensive vs Defensive Weight',
        explanation: 'Defenses contribute heavily to war lineup positioning, while offensive laboratory and hero upgrades match your roster against clans with equivalent attack strength.'
      },
      {
        title: 'Signature Defense Impact',
        explanation: 'Placing the Eagle Artillery (TH11), Scattershots (TH13), Spell Towers & Monolith (TH15), and Ricochet Cannons (TH16) triggers significant jumps in war weight.'
      },
      {
        title: 'CWL Matchmaking Note',
        explanation: 'Clan War Leagues (CWL) do NOT use War Weight. CWL matchmaking is purely determined by your Clan\'s tier league bracket.'
      }
    ]
  },
  {
    id: 'mech-ore-economy',
    name: 'Ores & Blacksmith Economy',
    slug: 'ores-and-blacksmith',
    category: 'mechanic',
    topic: 'Hero Equipment Upgrade Materials',
    summary: 'Everything about Shiny Ore, Glowy Ore, and Starry Ore acquisition from Daily Star Bonuses, Clan Wars, and the Trader.',
    tagline: 'Master the acquisition rates of Shiny, Glowy, and Starry ores for Hero Equipment.',
    description: 'Hero Equipment upgrades do not use Gold or Elixir. Instead, they require three types of magical ores: Shiny Ore (common upgrades), Glowy Ore (key milestone levels), and Starry Ore (Epic Equipment).',
    unlockTownHall: 8,
    maxLevel: 1,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    provenance: provenanceDefault,
    rules: [
      {
        title: 'Daily Star Bonus',
        explanation: 'Earning 5 stars in regular multiplayer battles awards Shiny and Glowy ores scaled by your current Trophy League (Legend League awards the maximum).'
      },
      {
        title: 'Clan War Ores',
        explanation: 'Winning Clan War attacks awards significant Shiny, Glowy, and Starry ores. Higher enemy Town Halls yield greater ore bounties.'
      },
      {
        title: 'Trader & Event Passes',
        explanation: 'Starry Ore can also be purchased directly from the Weekly Trader using Raid Medals or earned during special monthly super troop events.'
      }
    ]
  }
];
