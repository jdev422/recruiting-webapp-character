import { createContext, useContext, useState, ReactNode } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils/character/modifiers";

export type Attribute = (typeof ATTRIBUTE_LIST)[number];
export type Attributes = Record<Attribute, number>;

export type Skill = (typeof SKILL_LIST)[number]["name"];
export type SkillPoints = Record<Skill, number>;

export interface CharacterContextType {
  attributes: Attributes;
  incrementAttribute: (attr: Attribute) => void;
  decrementAttribute: (attr: Attribute) => void;

  skills: SkillPoints;
  incrementSkill: (skill: Skill) => void;
  decrementSkill: (skill: Skill) => void;
  getAvailableSkillPoints: () => number;
  getUsedSkillPoints: () => number;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [attributes, setAttributes] = useState<Attributes>(() => {
    const initial: Partial<Attributes> = {};
    ATTRIBUTE_LIST.forEach((attr) => (initial[attr] = 0));
    return initial as Attributes;
  });

  const [skills, setSkills] = useState<SkillPoints>(() => {
    const initial: Partial<SkillPoints> = {};
    SKILL_LIST.forEach((skill) => {
      initial[skill.name] = 0;
    });
    return initial as SkillPoints;
  });

  const incrementAttribute = (attribute: Attribute) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const decrementAttribute = (attribute: Attribute) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1),
    }));
  };

  const getAvailableSkillPoints = () => {
    const intMod = calculateModifier(attributes["Intelligence"]);
    return 10 + 4 * intMod;
  };

  const getUsedSkillPoints = () => {
    return Object.values(skills).reduce((sum, val) => sum + val, 0);
  };

  const incrementSkill = (skill: Skill) => {
    if (getUsedSkillPoints() < getAvailableSkillPoints()) {
      setSkills((prev) => ({
        ...prev,
        [skill]: prev[skill] + 1,
      }));
    }
  };

  const decrementSkill = (skill: Skill) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: Math.max(0, prev[skill] - 1),
    }));
  };

  return (
    <CharacterContext.Provider
      value={{
        attributes,
        incrementAttribute,
        decrementAttribute,
        skills,
        incrementSkill,
        decrementSkill,
        getAvailableSkillPoints,
        getUsedSkillPoints,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
