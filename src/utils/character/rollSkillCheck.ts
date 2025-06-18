interface Character {
  skills: Record<string, number>;
}

interface RollResult {
  index: number;
  roll: number;
  skillValue: number;
  total: number;
  success: boolean;
}

export const rollSkillCheck = (
  characters: Character[],
  skillName: string,
  dc: number
): {
  results: RollResult[];
  bestIndex: number;
} => {
  const results: RollResult[] = characters.map((char, index) => {
    const skillValue = char.skills[skillName] ?? 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + skillValue;
    return {
      index,
      roll,
      skillValue,
      total,
      success: total >= dc,
    };
  });

  const maxTotal = Math.max(...results.map((r) => r.total));
  const best = results.find((r) => r.total === maxTotal);

  return {
    results,
    bestIndex: best?.index ?? 0,
  };
};
