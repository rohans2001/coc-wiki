import { TOWNHALLS_DATA } from '../data/townhalls';
import { TownHallInfo } from '../types/progression';

export class ProgressionService {
  static getAllTownHalls(): TownHallInfo[] {
    return TOWNHALLS_DATA;
  }

  static getTownHallByLevel(level: number): TownHallInfo | undefined {
    return TOWNHALLS_DATA.find((th) => th.level === level);
  }

  static getMaxTownHall(): TownHallInfo {
    return TOWNHALLS_DATA[TOWNHALLS_DATA.length - 1];
  }
}
