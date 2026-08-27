import { AnyEntity, UpgradeLevel } from '../types/entity';

export interface CalculationResult {
  totalCost: number;
  currency: string;
  totalTimeSeconds: number;
  totalTimeFormatted: string;
  discountAppliedPercent: number;
  savedCost: number;
  savedTimeSeconds: number;
  levelSteps: {
    from: number;
    to: number;
    cost: number;
    time: string;
    thRequired: number;
  }[];
}

export class CalculatorService {
  static calculateUpgrade(
    entity: AnyEntity,
    fromLevel: number,
    toLevel: number,
    goldPassBoostPercent: number = 0 // 0, 10, 15, 20
  ): CalculationResult {
    const levels: UpgradeLevel[] = (entity as { upgradeLevels?: UpgradeLevel[] }).upgradeLevels || [];
    
    if (!levels || levels.length === 0) {
      return {
        totalCost: 0,
        currency: 'gold',
        totalTimeSeconds: 0,
        totalTimeFormatted: '0s',
        discountAppliedPercent: goldPassBoostPercent,
        savedCost: 0,
        savedTimeSeconds: 0,
        levelSteps: []
      };
    }

    const discountMultiplier = (100 - goldPassBoostPercent) / 100;
    let totalCost = 0;
    let originalCost = 0;
    let totalTimeSeconds = 0;
    let originalTimeSeconds = 0;
    const currency = levels[0]?.upgradeCurrency || 'gold';
    const levelSteps = [];

    // Filter relevant levels: upgrades to level L where fromLevel < L <= toLevel
    const targetLevels = levels.filter((lvl) => lvl.level > fromLevel && lvl.level <= toLevel);

    for (const lvl of targetLevels) {
      const stepCost = Math.round(lvl.upgradeCost * discountMultiplier);
      const stepTimeSec = Math.round(lvl.upgradeTimeSeconds * discountMultiplier);

      totalCost += stepCost;
      originalCost += lvl.upgradeCost;
      totalTimeSeconds += stepTimeSec;
      originalTimeSeconds += lvl.upgradeTimeSeconds;

      levelSteps.push({
        from: lvl.level - 1,
        to: lvl.level,
        cost: stepCost,
        time: this.formatTimeSeconds(stepTimeSec),
        thRequired: lvl.requiredTownHall
      });
    }

    return {
      totalCost,
      currency,
      totalTimeSeconds,
      totalTimeFormatted: this.formatTimeSeconds(totalTimeSeconds),
      discountAppliedPercent: goldPassBoostPercent,
      savedCost: originalCost - totalCost,
      savedTimeSeconds: originalTimeSeconds - totalTimeSeconds,
      levelSteps
    };
  }

  static formatTimeSeconds(totalSeconds: number): string {
    if (totalSeconds <= 0) return 'Instant';
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 && days === 0) parts.push(`${minutes}m`);

    return parts.join(' ') || '0s';
  }

  static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }
}
