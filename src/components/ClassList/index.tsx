import { useState } from "react";
import { useCharacter } from "../../contexts/CharactorContext";
import { CLASS_LIST } from "../../consts";
import { meetsRequirements } from "../../utils/character/requirements";

import "./styles.css";

type ClassListProps = {
  index: number;
};

export const ClassList = ({ index }: ClassListProps) => {
  const { characters } = useCharacter();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const character = characters[index];
  const handleClassClick = (className: string) => {
    setSelectedClass(className);
  };

  return (
    <div className="class-list__container">
      <h3>Available Classes</h3>
      <ul>
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const isEligible = meetsRequirements(
            character.attributes,
            requirements
          );
          return (
            <li
              key={className}
              onClick={() => handleClassClick(className)}
              style={{
                padding: "8px",
                marginBottom: "4px",
                cursor: "pointer",
                backgroundColor: isEligible ? "#d4f7dc" : "#fbeaea",
                border: "1px solid",
                borderColor: isEligible ? "green" : "red",
              }}
            >
              <div>{className}</div> <div>{isEligible ? "✅" : "❌"}</div>
            </li>
          );
        })}
      </ul>

      {selectedClass && (
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid #ccc",
            paddingTop: "8px",
          }}
        >
          <h3>{selectedClass} Requirements</h3>
          <ul>
            {Object.entries(
              CLASS_LIST[selectedClass as keyof typeof CLASS_LIST]
            ).map(([attr, value]) => (
              <li key={attr}>
                {attr}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
