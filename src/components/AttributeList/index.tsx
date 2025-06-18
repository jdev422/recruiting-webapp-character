import { useCharacter } from "../../contexts/CharactorContext";
import { ATTRIBUTE_LIST } from "../../consts";
import { calculateModifier } from "../../utils/character/modifiers";

import "./styles.css";

export const AttributeList = () => {
  const { attributes, incrementAttribute, decrementAttribute } = useCharacter();

  return (
    <div className="attribute-list__container">
      <h3>Attributes</h3>
      <ul>
        {ATTRIBUTE_LIST.map((attr) => {
          const score = attributes[attr];
          const modifier = calculateModifier(score);
          const sign = modifier >= 0 ? "+" : "";

          return (
            <li key={attr} style={{ marginBottom: "8px" }}>
              <div>
                <strong>{attr}</strong>: {score} (Modifier: {sign}
                {modifier})
              </div>
              <div>
                <button
                  onClick={() => decrementAttribute(attr)}
                  style={{ marginLeft: 10 }}
                >
                  -
                </button>
                <button
                  onClick={() => incrementAttribute(attr)}
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
