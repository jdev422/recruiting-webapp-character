import { createContext, useContext, useState, ReactNode } from "react";
import { ATTRIBUTE_LIST } from "../consts";

export type Attribute = (typeof ATTRIBUTE_LIST)[number];
export type Attributes = Record<Attribute, number>;

export interface CharacterContextType {
  attributes: Attributes;
  incrementAttribute: (attr: Attribute) => void;
  decrementAttribute: (attr: Attribute) => void;
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

  return (
    <CharacterContext.Provider
      value={{ attributes, incrementAttribute, decrementAttribute }}
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
