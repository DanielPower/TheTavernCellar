export const exponentialCost = (
  initialCost: number,
  count: number,
  rate: number
) => Math.floor(initialCost * rate ** (count - 1));

export const nextLevelRequirement = (level: number) =>
  exponentialCost(25, level, 1.2);
