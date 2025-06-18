import React from "react";
import { useCharacter } from "../../contexts/CharactorContext";
import { ATTRIBUTE_LIST } from "../../consts";
import { calculateModifier } from "../../utils/character/modifiers";

export const AttributeList = () => {
  const { attributes, incrementAttribute, decrementAttribute } = useCharacter();

  return (
    <div>
      <h2>Attributes</h2>
      <ul>
        {ATTRIBUTE_LIST.map((attr) => {
          const score = attributes[attr];
          const modifier = calculateModifier(score);
          const sign = modifier >= 0 ? "+" : "";

          return (
            <li key={attr} style={{ marginBottom: "8px" }}>
              <strong>{attr}</strong>: {score} {" "}
              (Modifier: {sign}{modifier})
              <button onClick={() => decrementAttribute(attr)} style={{ marginLeft: 10 }}>
                -
              </button>
              <button onClick={() => incrementAttribute(attr)} style={{ marginLeft: 5 }}>
                +
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
