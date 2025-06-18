/**
 * Calculates the ability modifier for a given attribute score.
 * Modifier = floor((score - 10) / 2)
 */
export const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};