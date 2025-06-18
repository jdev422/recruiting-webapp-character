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
export interface CharacterContextType {
  attributes: Attributes;
  skills: Skills;
  skillPoints: number;
  getRemainingSkillPoints: () => number;
  getSkillTotal: (skillName: string, skillAttributeModifier: number) => number;
  incrementAttribute: (attr: Attribute) => void;
  decrementAttribute: (attr: Attribute) => void;
  incrementSkill: (skillName: string) => void;
  decrementSkill: (skillName: string) => void;
}