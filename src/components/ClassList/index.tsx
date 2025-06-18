import { useState } from "react";
import { useCharacter } from "../../contexts/CharactorContext";
import { CLASS_LIST } from "../../consts";
import { meetsRequirements } from "../../utils/character/requirements";

export const ClassList = () => {
  const { attributes } = useCharacter();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleClassClick = (className: string) => {
    setSelectedClass(className);
  };

  return (
    <div>
      <h2>Available Classes</h2>
      <ul>
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const isEligible = meetsRequirements(attributes, requirements);
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
              {className} {isEligible ? "✅" : "❌"}
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
