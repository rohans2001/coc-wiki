-- Clash Archive Seed Data
-- File: supabase/seed.sql
-- Description: Comprehensive relational seed data for all categories, entities, stats, levels, level stats, requirements, relationships, and sources.

---------------------------------------------------------
-- 1. SOURCES SEED
---------------------------------------------------------
INSERT INTO sources (id, name, base_url, license, attribution_text)
VALUES
  ('src-official', 'Clash of Clans Official Game Data', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database'),
  ('src-community', 'Clash Community Verified Stats', 'https://clashofclans.fandom.com/', 'CC-BY-SA 3.0', 'Community Contributors & Game Data Extracts')
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 2. CATEGORIES SEED
---------------------------------------------------------
INSERT INTO categories (id, name, slug, description, entity_type, icon, display_order)
VALUES
  ('cat-troops', 'Troops', 'troops', 'Elixir, Dark Elixir, and Super Troops trained in Barracks for attacking enemy villages.', 'troop', 'Users', 1),
  ('cat-heroes', 'Heroes', 'heroes', 'Immortal commanders who lead armies, defend bases, and equip powerful active and passive gear.', 'hero', 'Crown', 2),
  ('cat-defenses', 'Defenses & Buildings', 'defenses', 'Cannons, Inferno Towers, Monoliths, and Town Hall giga weapons that protect your village.', 'defense', 'Shield', 3),
  ('cat-spells', 'Spells', 'spells', 'Potent Elixir and Dark Elixir concoctions brewed in the Spell Factory to turn the tide of war.', 'spell', 'Sparkles', 4),
  ('cat-equipment', 'Hero Equipment', 'equipment', 'Customizable gear crafted in the Blacksmith that grants heroes unique active abilities and stats.', 'equipment', 'Hammer', 5),
  ('cat-pets', 'Hero Pets', 'pets', 'Animal companions trained in the Pet House to accompany and protect your heroes into battle.', 'pet', 'Footprints', 6),
  ('cat-sieges', 'Siege Machines', 'siege-machines', 'Devastating war vehicles built in the Workshop to transport Clan Castle reinforcements.', 'siege', 'Truck', 7),
  ('cat-resources', 'Resources & Ores', 'resources', 'Gold, Elixir, Dark Elixir, and Blacksmith Ores required to build, research, and upgrade.', 'resource', 'Coins', 8),
  ('cat-mechanics', 'Game Mechanics', 'mechanics', 'Core game systems including War matchmaking, shield calculations, loot formulas, and timers.', 'mechanic', 'BookOpen', 9)
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 3. CORE ENTITIES SEED
---------------------------------------------------------
INSERT INTO entities (id, name, slug, entity_type, category, subcategory, summary, description, image_url, icon_url, unlock_town_hall, unlock_requirement_text, max_level, is_featured, is_active, trivia, tips, strengths, weaknesses, synergies, created_at, updated_at)
VALUES
  -- TROOPS
  (
    'troop-barbarian', 'Barbarian', 'barbarian', 'troop', 'troop', 'elixir_troop',
    'An intrepid warrior with an impressive mustache and a thirst for battle.',
    'This fearless warrior relies on his bulging muscles and striking mustache to wreak havoc in enemy villages. Release a horde of Barbarians and enjoy the mayhem! As the foundational melee troop of Clash of Clans, the Barbarian excels at distracting single-target defenses, clearing outer junk buildings for funneling, and swarming key enemy targets in large packs.',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', 'Users', 1, 'Unlocked at Barracks Level 1 (Town Hall 1)', 12, true, true,
    '["The Barbarian is the iconic mascot of Clash of Clans and appears in the game app icon.", "At Level 6, Barbarians gain an iron helmet with horns, giving them a fierce Viking appearance."]'::jsonb,
    '["Use single Barbarians to test for hidden Spring Traps or Giant Bombs.", "Pair with Archers (Barch strategy) for efficient resource farming."]'::jsonb,
    '["Very low housing space (1 space)", "Fast attack frequency", "Great for trap checking"]'::jsonb,
    '["Vulnerable to Mortars and Wizard Towers", "Cannot attack air units"]'::jsonb,
    '["Archer", "Barbarian King", "Rage Spell", "Healing Spell"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-archer', 'Archer', 'archer', 'troop', 'troop', 'elixir_troop',
    'A sharp-eyed ranged marksman that snipes over walls from a safe distance.',
    'These sharpshooters like to keep their distance in battle. Nothing makes them happier than picking off targets from behind sturdy walls or meat-shield tanks.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Users', 1, 'Unlocked at Barracks Level 2 (Town Hall 1)', 12, false, true,
    '["Archers are the first ranged troop unlocked in the game.", "Their pink hair turns violet with a golden tiara at higher levels."]'::jsonb,
    '["Deploy behind Giants so they can fire undisturbed over perimeter walls.", "Pick off exposed outer buildings outside defense range."]'::jsonb,
    '["Ranged attack over walls", "Targets air and ground", "High movement speed"]'::jsonb,
    '["Extremely low hitpoints; susceptible to any splash defense"]'::jsonb,
    '["Giant", "Barbarian", "Archer Queen"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-giant', 'Giant', 'giant', 'troop', 'troop', 'elixir_troop',
    'Massive hulking warriors who absorb heavy defense fire while targeting enemy cannons.',
    'These big guys may seem calm, but show them a turret or cannon and their fury is unleashed! Slow but tough, they absorb tremendous punishment to let your squishy damage dealers operate safely.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Users', 2, 'Unlocked at Barracks Level 3 (Town Hall 2)', 12, false, true,
    '["Giants will completely ignore non-defense buildings until all defenses on the map are eliminated."]'::jsonb,
    '["Deploy in groups of 4-6 accompanied by a Wall Breaker and Wizards behind."]'::jsonb,
    '["High hitpoint tanking", "Direct pathing to enemy defenses"]'::jsonb,
    '["Spring Traps can launch multiple Giants", "Slow movement speed"]'::jsonb,
    '["Wizard", "Healer", "Healing Spell"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-goblin', 'Goblin', 'goblin', 'troop', 'troop', 'elixir_troop',
    'Greedy, lightning-fast creatures that deal double damage to loot and resource storages.',
    'These pesky little creatures only have eyes for one thing: LOOT! They are faster than a Spring Trap and deal double damage to Gold Mines, Elixir Collectors, and Storages.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Users', 2, 'Unlocked at Barracks Level 4 (Town Hall 2)', 9, false, true,
    '["Goblins have the highest base movement speed of all standard elixir troops (32 speed)."]'::jsonb,
    '["Upgrade to Sneaky Goblins at TH11 for the best farming and Town Hall sniping in the game."]'::jsonb,
    '["Highest base movement speed", "2x damage multiplier vs Storages and Collectors"]'::jsonb,
    '["Mortars and Wizard Towers can one-shot swarms"]'::jsonb,
    '["Jump Spell", "Invisibility Spell", "Sneaky Goblin Super Troop"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-wizard', 'Wizard', 'wizard', 'troop', 'troop', 'elixir_troop',
    'Master of the arcane who unleashes devastating area splash fireballs.',
    'The Wizard is a terrifying presence on the battlefield. Pair him up with some meat shields and cast heavy splash destruction across enemy lines!',
    'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80', 'Users', 5, 'Unlocked at Barracks Level 7 (Town Hall 5)', 12, false, true,
    '["Wizards are responsible for creating the magical fire inside Inferno Towers according to Clash lore."]'::jsonb,
    '["Always place behind a Golem, P.E.K.K.A, or Giant; never deploy in front."]'::jsonb,
    '["High area splash damage", "Can attack both flying and ground units"]'::jsonb,
    '["Low hitpoints; vulnerable to Giant Bombs and Mortar shots"]'::jsonb,
    '["Golem", "P.E.K.K.A", "Rage Spell"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-dragon', 'Dragon', 'dragon', 'troop', 'troop', 'elixir_troop',
    'Fearsome flying leviathan that breathes searing fire over ground and air alike.',
    'The visual majesty of the Dragon is known across the realm. Spitting fire from the sky, this aerial behemoth ignores walls and burns entire base compartments to ash.',
    'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=600&q=80', 'Users', 7, 'Unlocked at Barracks Level 9 (Town Hall 7)', 11, false, true,
    '["Mass Dragon attacks (DragLoon) have been a dominant war strategy from TH7 through TH16."]'::jsonb,
    '["Use Lightning Spells or Queen Charge to eliminate threatening Air Defenses before launching."]'::jsonb,
    '["Immune to ground-only defenses", "Area splash damage"]'::jsonb,
    '["Air Defenses and Single-Target Inferno Towers melt them fast"]'::jsonb,
    '["Balloon", "Rage Spell", "Grand Warden"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'troop-pekka', 'P.E.K.K.A', 'pekka', 'troop', 'troop', 'elixir_troop',
    'Heavy armored juggernaut delivering devastating single-target slashes.',
    'P.E.K.K.A is an armored juggernaut delivering devastating single-target slashes that slice through high-HP buildings like butter.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Users', 8, 'Unlocked at Barracks Level 10 (Town Hall 8)', 11, false, true,
    '["Supercell officially confirmed P.E.K.K.A is female in early promotional videos."]'::jsonb,
    '["Funnel outer buildings with Baby Dragons or Wizards so P.E.K.K.A enters the base core directly."]'::jsonb,
    '["Massive single-target burst damage", "Extremely high hitpoints"]'::jsonb,
    '["Slow attack rate makes her vulnerable to skeleton traps and swarms"]'::jsonb,
    '["Wizard", "Super Wall Breaker", "Rage Spell", "Healer (Pekka Smash)"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),

  -- HEROES
  (
    'hero-barbarian-king', 'Barbarian King', 'barbarian-king', 'hero', 'hero', NULL,
    'The undisputed monarch of the village who crushes defenses with his colossal blade.',
    'The Barbarian King is the toughest and strongest warrior in the kingdom. His sheer size, towering health pool, and fierce Iron Fist leadership make him the ultimate frontline vanguard.',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', 'Crown', 7, 'Unlocked at Town Hall 7 (Cost: 10,000 Dark Elixir)', 95, true, true,
    '["The Barbarian King was the very first Hero added to Clash of Clans in January 2013."]'::jsonb,
    '["Use the King on the outer perimeter to carve out one side of the funnel."]'::jsonb,
    '["Gigantic hitpoint pool for tanking", "Massive area splash with Giant Gauntlet"]'::jsonb,
    '["Vulnerable to Single-Target Inferno Towers and Headhunters"]'::jsonb,
    '["Archer Queen", "Giant Gauntlet", "Phoenix Pet", "Healers"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'
  ),
  (
    'hero-archer-queen', 'Archer Queen', 'archer-queen', 'hero', 'hero', NULL,
    'The lethal sharpshooter who commands the battlefield with pinpoint precision.',
    'An eagle-eyed marksman who wields a modified heavy X-Bow. With her unmatched range, high DPS, and stealth capabilities, the Archer Queen is the centerpiece of Queen Charge attacks.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Crown', 9, 'Unlocked at Town Hall 9 (Cost: 20,000 Dark Elixir)', 95, true, true,
    '["Her range of 5.0 tiles allows her to snipe many core defenses over two layers of walls."]'::jsonb,
    '["Deploy 4-5 Healers behind her (Queen Charge) with Rage Spells for safe deep penetrations."]'::jsonb,
    '["Huge 5.0 tile attack range", "Attacks air and ground", "Invisibility survivability"]'::jsonb,
    '["Fragile HP compared to Barbarian King"]'::jsonb,
    '["Healer", "Rage Spell", "Unicorn Pet", "Frozen Arrow"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'
  ),
  (
    'hero-grand-warden', 'Grand Warden', 'grand-warden', 'hero', 'hero', NULL,
    'A scholarly battle-mage whose life aura protects troops from lethal devastation.',
    'The Grand Warden is a veteran tactician who surveys battles from ground or air. His Life Aura grants bonus hitpoints to nearby friendly troops, and his Eternal Tome renders armies completely invulnerable.',
    'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80', 'Crown', 11, 'Unlocked at Town Hall 11 (Cost: 2,500,000 Elixir)', 70, false, true,
    '["The Grand Warden upgrades using regular Elixir rather than Dark Elixir."]'::jsonb,
    '["Time his Eternal Tome right when your core army trips the Town Hall Giga Bomb."]'::jsonb,
    '["Passive Life Aura increases max HP", "Eternal Tome grants 100% damage immunity", "7.0 tile range"]'::jsonb,
    '["Lower individual DPS; relies on army proximity"]'::jsonb,
    '["Balloons", "Root Riders", "Electro Dragons", "Eternal Tome"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'hero-royal-champion', 'Royal Champion', 'royal-champion', 'hero', 'hero', NULL,
    'A fierce gladiator armed with a seeking shield that hurls over walls to hunt defenses.',
    'The Royal Champion bypasses ordinary buildings to hunt down enemy defenses directly. Her enchanted Seeking Shield ricochets across the base, striking multiple defensive structures in one throw.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Crown', 13, 'Unlocked at Town Hall 13 (Cost: 120,000 Dark Elixir)', 45, false, true,
    '["The Royal Champion hops directly over walls without requiring Wall Breakers or Jump Spells."]'::jsonb,
    '["Pair her with the Diggy pet to stun key defenses each time she attacks a new target."]'::jsonb,
    '["Hops over walls naturally", "Directly targets defensive structures", "Seeking shield burst"]'::jsonb,
    '["Will jump ahead of main army into heavy defense crossfire if not supported"]'::jsonb,
    '["Diggy Pet", "Haste Vial", "Rocket Spear", "Skeleton Spell"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'hero-minion-prince', 'Minion Prince', 'minion-prince', 'hero', 'hero', NULL,
    'The winged aristocrat who reigns from the shadows with acidic spit and aerial superiority.',
    'Crowned in the dark caverns of the realm, the Minion Prince is an aerial hero who rains caustic Dark Elixir spit upon ground and air targets with swift agility.',
    'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=600&q=80', 'Crown', 17, 'Unlocked at Town Hall 17 (Cost: 350,000 Dark Elixir)', 20, true, true,
    '["The Minion Prince was introduced with the Town Hall 17 update as the 5th official Hero."]'::jsonb,
    '["Use his aerial mobility to snipe corner defenses or escort LavaLoon pushes deep into the core."]'::jsonb,
    '["Immune to all ground hazards and walls", "Rapid attack rate and high aerial mobility"]'::jsonb,
    '["Targeted by Seeking Air Mines and Air Defenses"]'::jsonb,
    '["Lava Hound", "Balloon", "Grand Warden Air Mode"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'
  ),

  -- SPELLS
  (
    'spell-lightning', 'Lightning Spell', 'lightning-spell', 'spell', 'spell', 'elixir_spell',
    'Calls down a thunderous bolt of electricity that zaps pinpoint targets and resets defense beams.',
    'Electrocute your enemies! Cast this spell to summon a concentrated electrical discharge that damages buildings, eliminates defensive troops, and resets Inferno Tower charge-up beams.',
    'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80', 'Sparkles', 5, 'Unlocked at Spell Factory Level 1 (Town Hall 5)', 11, false, true,
    '["Lightning Spells do not damage Resource Storages or Town Halls to prevent griefing loot sniping."]'::jsonb,
    '["Combine with Earthquake Spells (ZapQuake) to calculate the exact threshold to destroy Air Defenses."]'::jsonb,
    '["Takes only 1 housing space", "Resets Single-Target Inferno Tower", "Instant destruction of key defenses"]'::jsonb,
    '["No effect on Storages or Town Hall structure"]'::jsonb,
    '["Earthquake Spell", "Dragon", "Lava Hound"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'spell-healing', 'Healing Spell', 'healing-spell', 'spell', 'spell', 'elixir_spell',
    'Restores health to wounded warriors over time inside a soothing golden aura.',
    'Heal your troops to keep them in the fight! Cast this spell to create a stationary healing circle that continuously restores hitpoints to all ground and aerial friendly units inside.',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80', 'Sparkles', 6, 'Unlocked at Spell Factory Level 2 (Town Hall 6)', 10, false, true,
    '["Unlike Healer units, Healing Spells can heal other Healers and flying troops."]'::jsonb,
    '["Drop on clustered Hog Riders or Miners when they encounter Giant Bomb traps or Wizard Towers."]'::jsonb,
    '["Heals both ground and air units", "Immense total health output over 12 seconds"]'::jsonb,
    '["Cannot outheal Single-Target Inferno max beam damage"]'::jsonb,
    '["Hog Rider", "Miner", "Giant", "Barbarian"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'spell-rage', 'Rage Spell', 'rage-spell', 'spell', 'spell', 'elixir_spell',
    'Empowers units with an immense burst of speed and attack damage inside a fiery purple ring.',
    'Enrage your units to make them bigger, faster, and hit harder! Drop this spell to create a Ring of Rage and watch your warriors tear through high-health buildings, defenses, and enemy hero compartments.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Sparkles', 7, 'Unlocked at Spell Factory Level 3 (Town Hall 7)', 7, true, true,
    '["The Rage Spell is considered the single most versatile and high-impact spell in offensive meta strategies."]'::jsonb,
    '["Layer a Rage Spell over an Archer Queen during a Queen Charge when encountering enemy heroes or CC troops."]'::jsonb,
    '["Massive +190% damage multiplier", "+32 movement speed boost", "Covers 5.0 tiles for 18 seconds"]'::jsonb,
    '["Occupies 2 housing spaces", "Does not affect defensive structures"]'::jsonb,
    '["Archer Queen", "P.E.K.K.A", "Dragon", "Electro Dragon"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'spell-jump', 'Jump Spell', 'jump-spell', 'spell', 'spell', 'elixir_spell',
    'Magically enchants walls so that ground troops can leap clean over them.',
    'Walls slowing you down? Cast a Jump Spell near enemy fortifications to grant your ground forces the mystical power to hop over obstacles effortlessly.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Sparkles', 9, 'Unlocked at Spell Factory Level 4 (Town Hall 9)', 5, false, true,
    '["A single Jump Spell can connect up to 4 wall intersections if placed precisely at the corner."]'::jsonb,
    '["Place in the middle intersection of layered core compartments to open up half the base."]'::jsonb,
    '["Long duration (up to 80s)", "Allows slow heavy tanks to bypass multiple walls"]'::jsonb,
    '["Does not deal damage or speed troops up"]'::jsonb,
    '["P.E.K.K.A", "Barbarian King", "Sneaky Goblin"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'spell-freeze', 'Freeze Spell', 'freeze-spell', 'spell', 'spell', 'elixir_spell',
    'Flash-freezes enemy defenses and Clan Castle troops, stopping them in their tracks.',
    'When the heat of battle gets too intense, cool things down! The Freeze Spell temporarily paralyzes all enemy buildings, defenses, and defensive troops inside its radius.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Sparkles', 9, 'Unlocked at Spell Factory Level 4 (Town Hall 9)', 7, false, true,
    '["Freeze Spells can cover both an Inferno Tower and the Town Hall if they are positioned adjacent."]'::jsonb,
    '["Wait until an Inferno Tower is on its final tier beam or the Monolith has fired 2 shots before freezing."]'::jsonb,
    '["Low 1 housing space", "Neutralizes lethal defenses instantly", "Gives breathing room for core army"]'::jsonb,
    '["Short duration requires precise timing"]'::jsonb,
    '["Balloon", "Root Rider", "Queen Charge"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),

  -- BUILDINGS & DEFENSES
  (
    'defense-town-hall', 'Town Hall', 'town-hall', 'defense', 'defense', NULL,
    'The heart of your village. Unlocks defensive weapons from TH12 and the Giga Inferno at TH17.',
    'The Town Hall is the central hub of your village. Upgrading your Town Hall unlocks new buildings, defenses, troops, hero levels, and spells. From Town Hall 12 onwards, it defends itself with automated Giga Tesla / Giga Inferno weapons and detonates upon destruction.',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80', 'Shield', 1, 'Starting building of every village', 17, true, true,
    '["Town Hall 17 features a cosmic starry theme with an ultra-lethal defense system."]'::jsonb,
    '["Protect the Town Hall inside your core compartments for anti-2-star war bases."]'::jsonb,
    '["Massive hitpoints (up to 10,800 HP)", "Lethal death damage and lingering poison slow cloud"]'::jsonb,
    '["Susceptible to Sneaky Goblin blimp snipes with Invisibility Spells"]'::jsonb,
    '["Tornado Trap", "Clan Castle", "Ricochet Cannon"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'
  ),
  (
    'defense-cannon', 'Cannon', 'cannon', 'defense', 'defense', NULL,
    'Reliable, rapid-firing defensive turret that pounds approaching ground forces.',
    'Cannons are the bedrock of village defense. Great for point defense against single ground targets like Barbarians, Giants, and P.E.K.K.As. Can be geared up into a Double Cannon at TH7.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Shield', 1, 'Unlocked at Town Hall 1 (Cost: 250 Gold)', 22, false, true,
    '["The Cannon was the first defense ever introduced in Clash of Clans."]'::jsonb,
    '["Place near outer walls to engage enemy troops before they reach inner compartments."]'::jsonb,
    '["High attack rate", "Solid damage vs ground tanks"]'::jsonb,
    '["Cannot target air units (Balloons, Dragons)"]'::jsonb,
    '["Archer Tower", "Wall Breaker Traps"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'defense-archer-tower', 'Archer Tower', 'archer-tower', 'defense', 'defense', NULL,
    'Elevated vantage tower that fires swift arrows at ground and air invaders alike.',
    'Archer Towers have longer range than cannons and can shoot at both flying and ground attackers, making them crucial all-round perimeter sentinels.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Shield', 2, 'Unlocked at Town Hall 2 (Cost: 1,000 Gold)', 22, false, true,
    '["Can be geared up to fast-attack mode with the Master Builder at Town Hall 8."]'::jsonb,
    '["Spread Archer Towers evenly to prevent Minion funneling around the edges."]'::jsonb,
    '["Long 10-tile range", "Fast 0.5s fire rate", "Hits air and ground"]'::jsonb,
    '["Single target only; vulnerable to mass swarms"]'::jsonb,
    '["Cannon", "Air Defense"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'defense-wizard-tower', 'Wizard Tower', 'wizard-tower', 'defense', 'defense', NULL,
    'Arcane watchtower manned by a wizard who unleashes area splash spells against ground and air swarms.',
    'The Wizard Tower casts potent area-of-effect spells that simultaneously obliterate clustered enemies like Barbarians, Archers, Goblins, Minions, and Balloons.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Shield', 5, 'Unlocked at Town Hall 5 (Cost: 180,000 Gold)', 17, false, true,
    '["The Wizard atop the tower casts lightning in early levels and purple arcane fire at higher tiers."]'::jsonb,
    '["Position near Storages to vaporize Sneaky Goblins and near Air Defenses to shield against Balloon swarms."]'::jsonb,
    '["Area splash damage against ground and air", "Shreds mass swarms and Bat Spells"]'::jsonb,
    '["Relatively short 7.0 tile range"]'::jsonb,
    '["Air Defense", "Bomb Tower", "Tornado Trap"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'defense-mortar', 'Mortar', 'mortar', 'defense', 'defense', NULL,
    'Heavy artillery cannon that lobs explosive shells with wide splash radius over long distances.',
    'The Mortar rains explosive death on enemy ground swarms. Its shells have a wide blast radius and long range, but it cannot fire at units within its 4-tile blind spot or target air units.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', 'Shield', 3, 'Unlocked at Town Hall 3 (Cost: 8,000 Gold)', 16, false, true,
    '["Can be geared up to Multi-Mortar with the Master Builder, firing 4 rapid-fire mini shells."]'::jsonb,
    '["Keep Mortars deeply embedded in the base so their 11-tile range softens incoming hordes before they reach walls."]'::jsonb,
    '["Long 11-tile range", "Wide blast radius knocks back light ground troops"]'::jsonb,
    '["4-tile blind spot around its base", "Slow 5.0s attack rate", "Cannot target air"]'::jsonb,
    '["Cannon", "Wizard Tower", "Wall Breaker Traps"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'defense-air-defense', 'Air Defense', 'air-defense', 'defense', 'defense', NULL,
    'Anti-aviation rocket launcher that delivers colossal sustained damage to flying attackers.',
    'This defense is lethal against flying units like Dragons, Healers, Lava Hounds, and Balloons, but is completely useless against ground attackers.',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80', 'Shield', 4, 'Unlocked at Town Hall 4 (Cost: 22,500 Gold)', 14, false, true,
    '["Air Defenses are always high-priority targets for Lightning Spell ZapQuake strategies."]'::jsonb,
    '["Distribute evenly to protect all quadrants against Electro Dragons and Queen Charge Healers."]'::jsonb,
    '["Extremely high anti-air DPS", "Long 10-tile range", "Fast 1.0s attack rate"]'::jsonb,
    '["Cannot target ground units", "Vulnerable to Lightning Spell combinations"]'::jsonb,
    '["Seeking Air Mine", "Wizard Tower", "Air Sweeper"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-26T14:30:00Z'
  ),
  (
    'defense-inferno-tower', 'Inferno Tower', 'inferno-tower', 'defense', 'defense', NULL,
    'A tower burning with concentrated Dark Elixir that incinerates the heaviest tanks or fries swarms.',
    'Set its jet of flame to roast single targets for monumental escalating damage, or switch to Multi-Target mode to scorch up to 5 approaching enemies at once with blistering streams of fire.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 'Shield', 10, 'Unlocked at Town Hall 10 (Cost: 3,000,000 Gold)', 10, true, true,
    '["Inferno Towers originally blocked all healing on targets in earlier versions of the game."]'::jsonb,
    '["Set Infernos to Single-Target near the Town Hall to eliminate high-HP Heroes, P.E.K.K.As, and Golems."]'::jsonb,
    '["Single mode melts any unit in seconds", "Multi mode shuts down swarm strategies", "Hits ground & air"]'::jsonb,
    '["Freeze Spells and Zap Spells reset the single-target escalation beam"]'::jsonb,
    '["Monolith", "Eagle Artillery", "Tornado Trap"]'::jsonb,
    '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  updated_at = EXCLUDED.updated_at;

---------------------------------------------------------
-- 4. ENTITY STATS SEED (Flexible EAV)
---------------------------------------------------------
INSERT INTO entity_stats (id, entity_id, stat_key, stat_value, unit, display_name, display_order)
VALUES
  -- Barbarian stats
  ('stat-barb-housing', 'troop-barbarian', 'housing_space', '1', 'slots', 'Housing Space', 1),
  ('stat-barb-speed', 'troop-barbarian', 'movement_speed', '16', 'tiles/s', 'Movement Speed', 2),
  ('stat-barb-atk-speed', 'troop-barbarian', 'attack_speed', '1.0', 's', 'Attack Speed', 3),
  ('stat-barb-range', 'troop-barbarian', 'range', '0.4', 'tiles', 'Attack Range', 4),
  ('stat-barb-target', 'troop-barbarian', 'target_type', 'Ground', NULL, 'Target Type', 5),
  ('stat-barb-damage-type', 'troop-barbarian', 'damage_type', 'Single Target', NULL, 'Damage Type', 6),
  ('stat-barb-fav-target', 'troop-barbarian', 'favorite_target', 'None', NULL, 'Favorite Target', 7),
  ('stat-barb-training-time', 'troop-barbarian', 'training_time', '5', 's', 'Training Time', 8),

  -- Archer stats
  ('stat-arch-housing', 'troop-archer', 'housing_space', '1', 'slots', 'Housing Space', 1),
  ('stat-arch-speed', 'troop-archer', 'movement_speed', '24', 'tiles/s', 'Movement Speed', 2),
  ('stat-arch-atk-speed', 'troop-archer', 'attack_speed', '1.0', 's', 'Attack Speed', 3),
  ('stat-arch-range', 'troop-archer', 'range', '3.5', 'tiles', 'Attack Range', 4),
  ('stat-arch-target', 'troop-archer', 'target_type', 'Ground & Air', NULL, 'Target Type', 5),
  ('stat-arch-damage-type', 'troop-archer', 'damage_type', 'Single Target', NULL, 'Damage Type', 6),

  -- Barbarian King stats
  ('stat-king-altar', 'hero-barbarian-king', 'altar_size', '3x3', 'tiles', 'Altar Size', 1),
  ('stat-king-speed', 'hero-barbarian-king', 'movement_speed', '16', 'tiles/s', 'Movement Speed', 2),
  ('stat-king-atk-speed', 'hero-barbarian-king', 'attack_speed', '1.2', 's', 'Attack Speed', 3),
  ('stat-king-range', 'hero-barbarian-king', 'range', '1.25', 'tiles', 'Attack Range', 4),
  ('stat-king-patrol', 'hero-barbarian-king', 'patrol_radius', '9.0', 'tiles', 'Patrol Radius', 5),
  ('stat-king-target', 'hero-barbarian-king', 'target_type', 'Ground', NULL, 'Target Type', 6),

  -- Archer Queen stats
  ('stat-queen-altar', 'hero-archer-queen', 'altar_size', '3x3', 'tiles', 'Altar Size', 1),
  ('stat-queen-speed', 'hero-archer-queen', 'movement_speed', '24', 'tiles/s', 'Movement Speed', 2),
  ('stat-queen-atk-speed', 'hero-archer-queen', 'attack_speed', '0.75', 's', 'Attack Speed', 3),
  ('stat-queen-range', 'hero-archer-queen', 'range', '5.0', 'tiles', 'Attack Range', 4),
  ('stat-queen-patrol', 'hero-archer-queen', 'patrol_radius', '10.0', 'tiles', 'Patrol Radius', 5),
  ('stat-queen-target', 'hero-archer-queen', 'target_type', 'Ground & Air', NULL, 'Target Type', 6),

  -- Inferno Tower stats
  ('stat-inf-size', 'defense-inferno-tower', 'size', '3x3', 'tiles', 'Building Size', 1),
  ('stat-inf-range', 'defense-inferno-tower', 'range', '9.0 - 10.0', 'tiles', 'Defense Range', 2),
  ('stat-inf-atk-speed', 'defense-inferno-tower', 'attack_speed', '0.128', 's', 'Attack Speed', 3),
  ('stat-inf-target', 'defense-inferno-tower', 'target_type', 'Ground & Air', NULL, 'Target Type', 4),
  ('stat-inf-damage-type', 'defense-inferno-tower', 'damage_type', 'Single (Escalating) / Multi', NULL, 'Damage Type', 5)
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 5. UPGRADE LEVELS SEED
---------------------------------------------------------
INSERT INTO entity_levels (id, entity_id, level, required_town_hall, upgrade_cost, upgrade_resource, upgrade_time_seconds, display_order)
VALUES
  -- Barbarian Levels
  ('lvl-barb-1', 'troop-barbarian', 1, 1, 0, 'free', 0, 1),
  ('lvl-barb-2', 'troop-barbarian', 2, 3, 5000, 'elixir', 7200, 2),
  ('lvl-barb-3', 'troop-barbarian', 3, 4, 15000, 'elixir', 14400, 3),
  ('lvl-barb-4', 'troop-barbarian', 4, 6, 60000, 'elixir', 28800, 4),
  ('lvl-barb-5', 'troop-barbarian', 5, 7, 150000, 'elixir', 43200, 5),
  ('lvl-barb-6', 'troop-barbarian', 6, 8, 400000, 'elixir', 86400, 6),
  ('lvl-barb-7', 'troop-barbarian', 7, 9, 1200000, 'elixir', 172800, 7),
  ('lvl-barb-8', 'troop-barbarian', 8, 10, 2800000, 'elixir', 302400, 8),
  ('lvl-barb-9', 'troop-barbarian', 9, 11, 5000000, 'elixir', 432000, 9),
  ('lvl-barb-10', 'troop-barbarian', 10, 12, 8500000, 'elixir', 604800, 10),
  ('lvl-barb-11', 'troop-barbarian', 11, 14, 13000000, 'elixir', 864000, 11),
  ('lvl-barb-12', 'troop-barbarian', 12, 16, 18000000, 'elixir', 1123200, 12),

  -- Archer Levels
  ('lvl-arch-1', 'troop-archer', 1, 1, 0, 'free', 0, 1),
  ('lvl-arch-5', 'troop-archer', 5, 7, 200000, 'elixir', 43200, 5),
  ('lvl-arch-8', 'troop-archer', 8, 10, 3000000, 'elixir', 302400, 8),
  ('lvl-arch-12', 'troop-archer', 12, 16, 18000000, 'elixir', 1123200, 12),

  -- Barbarian King Levels
  ('lvl-king-1', 'hero-barbarian-king', 1, 7, 10000, 'dark_elixir', 0, 1),
  ('lvl-king-10', 'hero-barbarian-king', 10, 8, 35000, 'dark_elixir', 86400, 10),
  ('lvl-king-30', 'hero-barbarian-king', 30, 9, 110000, 'dark_elixir', 302400, 30),
  ('lvl-king-50', 'hero-barbarian-king', 50, 11, 190000, 'dark_elixir', 432000, 50),
  ('lvl-king-95', 'hero-barbarian-king', 95, 16, 360000, 'dark_elixir', 691200, 95),

  -- Inferno Tower Levels
  ('lvl-inf-1', 'defense-inferno-tower', 1, 10, 3000000, 'gold', 172800, 1),
  ('lvl-inf-3', 'defense-inferno-tower', 3, 10, 5500000, 'gold', 345600, 3),
  ('lvl-inf-7', 'defense-inferno-tower', 7, 13, 14500000, 'gold', 864000, 7),
  ('lvl-inf-10', 'defense-inferno-tower', 10, 17, 23000000, 'gold', 1296000, 10)
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 6. LEVEL STATS SEED (Dynamic Stats per Level)
---------------------------------------------------------
INSERT INTO entity_level_stats (id, entity_level_id, stat_key, stat_value, unit, display_name)
VALUES
  -- Barbarian L1
  ('ls-barb-1-hp', 'lvl-barb-1', 'hitpoints', '45', 'HP', 'Hitpoints'),
  ('ls-barb-1-dps', 'lvl-barb-1', 'damage_per_second', '9', 'DPS', 'Damage Per Second'),
  ('ls-barb-1-dpa', 'lvl-barb-1', 'damage_per_attack', '9', 'DPA', 'Damage Per Attack'),

  -- Barbarian L12
  ('ls-barb-12-hp', 'lvl-barb-12', 'hitpoints', '260', 'HP', 'Hitpoints'),
  ('ls-barb-12-dps', 'lvl-barb-12', 'damage_per_second', '70', 'DPS', 'Damage Per Second'),
  ('ls-barb-12-dpa', 'lvl-barb-12', 'damage_per_attack', '70', 'DPA', 'Damage Per Attack'),

  -- King L1
  ('ls-king-1-hp', 'lvl-king-1', 'hitpoints', '1700', 'HP', 'Hitpoints'),
  ('ls-king-1-dps', 'lvl-king-1', 'damage_per_second', '120', 'DPS', 'Damage Per Second'),
  ('ls-king-1-regen', 'lvl-king-1', 'regeneration_time_minutes', '10', 'm', 'Regen Time'),

  -- King L95
  ('ls-king-95-hp', 'lvl-king-95', 'hitpoints', '12850', 'HP', 'Hitpoints'),
  ('ls-king-95-dps', 'lvl-king-95', 'damage_per_second', '742', 'DPS', 'Damage Per Second'),
  ('ls-king-95-regen', 'lvl-king-95', 'regeneration_time_minutes', '44', 'm', 'Regen Time'),

  -- Inferno Tower L10
  ('ls-inf-10-hp', 'lvl-inf-10', 'hitpoints', '4600', 'HP', 'Hitpoints'),
  ('ls-inf-10-dps', 'lvl-inf-10', 'damage_per_second', '470', 'DPS', 'Damage Per Second')
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 7. ENTITY REQUIREMENTS SEED
---------------------------------------------------------
INSERT INTO entity_requirements (id, entity_id, requirement_type, requirement_key, requirement_value, description)
VALUES
  ('req-barb-1', 'troop-barbarian', 'town_hall', 'town_hall_level', '1', 'Requires Town Hall 1'),
  ('req-barb-2', 'troop-barbarian', 'barracks', 'barracks_level', '1', 'Requires Barracks Level 1'),
  ('req-king-1', 'hero-barbarian-king', 'town_hall', 'town_hall_level', '7', 'Requires Town Hall 7'),
  ('req-inf-1', 'defense-inferno-tower', 'town_hall', 'town_hall_level', '10', 'Requires Town Hall 10')
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 8. RELATIONSHIPS SEED
---------------------------------------------------------
INSERT INTO entity_relationships (id, entity_id, related_entity_id, relationship_type, display_order)
VALUES
  ('rel-barb-king', 'troop-barbarian', 'hero-barbarian-king', 'synergy_with', 1),
  ('rel-barb-archer', 'troop-barbarian', 'troop-archer', 'synergy_with', 2),
  ('rel-king-queen', 'hero-barbarian-king', 'hero-archer-queen', 'related', 1),
  ('rel-inf-townhall', 'defense-inferno-tower', 'defense-town-hall', 'related', 1)
ON CONFLICT (id) DO NOTHING;

---------------------------------------------------------
-- 9. ENTITY SOURCES SEED
---------------------------------------------------------
INSERT INTO entity_sources (id, entity_id, source_id, source_url, license, attribution, retrieved_at, last_verified_at)
VALUES
  ('es-barbarian', 'troop-barbarian', 'src-official', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database', '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'),
  ('es-archer', 'troop-archer', 'src-official', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database', '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'),
  ('es-king', 'hero-barbarian-king', 'src-official', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database', '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'),
  ('es-queen', 'hero-archer-queen', 'src-official', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database', '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z'),
  ('es-inferno', 'defense-inferno-tower', 'src-official', 'https://supercell.com/en/games/clashofclans/', 'Fair Use / Supercell Fan Content Policy', 'Supercell Oy & Clash Archive Curated Database', '2026-08-20T00:00:00Z', '2026-08-27T08:00:00Z')
ON CONFLICT (id) DO NOTHING;
