import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { EntityService } from '../services/entityService';
import { 
  EntityType, TroopEntity, HeroEntity, SpellEntity, DefenseEntity, 
  EquipmentEntity, PetEntity, AnyEntity, UpgradeLevel, EntityDetailRecord 
} from '../types/entity';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge, ResourceCurrencyBadge } from '../components/ui/Badge';
import { UpgradeTable } from '../components/tables/UpgradeTable';
import { RecommendationCard } from '../components/cards/RecommendationCard';
import { SourceAttribution } from '../components/ui/SourceAttribution';
import { 
  Shield, Zap, Sparkles, Clock, Target, Crosshair, Footprints, 
  Layers, CheckCircle, AlertTriangle, Lightbulb, HelpCircle, 
  Scale, Share2, Crown, Users, Hammer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EntityDetailPageProps {
  categoryType: EntityType;
}

export const EntityDetailPage: React.FC<EntityDetailPageProps> = ({ categoryType }) => {
  const { slug } = useParams<{ slug: string }>();

  const [detailRecord, setDetailRecord] = useState<EntityDetailRecord | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronous fallback while async details load
  const initialEntity = slug
    ? EntityService.getEntityBySlug(categoryType, slug) || EntityService.getEntityByAnySlug(slug)
    : undefined;

  const entity = detailRecord || initialEntity;

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      setIsLoading(true);
      EntityService.getEntityDetailsAsync(slug).then((record) => {
        if (isMounted) {
          setDetailRecord(record);
          setIsLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [slug, categoryType]);

  // Auto-select max level when entity changes
  useEffect(() => {
    if (entity) {
      setSelectedLevel(1);
      document.title = `${entity.name} - Clash of Clans Stats, Levels & Upgrades | Clash Archive`;
    }
  }, [entity?.name]);

  if (!entity) {
    return (
      <PageContainer>
        <div className="py-20 text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-stone-100">Entity Not Found</h1>
          <p className="text-stone-400 text-sm">
            We couldn&apos;t find an entity matching &quot;{slug}&quot; in our database.
          </p>
          <Link
            to="/troops"
            className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm"
          >
            Browse All Troops &rarr;
          </Link>
        </div>
      </PageContainer>
    );
  }

  const upgradeLevels: UpgradeLevel[] = (entity as { upgradeLevels?: UpgradeLevel[] }).upgradeLevels || [];
  const currentLevelStats = upgradeLevels.find((lvl) => lvl.level === selectedLevel) || upgradeLevels[0] || {};
  const maxLevelStats = upgradeLevels[upgradeLevels.length - 1] || {};

  const troop = entity.category === 'troop' ? (entity as TroopEntity) : null;
  const hero = entity.category === 'hero' ? (entity as HeroEntity) : null;
  const spell = entity.category === 'spell' ? (entity as SpellEntity) : null;
  const defense = entity.category === 'defense' ? (entity as DefenseEntity) : null;
  const equipment = entity.category === 'equipment' ? (entity as EquipmentEntity) : null;
  const pet = entity.category === 'pet' ? (entity as PetEntity) : null;

  const relatedEntities = EntityService.getRelatedEntities(entity, 4);

  const getCategoryPlural = (cat: string) => {
    if (cat === 'defense' || cat === 'building') return 'Defenses & Buildings';
    if (cat === 'hero') return 'Heroes';
    if (cat === 'siege') return 'Siege Machines';
    return `${cat.charAt(0).toUpperCase() + cat.slice(1)}s`;
  };

  const getCategoryPath = (cat: string) => {
    if (cat === 'defense' || cat === 'building') return '/defenses';
    if (cat === 'hero') return '/heroes';
    if (cat === 'siege') return '/siege-machines';
    return `/${cat}s`;
  };

  const breadcrumbs = [
    { label: getCategoryPlural(entity.category), path: getCategoryPath(entity.category) },
    ...(entity.subCategory ? [{ label: entity.subCategory.replace('_', ' ').toUpperCase() }] : []),
    { label: entity.name }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      {/* 1. HERO SECTION & QUICK STATS */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-[#151C2C] via-[#0E131E] to-[#07090E] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
        {/* Glow Accent */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Art & Badges Container (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-full max-w-xs aspect-square rounded-3xl bg-gradient-to-b from-stone-800/90 to-stone-950 border-2 border-stone-700/60 p-6 flex items-center justify-center shadow-2xl group">
              {/* Category Icon Canvas */}
              {entity.category === 'troop' && <Users className="w-24 h-24 sm:w-28 sm:h-28 text-amber-400/90 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]" />}
              {entity.category === 'hero' && <Crown className="w-24 h-24 sm:w-28 sm:h-28 text-purple-400/90 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]" />}
              {entity.category === 'defense' && <Shield className="w-24 h-24 sm:w-28 sm:h-28 text-blue-400/90 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" />}
              {entity.category === 'spell' && <Sparkles className="w-24 h-24 sm:w-28 sm:h-28 text-pink-400/90 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]" />}
              {entity.category === 'equipment' && <Hammer className="w-24 h-24 sm:w-28 sm:h-28 text-emerald-400/90 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" />}
              {entity.category === 'pet' && <Footprints className="w-24 h-24 sm:w-28 sm:h-28 text-teal-400/90 drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]" />}

              {/* Badges on card */}
              <div className="absolute top-4 left-4">
                <Badge variant="gold" size="sm">
                  TH {entity.unlockTownHall}+
                </Badge>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-xs font-mono font-bold text-amber-300">
                  Max Lvl {entity.maxLevel}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 w-full max-w-xs">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-xs font-semibold text-stone-200 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Unit'}</span>
              </button>
              <Link
                to={`/compare`}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare</span>
              </Link>
            </div>
          </div>

          {/* Right Header & Information (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="gold" size="md">
                  {entity.category.toUpperCase()}
                </Badge>
                {entity.unlockRequirementText && (
                  <span className="text-xs text-stone-400 font-mono">
                    {entity.unlockRequirementText}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-stone-100 tracking-tight">
                {entity.name}
              </h1>
              <p className="text-sm sm:text-base text-amber-300/90 font-medium mt-1">
                &ldquo;{entity.tagline}&rdquo;
              </p>
              <p className="mt-3 text-xs sm:text-sm text-stone-400 leading-relaxed">
                {entity.description}
              </p>
            </div>

            {/* Key Quick Stat Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {troop && (
                <>
                  <StatCard label="Housing Space" value={`${troop.housingSpace} Space`} icon={<Users className="w-4 h-4" />} />
                  <StatCard label="Movement Speed" value={troop.movementSpeed} icon={<Footprints className="w-4 h-4" />} />
                  <StatCard label="Attack Speed" value={`${troop.attackSpeed}s`} icon={<Clock className="w-4 h-4" />} />
                  <StatCard label="Attack Range" value={`${troop.range} tiles`} icon={<Target className="w-4 h-4" />} />
                  <StatCard label="Target Type" value={troop.targetType} icon={<Crosshair className="w-4 h-4" />} />
                  <StatCard label="Damage Type" value={troop.damageType} icon={<Zap className="w-4 h-4" />} />
                  <StatCard label="Training Time" value={`${troop.trainingTimeSeconds}s`} icon={<Clock className="w-4 h-4" />} />
                  <StatCard label="Max Level" value={`Lvl ${troop.maxLevel}`} highlight icon={<Crown className="w-4 h-4" />} />
                </>
              )}

              {hero && (
                <>
                  <StatCard label="Altar Size" value={hero.altarSize} />
                  <StatCard label="Movement Speed" value={hero.movementSpeed} icon={<Footprints className="w-4 h-4" />} />
                  <StatCard label="Attack Speed" value={`${hero.attackSpeed}s`} icon={<Clock className="w-4 h-4" />} />
                  <StatCard label="Attack Range" value={`${hero.range} tiles`} icon={<Target className="w-4 h-4" />} />
                  <StatCard label="Target Type" value={hero.targetType} icon={<Crosshair className="w-4 h-4" />} />
                  <StatCard label="Patrol Radius" value={`${hero.patrolRadius} tiles`} />
                  <StatCard label="Altar Cost" value={new Intl.NumberFormat().format(hero.altarCost)} />
                  <StatCard label="Max Level" value={`Lvl ${hero.maxLevel}`} highlight icon={<Crown className="w-4 h-4" />} />
                </>
              )}

              {defense && (
                <>
                  <StatCard label="Building Size" value={defense.size} />
                  <StatCard label="Defense Range" value={`${defense.range}`} icon={<Target className="w-4 h-4" />} />
                  <StatCard label="Attack Speed" value={`${defense.attackSpeed}s`} icon={<Clock className="w-4 h-4" />} />
                  <StatCard label="Target Type" value={defense.targetType} icon={<Crosshair className="w-4 h-4" />} />
                  <StatCard label="Damage Type" value={defense.damageType} icon={<Zap className="w-4 h-4" />} />
                  <StatCard label="Favorite Target" value={defense.favoriteTarget} />
                  <StatCard label="Signature" value={defense.isSignatureDefense ? 'Yes' : 'Standard'} highlight />
                  <StatCard label="Max Level" value={`Lvl ${defense.maxLevel}`} highlight icon={<Crown className="w-4 h-4" />} />
                </>
              )}

              {spell && (
                <>
                  <StatCard label="Housing Space" value={`${spell.housingSpace} Slots`} />
                  <StatCard label="Effect Radius" value={`${spell.radius} tiles`} icon={<Target className="w-4 h-4" />} />
                  <StatCard label="Target Type" value={spell.targetType} icon={<Crosshair className="w-4 h-4" />} />
                  <StatCard label="Brew Time" value={`${spell.brewingTimeSeconds}s`} icon={<Clock className="w-4 h-4" />} />
                  <StatCard label="Factory Lvl Req" value={`Lvl ${spell.spellFactoryLevelRequired}`} />
                  <StatCard label="Effect Type" value={spell.effectType} />
                  <StatCard label="Max Level" value={`Lvl ${spell.maxLevel}`} highlight icon={<Crown className="w-4 h-4" />} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE LEVEL INSPECTOR & STAT GAUGES */}
      {upgradeLevels.length > 0 && (
        <section className="mt-12 p-6 sm:p-8 rounded-3xl border border-stone-800 bg-[#0E131E]/95 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <Zap className="w-4 h-4" />
                <span>Dynamic Level Inspector</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-100 mt-1">
                {entity.name} Level {selectedLevel} Statistics
              </h2>
            </div>

            {/* Town Hall & Lab Milestone Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">Unlock Condition:</span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
                Town Hall {currentLevelStats.requiredTownHall || entity.unlockTownHall}
              </span>
              {currentLevelStats.requiredLaboratoryLevel !== undefined && currentLevelStats.requiredLaboratoryLevel > 0 && (
                <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono">
                  Lab {currentLevelStats.requiredLaboratoryLevel}
                </span>
              )}
            </div>
          </div>

          {/* Level Slider Bar & Quick Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Select Level: <strong className="text-amber-400 font-mono text-sm">Level {selectedLevel}</strong> / {entity.maxLevel}</span>
              {selectedLevel === entity.maxLevel && (
                <button
                  onClick={triggerCelebration}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 animate-pulse"
                >
                  🎉 Max Level Reached!
                </button>
              )}
            </div>
            <input
              type="range"
              min={1}
              max={entity.maxLevel}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(Number(e.target.value))}
              aria-label={`${entity.name} Level Selector`}
              className="w-full accent-amber-500 bg-stone-800 h-2.5 rounded-lg cursor-pointer"
            />
            {/* Level Quick Jump Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {upgradeLevels.map((lvl) => (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedLevel(lvl.level)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                    selectedLevel === lvl.level
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/30'
                      : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  L{lvl.level}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Stat Gauges for Current Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {currentLevelStats.hitpoints !== undefined && (
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-3">
                <ProgressBar
                  label="Hitpoints (HP)"
                  value={currentLevelStats.hitpoints}
                  max={maxLevelStats.hitpoints || currentLevelStats.hitpoints}
                  variant="emerald"
                />
                <span className="text-[11px] text-stone-500 block">
                  Max capacity: {new Intl.NumberFormat().format(maxLevelStats.hitpoints || 0)} HP at Lvl {entity.maxLevel}
                </span>
              </div>
            )}

            {currentLevelStats.damagePerSecond !== undefined && (
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-3">
                <ProgressBar
                  label="Damage Per Second (DPS)"
                  value={currentLevelStats.damagePerSecond}
                  max={maxLevelStats.damagePerSecond || currentLevelStats.damagePerSecond}
                  variant="gold"
                />
                <span className="text-[11px] text-stone-500 block">
                  Max capacity: {maxLevelStats.damagePerSecond} DPS at Lvl {entity.maxLevel}
                </span>
              </div>
            )}

            {/* Upgrade Cost & Time for current step */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Upgrade Cost:</span>
                <span className="font-mono font-bold text-amber-300">
                  {currentLevelStats.upgradeCost === 0 ? 'Free' : (
                    <ResourceCurrencyBadge
                      currency={currentLevelStats.upgradeCurrency}
                      amount={new Intl.NumberFormat().format(currentLevelStats.upgradeCost)}
                    />
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Upgrade Duration:</span>
                <span className="font-mono text-stone-200">{currentLevelStats.upgradeTime || 'Instant'}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. COMPLETE UPGRADE TABLE */}
      {upgradeLevels.length > 0 && (
        <section className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <Layers className="w-4 h-4" />
                <span>Level-by-Level Curve</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-stone-100 mt-1">
                {entity.name} Upgrade Statistics
              </h2>
            </div>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Click any level row to inspect stats above
            </span>
          </div>

          <UpgradeTable
            levels={upgradeLevels}
            selectedLevel={selectedLevel}
            onSelectLevel={(lvl) => setSelectedLevel(lvl)}
            entityName={entity.name}
          />
        </section>
      )}

      {/* 4. STRATEGY, TACTICS, STRENGTHS & WEAKNESSES */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        {entity.strengths && entity.strengths.length > 0 && (
          <div className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Key Strengths &amp; Advantages</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {entity.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {entity.weaknesses && entity.weaknesses.length > 0 && (
          <div className="p-6 rounded-3xl border border-red-500/20 bg-red-500/5 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Weaknesses &amp; Counters</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {entity.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">&bull;</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 5. TACTICAL TIPS & SYNERGIES */}
      {((entity.tips && entity.tips.length > 0) || (entity.synergies && entity.synergies.length > 0)) && (
        <section className="mt-6 p-6 sm:p-8 rounded-3xl border border-stone-800 bg-stone-900/40 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>Tactical Deployment &amp; Strategy Tips</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {entity.tips && (
              <div className="space-y-2">
                <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                  Pro Attack Strategies
                </h4>
                <ul className="space-y-2 text-stone-400">
                  {entity.tips.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">&rarr;</span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entity.synergies && (
              <div className="space-y-2">
                <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
                  Recommended Army Synergies
                </h4>
                <ul className="space-y-2 text-stone-400">
                  {entity.synergies.map((syn, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">+</span>
                      <span className="leading-relaxed">{syn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. TRIVIA & LORE */}
      {entity.trivia && entity.trivia.length > 0 && (
        <section className="mt-6 p-6 rounded-3xl border border-stone-800 bg-stone-950/60 space-y-3">
          <div className="flex items-center gap-2 text-stone-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Trivia &amp; Lore</span>
          </div>
          <ul className="space-y-1.5 text-xs text-stone-400">
            {entity.trivia.map((triv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-stone-500 font-mono">[{idx + 1}]</span>
                <span>{triv}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. RELATED ENTITIES */}
      {relatedEntities.length > 0 && (
        <section className="mt-12 space-y-4">
          <h3 className="text-xl font-bold font-display text-stone-100">
            Related &amp; Synergistic Units
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedEntities.map((rel) => (
              <RecommendationCard key={rel.id} entity={rel} relationshipLabel={`TH ${rel.unlockTownHall} Unlock`} />
            ))}
          </div>
        </section>
      )}

      {/* 8. DATA PROVENANCE & ATTRIBUTION */}
      <section className="mt-12">
        <SourceAttribution
          provenance={entity.provenance}
          lastUpdated={detailRecord?.updatedAt}
        />
      </section>
    </PageContainer>
  );
};
