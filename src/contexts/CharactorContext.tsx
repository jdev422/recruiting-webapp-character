import { createContext, useContext, ReactNode } from "react";
import type { CharacterContextType } from "../types";
import { useCharacterState } from "../hooks/useCharacterState";

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const {
    attributes,
    skills,
    skillPoints,
    getRemainingSkillPoints,
    getSkillTotal,
    incrementAttribute,
    decrementAttribute,
    incrementSkill,
    decrementSkill,
  } = useCharacterState();

  return (
    <CharacterContext.Provider
      value={{
        attributes,
        skills,
        skillPoints,
        getRemainingSkillPoints,
        getSkillTotal,
        incrementAttribute,
        decrementAttribute,
        incrementSkill,
        decrementSkill,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
};
