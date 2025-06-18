export const getAbilityModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};