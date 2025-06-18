import { createContext, useContext, useState, ReactNode } from "react";
import { ATTRIBUTE_LIST } from "../consts";
export type Attribute = (typeof ATTRIBUTE_LIST)[number];
type Attributes = Record<Attribute, number>;

interface CharacterContextType {
  attributes: Attributes;
  increment: (attribute: Attribute) => void;
  decrement: (attribute: Attribute) => void;
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

  const increment = (attribute: Attribute) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const decrement = (attribute: Attribute) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] - 1,
    }));
  };

  return (
    <CharacterContext.Provider value={{ attributes, increment, decrement }}>
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
