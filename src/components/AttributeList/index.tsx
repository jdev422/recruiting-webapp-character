import { useCharacter } from "../../contexts/CharactorContext";
import { ATTRIBUTE_LIST } from "../../consts";
import { calculateModifier } from "../../utils/character/modifiers";
import { Attribute } from "../../types";

import "./styles.css";

interface AttributeListProps {
  index: number;
}

export const AttributeList = ({ index }: AttributeListProps) => {
  const {
    characters,
    updateAttribute,
  } = useCharacter();

  const character = characters[index];
  const { attributes } = character;

  return (
    <div className="attribute-list__container">
      <h3>{character.name} - Attributes</h3>
      <ul>
        {ATTRIBUTE_LIST.map((attr) => {
          const score = attributes[attr];
          const modifier = calculateModifier(score);
          const sign = modifier >= 0 ? "+" : "";

          return (
            <li key={attr} style={{ marginBottom: "8px" }}>
              <div>
                <strong>{attr}</strong>: {score} (Modifier: {sign}{modifier})
              </div>
              <div>
                <button
                  onClick={() => updateAttribute(index, attr as Attribute, -1)}
                  style={{ marginLeft: 10 }}
                >
                  -
                </button>
                <button
                  onClick={() => updateAttribute(index, attr as Attribute, 1)}
                  style={{ marginLeft: 5 }}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
