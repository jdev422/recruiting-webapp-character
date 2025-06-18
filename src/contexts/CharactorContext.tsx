import { createContext, useContext, ReactNode } from "react";
import { useMultiCharacterState } from "../hooks/useMultiCharacterState";
import type { MultiCharacterContextType } from "../types";

const CharacterContext = createContext<MultiCharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const {
    characters,
    addCharacter,
    updateAttribute,
    updateSkill,
    getRemainingSkillPoints,
    getSkillTotal,
  } = useMultiCharacterState();

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        updateAttribute,
        updateSkill,
        getRemainingSkillPoints,
        getSkillTotal,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): MultiCharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
};
