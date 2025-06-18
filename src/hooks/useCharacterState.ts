import { useState } from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { calculateModifier } from "../utils/character/modifiers";
import type { Attribute, Attributes, Skills } from "../types";

const MAX_TOTAL_ATTRIBUTES = 70;

export const useCharacterState = () => {
  const [attributes, setAttributes] = useState<Attributes>(() => {
    const initial: Partial<Attributes> = {};
    ATTRIBUTE_LIST.forEach((attr) => (initial[attr] = 0));
    return initial as Attributes;
  });

  const [skills, setSkills] = useState<Skills>({});

  const intelligenceMod = calculateModifier(attributes.Intelligence);
  const skillPoints = 10 + 4 * intelligenceMod;

  const totalAllocated = Object.values(skills).reduce(
    (sum, val) => sum + val,
    0
  );

  const getRemainingSkillPoints = () => skillPoints - totalAllocated;

  const getSkillTotal = (skillName: string, skillAttributeModifier: number) => {
    const pointsSpent = skills[skillName] || 0;
    return pointsSpent + skillAttributeModifier;
  };

  const totalAttributes = Object.values(attributes).reduce(
    (sum, val) => sum + val,
    0
  );

  const incrementAttribute = (attr: keyof Attributes) => {
    if (totalAttributes >= MAX_TOTAL_ATTRIBUTES) {
      return;
    }
    setAttributes((prev) => ({ ...prev, [attr]: prev[attr] + 1 }));
  };

  const decrementAttribute = (attr: Attribute) => {
    setAttributes((prev) => ({ ...prev, [attr]: Math.max(0, prev[attr] - 1) }));
  };

  const incrementSkill = (skillName: string) => {
    if (totalAllocated < skillPoints) {
      setSkills((prev) => ({
        ...prev,
        [skillName]: (prev[skillName] || 0) + 1,
      }));
    }
  };

  const decrementSkill = (skillName: string) => {
    setSkills((prev) => ({
      ...prev,
      [skillName]: Math.max(0, (prev[skillName] || 0) - 1),
    }));
  };

  return {
    attributes,
    skills,
    skillPoints,
    getRemainingSkillPoints,
    getSkillTotal,
    incrementAttribute,
    decrementAttribute,
    incrementSkill,
    decrementSkill,
  };
};
