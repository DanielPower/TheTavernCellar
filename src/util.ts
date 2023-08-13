export const exponentialCost = (
  initialCost: number,
  count: number,
  rate: number
) => Math.floor(initialCost * rate ** (count - 1));

export const nextLevelRequirement = (level: number) =>
  exponentialCost(25, level, 1.3);

const log1000 = (n: number) => Math.log(n) / Math.log(1000);

const alpha = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65));
const suffixCharacters = [...alpha.map((a) => a.toLowerCase()), ...alpha];
const suffixes = [
  ...suffixCharacters,
  ...suffixCharacters.map((a) => suffixCharacters.map((b) => a + b)).flat(),
];

export const bigNum = (number: number, precision: number = 3) => {
  if (number < 1000) {
    return number;
  }
  const suffix = suffixes[Math.floor(log1000(number))];
  const base = number / 1000 ** Math.floor(log1000(number));
  return `${base.toFixed(precision)}${suffix}`;
};
