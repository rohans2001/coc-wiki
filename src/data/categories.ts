import { CategoryMeta } from '../types/search';

export const CATEGORIES: CategoryMeta[] = [
  {
    type: 'troop',
    name: 'Troop',
    pluralName: 'Troops',
    path: '/troops',
    description: 'Elixir, Dark Elixir, and Super Troops trained in Barracks for attacking enemy villages.',
    iconName: 'Users',
    itemCount: 10,
    featuredColor: 'from-amber-500/20 to-orange-600/10 border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  {
    type: 'hero',
    name: 'Hero',
    pluralName: 'Heroes',
    path: '/heroes',
    description: 'Immortal commanders who lead armies, defend bases, and equip powerful active and passive gear.',
    iconName: 'Crown',
    itemCount: 5,
    featuredColor: 'from-purple-500/20 to-indigo-600/10 border-purple-500/30',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    type: 'defense',
    name: 'Defense',
    pluralName: 'Defenses & Buildings',
    path: '/defenses',
    description: 'Cannons, Inferno Towers, Monoliths, and Town Hall giga weapons that protect your village.',
    iconName: 'Shield',
    itemCount: 10,
    featuredColor: 'from-blue-500/20 to-cyan-600/10 border-blue-500/30',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    type: 'spell',
    name: 'Spell',
    pluralName: 'Spells',
    path: '/spells',
    description: 'Potent Elixir and Dark Elixir concoctions brewed in the Spell Factory to turn the tide of war.',
    iconName: 'Sparkles',
    itemCount: 7,
    featuredColor: 'from-pink-500/20 to-rose-600/10 border-pink-500/30',
    badgeClass: 'bg-pink-500/10 text-pink-400 border-pink-500/30'
  },
  {
    type: 'equipment',
    name: 'Equipment',
    pluralName: 'Hero Equipment',
    path: '/equipment',
    description: 'Customizable gear crafted in the Blacksmith that grants heroes unique active abilities and stats.',
    iconName: 'Hammer',
    itemCount: 8,
    featuredColor: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    type: 'pet',
    name: 'Pet',
    pluralName: 'Hero Pets',
    path: '/pets',
    description: 'Animal companions trained in the Pet House to accompany and protect your heroes into battle.',
    iconName: 'Footprints',
    itemCount: 7,
    featuredColor: 'from-teal-500/20 to-emerald-600/10 border-teal-500/30',
    badgeClass: 'bg-teal-500/10 text-teal-400 border-teal-500/30'
  },
  {
    type: 'siege',
    name: 'Siege Machine',
    pluralName: 'Siege Machines',
    path: '/siege-machines',
    description: 'Devastating war vehicles built in the Workshop to transport Clan Castle reinforcements.',
    iconName: 'Truck',
    itemCount: 7,
    featuredColor: 'from-orange-500/20 to-red-600/10 border-orange-500/30',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  },
  {
    type: 'resource',
    name: 'Resource',
    pluralName: 'Resources & Ores',
    path: '/resources',
    description: 'Gold, Elixir, Dark Elixir, and Blacksmith Ores required to build, research, and upgrade.',
    iconName: 'Coins',
    itemCount: 6,
    featuredColor: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/30',
    badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
  },
  {
    type: 'mechanic',
    name: 'Game Mechanic',
    pluralName: 'Game Mechanics',
    path: '/mechanics',
    description: 'Core game systems including War matchmaking, shield calculations, loot formulas, and timers.',
    iconName: 'BookOpen',
    itemCount: 5,
    featuredColor: 'from-indigo-500/20 to-violet-600/10 border-indigo-500/30',
    badgeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
  },
  {
    type: 'defense',
    name: 'Progression',
    pluralName: 'Town Hall Progression',
    path: '/progression',
    description: 'Complete Town Hall 1 through 17 milestone maps, building unlocks, and hero level caps.',
    iconName: 'Crown',
    itemCount: 17,
    featuredColor: 'from-amber-500/20 to-yellow-600/10 border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  }
];
