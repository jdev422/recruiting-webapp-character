/**
 * Calculates the ability modifier for a given attribute score.
 * Modifier = floor((score - 10) / 2)
 */
export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};