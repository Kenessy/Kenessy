// ============================================
// Apocalypse Express — Dice Roller Engine
// ============================================

export interface DiceResult {
  rolls: number[];
  total: number;
  formula: string;
}

/** Roll a single die (e.g., d20 returns 1-20) */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** Roll NdX (e.g., "2d6" → roll 2 six-sided dice) */
export function rollDice(count: number, sides: number): DiceResult {
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(rollDie(sides));
  }
  return {
    rolls,
    total: rolls.reduce((a, b) => a + b, 0),
    formula: `${count}d${sides}`,
  };
}

/** Roll a d20 with optional modifier */
export function rollD20(modifier: number = 0): DiceResult {
  const roll = rollDie(20);
  return {
    rolls: [roll],
    total: roll + modifier,
    formula: modifier >= 0 ? `1d20+${modifier}` : `1d20${modifier}`,
  };
}

/** DC check result bands per AE rules */
export type CheckBand = 'critical_fail' | 'fail' | 'success' | 'critical_success';

/** Evaluate a d20 roll against a DC */
export function evaluateCheck(roll: number, dc: number, modifier: number = 0): {
  band: CheckBand;
  total: number;
  natural: number;
} {
  const total = roll + modifier;
  let band: CheckBand;

  if (roll === 1) {
    band = 'critical_fail';
  } else if (roll === 20) {
    band = 'critical_success';
  } else if (total >= dc) {
    band = 'success';
  } else {
    band = 'fail';
  }

  return { band, total, natural: roll };
}

/** Injury dice — Low 2d4 (take lower of 2d4) */
export function rollL2d4(): DiceResult {
  const a = rollDie(4);
  const b = rollDie(4);
  return {
    rolls: [a, b],
    total: Math.min(a, b),
    formula: 'L2d4',
  };
}

/** Injury dice — High 2d8 (take higher of 2d8) */
export function rollH2d8(): DiceResult {
  const a = rollDie(8);
  const b = rollDie(8);
  return {
    rolls: [a, b],
    total: Math.max(a, b),
    formula: 'H2d8',
  };
}
