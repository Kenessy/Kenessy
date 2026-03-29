/**
 * AE Dice Roller
 */
const Dice = {
  roll(sides) {
    return Math.floor(Math.random() * sides) + 1;
  },
  advantage() {
    const a = this.roll(20), b = this.roll(20);
    return { a, b, result: Math.max(a, b) };
  },
  disadvantage() {
    const a = this.roll(20), b = this.roll(20);
    return { a, b, result: Math.min(a, b) };
  },
  notation(str) {
    const m = str.toLowerCase().match(/^(\d*)d(\d+)([+-]\d+)?$/);
    if (!m) return null;
    const count = parseInt(m[1] || 1), sides = parseInt(m[2]), mod = parseInt(m[3] || 0);
    const rolls = Array.from({ length: count }, () => this.roll(sides));
    return { rolls, modifier: mod, total: rolls.reduce((a, b) => a + b, 0) + mod };
  },
};
