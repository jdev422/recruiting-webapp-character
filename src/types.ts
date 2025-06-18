import { ATTRIBUTE_LIST } from "./consts";

export type Skills = Record<string, number>;
export type Attribute = (typeof ATTRIBUTE_LIST)[number];
export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};
export type Class = "Barbarian" | "Wizard" | "Bard";

export interface Character {
  name: string;
  attributes: Attributes;
  skills: Skills;
}

export interface MultiCharacterContextType {
  characters: Character[];
  addCharacter: () => void;

  updateAttribute: (index: number, attr: Attribute, delta: number) => void;
  updateSkill: (index: number, skill: string, delta: number) => void;

  getRemainingSkillPoints: (index: number) => number;
  getSkillTotal: (
    index: number,
    skillName: string,
    skillAttributeModifier: number
  ) => number;
}
