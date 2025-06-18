import { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { calculateModifier } from "../utils/character/modifiers";
import type { Attribute, Attributes, Skills } from "../types";

const MAX_TOTAL_ATTRIBUTES = 70;

const createEmptyAttributes = (): Attributes =>
  Object.fromEntries(ATTRIBUTE_LIST.map((attr) => [attr, 0])) as Attributes;

const createEmptySkills = (): Skills => ({});

export const useMultiCharacterState = () => {
  const [characters, setCharacters] = useState([
    {
      name: "Character 1",
      attributes: createEmptyAttributes(),
      skills: createEmptySkills(),
    },
  ]);

  const addCharacter = () => {
    const newCharacter = {
      name: `Character ${characters.length + 1}`,
      attributes: createEmptyAttributes(),
      skills: createEmptySkills(),
    };
    setCharacters((prev) => [...prev, newCharacter]);
  };

  const updateAttribute = (index: number, attr: Attribute, delta: number) => {
    setCharacters((prev) =>
      prev.map((char, i) => {
        if (i !== index) return char;

        const total = Object.values(char.attributes).reduce(
          (sum, val) => sum + val,
          0
        );

        const nextValue = Math.max(0, char.attributes[attr] + delta);
        const newTotal = total - char.attributes[attr] + nextValue;

        if (newTotal > MAX_TOTAL_ATTRIBUTES) return char;

        return {
          ...char,
          attributes: {
            ...char.attributes,
            [attr]: nextValue,
          },
        };
      })
    );
  };

  const updateSkill = (index: number, skill: string, delta: number) => {
    setCharacters((prev) =>
      prev.map((char, i) => {
        if (i !== index) return char;

        const intMod = calculateModifier(char.attributes.Intelligence);
        const maxSkillPoints = 10 + 4 * intMod;
        const totalUsed = Object.values(char.skills).reduce(
          (sum, val) => sum + val,
          0
        );

        const current = char.skills[skill] || 0;
        const newVal = Math.max(0, current + delta);
        const newTotal = totalUsed - current + newVal;

        if (newTotal > maxSkillPoints) return char;

        return {
          ...char,
          skills: {
            ...char.skills,
            [skill]: newVal,
          },
        };
      })
    );
  };

  const getRemainingSkillPoints = (index: number) => {
    const { attributes, skills } = characters[index];
    const intMod = calculateModifier(attributes.Intelligence);
    const total = 10 + 4 * intMod;
    const used = Object.values(skills).reduce((sum, val) => sum + val, 0);
    return total - used;
  };

  const getSkillTotal = (
    index: number,
    skillName: string,
    skillAttributeModifier: number
  ) => {
    const char = characters[index];
    return (char.skills[skillName] ?? 0) + skillAttributeModifier;
  };

  return {
    characters,
    addCharacter,
    updateAttribute,
    updateSkill,
    getRemainingSkillPoints,
    getSkillTotal,
  };
};
